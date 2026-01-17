import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Loader2, FolderSync, CheckCircle, AlertCircle, Folder, RefreshCw, Upload, FileUp } from "lucide-react";

// All directories with PDFs
const PAPER_DIRECTORIES = [
  "101", "102", "111", "112", "121", "122", "131", "132", 
  "141", "142", "151", "152", "161", "162", "171", "172",
  "181", "182", "191", "192", "202", "211", "212", "221", 
  "222", "231", "232", "241", "242", "251", "misc"
];

const STORAGE_BUCKET = "paper-uploads";

interface DirectoryStatus {
  name: string;
  status: "idle" | "syncing" | "done" | "error";
  total: number;
  uploaded: number;
  errors: number;
}

interface UploadProgress {
  total: number;
  completed: number;
  current: string;
  errors: string[];
}

// Subject mapping based on the indexing system
const SUBJECT_MAP: Record<string, Record<string, string>> = {
  '00': { '00': 'tok', '01': 'ee', '02': 'tok_essay', '03': 'tok_exhibition' },
  '01': { '01': 'lang_a_literature', '02': 'lang_a_lang_lit', '03': 'literature_performance', '04': 'latin', '05': 'classical_greek' },
  '02': { 
    '01': 'english_b', '02': 'french_b', '03': 'spanish_b', '04': 'german_b', '05': 'italian_b',
    '06': 'japanese_b', '07': 'mandarin_b', '08': 'arabic_ab', '09': 'chinese_ab', '10': 'hindi_ab',
    '11': 'japanese_ab', '12': 'korean_ab', '13': 'portuguese_ab', '14': 'russian_ab', '15': 'spanish_ab'
  },
  '03': { 
    '01': 'business_management', '02': 'economics', '03': 'geography', '04': 'history',
    '05': 'global_politics', '06': 'philosophy', '07': 'psychology', '08': 'social_cultural_anthropology',
    '09': 'world_religions', '10': 'digital_society'
  },
  '04': { 
    '01': 'biology', '02': 'chemistry', '03': 'physics', '04': 'computer_science',
    '05': 'design_technology', '06': 'ess', '07': 'sehs'
  },
  '05': { '01': 'math_aa', '02': 'math_ai' },
  '06': { '01': 'visual_arts', '02': 'music', '03': 'theatre', '04': 'dance', '05': 'film', '06': 'drama' }
};

const YEAR_MAP: Record<string, number> = {
  '01': 2001, '10': 2010, '11': 2011, '12': 2012, '13': 2013, '14': 2014,
  '15': 2015, '16': 2016, '17': 2017, '18': 2018, '19': 2019,
  '20': 2020, '21': 2021, '22': 2022, '23': 2023, '24': 2024,
  '25': 2025, '26': 2026, '27': 2027, '28': 2028, '29': 2029,
  '30': 2013, '40': 2014, '41': 2015, '42': 2016, '43': 2017, '44': 2018, '45': 2019,
  '50': 2019, '54': 2020
};

function getSession(yearCode: string): string | null {
  const code = parseInt(yearCode, 10);
  if (code >= 40 && code <= 49) return 'November';
  if (code >= 50 && code <= 59) return 'May';
  if (code >= 10 && code <= 29) return 'May';
  if (code >= 30 && code <= 39) return 'November';
  return null;
}

function parseFilename(filename: string) {
  const cleanName = filename.replace('.pdf', '');
  const parts = cleanName.split('-');
  
  if (parts.length < 5) return null;
  
  const typeCode = parts[0];
  const groupCode = parts[1];
  const subjectCode = parts[2];
  const yearCode = parts[3];
  
  const subjectGroup = SUBJECT_MAP[groupCode];
  const subject = subjectGroup?.[subjectCode] || 'other';
  const year = YEAR_MAP[yearCode] || (2000 + parseInt(yearCode, 10));
  const session = getSession(yearCode);
  
  let paper_number: string | null = null;
  let is_markscheme = false;
  let is_resource = false;
  
  for (let i = 4; i < parts.length; i++) {
    const part = parts[i];
    if (part.startsWith('P') && /^P\d+$/.test(part)) {
      paper_number = part.replace('P', '');
    }
    if (part === 'MS' || filename.includes('markscheme')) {
      is_markscheme = true;
    }
    if (part === 'QUE' || part === 'TEX' || part === 'CAS') {
      is_resource = true;
    }
  }
  
  const level = typeCode.endsWith('1') ? 'HL' : typeCode.endsWith('2') ? 'SL' : null;
  
  let doc_type = 1;
  if (is_markscheme) doc_type = 2;
  if (is_resource) doc_type = 4;
  
  return {
    code: cleanName,
    subject,
    year,
    session,
    paper_number,
    timezone: null,
    level,
    is_markscheme,
    is_resource,
    doc_type,
    name: filename,
  };
}

export default function ImportPastPapers() {
  const [directories, setDirectories] = useState<DirectoryStatus[]>([]);
  const [isDiscovering, setIsDiscovering] = useState(false);
  const [isSyncingAll, setIsSyncingAll] = useState(false);
  const [currentDir, setCurrentDir] = useState<string | null>(null);
  const [overallProgress, setOverallProgress] = useState({ total: 0, done: 0 });
  
  // Upload state
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState<UploadProgress | null>(null);
  const [selectedFiles, setSelectedFiles] = useState<FileList | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Handle file selection
  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setSelectedFiles(e.target.files);
    }
  };

  // Upload files directly to storage (no database indexing)
  const uploadFiles = async () => {
    if (!selectedFiles || selectedFiles.length === 0) return;

    setIsUploading(true);
    const progress: UploadProgress = {
      total: selectedFiles.length,
      completed: 0,
      current: "",
      errors: [],
    };
    setUploadProgress(progress);

    for (let i = 0; i < selectedFiles.length; i++) {
      const file = selectedFiles[i];
      progress.current = file.name;
      setUploadProgress({ ...progress });

      try {
        // Save files flat - no directory organization
        const storagePath = file.name;

        // Upload to storage only - no database insertion
        const { error: uploadError } = await supabase.storage
          .from(STORAGE_BUCKET)
          .upload(storagePath, file, {
            contentType: "application/pdf",
            upsert: true,
          });

        if (uploadError) {
          progress.errors.push(`${file.name}: ${uploadError.message}`);
        }

        progress.completed++;
        setUploadProgress({ ...progress });
      } catch (err) {
        progress.errors.push(`${file.name}: ${err instanceof Error ? err.message : "Unknown error"}`);
      }
    }

    setIsUploading(false);
    
    if (progress.errors.length === 0) {
      toast.success(`Successfully uploaded ${progress.completed} files to storage!`);
    } else {
      toast.warning(`Uploaded ${progress.completed} files with ${progress.errors.length} errors`);
    }

    // Clear selection
    setSelectedFiles(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  // Discover directories and count files
  const discoverDirectories = async () => {
    setIsDiscovering(true);
    const statuses: DirectoryStatus[] = [];
    
    for (const dir of PAPER_DIRECTORIES) {
      try {
        const response = await fetch(`/pastpapers/${dir}/`);
        if (response.ok) {
          statuses.push({
            name: dir,
            status: "idle",
            total: 0,
            uploaded: 0,
            errors: 0,
          });
        }
      } catch (e) {
        // Directory doesn't exist or not accessible
      }
    }
    
    setDirectories(statuses);
    setIsDiscovering(false);
    toast.success(`Found ${statuses.length} directories`);
  };

  // Sync a single directory
  const syncDirectory = async (dirName: string) => {
    setCurrentDir(dirName);
    
    setDirectories(prev => prev.map(d => 
      d.name === dirName ? { ...d, status: "syncing" as const } : d
    ));

    try {
      const { data, error } = await supabase.functions.invoke("sync-directory-papers", {
        body: {
          directory: dirName,
          baseUrl: window.location.origin,
        },
      });

      if (error) throw error;

      setDirectories(prev => prev.map(d => 
        d.name === dirName ? { 
          ...d, 
          status: "done" as const,
          total: data.total || 0,
          uploaded: data.uploaded || 0,
          errors: data.errors?.length || 0,
        } : d
      ));

      return { success: true, ...data };
    } catch (err) {
      setDirectories(prev => prev.map(d => 
        d.name === dirName ? { ...d, status: "error" as const } : d
      ));
      return { success: false, error: err };
    } finally {
      setCurrentDir(null);
    }
  };

  // Sync all directories one by one
  const syncAllDirectories = async () => {
    setIsSyncingAll(true);
    setOverallProgress({ total: directories.length, done: 0 });
    
    let successCount = 0;
    let errorCount = 0;

    for (let i = 0; i < directories.length; i++) {
      const dir = directories[i];
      if (dir.name === "182") {
        setOverallProgress(prev => ({ ...prev, done: prev.done + 1 }));
        continue;
      }
      
      const result = await syncDirectory(dir.name);
      if (result.success) {
        successCount++;
      } else {
        errorCount++;
      }
      setOverallProgress(prev => ({ ...prev, done: i + 1 }));
      
      await new Promise(r => setTimeout(r, 500));
    }

    setIsSyncingAll(false);
    
    if (errorCount === 0) {
      toast.success(`All directories synced successfully!`);
    } else {
      toast.warning(`Synced with ${errorCount} directory errors`);
    }
  };

  useEffect(() => {
    discoverDirectories();
  }, []);

  const totalUploaded = directories.reduce((sum, d) => sum + d.uploaded, 0);
  const totalErrors = directories.reduce((sum, d) => sum + d.errors, 0);

  return (
    <div className="container mx-auto py-8 max-w-3xl space-y-6">
      {/* Direct Upload Card */}
      <Card className="border-primary">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Upload className="h-5 w-5" />
            Direct File Upload (Recommended)
          </CardTitle>
          <CardDescription>
            Upload PDF files directly to the <code>paper-uploads</code> bucket (public, no RLS).
            Files are saved flat without organization.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center gap-4">
            <input
              ref={fileInputRef}
              type="file"
              accept=".pdf"
              multiple
              onChange={handleFileSelect}
              className="hidden"
              id="pdf-upload"
            />
            <Button
              variant="outline"
              onClick={() => fileInputRef.current?.click()}
              disabled={isUploading}
            >
              <FileUp className="mr-2 h-4 w-4" />
              Select PDF Files
            </Button>
            
            {selectedFiles && selectedFiles.length > 0 && (
              <span className="text-sm text-muted-foreground">
                {selectedFiles.length} file(s) selected
              </span>
            )}
            
            <Button
              onClick={uploadFiles}
              disabled={!selectedFiles || selectedFiles.length === 0 || isUploading}
            >
              {isUploading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Uploading...
                </>
              ) : (
                <>
                  <Upload className="mr-2 h-4 w-4" />
                  Upload to Storage
                </>
              )}
            </Button>
          </div>

          {/* Upload Progress */}
          {uploadProgress && (
            <div className="space-y-2">
              <Progress value={(uploadProgress.completed / uploadProgress.total) * 100} />
              <p className="text-sm text-muted-foreground">
                {uploadProgress.completed} / {uploadProgress.total} files uploaded
                {uploadProgress.current && ` — Current: ${uploadProgress.current}`}
              </p>
              {uploadProgress.errors.length > 0 && (
                <div className="text-sm text-red-600 max-h-32 overflow-y-auto">
                  {uploadProgress.errors.map((err, i) => (
                    <p key={i}>• {err}</p>
                  ))}
                </div>
              )}
            </div>
          )}

          <div className="text-sm text-muted-foreground p-3 bg-muted rounded-lg">
            <p className="font-medium mb-1">How to use:</p>
            <ol className="list-decimal list-inside space-y-1 text-xs">
              <li>Click "Select PDF Files" and choose files from your local folder</li>
              <li>Click "Upload to Storage" to upload them to the <code>paper-uploads</code> bucket</li>
              <li>Files are saved flat (no directory structure, no database indexing)</li>
            </ol>
          </div>
        </CardContent>
      </Card>

      {/* Original Sync Card */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FolderSync className="h-5 w-5" />
            Sync from Public URL (Not Working)
          </CardTitle>
          <CardDescription>
            This method doesn't work because files use Git LFS and aren't served from the production URL.
            Use the Direct Upload method above instead.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6 opacity-50">
          <div className="flex items-center gap-4">
            <Button 
              onClick={discoverDirectories} 
              disabled={isDiscovering || isSyncingAll}
              variant="outline"
            >
              {isDiscovering ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <RefreshCw className="mr-2 h-4 w-4" />
              )}
              Refresh Directories
            </Button>
            
            <Button 
              onClick={syncAllDirectories} 
              disabled={isSyncingAll || directories.length === 0}
              size="lg"
            >
              {isSyncingAll ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Syncing All... ({overallProgress.done}/{overallProgress.total})
                </>
              ) : (
                <>
                  <FolderSync className="mr-2 h-4 w-4" />
                  Sync All Directories
                </>
              )}
            </Button>
          </div>

          {isSyncingAll && (
            <div className="space-y-2">
              <Progress value={(overallProgress.done / overallProgress.total) * 100} />
              <p className="text-sm text-muted-foreground text-center">
                {overallProgress.done} of {overallProgress.total} directories processed
              </p>
            </div>
          )}

          {totalUploaded > 0 && (
            <div className="flex gap-4 text-sm">
              <span className="text-green-600">✓ {totalUploaded} uploaded</span>
              {totalErrors > 0 && <span className="text-red-600">✗ {totalErrors} errors</span>}
            </div>
          )}

          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {directories.map((dir) => (
              <div
                key={dir.name}
                className={`p-3 rounded-lg border flex items-center justify-between ${
                  dir.status === "syncing" ? "border-primary bg-primary/5" :
                  dir.status === "done" ? "border-green-500 bg-green-50" :
                  dir.status === "error" ? "border-red-500 bg-red-50" :
                  "border-border"
                }`}
              >
                <div className="flex items-center gap-2">
                  <Folder className={`h-4 w-4 ${
                    dir.status === "done" ? "text-green-600" :
                    dir.status === "error" ? "text-red-600" :
                    "text-muted-foreground"
                  }`} />
                  <span className="font-mono text-sm">{dir.name}</span>
                  {dir.name === "182" && (
                    <span className="text-xs text-muted-foreground">(specimens)</span>
                  )}
                </div>
                
                <div className="flex items-center gap-2">
                  {dir.status === "syncing" && (
                    <Loader2 className="h-4 w-4 animate-spin text-primary" />
                  )}
                  {dir.status === "done" && (
                    <CheckCircle className="h-4 w-4 text-green-600" />
                  )}
                  {dir.status === "error" && (
                    <AlertCircle className="h-4 w-4 text-red-600" />
                  )}
                  {dir.status === "idle" && dir.name !== "182" && (
                    <Button
                      size="sm"
                      variant="ghost"
                      className="h-6 px-2"
                      onClick={() => syncDirectory(dir.name)}
                      disabled={isSyncingAll || currentDir !== null}
                    >
                      Sync
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
