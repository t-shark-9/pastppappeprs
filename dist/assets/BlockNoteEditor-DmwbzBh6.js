const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/vendor-export-COR0N_gy.js","assets/vendor-blocknote-BAmltmDn.js","assets/vendor-react-BeQHm2Hb.js","assets/vendor-react-dom-b1tP6waW.js","assets/vendor-misc-CQ2gQV2M.js","assets/vendor-utils-B8uxCDj6.js","assets/vendor-misc-BdE-jilM.css","assets/vendor-radix-BjF_gpzx.js","assets/vendor-i18n-BRT6rIp6.js","assets/vendor-tiptap-tuOT8GNt.js","assets/vendor-prosemirror-l_ukq4jw.js","assets/vendor-yjs-BarRwqAh.js","assets/vendor-datefns-Cgc6WLhj.js","assets/vendor-syncfusion-B9hbBizT.js","assets/vendor-syncfusion-DcifYHAj.css","assets/vendor-ketcher-B9jnF8te.js","assets/vendor-react-ChcLc0k7.css","assets/vendor-mantine-CpjnkULY.js"])))=>i.map(i=>d[i]);
import { r as reactExports, j as jsxRuntimeExports, al as BookOpen, aQ as Plus, a9 as Check, bS as Copy, ax as FileText, av as GraduationCap, ai as Users, bV as Newspaper, bW as Globe, bv as Sigma, bH as Settings, bX as Ul, bY as be, bZ as SpellCheck, b_ as zl, bQ as Se, b$ as Vr, c0 as xr, az as Sparkles, X, b7 as Image, bw as Atom, ba as ChartColumn, b1 as List, b4 as Quote, b3 as Type } from './vendor-react-BeQHm2Hb.js';
import { _ as __vitePreload, P as Pe, H as He, s as Ie, x as v, O as On, F as Ft, e as vo } from './vendor-blocknote-BAmltmDn.js';
import { eN as ue } from './vendor-misc-CQ2gQV2M.js';
import { D as Dialog, a as DialogContent, b as DialogHeader, c as DialogTitle, d as DialogDescription, e as DialogFooter } from './dialog-BQ4GVXEh.js';
import { B as Button, s as supabase, i as cn } from './index-C9tyh6tO.js';
import { I as Input } from './input-2hnN3JAu.js';
import { L as Label } from './label-BfT9c56I.js';
import { S as Select, a as SelectTrigger, b as SelectValue, c as SelectContent, d as SelectItem } from './select-DtVQdYEt.js';
import { T as Tabs, a as TabsList, b as TabsTrigger, c as TabsContent } from './tabs-D8pTTJCu.js';
import { C as Card, d as CardContent } from './card-BTaNjRSt.js';
import { S as ScrollArea } from './scroll-area-DHtqER3G.js';
import { B as Badge } from './badge-B04EGB2M.js';
import { T as Textarea } from './textarea-1gnjGx7F.js';
import { R as ResponsiveContainer, P as PieChart, a as Pie, C as Cell, T as Tooltip, L as Legend, A as AreaChart, b as CartesianGrid, X as XAxis, Y as YAxis, c as Area, S as ScatterChart, d as Scatter, e as LineChart, f as Line, B as BarChart, g as Bar } from './vendor-recharts-Cv4BIV0T.js';
import { P as Popover, a as PopoverTrigger, b as PopoverContent } from './popover-sIxpjwXN.js';
import { S as Switch } from './switch-CK-TAwbC.js';
import { k as katex } from './vendor-katex-LkNY165q.js';
import { F as Fuse } from './vendor-fuse-Gm-adH5Q.js';

async function handleDefineCommand(selectedText, context, insertContent) {
  if (window.__previewAICheck && !window.__previewAICheck()) {
    return;
  }
  if (!selectedText.trim()) {
    ue.error("Please select some text first");
    return;
  }
  try {
    const response = await fetch(
      `${"https://jimfuknlntcqgtqfwcod.supabase.co"}/functions/v1/ai-assistant`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImppbWZ1a25sbnRjcWd0cWZ3Y29kIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjIxMjAyNDksImV4cCI6MjA3NzY5NjI0OX0.Flky3o6WN5t1g2emMO84mWiyQWnHqzpLoW2MgGl8wYA"}`
        },
        body: JSON.stringify({
          command: "define",
          selection: selectedText,
          context
        })
      }
    );
    if (!response.ok || !response.body) {
      throw new Error("Failed to get AI response");
    }
    const reader = response.body.getReader();
    const decoder = new TextDecoder();
    let aiText = "";
    let sentenceComplete = false;
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      const chunk = decoder.decode(value);
      const lines = chunk.split("\n");
      for (const line of lines) {
        if (line.startsWith("data: ")) {
          const data = line.slice(6);
          if (data === "[DONE]") continue;
          try {
            const parsed = JSON.parse(data);
            const content = parsed.choices?.[0]?.delta?.content;
            if (content && !sentenceComplete) {
              aiText += content;
              const sentenceMatch = aiText.match(/^[^.!?]*[.!?]/);
              if (sentenceMatch) {
                sentenceComplete = true;
                aiText = sentenceMatch[0];
              }
              insertContent(aiText);
            }
          } catch (e) {
          }
        }
      }
    }
    ue.success("Definition added!");
  } catch (error) {
    console.error("AI error:", error);
    ue.error("Failed to get AI response");
  }
}
async function handleExplainCommand(selectedText, context, insertContent) {
  if (window.__previewAICheck && !window.__previewAICheck()) {
    return;
  }
  if (!selectedText.trim()) {
    ue.error("Please select some text first");
    return;
  }
  try {
    const response = await fetch(
      `${"https://jimfuknlntcqgtqfwcod.supabase.co"}/functions/v1/ai-assistant`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImppbWZ1a25sbnRjcWd0cWZ3Y29kIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjIxMjAyNDksImV4cCI6MjA3NzY5NjI0OX0.Flky3o6WN5t1g2emMO84mWiyQWnHqzpLoW2MgGl8wYA"}`
        },
        body: JSON.stringify({
          command: "explain",
          selection: selectedText,
          context
        })
      }
    );
    if (!response.ok || !response.body) {
      throw new Error("Failed to get AI response");
    }
    const reader = response.body.getReader();
    const decoder = new TextDecoder();
    let aiText = "";
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      const chunk = decoder.decode(value);
      const lines = chunk.split("\n");
      for (const line of lines) {
        if (line.startsWith("data: ")) {
          const data = line.slice(6);
          if (data === "[DONE]") continue;
          try {
            const parsed = JSON.parse(data);
            const content = parsed.choices?.[0]?.delta?.content;
            if (content) {
              const cleanedContent = content.replace(/[\[\]"']/g, "");
              aiText += cleanedContent;
              insertContent(aiText);
            }
          } catch (e) {
          }
        }
      }
    }
    ue.success("Explanation added!");
  } catch (error) {
    console.error("AI error:", error);
    ue.error("Failed to get AI response");
  }
}
async function handleSynonymCommand(selectedText, context, insertContent) {
  if (window.__previewAICheck && !window.__previewAICheck()) {
    return;
  }
  if (!selectedText.trim()) {
    ue.error("Please select some text first");
    return;
  }
  try {
    const response = await fetch(
      `${"https://jimfuknlntcqgtqfwcod.supabase.co"}/functions/v1/ai-assistant`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImppbWZ1a25sbnRjcWd0cWZ3Y29kIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjIxMjAyNDksImV4cCI6MjA3NzY5NjI0OX0.Flky3o6WN5t1g2emMO84mWiyQWnHqzpLoW2MgGl8wYA"}`
        },
        body: JSON.stringify({
          command: "synonym",
          selection: selectedText,
          context
        })
      }
    );
    if (!response.ok || !response.body) {
      throw new Error("Failed to get AI response");
    }
    const reader = response.body.getReader();
    const decoder = new TextDecoder();
    let aiText = "";
    let sentenceComplete = false;
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      const chunk = decoder.decode(value);
      const lines = chunk.split("\n");
      for (const line of lines) {
        if (line.startsWith("data: ")) {
          const data = line.slice(6);
          if (data === "[DONE]") continue;
          try {
            const parsed = JSON.parse(data);
            const content = parsed.choices?.[0]?.delta?.content;
            if (content && !sentenceComplete) {
              aiText += content;
              const sentenceMatch = aiText.match(/^[^.!?]*[.!?]/);
              if (sentenceMatch) {
                sentenceComplete = true;
                aiText = sentenceMatch[0];
              }
              insertContent(aiText);
            }
          } catch (e) {
          }
        }
      }
    }
    ue.success("Synonyms added!");
  } catch (error) {
    console.error("AI error:", error);
    ue.error("Failed to get AI response");
  }
}
async function handleRephraseCommand(selectedText, context, insertContent) {
  if (window.__previewAICheck && !window.__previewAICheck()) {
    return;
  }
  if (!selectedText.trim()) {
    ue.error("Please select some text first");
    return;
  }
  try {
    const response = await fetch(
      `${"https://jimfuknlntcqgtqfwcod.supabase.co"}/functions/v1/ai-assistant`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImppbWZ1a25sbnRjcWd0cWZ3Y29kIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjIxMjAyNDksImV4cCI6MjA3NzY5NjI0OX0.Flky3o6WN5t1g2emMO84mWiyQWnHqzpLoW2MgGl8wYA"}`
        },
        body: JSON.stringify({
          command: "rephrase",
          selection: selectedText,
          context
        })
      }
    );
    if (!response.ok || !response.body) {
      throw new Error("Failed to get AI response");
    }
    const reader = response.body.getReader();
    const decoder = new TextDecoder();
    let aiText = "";
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      const chunk = decoder.decode(value);
      const lines = chunk.split("\n");
      for (const line of lines) {
        if (line.startsWith("data: ")) {
          const data = line.slice(6);
          if (data === "[DONE]") continue;
          try {
            const parsed = JSON.parse(data);
            const content = parsed.choices?.[0]?.delta?.content;
            if (content) {
              aiText += content;
              insertContent(aiText);
            }
          } catch (e) {
          }
        }
      }
    }
    ue.success("Text rephrased!");
  } catch (error) {
    console.error("AI error:", error);
    ue.error("Failed to get AI response");
  }
}
async function handleGrammarCommand(selectedText, context, insertContent) {
  if (window.__previewAICheck && !window.__previewAICheck()) {
    return;
  }
  if (!selectedText.trim()) {
    ue.error("Please select some text first");
    return;
  }
  try {
    const response = await fetch(
      `${"https://jimfuknlntcqgtqfwcod.supabase.co"}/functions/v1/ai-assistant`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImppbWZ1a25sbnRjcWd0cWZ3Y29kIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjIxMjAyNDksImV4cCI6MjA3NzY5NjI0OX0.Flky3o6WN5t1g2emMO84mWiyQWnHqzpLoW2MgGl8wYA"}`
        },
        body: JSON.stringify({
          command: "grammar",
          selection: selectedText,
          context
        })
      }
    );
    if (!response.ok || !response.body) {
      throw new Error("Failed to get AI response");
    }
    const reader = response.body.getReader();
    const decoder = new TextDecoder();
    let aiText = "";
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      const chunk = decoder.decode(value);
      const lines = chunk.split("\n");
      for (const line of lines) {
        if (line.startsWith("data: ")) {
          const data = line.slice(6);
          if (data === "[DONE]") continue;
          try {
            const parsed = JSON.parse(data);
            const content = parsed.choices?.[0]?.delta?.content;
            if (content) {
              aiText += content;
              insertContent(aiText);
            }
          } catch (e) {
          }
        }
      }
    }
    ue.success("Grammar corrected!");
  } catch (error) {
    console.error("AI error:", error);
    ue.error("Failed to get AI response");
  }
}

const parseAuthors = (authors) => {
  return authors.split(",").map((a) => a.trim()).filter(Boolean);
};
const formatAuthorHarvard = (author) => {
  const parts = author.trim().split(" ");
  if (parts.length === 1) return parts[0];
  const lastName = parts[parts.length - 1];
  const firstNames = parts.slice(0, -1).map((n) => n[0] + ".").join(" ");
  return `${lastName}, ${firstNames}`;
};
const formatAuthorAPA = (author) => {
  const parts = author.trim().split(" ");
  if (parts.length === 1) return parts[0];
  const lastName = parts[parts.length - 1];
  const initials = parts.slice(0, -1).map((n) => n[0] + ".").join(" ");
  return `${lastName}, ${initials}`;
};
const formatAuthorMLA = (author) => {
  const parts = author.trim().split(" ");
  if (parts.length === 1) return parts[0];
  const lastName = parts[parts.length - 1];
  const firstNames = parts.slice(0, -1).join(" ");
  return `${lastName}, ${firstNames}`;
};
const formatAuthorVancouver = (author) => {
  const parts = author.trim().split(" ");
  if (parts.length === 1) return parts[0];
  const lastName = parts[parts.length - 1];
  const initials = parts.slice(0, -1).map((n) => n[0]).join("");
  return `${lastName} ${initials}`;
};
const formatAuthorsHarvard = (authors) => {
  const authorList = parseAuthors(authors);
  if (authorList.length === 0) return "";
  if (authorList.length === 1) return formatAuthorHarvard(authorList[0]);
  if (authorList.length === 2) {
    return `${formatAuthorHarvard(authorList[0])} and ${formatAuthorHarvard(authorList[1])}`;
  }
  return `${formatAuthorHarvard(authorList[0])} et al.`;
};
const formatAuthorsAPA = (authors) => {
  const authorList = parseAuthors(authors);
  if (authorList.length === 0) return "";
  if (authorList.length === 1) return formatAuthorAPA(authorList[0]);
  if (authorList.length === 2) {
    return `${formatAuthorAPA(authorList[0])}, & ${formatAuthorAPA(authorList[1])}`;
  }
  const formatted = authorList.slice(0, -1).map(formatAuthorAPA).join(", ");
  return `${formatted}, & ${formatAuthorAPA(authorList[authorList.length - 1])}`;
};
const formatAuthorsMLA = (authors) => {
  const authorList = parseAuthors(authors);
  if (authorList.length === 0) return "";
  if (authorList.length === 1) return formatAuthorMLA(authorList[0]);
  if (authorList.length === 2) {
    return `${formatAuthorMLA(authorList[0])}, and ${authorList[1]}`;
  }
  return `${formatAuthorMLA(authorList[0])}, et al.`;
};
const formatAuthorsVancouver = (authors) => {
  const authorList = parseAuthors(authors);
  if (authorList.length === 0) return "";
  if (authorList.length <= 6) {
    return authorList.map(formatAuthorVancouver).join(", ");
  }
  return `${authorList.slice(0, 6).map(formatAuthorVancouver).join(", ")}, et al`;
};
const formatAuthorsChicago = (authors) => {
  const authorList = parseAuthors(authors);
  if (authorList.length === 0) return "";
  if (authorList.length === 1) return formatAuthorMLA(authorList[0]);
  if (authorList.length === 2) {
    return `${formatAuthorMLA(authorList[0])} and ${authorList[1]}`;
  }
  return `${formatAuthorMLA(authorList[0])}, et al.`;
};
const formatAuthorsIEEE = (authors) => {
  const authorList = parseAuthors(authors);
  if (authorList.length === 0) return "";
  return authorList.map((author) => {
    const parts = author.trim().split(" ");
    if (parts.length === 1) return parts[0];
    const lastName = parts[parts.length - 1];
    const initials = parts.slice(0, -1).map((n) => n[0] + ".").join(" ");
    return `${initials} ${lastName}`;
  }).join(", ");
};
const formatInlineCitation = (citation, style, index) => {
  const authorList = parseAuthors(citation.authors);
  const firstAuthor = authorList[0]?.split(" ").pop() || "Unknown";
  switch (style) {
    case "harvard":
      return authorList.length > 2 ? `(${firstAuthor} et al., ${citation.year})` : `(${authorList.map((a) => a.split(" ").pop()).join(" & ")}, ${citation.year})`;
    case "apa":
      return authorList.length > 2 ? `(${firstAuthor} et al., ${citation.year})` : `(${authorList.map((a) => a.split(" ").pop()).join(" & ")}, ${citation.year})`;
    case "mla":
      return authorList.length > 2 ? `(${firstAuthor} et al.)` : `(${authorList.map((a) => a.split(" ").pop()).join(" and ")})`;
    case "vancouver":
      return `[${index !== void 0 ? index + 1 : "?"}]`;
    case "chicago":
      return `(${firstAuthor} ${citation.year})`;
    case "ieee":
      return `[${index !== void 0 ? index + 1 : "?"}]`;
    default:
      return `(${firstAuthor}, ${citation.year})`;
  }
};
const formatBibliographyEntry = (citation, style, index) => {
  switch (style) {
    case "harvard":
      return formatHarvard(citation);
    case "vancouver":
      return formatVancouver(citation, index);
    case "apa":
      return formatAPA(citation);
    case "mla":
      return formatMLA(citation);
    case "chicago":
      return formatChicago(citation);
    case "ieee":
      return formatIEEE(citation, index);
    default:
      return formatHarvard(citation);
  }
};
const formatHarvard = (c) => {
  const authors = formatAuthorsHarvard(c.authors);
  switch (c.type) {
    case "book":
      let book = `${authors} (${c.year}) ${c.title}.`;
      if (c.edition) book += ` ${c.edition} edn.`;
      if (c.location && c.publisher) book += ` ${c.location}: ${c.publisher}.`;
      else if (c.publisher) book += ` ${c.publisher}.`;
      return book;
    case "journal":
      let journal = `${authors} (${c.year}) '${c.title}', ${c.journal}`;
      if (c.volume) journal += `, ${c.volume}`;
      if (c.issue) journal += `(${c.issue})`;
      if (c.pages) journal += `, pp. ${c.pages}`;
      journal += ".";
      if (c.doi) journal += ` doi: ${c.doi}`;
      return journal;
    case "website":
      let website = `${authors} (${c.year}) ${c.title}.`;
      if (c.websiteName) website += ` ${c.websiteName}.`;
      website += ` Available at: ${c.url}`;
      if (c.accessDate) website += ` (Accessed: ${c.accessDate})`;
      return website;
    default:
      return `${authors} (${c.year}) ${c.title}. ${c.publisher || ""}`;
  }
};
const formatVancouver = (c, index) => {
  const num = index !== void 0 ? `${index + 1}. ` : "";
  const authors = formatAuthorsVancouver(c.authors);
  switch (c.type) {
    case "book":
      let book = `${num}${authors}. ${c.title}.`;
      if (c.edition) book += ` ${c.edition} ed.`;
      if (c.location) book += ` ${c.location}:`;
      if (c.publisher) book += ` ${c.publisher};`;
      book += ` ${c.year}.`;
      return book;
    case "journal":
      let journal = `${num}${authors}. ${c.title}. ${c.journal}. ${c.year}`;
      if (c.volume) journal += `;${c.volume}`;
      if (c.issue) journal += `(${c.issue})`;
      if (c.pages) journal += `:${c.pages}`;
      journal += ".";
      return journal;
    case "website":
      let website = `${num}${authors}. ${c.title} [Internet].`;
      if (c.websiteName) website += ` ${c.websiteName};`;
      website += ` ${c.year}`;
      if (c.accessDate) website += ` [cited ${c.accessDate}]`;
      if (c.url) website += `. Available from: ${c.url}`;
      return website;
    default:
      return `${num}${authors}. ${c.title}. ${c.publisher || ""}; ${c.year}.`;
  }
};
const formatAPA = (c) => {
  const authors = formatAuthorsAPA(c.authors);
  switch (c.type) {
    case "book":
      let book = `${authors} (${c.year}). ${c.title}`;
      if (c.edition) book += ` (${c.edition} ed.)`;
      book += ".";
      if (c.publisher) book += ` ${c.publisher}.`;
      if (c.doi) book += ` https://doi.org/${c.doi}`;
      return book;
    case "journal":
      let journal = `${authors} (${c.year}). ${c.title}. ${c.journal}`;
      if (c.volume) journal += `, ${c.volume}`;
      if (c.issue) journal += `(${c.issue})`;
      if (c.pages) journal += `, ${c.pages}`;
      journal += ".";
      if (c.doi) journal += ` https://doi.org/${c.doi}`;
      return journal;
    case "website":
      let website = `${authors} (${c.year}). ${c.title}.`;
      if (c.websiteName) website += ` ${c.websiteName}.`;
      if (c.url) website += ` ${c.url}`;
      return website;
    default:
      return `${authors} (${c.year}). ${c.title}. ${c.publisher || ""}`;
  }
};
const formatMLA = (c) => {
  const authors = formatAuthorsMLA(c.authors);
  switch (c.type) {
    case "book":
      let book = `${authors}. ${c.title}.`;
      if (c.edition) book += ` ${c.edition} ed.,`;
      if (c.publisher) book += ` ${c.publisher},`;
      book += ` ${c.year}.`;
      return book;
    case "journal":
      let journal = `${authors}. "${c.title}." ${c.journal}`;
      if (c.volume) journal += `, vol. ${c.volume}`;
      if (c.issue) journal += `, no. ${c.issue}`;
      journal += `, ${c.year}`;
      if (c.pages) journal += `, pp. ${c.pages}`;
      journal += ".";
      if (c.doi) journal += ` doi:${c.doi}`;
      return journal;
    case "website":
      let website = `${authors}. "${c.title}."`;
      if (c.websiteName) website += ` ${c.websiteName},`;
      website += ` ${c.year}`;
      if (c.url) website += `, ${c.url}`;
      if (c.accessDate) website += `. Accessed ${c.accessDate}`;
      website += ".";
      return website;
    default:
      return `${authors}. ${c.title}. ${c.publisher || ""}, ${c.year}.`;
  }
};
const formatChicago = (c) => {
  const authors = formatAuthorsChicago(c.authors);
  switch (c.type) {
    case "book":
      let book = `${authors}. ${c.title}.`;
      if (c.location && c.publisher) book += ` ${c.location}: ${c.publisher},`;
      else if (c.publisher) book += ` ${c.publisher},`;
      book += ` ${c.year}.`;
      return book;
    case "journal":
      let journal = `${authors}. "${c.title}." ${c.journal}`;
      if (c.volume) journal += ` ${c.volume}`;
      if (c.issue) journal += `, no. ${c.issue}`;
      journal += ` (${c.year})`;
      if (c.pages) journal += `: ${c.pages}`;
      journal += ".";
      if (c.doi) journal += ` https://doi.org/${c.doi}.`;
      return journal;
    case "website":
      let website = `${authors}. "${c.title}."`;
      if (c.websiteName) website += ` ${c.websiteName}.`;
      if (c.accessDate) website += ` Accessed ${c.accessDate}.`;
      if (c.url) website += ` ${c.url}.`;
      return website;
    default:
      return `${authors}. ${c.title}. ${c.publisher || ""}, ${c.year}.`;
  }
};
const formatIEEE = (c, index) => {
  const num = index !== void 0 ? `[${index + 1}] ` : "";
  const authors = formatAuthorsIEEE(c.authors);
  switch (c.type) {
    case "book":
      let book = `${num}${authors}, ${c.title}.`;
      if (c.location) book += ` ${c.location}:`;
      if (c.publisher) book += ` ${c.publisher},`;
      book += ` ${c.year}.`;
      return book;
    case "journal":
      let journal = `${num}${authors}, "${c.title}," ${c.journal}`;
      if (c.volume) journal += `, vol. ${c.volume}`;
      if (c.issue) journal += `, no. ${c.issue}`;
      if (c.pages) journal += `, pp. ${c.pages}`;
      journal += `, ${c.year}.`;
      return journal;
    case "website":
      let website = `${num}${authors}, "${c.title},"`;
      if (c.websiteName) website += ` ${c.websiteName},`;
      if (c.accessDate) website += ` Accessed: ${c.accessDate}.`;
      website += ` [Online]. Available: ${c.url}`;
      return website;
    default:
      return `${num}${authors}, ${c.title}. ${c.publisher || ""}, ${c.year}.`;
  }
};
const getStyleDisplayName = (style) => {
  const names = {
    harvard: "Harvard",
    vancouver: "Vancouver",
    apa: "APA 7th",
    mla: "MLA 9th",
    chicago: "Chicago",
    ieee: "IEEE"
  };
  return names[style];
};
const getSourceTypeDisplayName = (type) => {
  const names = {
    book: "Book",
    journal: "Journal Article",
    website: "Website",
    newspaper: "Newspaper",
    conference: "Conference Paper",
    thesis: "Thesis/Dissertation",
    other: "Other"
  };
  return names[type];
};
const generateCitationId = () => {
  return `cite_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
};

const sourceTypeIcons = {
  book: /* @__PURE__ */ jsxRuntimeExports.jsx(BookOpen, { className: "h-4 w-4" }),
  journal: /* @__PURE__ */ jsxRuntimeExports.jsx(FileText, { className: "h-4 w-4" }),
  website: /* @__PURE__ */ jsxRuntimeExports.jsx(Globe, { className: "h-4 w-4" }),
  newspaper: /* @__PURE__ */ jsxRuntimeExports.jsx(Newspaper, { className: "h-4 w-4" }),
  conference: /* @__PURE__ */ jsxRuntimeExports.jsx(Users, { className: "h-4 w-4" }),
  thesis: /* @__PURE__ */ jsxRuntimeExports.jsx(GraduationCap, { className: "h-4 w-4" }),
  other: /* @__PURE__ */ jsxRuntimeExports.jsx(FileText, { className: "h-4 w-4" })
};
const emptyFormData = () => ({
  type: "book",
  authors: "",
  title: "",
  year: (/* @__PURE__ */ new Date()).getFullYear().toString(),
  publisher: "",
  journal: "",
  volume: "",
  issue: "",
  pages: "",
  edition: "",
  url: "",
  accessDate: "",
  websiteName: "",
  newspaper: "",
  conference: "",
  location: "",
  university: "",
  thesisType: "",
  doi: ""
});
function CitationModal({
  open,
  onClose,
  onInsert,
  draftId,
  existingCitations = [],
  defaultStyle = "harvard"
}) {
  const [activeTab, setActiveTab] = reactExports.useState("new");
  const [formData, setFormData] = reactExports.useState(emptyFormData());
  const [style, setStyle] = reactExports.useState(defaultStyle);
  const [copiedId, setCopiedId] = reactExports.useState(null);
  reactExports.useEffect(() => {
    if (open) {
      setFormData(emptyFormData());
      setActiveTab(existingCitations.length > 0 ? "existing" : "new");
    }
  }, [open, existingCitations.length]);
  const updateField = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };
  const handleInsertNew = () => {
    if (!formData.authors.trim() || !formData.title.trim()) {
      ue.error("Please fill in at least Author and Title");
      return;
    }
    const citation = {
      ...formData,
      id: generateCitationId()
    };
    const inlineText = formatInlineCitation(citation, style, existingCitations.length);
    onInsert(inlineText, citation, style);
    setFormData(emptyFormData());
  };
  const handleInsertExisting = (citation, index) => {
    const inlineText = formatInlineCitation(citation, style, index);
    onInsert(inlineText, citation, style);
  };
  const handleCopyBibliography = (citation, index) => {
    const text = formatBibliographyEntry(citation, style, index);
    navigator.clipboard.writeText(text);
    setCopiedId(citation.id);
    setTimeout(() => setCopiedId(null), 2e3);
    ue.success("Bibliography entry copied");
  };
  const previewCitation = {
    ...formData};
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Dialog, { open, onOpenChange: (isOpen) => !isOpen && onClose(), children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogContent, { className: "max-w-2xl max-h-[85vh] overflow-hidden flex flex-col", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogHeader, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogTitle, { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(BookOpen, { className: "h-5 w-5" }),
        "Add Citation"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(DialogDescription, { children: "Create a new citation or insert from existing references" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 pb-2 border-b", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-sm font-medium", children: "Citation Style:" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Select, { value: style, onValueChange: (v) => setStyle(v), children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { className: "w-40", children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, {}) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectContent, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "harvard", children: "Harvard" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "apa", children: "APA 7th" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "mla", children: "MLA 9th" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "vancouver", children: "Vancouver" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "chicago", children: "Chicago" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "ieee", children: "IEEE" })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "outline", className: "text-xs", children: getStyleDisplayName(style) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Tabs, { value: activeTab, onValueChange: (v) => setActiveTab(v), className: "flex-1 overflow-hidden flex flex-col", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(TabsList, { className: "grid w-full grid-cols-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(TabsTrigger, { value: "new", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "h-4 w-4 mr-2" }),
          "New Citation"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(TabsTrigger, { value: "existing", disabled: existingCitations.length === 0, children: [
          "Existing (",
          existingCitations.length,
          ")"
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(TabsContent, { value: "new", className: "flex-1 overflow-hidden mt-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(ScrollArea, { className: "h-[400px] pr-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Source Type" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(Select, { value: formData.type, onValueChange: (v) => updateField("type", v), children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, {}) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(SelectContent, { children: ["book", "journal", "website", "newspaper", "conference", "thesis", "other"].map((type) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: type, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
                sourceTypeIcons[type],
                getSourceTypeDisplayName(type)
              ] }) }, type)) })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "col-span-2 space-y-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Author(s) *" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Input,
                {
                  placeholder: "John Smith, Jane Doe",
                  value: formData.authors,
                  onChange: (e) => updateField("authors", e.target.value)
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Separate multiple authors with commas" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "col-span-2 space-y-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Title *" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Input,
                {
                  placeholder: "Title of the work",
                  value: formData.title,
                  onChange: (e) => updateField("title", e.target.value)
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Year *" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Input,
                {
                  type: "text",
                  placeholder: "2024",
                  value: formData.year,
                  onChange: (e) => updateField("year", e.target.value)
                }
              )
            ] }),
            (formData.type === "book" || formData.type === "other") && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Publisher" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Input,
                  {
                    placeholder: "Publisher name",
                    value: formData.publisher,
                    onChange: (e) => updateField("publisher", e.target.value)
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Edition" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Input,
                  {
                    placeholder: "e.g., 3rd",
                    value: formData.edition,
                    onChange: (e) => updateField("edition", e.target.value)
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Location" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Input,
                  {
                    placeholder: "City, Country",
                    value: formData.location,
                    onChange: (e) => updateField("location", e.target.value)
                  }
                )
              ] })
            ] }),
            formData.type === "journal" && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "col-span-2 space-y-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Journal Name" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Input,
                  {
                    placeholder: "Journal of...",
                    value: formData.journal,
                    onChange: (e) => updateField("journal", e.target.value)
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Volume" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Input,
                  {
                    placeholder: "12",
                    value: formData.volume,
                    onChange: (e) => updateField("volume", e.target.value)
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Issue" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Input,
                  {
                    placeholder: "3",
                    value: formData.issue,
                    onChange: (e) => updateField("issue", e.target.value)
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Pages" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Input,
                  {
                    placeholder: "45-67",
                    value: formData.pages,
                    onChange: (e) => updateField("pages", e.target.value)
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "DOI" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Input,
                  {
                    placeholder: "10.1000/xyz123",
                    value: formData.doi,
                    onChange: (e) => updateField("doi", e.target.value)
                  }
                )
              ] })
            ] }),
            formData.type === "website" && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "col-span-2 space-y-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Website Name" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Input,
                  {
                    placeholder: "Website name",
                    value: formData.websiteName,
                    onChange: (e) => updateField("websiteName", e.target.value)
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "col-span-2 space-y-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "URL" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Input,
                  {
                    placeholder: "https://...",
                    value: formData.url,
                    onChange: (e) => updateField("url", e.target.value)
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Access Date" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Input,
                  {
                    placeholder: "1 January 2024",
                    value: formData.accessDate,
                    onChange: (e) => updateField("accessDate", e.target.value)
                  }
                )
              ] })
            ] }),
            formData.type === "thesis" && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "University" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Input,
                  {
                    placeholder: "University name",
                    value: formData.university,
                    onChange: (e) => updateField("university", e.target.value)
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Thesis Type" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Input,
                  {
                    placeholder: "PhD, Master's",
                    value: formData.thesisType,
                    onChange: (e) => updateField("thesisType", e.target.value)
                  }
                )
              ] })
            ] }),
            formData.type === "conference" && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "col-span-2 space-y-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Conference Name" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Input,
                  {
                    placeholder: "Conference name",
                    value: formData.conference,
                    onChange: (e) => updateField("conference", e.target.value)
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Location" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Input,
                  {
                    placeholder: "City, Country",
                    value: formData.location,
                    onChange: (e) => updateField("location", e.target.value)
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Pages" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Input,
                  {
                    placeholder: "45-67",
                    value: formData.pages,
                    onChange: (e) => updateField("pages", e.target.value)
                  }
                )
              ] })
            ] })
          ] }),
          formData.authors && formData.title && /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "bg-muted/50", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "pt-4 space-y-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-xs text-muted-foreground", children: "In-text citation preview" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-mono bg-background p-2 rounded border mt-1", children: formatInlineCitation(previewCitation, style, existingCitations.length) })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-xs text-muted-foreground", children: "Bibliography entry preview" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm bg-background p-2 rounded border mt-1 break-words", children: formatBibliographyEntry(previewCitation, style, existingCitations.length) })
            ] })
          ] }) })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-end gap-2 pt-4 border-t mt-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "outline", onClick: onClose, children: "Cancel" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { onClick: handleInsertNew, children: "Insert Citation" })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TabsContent, { value: "existing", className: "flex-1 overflow-hidden mt-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ScrollArea, { className: "h-[450px]", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3 pr-4", children: existingCitations.map((citation, index) => /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "hover:border-primary/50 transition-colors", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "pt-4 space-y-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-1", children: [
              sourceTypeIcons[citation.type],
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground", children: getSourceTypeDisplayName(citation.type) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "outline", className: "text-xs", children: style === "vancouver" || style === "ieee" ? `[${index + 1}]` : `${citation.year}` })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-medium text-sm truncate", children: citation.title }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground truncate", children: citation.authors })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                size: "sm",
                variant: "ghost",
                onClick: () => handleCopyBibliography(citation, index),
                children: copiedId === citation.id ? /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { className: "h-4 w-4 text-green-500" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Copy, { className: "h-4 w-4" })
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                size: "sm",
                onClick: () => handleInsertExisting(citation, index),
                children: "Insert"
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground border-t pt-2 break-words", children: formatBibliographyEntry(citation, style, index) })
      ] }) }, citation.id)) }) }) })
    ] })
  ] }) });
}

const COLORS = [
  "#1f77b4",
  // blue
  "#ff7f0e",
  // orange
  "#2ca02c",
  // green
  "#d62728",
  // red
  "#9467bd",
  // purple
  "#8c564b",
  // brown
  "#e377c2",
  // pink
  "#7f7f7f",
  // gray
  "#bcbd22",
  // olive
  "#17becf"
  // cyan
];
function ChartDialog({
  open,
  onOpenChange,
  onInsertChart,
  initialData,
  initialTitle
}) {
  const [chartType, setChartType] = reactExports.useState("bar");
  const [chartTitle, setChartTitle] = reactExports.useState(initialTitle || "");
  const defaultData = "Label 1, 100\nLabel 2, 200\nLabel 3, 150";
  const [dataInput, setDataInput] = reactExports.useState(initialData || defaultData);
  const [chartData, setChartData] = reactExports.useState([]);
  const [xAxisLabel, setXAxisLabel] = reactExports.useState("");
  const [yAxisLabel, setYAxisLabel] = reactExports.useState("");
  reactExports.useEffect(() => {
    if (open) {
      const input = initialData || defaultData;
      setDataInput(input);
      setChartData(parseData(input));
      setChartTitle(initialTitle || "");
    }
  }, [open, initialData, initialTitle]);
  const parseData = (input) => {
    const lines = input.trim().split("\n");
    return lines.map((line) => {
      const parts = line.split(",").map((p) => p.trim());
      if (parts.length >= 2) {
        const value = parseFloat(parts[1]);
        if (!isNaN(value)) {
          return { name: parts[0], value };
        }
      }
      return null;
    }).filter((item) => item !== null);
  };
  const handleDataChange = (input) => {
    setDataInput(input);
    const parsed = parseData(input);
    if (parsed.length > 0) {
      setChartData(parsed);
    }
  };
  const handleInsert = async () => {
    const chartElement = document.getElementById("chart-preview");
    if (chartElement) {
      try {
        const { default: html2canvas } = await __vitePreload(async () => { const { default: html2canvas } = await import('./vendor-export-COR0N_gy.js').then(n => n.e);return { default: html2canvas }},true?__vite__mapDeps([0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17]):void 0);
        const canvas = await html2canvas(chartElement, {
          backgroundColor: "#ffffff",
          scale: 2
        });
        const imageDataUrl = canvas.toDataURL("image/png");
        onInsertChart(imageDataUrl);
        onOpenChange(false);
      } catch (error) {
        console.error("Failed to convert chart to image:", error);
      }
    }
  };
  const renderChart = () => {
    const axisStyle = { fontSize: 11, fill: "#666" };
    switch (chartType) {
      case "bar":
        return /* @__PURE__ */ jsxRuntimeExports.jsx(ResponsiveContainer, { width: "100%", height: 280, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(BarChart, { data: chartData, margin: { top: 20, right: 30, left: 20, bottom: 30 }, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(CartesianGrid, { strokeDasharray: "3 3", stroke: "#e0e0e0" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            XAxis,
            {
              dataKey: "name",
              tick: axisStyle,
              label: xAxisLabel ? { value: xAxisLabel, position: "bottom", offset: -5 } : void 0
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            YAxis,
            {
              tick: axisStyle,
              label: yAxisLabel ? { value: yAxisLabel, angle: -90, position: "insideLeft" } : void 0
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Tooltip, {}),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Legend, {}),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Bar, { dataKey: "value", fill: COLORS[0], radius: [4, 4, 0, 0] })
        ] }) });
      case "line":
        return /* @__PURE__ */ jsxRuntimeExports.jsx(ResponsiveContainer, { width: "100%", height: 280, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(LineChart, { data: chartData, margin: { top: 20, right: 30, left: 20, bottom: 30 }, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(CartesianGrid, { strokeDasharray: "3 3", stroke: "#e0e0e0" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            XAxis,
            {
              dataKey: "name",
              tick: axisStyle,
              label: xAxisLabel ? { value: xAxisLabel, position: "bottom", offset: -5 } : void 0
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            YAxis,
            {
              tick: axisStyle,
              label: yAxisLabel ? { value: yAxisLabel, angle: -90, position: "insideLeft" } : void 0
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Tooltip, {}),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Legend, {}),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Line,
            {
              type: "monotone",
              dataKey: "value",
              stroke: COLORS[0],
              strokeWidth: 2,
              dot: { fill: COLORS[0], strokeWidth: 2, r: 4 },
              activeDot: { r: 6 }
            }
          )
        ] }) });
      case "scatter":
        return /* @__PURE__ */ jsxRuntimeExports.jsx(ResponsiveContainer, { width: "100%", height: 280, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(ScatterChart, { margin: { top: 20, right: 30, left: 20, bottom: 30 }, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(CartesianGrid, { strokeDasharray: "3 3", stroke: "#e0e0e0" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            XAxis,
            {
              dataKey: "name",
              type: "category",
              tick: axisStyle,
              label: xAxisLabel ? { value: xAxisLabel, position: "bottom", offset: -5 } : void 0
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            YAxis,
            {
              dataKey: "value",
              tick: axisStyle,
              label: yAxisLabel ? { value: yAxisLabel, angle: -90, position: "insideLeft" } : void 0
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Tooltip, {}),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Legend, {}),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Scatter, { name: "Data", data: chartData, fill: COLORS[0] })
        ] }) });
      case "area":
        return /* @__PURE__ */ jsxRuntimeExports.jsx(ResponsiveContainer, { width: "100%", height: 280, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(AreaChart, { data: chartData, margin: { top: 20, right: 30, left: 20, bottom: 30 }, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(CartesianGrid, { strokeDasharray: "3 3", stroke: "#e0e0e0" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            XAxis,
            {
              dataKey: "name",
              tick: axisStyle,
              label: xAxisLabel ? { value: xAxisLabel, position: "bottom", offset: -5 } : void 0
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            YAxis,
            {
              tick: axisStyle,
              label: yAxisLabel ? { value: yAxisLabel, angle: -90, position: "insideLeft" } : void 0
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Tooltip, {}),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Legend, {}),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Area,
            {
              type: "monotone",
              dataKey: "value",
              stroke: COLORS[0],
              fill: COLORS[0],
              fillOpacity: 0.3
            }
          )
        ] }) });
      case "pie":
        return /* @__PURE__ */ jsxRuntimeExports.jsx(ResponsiveContainer, { width: "100%", height: 280, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(PieChart, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Pie,
            {
              data: chartData,
              cx: "50%",
              cy: "50%",
              labelLine: true,
              label: ({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`,
              outerRadius: 90,
              fill: COLORS[0],
              dataKey: "value",
              children: chartData.map((_, index) => /* @__PURE__ */ jsxRuntimeExports.jsx(Cell, { fill: COLORS[index % COLORS.length] }, `cell-${index}`))
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Tooltip, {}),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Legend, {})
        ] }) });
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Dialog, { open, onOpenChange, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogContent, { className: "max-w-3xl max-h-[90vh] overflow-y-auto", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogHeader, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTitle, { children: "Create Chart (Matplotlib Style)" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(DialogDescription, { children: "Create a publication-quality chart. Enter data in CSV format (name, value per line)." })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-4 py-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-3 gap-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "chart-type", children: "Chart Type" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Select, { value: chartType, onValueChange: (v) => setChartType(v), children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, {}) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectContent, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "bar", children: "Bar Chart" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "line", children: "Line Chart" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "area", children: "Area Chart" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "scatter", children: "Scatter Plot" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "pie", children: "Pie Chart" })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2 col-span-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "chart-title", children: "Chart Title" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              id: "chart-title",
              value: chartTitle,
              onChange: (e) => setChartTitle(e.target.value),
              placeholder: "Enter chart title"
            }
          )
        ] })
      ] }),
      chartType !== "pie" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "x-axis", children: "X-Axis Label" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              id: "x-axis",
              value: xAxisLabel,
              onChange: (e) => setXAxisLabel(e.target.value),
              placeholder: "e.g., Time (s)"
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "y-axis", children: "Y-Axis Label" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              id: "y-axis",
              value: yAxisLabel,
              onChange: (e) => setYAxisLabel(e.target.value),
              placeholder: "e.g., Temperature (°C)"
            }
          )
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "chart-data", children: "Data (CSV: name, value)" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Textarea,
          {
            id: "chart-data",
            value: dataInput,
            onChange: (e) => handleDataChange(e.target.value),
            rows: 5,
            placeholder: "Label 1, 100\nLabel 2, 200\nLabel 3, 150",
            className: "font-mono text-sm"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Tip: Copy data from your table or spreadsheet. First column = labels, second = values." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Preview" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            id: "chart-preview",
            className: "bg-white p-4 rounded-md border",
            style: { minHeight: 350 },
            children: [
              chartTitle && /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "text-center font-semibold mb-2 text-foreground text-lg", children: chartTitle }),
              chartData.length > 0 ? renderChart() : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center justify-center h-64 text-muted-foreground", children: "Enter valid data to see preview" })
            ]
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogFooter, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "outline", onClick: () => onOpenChange(false), children: "Cancel" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { onClick: handleInsert, disabled: chartData.length === 0, children: "Insert Chart" })
    ] })
  ] }) });
}

const latexCommands = [
  // Greek letters
  { command: "\\alpha", description: "α - Greek alpha", category: "Greek" },
  { command: "\\beta", description: "β - Greek beta", category: "Greek" },
  { command: "\\gamma", description: "γ - Greek gamma", category: "Greek" },
  { command: "\\delta", description: "δ - Greek delta", category: "Greek" },
  { command: "\\epsilon", description: "ε - Greek epsilon", category: "Greek" },
  { command: "\\theta", description: "θ - Greek theta", category: "Greek" },
  { command: "\\lambda", description: "λ - Greek lambda", category: "Greek" },
  { command: "\\mu", description: "μ - Greek mu", category: "Greek" },
  { command: "\\pi", description: "π - Greek pi", category: "Greek" },
  { command: "\\sigma", description: "σ - Greek sigma", category: "Greek" },
  { command: "\\phi", description: "φ - Greek phi", category: "Greek" },
  { command: "\\omega", description: "ω - Greek omega", category: "Greek" },
  { command: "\\Gamma", description: "Γ - Capital gamma", category: "Greek" },
  { command: "\\Delta", description: "Δ - Capital delta", category: "Greek" },
  { command: "\\Sigma", description: "Σ - Capital sigma", category: "Greek" },
  { command: "\\Omega", description: "Ω - Capital omega", category: "Greek" },
  // Math operators
  { command: "\\frac{}{}", description: "Fraction", category: "Functions" },
  { command: "\\sqrt{}", description: "Square root", category: "Functions" },
  { command: "\\sqrt[]{}", description: "Nth root", category: "Functions" },
  { command: "\\sum_{i=1}^{n}", description: "Sum from i=1 to n", category: "Functions" },
  { command: "\\prod_{i=1}^{n}", description: "Product from i=1 to n", category: "Functions" },
  { command: "\\int_{a}^{b}", description: "Definite integral from a to b", category: "Functions" },
  { command: "\\lim_{x \\to }", description: "Limit as x approaches", category: "Functions" },
  { command: "\\partial", description: "∂ - Partial derivative", category: "Operators" },
  { command: "\\infty", description: "∞ - Infinity", category: "Operators" },
  { command: "\\pm", description: "± - Plus minus", category: "Operators" },
  { command: "\\times", description: "× - Times", category: "Operators" },
  { command: "\\div", description: "÷ - Division", category: "Operators" },
  { command: "\\cdot", description: "· - Center dot", category: "Operators" },
  { command: "\\neq", description: "≠ - Not equal", category: "Operators" },
  { command: "\\leq", description: "≤ - Less than or equal", category: "Operators" },
  { command: "\\geq", description: "≥ - Greater than or equal", category: "Operators" },
  { command: "\\approx", description: "≈ - Approximately", category: "Operators" },
  // Arrows
  { command: "\\rightarrow", description: "→ - Right arrow", category: "Arrows" },
  { command: "\\leftarrow", description: "← - Left arrow", category: "Arrows" },
  { command: "\\Rightarrow", description: "⇒ - Right double arrow", category: "Arrows" },
  { command: "\\Leftarrow", description: "⇐ - Left double arrow", category: "Arrows" },
  { command: "\\leftrightarrow", description: "↔ - Bidirectional arrow", category: "Arrows" },
  // Sets
  { command: "\\in", description: "∈ - Element of", category: "Sets" },
  { command: "\\notin", description: "∉ - Not element of", category: "Sets" },
  { command: "\\subset", description: "⊂ - Subset", category: "Sets" },
  { command: "\\subseteq", description: "⊆ - Subset or equal", category: "Sets" },
  { command: "\\cup", description: "∪ - Union", category: "Sets" },
  { command: "\\cap", description: "∩ - Intersection", category: "Sets" },
  { command: "\\emptyset", description: "∅ - Empty set", category: "Sets" },
  // Matrices
  { command: "\\begin{matrix}\n  &  \\\\\n  & \n\\end{matrix}", description: "Matrix", category: "Matrices" },
  { command: "\\begin{pmatrix}\n  &  \\\\\n  & \n\\end{pmatrix}", description: "Matrix with parentheses", category: "Matrices" },
  { command: "\\begin{bmatrix}\n  &  \\\\\n  & \n\\end{bmatrix}", description: "Matrix with brackets", category: "Matrices" },
  // Common formulas
  { command: "x^{2}", description: "x squared", category: "Common" },
  { command: "x^{n}", description: "x to the power of n", category: "Common" },
  { command: "x_{i}", description: "x subscript i", category: "Common" },
  { command: "\\log", description: "Logarithm", category: "Functions" },
  { command: "\\ln", description: "Natural logarithm", category: "Functions" },
  { command: "\\sin", description: "Sine function", category: "Functions" },
  { command: "\\cos", description: "Cosine function", category: "Functions" },
  { command: "\\tan", description: "Tangent function", category: "Functions" }
];
function AutocompleteDropdown({ isVisible, suggestions, selectedIndex, onSelect, position }) {
  if (!isVisible || suggestions.length === 0) return null;
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      className: "absolute z-50 max-h-48 w-80 overflow-y-auto bg-background border border-border rounded-md shadow-lg",
      style: {
        top: position.top,
        left: position.left
      },
      children: suggestions.map((suggestion, index) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: `px-3 py-2 cursor-pointer border-b border-muted/50 last:border-b-0 ${index === selectedIndex ? "bg-primary/10" : "hover:bg-muted/50"}`,
          onClick: () => onSelect(suggestion.command),
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-mono text-sm font-medium", children: suggestion.command }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-muted-foreground", children: suggestion.description })
          ]
        },
        suggestion.command
      ))
    }
  );
}
const quickSymbols = [
  { label: "x²", latex: "^{2}", title: "Squared" },
  { label: "xⁿ", latex: "^{}", title: "Power" },
  { label: "√", latex: "\\sqrt{}", title: "Square root" },
  { label: "a/b", latex: "\\frac{}{}", title: "Fraction" },
  { label: "∑", latex: "\\sum_{i=1}^{n}", title: "Sum" },
  { label: "∫", latex: "\\int_{a}^{b}", title: "Integral" },
  { label: "α", latex: "\\alpha", title: "Alpha" },
  { label: "β", latex: "\\beta", title: "Beta" },
  { label: "π", latex: "\\pi", title: "Pi" },
  { label: "θ", latex: "\\theta", title: "Theta" },
  { label: "∞", latex: "\\infty", title: "Infinity" },
  { label: "±", latex: "\\pm", title: "Plus/Minus" },
  { label: "≠", latex: "\\neq", title: "Not equal" },
  { label: "≤", latex: "\\leq", title: "Less or equal" },
  { label: "≥", latex: "\\geq", title: "Greater or equal" }
];
function MathBlock({ block, editor }) {
  const [latex, setLatex] = reactExports.useState(block.props.latex || "");
  const mode = block.props.mode || "block";
  const [isEditing, setIsEditing] = reactExports.useState(!block.props.latex);
  const [error, setError] = reactExports.useState(null);
  const [renderedHtml, setRenderedHtml] = reactExports.useState("");
  const [numbered, setNumbered] = reactExports.useState(block.props.numbered || false);
  const [label, setLabel] = reactExports.useState(block.props.label || "");
  const textareaRef = reactExports.useRef(null);
  const debounceRef = reactExports.useRef();
  const [isExpanded, setIsExpanded] = reactExports.useState(false);
  const [showAutocomplete, setShowAutocomplete] = reactExports.useState(false);
  const [autocompleteSuggestions, setAutocompleteSuggestions] = reactExports.useState([]);
  const [autocompleteIndex, setAutocompleteIndex] = reactExports.useState(0);
  const [autocompletePosition, setAutocompletePosition] = reactExports.useState({ top: 0, left: 0 });
  const [currentPrefix, setCurrentPrefix] = reactExports.useState("");
  const [dynamicEquationNumber, setDynamicEquationNumber] = reactExports.useState(1);
  const calculateEquationNumber = reactExports.useCallback(() => {
    if (!editor?.document) return 1;
    let equationNumber = 1;
    const scanBlocks = (blocks) => {
      for (const scanBlock of blocks) {
        if (scanBlock.id === block.id) {
          return true;
        }
        if ((scanBlock.type === "blockMath" || scanBlock.type === "inlineMath") && scanBlock.props?.numbered === true) {
          equationNumber++;
        }
        if (scanBlock.children && Array.isArray(scanBlock.children)) {
          if (scanBlocks(scanBlock.children)) {
            return true;
          }
        }
      }
      return false;
    };
    try {
      if (scanBlocks(editor.document)) {
        setDynamicEquationNumber(numbered ? equationNumber : 1);
      }
    } catch (error2) {
      console.warn("Dynamic equation numbering failed, using static fallback");
      if (typeof window !== "undefined") {
        const count = window.__equationCounter || 0;
        window.__equationCounter = count + 1;
        setDynamicEquationNumber(count + 1);
      }
    }
  }, [editor, block.id, numbered]);
  reactExports.useEffect(() => {
    calculateEquationNumber();
  }, [calculateEquationNumber]);
  reactExports.useEffect(() => {
    if (!editor) return;
    const unsubscribe = editor.onEditorContentChange(() => {
      const timeout = setTimeout(calculateEquationNumber, 100);
      return () => clearTimeout(timeout);
    });
    return unsubscribe;
  }, [editor, calculateEquationNumber]);
  reactExports.useEffect(() => {
    if (!latex || latex.trim() === "") {
      setRenderedHtml("");
      setError(null);
      return;
    }
    try {
      const html = katex.renderToString(latex, {
        displayMode: mode === "block",
        throwOnError: true,
        strict: false
      });
      setRenderedHtml(html);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Invalid LaTeX syntax");
      setRenderedHtml("");
    }
  }, [latex, mode]);
  reactExports.useEffect(() => {
    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }
    debounceRef.current = setTimeout(() => {
      editor.updateBlock(block, {
        props: {
          latex,
          mode,
          collapsed: false,
          numbered,
          label
        }
      });
    }, 300);
    return () => {
      if (debounceRef.current) {
        clearTimeout(debounceRef.current);
      }
    };
  }, [latex, mode, numbered, label, editor, block]);
  reactExports.useEffect(() => {
    if (!latex && textareaRef.current && isEditing) {
      textareaRef.current.focus();
    }
  }, []);
  const handleLatexChange = (e) => {
    const newValue = e.target.value;
    setLatex(newValue);
    const textarea = e.target;
    const cursorPos = textarea.selectionStart;
    const textBeforeCursor = newValue.slice(0, cursorPos);
    const match = textBeforeCursor.match(/\\([a-zA-Z]*)$/);
    if (match) {
      const prefix = match[1];
      setCurrentPrefix(`\\${prefix}`);
      const filtered = latexCommands.filter(
        (cmd) => cmd.command.toLowerCase().startsWith(`\\${prefix.toLowerCase()}`)
      ).slice(0, 8);
      if (filtered.length > 0) {
        setAutocompleteSuggestions(filtered);
        setAutocompleteIndex(0);
        const rect = textarea.getBoundingClientRect();
        const style = window.getComputedStyle(textarea);
        const lineHeight = parseInt(style.lineHeight) || 20;
        const textMetrics = textBeforeCursor.split("\n");
        const currentLine = textMetrics.length - 1;
        const currentCol = textMetrics[textMetrics.length - 1].length;
        setAutocompletePosition({
          top: rect.top + (currentLine + 1) * lineHeight + 5,
          left: rect.left + currentCol * 8
          // Rough character width
        });
        setShowAutocomplete(true);
      } else {
        setShowAutocomplete(false);
      }
    } else {
      setShowAutocomplete(false);
    }
  };
  const handleKeyDown = (e) => {
    if (showAutocomplete) {
      switch (e.key) {
        case "ArrowDown":
          e.preventDefault();
          setAutocompleteIndex(
            (prev) => prev < autocompleteSuggestions.length - 1 ? prev + 1 : 0
          );
          break;
        case "ArrowUp":
          e.preventDefault();
          setAutocompleteIndex(
            (prev) => prev > 0 ? prev - 1 : autocompleteSuggestions.length - 1
          );
          break;
        case "Enter":
        case "Tab":
          e.preventDefault();
          if (autocompleteSuggestions[autocompleteIndex]) {
            handleAutocompleteSelect(autocompleteSuggestions[autocompleteIndex].command);
          }
          break;
        case "Escape":
          e.preventDefault();
          setShowAutocomplete(false);
          break;
      }
    }
  };
  const handleAutocompleteSelect = (command) => {
    if (!textareaRef.current) return;
    const textarea = textareaRef.current;
    const cursorPos = textarea.selectionStart;
    const textBefore = latex.slice(0, cursorPos);
    const textAfter = latex.slice(cursorPos);
    const prefixStart = textBefore.lastIndexOf(currentPrefix);
    const newTextBefore = textBefore.slice(0, prefixStart);
    const newLatex = newTextBefore + command + textAfter;
    setLatex(newLatex);
    setShowAutocomplete(false);
    setTimeout(() => {
      if (textareaRef.current) {
        const newCursorPos = prefixStart + command.length;
        const bracePos = command.indexOf("{}");
        if (bracePos !== -1) {
          textareaRef.current.selectionStart = prefixStart + bracePos + 1;
          textareaRef.current.selectionEnd = prefixStart + bracePos + 1;
        } else {
          textareaRef.current.selectionStart = newCursorPos;
          textareaRef.current.selectionEnd = newCursorPos;
        }
        textareaRef.current.focus();
      }
    }, 0);
  };
  const handleClick = (e) => {
    e.stopPropagation();
    if (!isEditing) {
      setIsEditing(true);
      setTimeout(() => textareaRef.current?.focus(), 50);
    }
  };
  const insertAtCursor = (text) => {
    if (!textareaRef.current) return;
    const textarea = textareaRef.current;
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const newLatex = latex.slice(0, start) + text + latex.slice(end);
    setLatex(newLatex);
    setTimeout(() => {
      if (textareaRef.current) {
        const cursorOffset = text.includes("{}") ? text.indexOf("{}") + 1 : text.length;
        textareaRef.current.selectionStart = start + cursorOffset;
        textareaRef.current.selectionEnd = start + cursorOffset;
        textareaRef.current.focus();
      }
    }, 0);
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: `my-2 border border-border rounded-lg bg-background hover:border-primary/50 transition-colors ${mode === "block" ? "mx-auto max-w-fit" : ""}`,
      onClick: handleClick,
      role: "math",
      "aria-label": `Math equation: ${latex || "empty"}`,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between px-3 py-2 border-b bg-muted/30", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Sigma, { className: "h-4 w-4 text-primary" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-medium text-muted-foreground", children: mode === "block" ? "Block Equation" : "Inline Equation" }),
            numbered && mode === "block" && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs text-muted-foreground", children: [
              "(",
              label || dynamicEquationNumber,
              ")"
            ] })
          ] }),
          mode === "block" && /* @__PURE__ */ jsxRuntimeExports.jsxs(Popover, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(PopoverTrigger, { asChild: true, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "ghost", size: "icon", className: "h-6 w-6", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Settings, { className: "h-3 w-3" }) }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(PopoverContent, { className: "w-64 p-3", align: "end", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm font-medium", children: "Equation Settings" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center space-x-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Switch,
                  {
                    id: "numbered",
                    checked: numbered,
                    onCheckedChange: setNumbered
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "numbered", className: "text-sm", children: "Number equation" })
              ] }),
              numbered && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "label", className: "text-sm", children: "Label (optional)" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "input",
                  {
                    id: "label",
                    type: "text",
                    value: label,
                    onChange: (e) => setLabel(e.target.value),
                    placeholder: `Equation ${dynamicEquationNumber}`,
                    className: "w-full px-2 py-1 text-sm border rounded"
                  }
                )
              ] })
            ] }) })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-3", children: isEditing ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-1 pb-2 border-b", children: quickSymbols.map((sym, idx) => /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              variant: "outline",
              size: "sm",
              className: "h-7 w-7 p-0 text-sm",
              onClick: (e) => {
                e.stopPropagation();
                insertAtCursor(sym.latex);
              },
              title: sym.title,
              children: sym.label
            },
            idx
          )) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Textarea,
              {
                ref: textareaRef,
                value: latex,
                onChange: handleLatexChange,
                onKeyDown: handleKeyDown,
                onClick: (e) => {
                  e.stopPropagation();
                  setShowAutocomplete(false);
                },
                placeholder: "Enter LaTeX equation (e.g., x^2 + 2x + 1)\nType \\ for autocomplete suggestions",
                className: `font-mono text-sm resize-none ${isExpanded ? "flex-1 min-h-[200px]" : "min-h-[60px]"}`,
                autoFocus: true
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              AutocompleteDropdown,
              {
                isVisible: showAutocomplete,
                suggestions: autocompleteSuggestions,
                selectedIndex: autocompleteIndex,
                onSelect: handleAutocompleteSelect,
                position: autocompletePosition
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "border rounded-lg p-3 bg-muted/30", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-muted-foreground mb-2", children: "Live Preview" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `min-h-[40px] flex items-center ${mode === "block" ? "justify-center" : ""}`, children: error ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-destructive text-center w-full", children: error }) : renderedHtml ? /* @__PURE__ */ jsxRuntimeExports.jsx(
              "div",
              {
                dangerouslySetInnerHTML: { __html: renderedHtml },
                className: "select-text w-full text-center"
              }
            ) : /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground italic text-sm w-full text-center", children: "Start typing to see preview..." }) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex justify-end", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              size: "sm",
              onClick: (e) => {
                e.stopPropagation();
                setIsEditing(false);
              },
              children: "Done"
            }
          ) })
        ] }) : (
          /* Rendered View */
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `py-4 cursor-pointer ${mode === "block" ? "text-center" : "inline-block"}`, children: renderedHtml ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-center gap-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "div",
              {
                dangerouslySetInnerHTML: { __html: renderedHtml },
                className: "select-text"
              }
            ),
            numbered && mode === "block" && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-sm text-muted-foreground font-medium", children: [
              "(",
              label || dynamicEquationNumber,
              ")"
            ] })
          ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-muted-foreground italic text-sm text-center", children: "Click to enter equation" }) })
        ) })
      ]
    }
  );
}
function InlineMathComponent({ inlineContent, updateInlineContent }) {
  const [isEditing, setIsEditing] = reactExports.useState(!inlineContent.props.latex);
  const [latex, setLatex] = reactExports.useState(inlineContent.props.latex || "");
  const inputRef = reactExports.useRef(null);
  const [showAutocomplete, setShowAutocomplete] = reactExports.useState(false);
  const [autocompleteSuggestions, setAutocompleteSuggestions] = reactExports.useState([]);
  const [autocompleteIndex, setAutocompleteIndex] = reactExports.useState(0);
  const [autocompletePosition, setAutocompletePosition] = reactExports.useState({ top: 0, left: 0 });
  const [currentPrefix, setCurrentPrefix] = reactExports.useState("");
  reactExports.useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isEditing]);
  const handleSave = () => {
    updateInlineContent({ props: { latex } });
    setIsEditing(false);
    setShowAutocomplete(false);
  };
  const handleInputChange = (e) => {
    const newValue = e.target.value;
    setLatex(newValue);
    const input = e.target;
    const cursorPos = input.selectionStart || 0;
    const textBeforeCursor = newValue.slice(0, cursorPos);
    const match = textBeforeCursor.match(/\\([a-zA-Z]*)$/);
    if (match) {
      const prefix = match[1];
      setCurrentPrefix(`\\${prefix}`);
      const filtered = latexCommands.filter(
        (cmd) => cmd.command.toLowerCase().startsWith(`\\${prefix.toLowerCase()}`)
      ).slice(0, 6);
      if (filtered.length > 0) {
        setAutocompleteSuggestions(filtered);
        setAutocompleteIndex(0);
        const rect = input.getBoundingClientRect();
        setAutocompletePosition({
          top: rect.bottom + 5,
          left: rect.left
        });
        setShowAutocomplete(true);
      } else {
        setShowAutocomplete(false);
      }
    } else {
      setShowAutocomplete(false);
    }
  };
  const handleKeyDown = (e) => {
    if (showAutocomplete) {
      switch (e.key) {
        case "ArrowDown":
          e.preventDefault();
          setAutocompleteIndex(
            (prev) => prev < autocompleteSuggestions.length - 1 ? prev + 1 : 0
          );
          break;
        case "ArrowUp":
          e.preventDefault();
          setAutocompleteIndex(
            (prev) => prev > 0 ? prev - 1 : autocompleteSuggestions.length - 1
          );
          break;
        case "Enter":
        case "Tab":
          e.preventDefault();
          if (autocompleteSuggestions[autocompleteIndex]) {
            handleAutocompleteSelect(autocompleteSuggestions[autocompleteIndex].command);
          }
          break;
        case "Escape":
          e.preventDefault();
          setShowAutocomplete(false);
          break;
      }
      return;
    }
    if (e.key === "Enter") {
      e.preventDefault();
      handleSave();
    }
    if (e.key === "Escape") {
      setLatex(inlineContent.props.latex || "");
      setIsEditing(false);
    }
  };
  const handleAutocompleteSelect = (command) => {
    if (!inputRef.current) return;
    const input = inputRef.current;
    const cursorPos = input.selectionStart || 0;
    const textBefore = latex.slice(0, cursorPos);
    const textAfter = latex.slice(cursorPos);
    const prefixStart = textBefore.lastIndexOf(currentPrefix);
    const newTextBefore = textBefore.slice(0, prefixStart);
    const newLatex = newTextBefore + command + textAfter;
    setLatex(newLatex);
    setShowAutocomplete(false);
    setTimeout(() => {
      if (inputRef.current) {
        const newCursorPos = prefixStart + command.length;
        const bracePos = command.indexOf("{}");
        if (bracePos !== -1) {
          inputRef.current.selectionStart = prefixStart + bracePos + 1;
          inputRef.current.selectionEnd = prefixStart + bracePos + 1;
        } else {
          inputRef.current.selectionStart = newCursorPos;
          inputRef.current.selectionEnd = newCursorPos;
        }
        inputRef.current.focus();
      }
    }, 0);
  };
  if (isEditing) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-math-editor relative", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "input",
        {
          ref: inputRef,
          value: latex,
          onChange: handleInputChange,
          onBlur: handleSave,
          onKeyDown: handleKeyDown,
          placeholder: "LaTeX",
          className: "border border-primary/50 rounded px-1 py-0.5 font-mono text-sm bg-background min-w-[60px] focus:outline-none focus:ring-1 focus:ring-primary",
          autoFocus: true
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        AutocompleteDropdown,
        {
          isVisible: showAutocomplete,
          suggestions: autocompleteSuggestions,
          selectedIndex: autocompleteIndex,
          onSelect: handleAutocompleteSelect,
          position: autocompletePosition
        }
      )
    ] });
  }
  if (!latex || latex.trim() === "") {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      "span",
      {
        className: "inline-math-placeholder cursor-pointer text-muted-foreground italic text-sm border border-dashed border-muted-foreground/30 rounded px-1 py-0.5",
        onClick: () => setIsEditing(true),
        children: "[equation]"
      }
    );
  }
  try {
    const html = katex.renderToString(latex, {
      displayMode: false,
      throwOnError: false,
      strict: false
    });
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      "span",
      {
        className: "inline-math-rendered cursor-pointer hover:bg-muted/50 rounded px-0.5",
        onClick: () => setIsEditing(true),
        dangerouslySetInnerHTML: { __html: html },
        title: `Click to edit: ${latex}`
      }
    );
  } catch (error) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      "span",
      {
        className: "inline-math-error cursor-pointer text-destructive bg-destructive/10 rounded px-1 py-0.5 text-sm",
        onClick: () => setIsEditing(true),
        title: `Math error: ${error instanceof Error ? error.message : "Invalid LaTeX"}`,
        children: "[Math Error]"
      }
    );
  }
}

const inlineMathBlockSpec = be(
  {
    type: "inlineMath",
    propSchema: {
      latex: {
        default: ""
      },
      mode: {
        default: "inline"
      },
      collapsed: {
        default: false
      }
    },
    content: "none"
  },
  {
    render: (props) => {
      return /* @__PURE__ */ jsxRuntimeExports.jsx(MathBlock, { block: props.block, editor: props.editor });
    }
  }
);
const blockMathBlockSpec = be(
  {
    type: "blockMath",
    propSchema: {
      latex: {
        default: ""
      },
      mode: {
        default: "block"
      },
      collapsed: {
        default: false
      }
    },
    content: "none"
  },
  {
    render: (props) => {
      return /* @__PURE__ */ jsxRuntimeExports.jsx(MathBlock, { block: props.block, editor: props.editor });
    }
  }
);
const inlineMathInlineSpec = Ul(
  {
    type: "inlineMathInline",
    propSchema: {
      latex: {
        default: ""
      }
    },
    content: "none"
  },
  {
    render: (props) => {
      return /* @__PURE__ */ jsxRuntimeExports.jsx(InlineMathComponent, { ...props });
    }
  }
);

function useAIAutocomplete(options = {}) {
  const {
    debounceMs = 1e3,
    minChars = 10,
    maxSuggestionLength = 100,
    enabled = true
  } = options;
  const [suggestion, setSuggestion] = reactExports.useState("");
  const [isLoading, setIsLoading] = reactExports.useState(false);
  const debounceTimerRef = reactExports.useRef();
  const abortControllerRef = reactExports.useRef();
  const lastTextRef = reactExports.useRef("");
  const generateSuggestion = reactExports.useCallback(async (text, context) => {
    if (!enabled || text.length < minChars) {
      setSuggestion("");
      return;
    }
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
    abortControllerRef.current = new AbortController();
    try {
      setIsLoading(true);
      const { data, error } = await supabase.functions.invoke("ai-autocomplete", {
        body: {
          text,
          context,
          maxLength: maxSuggestionLength
        },
        signal: abortControllerRef.current.signal
      });
      if (error) {
        console.error("Autocomplete error:", error);
        setSuggestion("");
        return;
      }
      if (data?.suggestion) {
        setSuggestion(data.suggestion);
      } else {
        setSuggestion("");
      }
    } catch (err) {
      if (err.name !== "AbortError") {
        console.error("Autocomplete error:", err);
      }
      setSuggestion("");
    } finally {
      setIsLoading(false);
    }
  }, [enabled, minChars, maxSuggestionLength]);
  const requestSuggestion = reactExports.useCallback((text, context) => {
    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current);
    }
    if (text === lastTextRef.current || lastTextRef.current === "__ACCEPTED__") {
      if (lastTextRef.current === "__ACCEPTED__") {
        lastTextRef.current = text;
      }
      return;
    }
    lastTextRef.current = text;
    debounceTimerRef.current = setTimeout(() => {
      generateSuggestion(text, context);
    }, debounceMs);
  }, [generateSuggestion, debounceMs]);
  const acceptSuggestion = reactExports.useCallback(() => {
    const accepted = suggestion;
    setSuggestion("");
    lastTextRef.current = "__ACCEPTED__";
    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current);
    }
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
    const latexPatterns = [
      /\\frac\{[^}]*\}\{[^}]*\}/,
      // fractions
      /\\sqrt\{[^}]*\}/,
      // square roots
      /\^{[^}]*}/,
      // superscripts
      /_{[^}]*}/,
      // subscripts
      /\\[a-zA-Z]+/,
      // LaTeX commands
      /[∫∑∏√±≤≥≠≈∞πθαβγδ]/
      // math symbols
    ];
    const hasLatex = latexPatterns.some((pattern) => pattern.test(accepted));
    return {
      text: accepted,
      shouldConvertToMath: hasLatex
    };
  }, [suggestion]);
  const clearSuggestion = reactExports.useCallback(() => {
    setSuggestion("");
    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current);
    }
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
  }, []);
  reactExports.useEffect(() => {
    return () => {
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current);
      }
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, []);
  return {
    suggestion,
    isLoading,
    requestSuggestion,
    acceptSuggestion,
    clearSuggestion
  };
}

function useInlineGhostText({
  editor,
  suggestion,
  enabled = true,
  onAccept,
  onClear
}) {
  const ghostTextRef = reactExports.useRef(null);
  const lastSuggestionRef = reactExports.useRef("");
  const updateGhostText = reactExports.useCallback(() => {
    if (!editor || !enabled) {
      removeGhostText();
      return;
    }
    if (!suggestion) {
      removeGhostText();
      return;
    }
    const selection = window.getSelection();
    if (!selection || selection.rangeCount === 0) {
      removeGhostText();
      return;
    }
    const range = selection.getRangeAt(0);
    if (!range.collapsed) {
      removeGhostText();
      return;
    }
    const editorContainer = document.querySelector(".bn-container");
    if (!editorContainer || !editorContainer.contains(range.startContainer)) {
      removeGhostText();
      return;
    }
    removeGhostText();
    const ghostSpan = document.createElement("span");
    ghostSpan.className = "inline-ghost-text";
    ghostSpan.textContent = suggestion;
    ghostSpan.setAttribute("data-ghost-text", "true");
    ghostSpan.setAttribute("contenteditable", "false");
    ghostSpan.style.cssText = `
      color: var(--muted-foreground, #888);
      opacity: 0.5;
      pointer-events: none;
      user-select: none;
      font-style: normal;
    `;
    try {
      range.insertNode(ghostSpan);
      ghostTextRef.current = ghostSpan;
      lastSuggestionRef.current = suggestion;
      range.setStartBefore(ghostSpan);
      range.collapse(true);
      selection.removeAllRanges();
      selection.addRange(range);
    } catch (error) {
      console.error("Failed to insert ghost text:", error);
      ghostSpan.remove();
    }
  }, [editor, suggestion, enabled]);
  const removeGhostText = reactExports.useCallback(() => {
    if (ghostTextRef.current) {
      ghostTextRef.current.remove();
      ghostTextRef.current = null;
    }
    document.querySelectorAll('[data-ghost-text="true"]').forEach((el) => el.remove());
  }, []);
  const acceptSuggestion = reactExports.useCallback(() => {
    if (!suggestion || !editor) return false;
    removeGhostText();
    try {
      editor.insertInlineContent([
        { type: "text", text: suggestion, styles: {} }
      ]);
      onAccept?.();
      onClear?.();
      lastSuggestionRef.current = "";
      return true;
    } catch (error) {
      console.error("Failed to accept suggestion:", error);
      return false;
    }
  }, [editor, suggestion, removeGhostText, onAccept, onClear]);
  reactExports.useEffect(() => {
    if (!enabled) return;
    const handleKeyDown = (e) => {
      const activeElement = document.activeElement;
      const editorContainer = document.querySelector(".bn-container");
      if (e.key === "Tab" && !e.shiftKey) {
        if (editorContainer && editorContainer.contains(activeElement) && suggestion) {
          e.preventDefault();
          e.stopPropagation();
          e.stopImmediatePropagation();
          acceptSuggestion();
          return false;
        }
        return;
      }
      if (!editorContainer || !editorContainer.contains(activeElement)) {
        return;
      }
      if (e.key === "Escape" && suggestion) {
        e.preventDefault();
        e.stopPropagation();
        removeGhostText();
        onClear?.();
        return;
      }
      if (!e.ctrlKey && !e.metaKey && !e.altKey && e.key.length === 1) {
        removeGhostText();
        onClear?.();
      }
    };
    document.addEventListener("keydown", handleKeyDown, true);
    return () => document.removeEventListener("keydown", handleKeyDown, true);
  }, [enabled, suggestion, acceptSuggestion, removeGhostText, onClear]);
  reactExports.useEffect(() => {
    if (suggestion !== lastSuggestionRef.current) {
      updateGhostText();
    }
  }, [suggestion, updateGhostText]);
  reactExports.useEffect(() => {
    return () => {
      removeGhostText();
    };
  }, [removeGhostText]);
  reactExports.useEffect(() => {
    if (!editor) return;
    const handleChange = () => {
      removeGhostText();
    };
    editor.onChange?.(handleChange);
  }, [editor, removeGhostText]);
  return {
    acceptSuggestion,
    removeGhostText,
    hasGhostText: !!ghostTextRef.current
  };
}

const COMMON_WORDS = [
  // Common misspellings and their corrections
  "the",
  "be",
  "to",
  "of",
  "and",
  "a",
  "in",
  "that",
  "have",
  "I",
  "it",
  "for",
  "not",
  "on",
  "with",
  "he",
  "as",
  "you",
  "do",
  "at",
  "this",
  "but",
  "his",
  "by",
  "from",
  "they",
  "we",
  "say",
  "her",
  "she",
  "or",
  "an",
  "will",
  "my",
  "one",
  "all",
  "would",
  "there",
  "their",
  "what",
  "so",
  "up",
  "out",
  "if",
  "about",
  "who",
  "get",
  "which",
  "go",
  "me",
  "when",
  "make",
  "can",
  "like",
  "time",
  "no",
  "just",
  "him",
  "know",
  "take",
  "people",
  "into",
  "year",
  "your",
  "good",
  "some",
  "could",
  "them",
  "see",
  "other",
  "than",
  "then",
  "now",
  "look",
  "only",
  "come",
  "its",
  "over",
  "think",
  "also",
  "back",
  "after",
  "use",
  "two",
  "how",
  "our",
  "work",
  "first",
  "well",
  "way",
  "even",
  "new",
  "want",
  "because",
  "any",
  "these",
  "give",
  "day",
  "most",
  "us",
  // Academic words
  "analysis",
  "analyze",
  "argument",
  "assessment",
  "assumption",
  "authority",
  "available",
  "benefit",
  "concept",
  "consistent",
  "constitutional",
  "context",
  "contract",
  "create",
  "data",
  "definition",
  "derived",
  "distribution",
  "economic",
  "environment",
  "established",
  "estimate",
  "evidence",
  "export",
  "factors",
  "financial",
  "formula",
  "function",
  "identified",
  "income",
  "indicate",
  "individual",
  "interpretation",
  "involved",
  "issues",
  "labor",
  "legal",
  "legislation",
  "major",
  "method",
  "occur",
  "percent",
  "period",
  "policy",
  "principle",
  "procedure",
  "process",
  "required",
  "research",
  "response",
  "role",
  "section",
  "sector",
  "significant",
  "similar",
  "source",
  "specific",
  "structure",
  "theory",
  "variables",
  "approach",
  "area",
  "assessment",
  "assume",
  "authority",
  "available",
  "benefit",
  "concept",
  "consistent",
  "constitutional",
  "context",
  "contract",
  "create",
  "data",
  "definition",
  "derived",
  "distribution",
  "economic",
  "environment",
  "established",
  "estimate",
  "evidence",
  // IB-specific terms
  "bibliography",
  "citation",
  "criterion",
  "criteria",
  "evaluate",
  "evaluation",
  "hypothesis",
  "methodology",
  "objective",
  "perspective",
  "qualitative",
  "quantitative",
  "reflection",
  "synthesis",
  "thesis",
  "abstract",
  "acknowledgment",
  "appendix",
  "assessment",
  "bibliography",
  "conclusion",
  "discussion",
  "experiment",
  "findings",
  "hypothesis",
  "implications",
  "introduction",
  "literature",
  "methodology",
  "objectives",
  "participants",
  "procedure",
  "recommendation",
  "references",
  "reliability",
  "results",
  "significance",
  "validity",
  "variables",
  "knowledge",
  "understanding",
  "application",
  // Common academic verbs
  "demonstrate",
  "illustrate",
  "explain",
  "describe",
  "discuss",
  "examine",
  "investigate",
  "compare",
  "contrast",
  "analyze",
  "evaluate",
  "assess",
  "justify",
  "recommend",
  "suggest",
  "propose",
  "conclude",
  "summarize",
  "synthesize",
  "interpret",
  "classify",
  "categorize",
  "identify",
  "define",
  // Science terms
  "experiment",
  "hypothesis",
  "variable",
  "control",
  "observation",
  "conclusion",
  "photosynthesis",
  "respiration",
  "mitosis",
  "meiosis",
  "chromosome",
  "protein",
  "enzyme",
  "molecule",
  "atom",
  "electron",
  "proton",
  "neutron",
  "nucleus",
  "membrane",
  "organelle",
  "ecosystem",
  "biodiversity",
  "evolution",
  "adaptation",
  "genetics",
  "mutation",
  "inheritance",
  "allele",
  "genotype",
  "phenotype",
  "acceleration",
  "velocity",
  "momentum",
  "force",
  "energy",
  "kinetic",
  "potential",
  "thermodynamics",
  "electromagnetic",
  "wavelength",
  "frequency",
  "amplitude",
  "equilibrium",
  "oxidation",
  "reduction",
  "concentration",
  "solution",
  "compound",
  // Math terms
  "equation",
  "function",
  "derivative",
  "integral",
  "polynomial",
  "coefficient",
  "variable",
  "constant",
  "parameter",
  "asymptote",
  "logarithm",
  "exponential",
  "trigonometry",
  "geometry",
  "algebra",
  "calculus",
  "statistics",
  "probability",
  "distribution",
  "correlation",
  "regression",
  "hypothesis",
  "deviation",
  "variance",
  // Humanities terms
  "perspective",
  "context",
  "interpretation",
  "significance",
  "implication",
  "consequence",
  "influence",
  "development",
  "transformation",
  "revolution",
  "ideology",
  "philosophy",
  "democracy",
  "capitalism",
  "socialism",
  "nationalism",
  "imperialism",
  "colonialism",
  "globalization",
  "industrialization",
  "urbanization",
  "migration",
  "population",
  "resources",
  "sustainability",
  "environment",
  // Connectors and transitions
  "however",
  "therefore",
  "furthermore",
  "moreover",
  "nevertheless",
  "consequently",
  "although",
  "whereas",
  "meanwhile",
  "subsequently",
  "accordingly",
  "similarly",
  "alternatively",
  "specifically",
  "particularly",
  "especially",
  "essentially",
  "ultimately",
  "initially",
  "finally",
  "additionally",
  "correspondingly",
  // Common longer words often misspelled
  "accommodate",
  "achievement",
  "acknowledgment",
  "acquaintance",
  "acquisition",
  "advertisement",
  "anniversary",
  "apparent",
  "appearance",
  "appreciate",
  "appropriate",
  "approximately",
  "argument",
  "arrangement",
  "assessment",
  "assistance",
  "association",
  "assumption",
  "atmosphere",
  "attendance",
  "beautiful",
  "beginning",
  "beneficial",
  "bureaucracy",
  "calendar",
  "category",
  "cemetery",
  "characteristic",
  "circumstances",
  "colleagues",
  "commitment",
  "committee",
  "communicate",
  "community",
  "comparison",
  "competitive",
  "completely",
  "concentration",
  "conclusion",
  "confidence",
  "congratulations",
  "conscience",
  "conscious",
  "consequence",
  "considerable",
  "consistent",
  "contemporary",
  "continuous",
  "contribution",
  "convenience",
  "cooperation",
  "correspondence",
  "criticism",
  "curiosity",
  "definitely",
  "democracy",
  "demonstrate",
  "description",
  "desperation",
  "determination",
  "development",
  "difference",
  "difficulty",
  "disappear",
  "disappoint",
  "discipline",
  "discrimination",
  "discussion",
  "distinction",
  "distribution",
  "documentary",
  "embarrass",
  "emergence",
  "emphasize",
  "employment",
  "encourage",
  "engineering",
  "enthusiasm",
  "environment",
  "equipment",
  "especially",
  "essentially",
  "establishment",
  "evaluation",
  "eventually",
  "exaggerate",
  "examination",
  "excellence",
  "exception",
  "excitement",
  "executive",
  "existence",
  "expectation",
  "experience",
  "experiment",
  "explanation",
  "expression",
  "extraordinary",
  "extremely",
  "fascinating",
  "February",
  "flexibility",
  "fluctuation",
  "foreign",
  "fortunately",
  "foundation",
  "frequently",
  "fulfillment",
  "fundamental",
  "furthermore",
  "generalization",
  "government",
  "gradually",
  "guarantee",
  "guidance",
  "harassment",
  "height",
  "hierarchy",
  "humorous",
  "hypothesis",
  "identification",
  "immediately",
  "implementation",
  "implication",
  "importance",
  "improvement",
  "incidentally",
  "independence",
  "independent",
  "indication",
  "individual",
  "inevitable",
  "influence",
  "information",
  "infrastructure",
  "initiative",
  "innovation",
  "institution",
  "intelligence",
  "intention",
  "interesting",
  "interference",
  "international",
  "interpretation",
  "intervention",
  "introduction",
  "investigation",
  "involvement",
  "irrelevant",
  "justification",
  "knowledge",
  "laboratory",
  "legislation",
  "legitimate",
  "maintenance",
  "management",
  "manufacture",
  "mathematics",
  "measurement",
  "Mediterranean",
  "millennium",
  "miscellaneous",
  "mischievous",
  "misunderstanding",
  "modification",
  "naturally",
  "necessary",
  "negotiation",
  "neighborhood",
  "nevertheless",
  "noticeable",
  "obligation",
  "observation",
  "occasionally",
  "occurrence",
  "opportunity",
  "opposition",
  "organization",
  "originally",
  "overwhelmed",
  "parallel",
  "parliament",
  "participation",
  "particularly",
  "perception",
  "performance",
  "permanent",
  "permission",
  "persistence",
  "personality",
  "perspective",
  "persuasion",
  "phenomenon",
  "philosophy",
  "photograph",
  "politician",
  "popularity",
  "possibility",
  "practically",
  "predecessor",
  "preference",
  "preparation",
  "presentation",
  "preservation",
  "presumably",
  "prevailing",
  "previously",
  "primarily",
  "privilege",
  "probability",
  "problematic",
  "procedure",
  "professional",
  "proficiency",
  "progression",
  "pronunciation",
  "propaganda",
  "proportion",
  "proposition",
  "prospective",
  "psychological",
  "publication",
  "punctuation",
  "qualification",
  "questionnaire",
  "realization",
  "reasonable",
  "recollection",
  "recommendation",
  "reconciliation",
  "reconstruction",
  "refrigerator",
  "registration",
  "regulation",
  "reinforcement",
  "relationship",
  "reliability",
  "remarkable",
  "remembrance",
  "reminiscent",
  "renaissance",
  "repetition",
  "replacement",
  "representation",
  "reproduction",
  "requirement",
  "resemblance",
  "reservation",
  "resignation",
  "resistance",
  "resolution",
  "resourceful",
  "responsibility",
  "restaurant",
  "restriction",
  "revolutionary",
  "ridiculous",
  "significance",
  "simultaneous",
  "sophisticated",
  "specifically",
  "speculation",
  "spontaneous",
  "statistics",
  "straightforward",
  "strengthening",
  "subsequently",
  "substantially",
  "successful",
  "sufficient",
  "suggestion",
  "superintendent",
  "supplement",
  "surveillance",
  "susceptible",
  "sustainability",
  "symmetrical",
  "sympathetic",
  "sympathy",
  "synonymous",
  "systematic",
  "technician",
  "technology",
  "temperature",
  "temporarily",
  "theoretical",
  "thorough",
  "thoughtful",
  "throughout",
  "traditionally",
  "transaction",
  "transformation",
  "transmission",
  "transportation",
  "tremendous",
  "ultimately",
  "unanimous",
  "uncertainty",
  "undergraduate",
  "understanding",
  "unemployment",
  "unfortunately",
  "unnecessary",
  "unprecedented",
  "until",
  "utilization",
  "vaccination",
  "verification",
  "versatility",
  "visualization",
  "vulnerability",
  "Wednesday",
  "whatever",
  "whereabouts",
  "whether",
  "willingness",
  "withdrawal",
  "worthwhile",
  "yesterday"
];
function useAutocorrect(options = {}) {
  const {
    enabled = true,
    threshold = 0.4,
    maxSuggestions = 5,
    minWordLength = 3,
    customDictionary = []
  } = options;
  const [state, setState] = reactExports.useState({
    isOpen: false,
    suggestions: [],
    selectedIndex: 0,
    currentWord: "",
    position: null
  });
  const fuse = reactExports.useMemo(() => {
    const allWords = [.../* @__PURE__ */ new Set([...COMMON_WORDS, ...customDictionary])];
    return new Fuse(allWords, {
      threshold,
      includeScore: true,
      minMatchCharLength: 2,
      distance: 100
    });
  }, [threshold, customDictionary]);
  const isValidWord = reactExports.useCallback((word) => {
    const lowerWord = word.toLowerCase();
    return COMMON_WORDS.includes(lowerWord) || customDictionary.includes(lowerWord);
  }, [customDictionary]);
  const getSuggestions = reactExports.useCallback((word) => {
    if (!enabled || word.length < minWordLength) {
      return [];
    }
    if (isValidWord(word)) {
      return [];
    }
    const results = fuse.search(word.toLowerCase());
    return results.slice(0, maxSuggestions).map((result) => ({
      word: result.item,
      score: 1 - (result.score || 0)
      // Convert to confidence score (0-1)
    }));
  }, [enabled, minWordLength, maxSuggestions, fuse, isValidWord]);
  const showSuggestions = reactExports.useCallback((word, position) => {
    if (!enabled) return;
    const suggestions = getSuggestions(word);
    if (suggestions.length > 0) {
      setState({
        isOpen: true,
        suggestions,
        selectedIndex: 0,
        currentWord: word,
        position
      });
    } else {
      closeSuggestions();
    }
  }, [enabled, getSuggestions]);
  const closeSuggestions = reactExports.useCallback(() => {
    setState((prev) => ({
      ...prev,
      isOpen: false,
      suggestions: [],
      currentWord: "",
      position: null
    }));
  }, []);
  const selectNext = reactExports.useCallback(() => {
    setState((prev) => ({
      ...prev,
      selectedIndex: (prev.selectedIndex + 1) % prev.suggestions.length
    }));
  }, []);
  const selectPrevious = reactExports.useCallback(() => {
    setState((prev) => ({
      ...prev,
      selectedIndex: prev.selectedIndex === 0 ? prev.suggestions.length - 1 : prev.selectedIndex - 1
    }));
  }, []);
  const getSelectedSuggestion = reactExports.useCallback(() => {
    if (!state.isOpen || state.suggestions.length === 0) {
      return null;
    }
    return state.suggestions[state.selectedIndex]?.word || null;
  }, [state]);
  const acceptSuggestion = reactExports.useCallback((index) => {
    const suggestionIndex = index ?? state.selectedIndex;
    const suggestion = state.suggestions[suggestionIndex];
    if (!suggestion) {
      return null;
    }
    const result = suggestion.word;
    closeSuggestions();
    return result;
  }, [state, closeSuggestions]);
  const setSelectedIndex = reactExports.useCallback((index) => {
    if (index >= 0 && index < state.suggestions.length) {
      setState((prev) => ({ ...prev, selectedIndex: index }));
    }
  }, [state.suggestions.length]);
  return {
    // State
    isOpen: state.isOpen,
    suggestions: state.suggestions,
    selectedIndex: state.selectedIndex,
    currentWord: state.currentWord,
    position: state.position,
    // Actions
    showSuggestions,
    closeSuggestions,
    selectNext,
    selectPrevious,
    acceptSuggestion,
    setSelectedIndex,
    getSelectedSuggestion,
    // Utilities
    getSuggestions,
    isValidWord
  };
}

function AutocorrectDropdown({
  isOpen,
  suggestions,
  selectedIndex,
  position,
  currentWord,
  onSelect,
  onClose,
  onNavigate
}) {
  const menuRef = reactExports.useRef(null);
  reactExports.useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e) => {
      if (e.key === "ArrowDown") {
        e.preventDefault();
        onNavigate("down");
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        onNavigate("up");
      } else if (e.key === "Enter" || e.key === "Tab") {
        e.preventDefault();
        if (suggestions[selectedIndex]) {
          onSelect(suggestions[selectedIndex].word);
        }
      } else if (e.key === "Escape") {
        e.preventDefault();
        onClose();
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, selectedIndex, suggestions, onSelect, onClose, onNavigate]);
  reactExports.useEffect(() => {
    if (menuRef.current && isOpen) {
      const selectedElement = menuRef.current.children[selectedIndex + 1];
      if (selectedElement) {
        selectedElement.scrollIntoView({ block: "nearest" });
      }
    }
  }, [selectedIndex, isOpen]);
  if (!isOpen || !position || suggestions.length === 0) {
    return null;
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      className: "fixed z-[9999]",
      style: {
        top: `${position.top}px`,
        left: `${position.left}px`
      },
      children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "ul",
        {
          ref: menuRef,
          role: "listbox",
          className: cn(
            "min-w-[180px] max-w-[280px] bg-popover border border-border rounded-lg shadow-lg",
            "overflow-hidden animate-in fade-in-0 zoom-in-95 slide-in-from-top-2",
            "duration-150"
          ),
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "px-3 py-2 text-xs font-medium text-muted-foreground border-b border-border flex items-center gap-2 bg-muted/50", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(SpellCheck, { className: "h-3 w-3" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
                'Suggestions for "',
                currentWord,
                '"'
              ] })
            ] }),
            suggestions.map((suggestion, index) => {
              const isHighlighted = index === selectedIndex;
              const confidence = Math.round(suggestion.score * 100);
              return /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "li",
                {
                  role: "option",
                  "aria-selected": isHighlighted,
                  className: cn(
                    "px-3 py-2 cursor-pointer flex items-center justify-between gap-2",
                    "transition-colors duration-75",
                    isHighlighted ? "bg-accent text-accent-foreground" : "hover:bg-accent/50"
                  ),
                  onClick: () => onSelect(suggestion.word),
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium", children: suggestion.word }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: cn(
                      "text-xs px-1.5 py-0.5 rounded",
                      confidence >= 80 ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400" : confidence >= 60 ? "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400" : "bg-muted text-muted-foreground"
                    ), children: [
                      confidence,
                      "%"
                    ] })
                  ]
                },
                suggestion.word
              );
            }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "px-3 py-1.5 text-[10px] text-muted-foreground border-t border-border bg-muted/30 flex items-center gap-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "↑↓ navigate" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Tab/Enter select" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Esc dismiss" })
            ] })
          ]
        }
      )
    }
  );
}

const pageBreakBlockSpec = v(
  {
    type: "pageBreak",
    propSchema: {},
    content: "none"
  },
  {
    render: () => {
      const container = document.createElement("div");
      container.className = "page-break-visual";
      container.contentEditable = "false";
      container.setAttribute("data-content-type", "pageBreak");
      const endPage = document.createElement("div");
      endPage.className = "page-end-marker";
      const voidGap = document.createElement("div");
      voidGap.className = "page-void-gap";
      const label = document.createElement("span");
      label.textContent = "Page Break — Experimental Feature";
      label.className = "page-break-label";
      voidGap.appendChild(label);
      const startPage = document.createElement("div");
      startPage.className = "page-start-marker";
      container.appendChild(endPage);
      container.appendChild(voidGap);
      container.appendChild(startPage);
      return { dom: container };
    }
  }
);
function htmlToBlocks(html) {
  if (!html || html.trim() === "") {
    return [{ type: "paragraph", content: [] }];
  }
  const parser = new DOMParser();
  const doc = parser.parseFromString(html, "text/html");
  const blocks = [];
  const processNode = (node) => {
    if (node.nodeType === Node.TEXT_NODE) {
      const text = node.textContent?.trim();
      if (text) {
        return {
          type: "paragraph",
          content: [{ type: "text", text, styles: {} }]
        };
      }
      return null;
    }
    if (node.nodeType === Node.ELEMENT_NODE) {
      const element = node;
      const tagName = element.tagName.toLowerCase();
      if (tagName === "h1") {
        return {
          type: "heading",
          props: { level: 1 },
          content: [{ type: "text", text: element.textContent || "", styles: {} }]
        };
      } else if (tagName === "h2") {
        return {
          type: "heading",
          props: { level: 2 },
          content: [{ type: "text", text: element.textContent || "", styles: {} }]
        };
      } else if (tagName === "h3") {
        return {
          type: "heading",
          props: { level: 3 },
          content: [{ type: "text", text: element.textContent || "", styles: {} }]
        };
      } else if (tagName === "p") {
        const content = [];
        const text = element.textContent || "";
        if (text.trim()) {
          content.push({ type: "text", text, styles: {} });
        }
        return {
          type: "paragraph",
          content
        };
      } else if (tagName === "blockquote") {
        const content = [];
        const text = element.textContent || "";
        if (text.trim()) {
          content.push({ type: "text", text, styles: {} });
        }
        return {
          type: "quote",
          content
        };
      } else if (tagName === "img") {
        return {
          type: "image",
          props: {
            url: element.getAttribute("src") || "",
            caption: element.getAttribute("alt") || ""
          }
        };
      }
    }
    return null;
  };
  const children = doc.body.childNodes;
  for (let i = 0; i < children.length; i++) {
    const block = processNode(children[i]);
    if (block) {
      blocks.push(block);
    }
  }
  return blocks.length > 0 ? blocks : [{ type: "paragraph", content: [] }];
}
function blocksToHTML(blocks) {
  let html = "";
  blocks.forEach((block) => {
    if (block.type === "heading") {
      const level = block.props?.level || 1;
      html += `<h${level}>`;
      if (block.content) {
        block.content.forEach((content) => {
          html += content.text || "";
        });
      }
      html += `</h${level}>`;
    } else if (block.type === "paragraph") {
      html += "<p>";
      if (block.content) {
        block.content.forEach((content) => {
          let text = content.text || "";
          if (content.styles?.bold) text = `<strong>${text}</strong>`;
          if (content.styles?.italic) text = `<em>${text}</em>`;
          if (content.styles?.underline) text = `<u>${text}</u>`;
          if (content.styles?.strike) text = `<s>${text}</s>`;
          html += text;
        });
      }
      html += "</p>";
    } else if (block.type === "quote") {
      html += "<blockquote>";
      if (block.content) {
        block.content.forEach((content) => {
          let text = content.text || "";
          if (content.styles?.bold) text = `<strong>${text}</strong>`;
          if (content.styles?.italic) text = `<em>${text}</em>`;
          if (content.styles?.underline) text = `<u>${text}</u>`;
          if (content.styles?.strike) text = `<s>${text}</s>`;
          html += text;
        });
      }
      html += "</blockquote>";
    } else if (block.type === "bulletListItem") {
      html += "<ul><li>";
      if (block.content) {
        block.content.forEach((content) => {
          html += content.text || "";
        });
      }
      html += "</li></ul>";
    } else if (block.type === "numberedListItem") {
      html += "<ol><li>";
      if (block.content) {
        block.content.forEach((content) => {
          html += content.text || "";
        });
      }
      html += "</li></ol>";
    } else if (block.type === "image") {
      html += `<img src="${block.props?.url || ""}" alt="${block.props?.caption || ""}" />`;
    } else if (block.type === "table") {
      html += "<table>";
      html += "</table>";
    }
  });
  return html;
}
function BlockNoteEditor({
  initialContent,
  onChange,
  placeholder,
  title,
  onTitleChange,
  onEditorReady,
  onPageCountChange,
  disablePagination = false,
  onAICommandsReady,
  userContext,
  collaboration,
  onAddComment,
  onSelectionChange,
  highlightBlockId
}) {
  const [wordCount, setWordCount] = reactExports.useState(0);
  const [isAIStreaming, setIsAIStreaming] = reactExports.useState(false);
  const [isDrawingDialogOpen, setIsDrawingDialogOpen] = reactExports.useState(false);
  const [isMoleculeDialogOpen, setIsMoleculeDialogOpen] = reactExports.useState(false);
  const [pendingEditor, setPendingEditor] = reactExports.useState(null);
  const [pageCount, setPageCount] = reactExports.useState(1);
  const [pageBoundaries, setPageBoundaries] = reactExports.useState([]);
  const editorContainerRef = reactExports.useRef(null);
  const editorRef = reactExports.useRef(null);
  const [blockFeedback, setBlockFeedback] = reactExports.useState({});
  const [explainBubble, setExplainBubble] = reactExports.useState(null);
  const [isCitationModalOpen, setIsCitationModalOpen] = reactExports.useState(false);
  const [chartDialogOpen, setChartDialogOpen] = reactExports.useState(false);
  const [chartInitialData, setChartInitialData] = reactExports.useState(void 0);
  const [chartInitialTitle, setChartInitialTitle] = reactExports.useState(void 0);
  const autocompleteEnabled = localStorage.getItem("tooessay-autocomplete-enabled") !== "false";
  const {
    suggestion,
    isLoading: isAutocompleteLoading,
    requestSuggestion,
    acceptSuggestion: acceptAISuggestion,
    clearSuggestion
  } = useAIAutocomplete({
    enabled: autocompleteEnabled,
    minChars: 15,
    debounceMs: 1500
  });
  const autocorrectEnabled = localStorage.getItem("tooessay-autocorrect-enabled") !== "false";
  const {
    isOpen: isAutocorrectOpen,
    suggestions: autocorrectSuggestions,
    selectedIndex: autocorrectSelectedIndex,
    position: autocorrectPosition,
    currentWord: autocorrectCurrentWord,
    showSuggestions: showAutocorrectSuggestions,
    closeSuggestions: closeAutocorrect,
    selectNext: selectNextAutocorrect,
    selectPrevious: selectPreviousAutocorrect,
    getSuggestions: getAutocorrectSuggestions
  } = useAutocorrect({
    enabled: autocorrectEnabled,
    threshold: 0.4,
    maxSuggestions: 5,
    minWordLength: 3
  });
  const lastTypedWordRef = reactExports.useRef(null);
  const [editorReady, setEditorReady] = reactExports.useState(false);
  const handleDefineCommandFromToolbar = async (selectedText) => {
    const allBlocks = editor.document;
    const context = allBlocks.map(
      (block) => Array.isArray(block.content) ? block.content.map((c) => c.text || "").join("") : ""
    ).join("\n");
    setIsAIStreaming(true);
    await handleDefineCommand(selectedText, context, (text) => {
      editor.insertInlineContent([
        { type: "text", text: ` (${text})`, styles: { italic: true } }
      ]);
    });
    setIsAIStreaming(false);
  };
  const handleExplainCommandFromToolbar = async (selectedText) => {
    const selection = window.getSelection();
    let position = { x: window.innerWidth / 2, y: 300 };
    try {
      if (selection && selection.rangeCount > 0) {
        const range = selection.getRangeAt(0);
        const rect = range.getBoundingClientRect();
        if (rect && rect.bottom > 0) {
          position = {
            x: rect.left + rect.width / 2,
            y: rect.bottom + 20
          };
        }
      }
    } catch (e) {
      const editorContainer = document.querySelector(".bn-container");
      if (editorContainer) {
        const editorRect = editorContainer.getBoundingClientRect();
        position = {
          x: editorRect.left + editorRect.width / 2,
          y: Math.max(editorRect.top + 100, 300)
        };
      }
    }
    setExplainBubble({
      visible: true,
      text: "",
      loading: true,
      position,
      originalText: selectedText
    });
    const allBlocks = editor.document;
    const context = allBlocks.map(
      (block) => Array.isArray(block.content) ? block.content.map((c) => c.text || "").join("") : ""
    ).join("\n");
    setIsAIStreaming(true);
    let accumulatedText = "";
    await handleExplainCommand(selectedText, context, (text) => {
      accumulatedText = text;
      setExplainBubble((prev) => prev ? { ...prev, text: accumulatedText, loading: false } : null);
    });
    setIsAIStreaming(false);
  };
  const handleSynonymCommandFromToolbar = async (selectedText) => {
    const allBlocks = editor.document;
    const context = allBlocks.map(
      (block) => Array.isArray(block.content) ? block.content.map((c) => c.text || "").join("") : ""
    ).join("\n");
    setIsAIStreaming(true);
    await handleSynonymCommand(selectedText, context, (text) => {
      editor.insertInlineContent([
        { type: "text", text: ` (${text})`, styles: { italic: true } }
      ]);
    });
    setIsAIStreaming(false);
  };
  const handleRephraseCommandFromToolbar = async (selectedText) => {
    const allBlocks = editor.document;
    const context = allBlocks.map(
      (block) => Array.isArray(block.content) ? block.content.map((c) => c.text || "").join("") : ""
    ).join("\n");
    setIsAIStreaming(true);
    await handleRephraseCommand(selectedText, context, (text) => {
      editor.insertInlineContent([
        { type: "text", text: ` ${text}`, styles: { italic: true } }
      ]);
    });
    setIsAIStreaming(false);
  };
  const handleGrammarCommandFromToolbar = async (selectedText) => {
    const allBlocks = editor.document;
    const context = allBlocks.map(
      (block) => Array.isArray(block.content) ? block.content.map((c) => c.text || "").join("") : ""
    ).join("\n");
    setIsAIStreaming(true);
    await handleGrammarCommand(selectedText, context, (text) => {
      editor.insertInlineContent([
        { type: "text", text: ` ${text}`, styles: { italic: true } }
      ]);
    });
    setIsAIStreaming(false);
  };
  const initialBlocks = initialContent ? Array.isArray(initialContent) ? initialContent : htmlToBlocks(initialContent) : void 0;
  const handleBlockEvaluate = async (blockId) => {
    const block = editor?.getBlock(blockId);
    if (!block) return;
    const blockText = await editor.blocksToHTMLLossy([block]);
    const plainText = blockText.replace(/<[^>]*>/g, "").trim();
    if (!plainText || plainText.length < 10) {
      ue.error("Please write more content before requesting feedback");
      return;
    }
    setBlockFeedback((prev) => ({ ...prev, [blockId]: { feedback: "", loading: true } }));
    try {
      const { data, error } = await supabase.functions.invoke("evaluate-block", {
        body: {
          content: plainText,
          schoolProgram: userContext?.schoolProgram,
          subject: userContext?.subject,
          taskType: userContext?.taskType
        }
      });
      if (error) throw error;
      setBlockFeedback((prev) => ({
        ...prev,
        [blockId]: { feedback: data.feedback, loading: false }
      }));
      ue.success("AI feedback received");
    } catch (error) {
      console.error("Error evaluating block:", error);
      ue.error("Failed to get feedback");
      setBlockFeedback((prev) => {
        const newState = { ...prev };
        delete newState[blockId];
        return newState;
      });
    }
  };
  const closeFeedback = (blockId) => {
    setBlockFeedback((prev) => {
      const newState = { ...prev };
      delete newState[blockId];
      return newState;
    });
  };
  reactExports.useEffect(() => {
    const handleMessage = (event) => {
      if (event.data?.type === "drawing-insert" && event.data.imageData) {
        if (pendingEditor) {
          pendingEditor.insertBlocks(
            [
              {
                type: "image",
                props: {
                  url: event.data.imageData,
                  caption: "Drawing"
                }
              }
            ],
            pendingEditor.getTextCursorPosition().block,
            "after"
          );
          ue.success("Drawing inserted!");
        }
        setIsDrawingDialogOpen(false);
        setPendingEditor(null);
      }
      if (event.data?.type === "molecule-insert" && event.data.imageData) {
        if (pendingEditor) {
          pendingEditor.insertBlocks(
            [
              {
                type: "image",
                props: {
                  url: event.data.imageData,
                  caption: "Molecule"
                }
              }
            ],
            pendingEditor.getTextCursorPosition().block,
            "after"
          );
          ue.success("Molecule inserted!");
        }
        setIsMoleculeDialogOpen(false);
        setPendingEditor(null);
      }
      if (event.data?.type === "open-drawing-dialog") {
        if (editorRef.current) {
          setPendingEditor(editorRef.current);
          setIsDrawingDialogOpen(true);
        }
      }
      if (event.data?.type === "open-molecule-dialog") {
        if (editorRef.current) {
          setPendingEditor(editorRef.current);
          setIsMoleculeDialogOpen(true);
        }
      }
      if (event.data?.type === "open-citation-dialog") {
        setIsCitationModalOpen(true);
      }
    };
    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, [pendingEditor]);
  const insertDrawingItem = (editor2) => ({
    title: "Drawing",
    onItemClick: () => {
      setPendingEditor(editor2);
      setIsDrawingDialogOpen(true);
    },
    aliases: ["draw", "sketch", "illustration"],
    group: "Media",
    icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Image, { size: 18 }),
    subtext: "Insert a drawing from the illustration editor"
  });
  const insertMoleculeItem = (editor2) => ({
    title: "Molecule",
    onItemClick: () => {
      setPendingEditor(editor2);
      setIsMoleculeDialogOpen(true);
    },
    aliases: ["molecule", "chemistry", "compound", "structure"],
    group: "Media",
    icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Atom, { size: 18 }),
    subtext: "Insert a 2D molecular structure"
  });
  const defineItem = (editor2) => ({
    title: "Define",
    onItemClick: async () => {
      let textToDefine = editor2.getSelectedText();
      if (!textToDefine) {
        const currentBlock = editor2.getTextCursorPosition().block;
        const content = currentBlock.content;
        if (Array.isArray(content)) {
          const blockText = content.map((c) => c.text || "").join("") || "";
          const cleanText = blockText.replace(/\/$/, "").trim();
          if (!cleanText) {
            ue.error("No text found to define");
            return;
          }
          textToDefine = cleanText;
        } else {
          ue.error("No text found to define");
          return;
        }
      }
      const allBlocks = editor2.document;
      const context = allBlocks.map(
        (block) => Array.isArray(block.content) ? block.content.map((c) => c.text || "").join("") : ""
      ).join("\n");
      setIsAIStreaming(true);
      await handleDefineCommand(textToDefine, context, (text) => {
        editor2.insertInlineContent([
          { type: "text", text: ` (${text})`, styles: { italic: true } }
        ]);
      });
      setIsAIStreaming(false);
    },
    aliases: ["define", "definition", "meaning"],
    group: "AI",
    icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { size: 18 }),
    subtext: "Get a 1-sentence definition using AI"
  });
  const explainItem = (editor2) => ({
    title: "Explain",
    onItemClick: async () => {
      let textToExplain = editor2.getSelectedText();
      if (!textToExplain) {
        const currentBlock = editor2.getTextCursorPosition().block;
        const content = currentBlock.content;
        if (Array.isArray(content)) {
          const blockText = content.map((c) => c.text || "").join("") || "";
          const cleanText = blockText.replace(/\/$/, "").trim();
          if (!cleanText) {
            ue.error("No text found to explain");
            return;
          }
          textToExplain = cleanText;
        } else {
          ue.error("No text found to explain");
          return;
        }
      }
      const selection = window.getSelection();
      let position = { x: window.innerWidth / 2, y: 300 };
      try {
        if (selection && selection.rangeCount > 0) {
          const range = selection.getRangeAt(0);
          const rect = range.getBoundingClientRect();
          if (rect && rect.bottom > 0) {
            position = {
              x: rect.left + rect.width / 2,
              y: rect.bottom + 20
            };
          }
        }
      } catch (e) {
        const editorContainer = document.querySelector(".bn-container");
        if (editorContainer) {
          const editorRect = editorContainer.getBoundingClientRect();
          position = {
            x: editorRect.left + editorRect.width / 2,
            y: Math.max(editorRect.top + 100, 300)
          };
        }
      }
      setExplainBubble({
        visible: true,
        text: "",
        loading: true,
        position,
        originalText: textToExplain
      });
      const allBlocks = editor2.document;
      const context = allBlocks.map(
        (block) => Array.isArray(block.content) ? block.content.map((c) => c.text || "").join("") : ""
      ).join("\n");
      setIsAIStreaming(true);
      let accumulatedText = "";
      await handleExplainCommand(textToExplain, context, (text) => {
        accumulatedText = text;
        setExplainBubble((prev) => prev ? { ...prev, text: accumulatedText, loading: false } : null);
      });
      setIsAIStreaming(false);
    },
    aliases: ["explain", "explanation", "clarify"],
    group: "AI",
    icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { size: 18 }),
    subtext: "Get an explanation using AI in a chat bubble"
  });
  const synonymItem = (editor2) => ({
    title: "Synonym",
    onItemClick: async () => {
      let textForSynonym = editor2.getSelectedText();
      if (!textForSynonym) {
        const currentBlock = editor2.getTextCursorPosition().block;
        const content = currentBlock.content;
        if (Array.isArray(content)) {
          const blockText = content.map((c) => c.text || "").join("") || "";
          const cleanText = blockText.replace(/\/$/, "").trim();
          if (!cleanText) {
            ue.error("No text found for synonyms");
            return;
          }
          textForSynonym = cleanText;
        } else {
          ue.error("No text found for synonyms");
          return;
        }
      }
      const allBlocks = editor2.document;
      const context = allBlocks.map(
        (block) => Array.isArray(block.content) ? block.content.map((c) => c.text || "").join("") : ""
      ).join("\n");
      setIsAIStreaming(true);
      await handleSynonymCommand(textForSynonym, context, (text) => {
        editor2.insertInlineContent([
          { type: "text", text: ` (${text})`, styles: { italic: true } }
        ]);
      });
      setIsAIStreaming(false);
    },
    aliases: ["synonym", "synonyms", "alternative"],
    group: "AI",
    icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { size: 18 }),
    subtext: "Get synonym suggestions using AI"
  });
  const rephraseItem = (editor2) => ({
    title: "Rephrase",
    onItemClick: async () => {
      let textToRephrase = editor2.getSelectedText();
      if (!textToRephrase) {
        const currentBlock = editor2.getTextCursorPosition().block;
        const content = currentBlock.content;
        if (Array.isArray(content)) {
          const blockText = content.map((c) => c.text || "").join("") || "";
          const cleanText = blockText.replace(/\/$/, "").trim();
          if (!cleanText) {
            ue.error("No text found to rephrase");
            return;
          }
          textToRephrase = cleanText;
        } else {
          ue.error("No text found to rephrase");
          return;
        }
      }
      const allBlocks = editor2.document;
      const context = allBlocks.map(
        (block) => Array.isArray(block.content) ? block.content.map((c) => c.text || "").join("") : ""
      ).join("\n");
      setIsAIStreaming(true);
      await handleRephraseCommand(textToRephrase, context, (text) => {
        editor2.insertInlineContent([
          { type: "text", text: ` ${text}`, styles: { italic: true } }
        ]);
      });
      setIsAIStreaming(false);
    },
    aliases: ["rephrase", "reword", "rewrite"],
    group: "AI",
    icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { size: 18 }),
    subtext: "Rephrase the text using AI"
  });
  const grammarItem = (editor2) => ({
    title: "Grammar",
    onItemClick: async () => {
      let textToCorrect = editor2.getSelectedText();
      if (!textToCorrect) {
        const currentBlock = editor2.getTextCursorPosition().block;
        const content = currentBlock.content;
        if (Array.isArray(content)) {
          const blockText = content.map((c) => c.text || "").join("") || "";
          const cleanText = blockText.replace(/\/$/, "").trim();
          if (!cleanText) {
            ue.error("No text found to correct");
            return;
          }
          textToCorrect = cleanText;
        } else {
          ue.error("No text found to correct");
          return;
        }
      }
      const allBlocks = editor2.document;
      const context = allBlocks.map(
        (block) => Array.isArray(block.content) ? block.content.map((c) => c.text || "").join("") : ""
      ).join("\n");
      setIsAIStreaming(true);
      await handleGrammarCommand(textToCorrect, context, (text) => {
        editor2.insertInlineContent([
          { type: "text", text: ` ${text}`, styles: { italic: true } }
        ]);
      });
      setIsAIStreaming(false);
    },
    aliases: ["grammar", "correct", "fix grammar"],
    group: "AI",
    icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { size: 18 }),
    subtext: "Correct grammar using AI"
  });
  const titlePageItem = (editor2) => ({
    title: "Title Page",
    onItemClick: () => {
      const currentBlock = editor2.getTextCursorPosition().block;
      editor2.insertBlocks(
        [
          {
            type: "heading",
            props: { level: 1, textAlignment: "center" },
            content: [{ type: "text", text: "Document Title", styles: {} }]
          },
          {
            type: "paragraph",
            props: { textAlignment: "center" },
            content: [{ type: "text", text: "Author Name", styles: {} }]
          },
          {
            type: "paragraph",
            props: { textAlignment: "center" },
            content: [{ type: "text", text: (/* @__PURE__ */ new Date()).toLocaleDateString(), styles: {} }]
          },
          {
            type: "paragraph",
            content: []
          }
        ],
        currentBlock,
        "after"
      );
      ue.success("Title page inserted");
    },
    aliases: ["title", "titlepage", "cover"],
    group: "Document",
    icon: /* @__PURE__ */ jsxRuntimeExports.jsx(FileText, { size: 18 }),
    subtext: "Insert a formatted title page"
  });
  const tocItem = (editor2) => ({
    title: "Table of Contents",
    onItemClick: () => {
      const currentBlock = editor2.getTextCursorPosition().block;
      const allBlocks = editor2.document;
      const headings = allBlocks.filter((block) => block.type === "heading");
      const tocBlocks = [
        {
          type: "heading",
          props: { level: 2 },
          content: [{ type: "text", text: "Table of Contents", styles: { bold: true } }]
        }
      ];
      headings.forEach((heading) => {
        const level = heading.props?.level || 1;
        const text = heading.content?.map((c) => c.text || "").join("") || "Untitled";
        const indent = "  ".repeat(level - 1);
        tocBlocks.push({
          type: "paragraph",
          content: [{ type: "text", text: `${indent}${text}`, styles: {} }]
        });
      });
      tocBlocks.push({
        type: "paragraph",
        content: []
      });
      editor2.insertBlocks(tocBlocks, currentBlock, "after");
      ue.success("Table of contents generated");
    },
    aliases: ["toc", "contents", "index"],
    group: "Document",
    icon: /* @__PURE__ */ jsxRuntimeExports.jsx(List, { size: 18 }),
    subtext: "Generate table of contents from headings"
  });
  const bibliographyItem = (editor2) => ({
    title: "Bibliography",
    onItemClick: () => {
      const currentBlock = editor2.getTextCursorPosition().block;
      editor2.insertBlocks(
        [
          {
            type: "heading",
            props: { level: 2 },
            content: [{ type: "text", text: "References", styles: { bold: true } }]
          },
          {
            type: "paragraph",
            content: [{ type: "text", text: "[1] Author, A. (Year). Title of work. Publisher.", styles: {} }]
          },
          {
            type: "paragraph",
            content: [{ type: "text", text: "[2] Author, B. (Year). Title of work. Publisher.", styles: {} }]
          },
          {
            type: "paragraph",
            content: []
          }
        ],
        currentBlock,
        "after"
      );
      ue.success("Bibliography section inserted");
    },
    aliases: ["bib", "bibliography", "references", "works cited"],
    group: "Document",
    icon: /* @__PURE__ */ jsxRuntimeExports.jsx(BookOpen, { size: 18 }),
    subtext: "Insert bibliography/references section"
  });
  const citationItem = (editor2) => ({
    title: "Citation",
    onItemClick: () => {
      setIsCitationModalOpen(true);
    },
    aliases: ["cite", "citation", "reference", "source", "quote"],
    group: "Document",
    icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Quote, { size: 18 }),
    subtext: "Add a citation/reference"
  });
  const inlineMathItem = (editor2) => ({
    title: "Math Block (Inline)",
    onItemClick: () => {
      const currentBlock = editor2.getTextCursorPosition().block;
      editor2.insertBlocks(
        [
          {
            type: "inlineMath",
            props: {
              latex: "",
              mode: "inline",
              collapsed: false
            }
          }
        ],
        currentBlock,
        "after"
      );
      ue.success("Inline math block inserted");
    },
    aliases: ["inline math block", "inline equation block"],
    group: "Math",
    icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Sigma, { size: 18 }),
    subtext: "Insert an inline math equation as a block"
  });
  const inlineMathInlineItem = (editor2) => ({
    title: "Inline Math",
    onItemClick: () => {
      editor2.insertInlineContent([
        {
          type: "inlineMathInline",
          props: {
            latex: ""
          }
        }
      ]);
      ue.success("Inline math inserted");
    },
    aliases: ["inline math", "inline equation", "inline formula", "math inline"],
    group: "Math",
    icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Sigma, { size: 18 }),
    subtext: "Insert an inline math equation"
  });
  const blockMathItem = (editor2) => ({
    title: "Block Math",
    onItemClick: () => {
      const currentBlock = editor2.getTextCursorPosition().block;
      editor2.insertBlocks(
        [
          {
            type: "blockMath",
            props: {
              latex: "",
              mode: "block",
              collapsed: false
            }
          }
        ],
        currentBlock,
        "after"
      );
      ue.success("Block math inserted");
    },
    aliases: ["block math", "display math", "block equation", "display equation"],
    group: "Math",
    icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Sigma, { size: 18 }),
    subtext: "Insert a centered block math equation"
  });
  const chartItem = (editor2) => ({
    title: "Chart",
    onItemClick: () => {
      setChartInitialData(void 0);
      setChartInitialTitle(void 0);
      setChartDialogOpen(true);
    },
    aliases: ["chart", "graph", "plot", "bar chart", "line chart", "pie chart"],
    group: "Insert",
    icon: /* @__PURE__ */ jsxRuntimeExports.jsx(ChartColumn, { size: 18 }),
    subtext: "Create a chart from data"
  });
  const chartFromTableItem = (editor2) => ({
    title: "Chart from Table",
    onItemClick: () => {
      const allBlocks = editor2.document;
      const tableBlocks = allBlocks.filter((block) => block.type === "table");
      if (tableBlocks.length === 0) {
        setChartInitialData(void 0);
        setChartInitialTitle("Chart from Table");
        setChartDialogOpen(true);
        ue.info("No tables found. Create a chart with manual data entry.");
        return;
      }
      const lastTable = tableBlocks[tableBlocks.length - 1];
      let csvData = "";
      if (lastTable.content?.rows) {
        lastTable.content.rows.forEach((row, rowIndex) => {
          if (row.cells && row.cells.length >= 2) {
            const label = row.cells[0]?.map((c) => c.text || "").join("") || "";
            const value = row.cells[1]?.map((c) => c.text || "").join("") || "";
            if (label && value) {
              csvData += `${label}, ${value}
`;
            }
          }
        });
      }
      if (csvData.trim()) {
        setChartInitialData(csvData.trim());
        setChartInitialTitle("Chart from Table");
        setChartDialogOpen(true);
      } else {
        setChartInitialData(void 0);
        setChartInitialTitle("Chart from Table");
        setChartDialogOpen(true);
        ue.info("Could not extract table data. Enter data manually.");
      }
    },
    aliases: ["chart from table", "table to chart", "graph from table", "plot from table"],
    group: "Insert",
    icon: /* @__PURE__ */ jsxRuntimeExports.jsx(ChartColumn, { size: 18 }),
    subtext: "Generate chart from a table in the document"
  });
  const feedbackItem = (editor2) => ({
    title: "AI Feedback",
    onItemClick: async () => {
      const currentBlock = editor2.getTextCursorPosition().block;
      if (!currentBlock || !currentBlock.id) {
        ue.error("No block selected");
        return;
      }
      await handleBlockEvaluate(currentBlock.id);
    },
    aliases: ["feedback", "evaluate", "review", "assess"],
    group: "AI",
    icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { size: 18 }),
    subtext: "Get AI feedback on this paragraph"
  });
  const fonts = [
    { name: "Sans Serif", family: "ui-sans-serif, system-ui, sans-serif", aliases: ["sans", "sans-serif", "default font"] },
    { name: "Serif", family: "ui-serif, Georgia, Cambria, 'Times New Roman', Times, serif", aliases: ["serif", "times", "georgia"] },
    { name: "Monospace", family: "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace", aliases: ["mono", "monospace", "code font", "courier"] },
    { name: "Comic Sans", family: "'Comic Sans MS', 'Comic Sans', cursive", aliases: ["comic", "comic sans", "fun font"] },
    { name: "Georgia", family: "Georgia, serif", aliases: ["georgia"] },
    { name: "Times New Roman", family: "'Times New Roman', Times, serif", aliases: ["times", "times new roman"] },
    { name: "Arial", family: "Arial, Helvetica, sans-serif", aliases: ["arial", "helvetica"] },
    { name: "Courier New", family: "'Courier New', Courier, monospace", aliases: ["courier", "courier new"] }
  ];
  const fontItems = fonts.map((font) => (editor2) => ({
    title: `Font: ${font.name}`,
    onItemClick: () => {
      const selection = editor2.getSelection();
      if (selection) {
        const selectedBlocks = selection.blocks;
        selectedBlocks.forEach((block) => {
          if (block.content && Array.isArray(block.content)) {
            const newContent = block.content.map((item) => ({
              ...item,
              styles: { ...item.styles, fontFamily: font.family }
            }));
            editor2.updateBlock(block, { content: newContent });
          }
        });
      } else {
        const currentBlock = editor2.getTextCursorPosition().block;
        editor2.insertBlocks(
          [
            {
              type: "paragraph",
              content: [{ type: "text", text: `Type here in ${font.name}...`, styles: {} }],
              props: {}
            }
          ],
          currentBlock,
          "after"
        );
      }
      const editorElement = document.querySelector(".bn-editor");
      if (editorElement) {
        editorElement.style.setProperty("--bn-font-family", font.family);
      }
      ue.success(`Font changed to ${font.name}`);
    },
    aliases: ["font", ...font.aliases],
    group: "Fonts",
    icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Type, { size: 18 }),
    subtext: `Switch to ${font.name} font`
  }));
  const getCustomSlashMenuItems = (editor2) => [
    ...xr(editor2),
    insertDrawingItem(editor2),
    insertMoleculeItem(editor2),
    chartItem(),
    chartFromTableItem(editor2),
    defineItem(editor2),
    explainItem(editor2),
    synonymItem(editor2),
    rephraseItem(editor2),
    grammarItem(editor2),
    feedbackItem(editor2),
    titlePageItem(editor2),
    tocItem(editor2),
    bibliographyItem(editor2),
    citationItem(),
    inlineMathInlineItem(editor2),
    inlineMathItem(editor2),
    blockMathItem(editor2),
    ...fontItems.map((fontItem) => fontItem(editor2))
  ];
  const Subscript = zl(
    {
      type: "subscript",
      propSchema: "boolean"
    },
    {
      render: (props) => /* @__PURE__ */ jsxRuntimeExports.jsx("sub", { ref: props.contentRef })
    }
  );
  const Superscript = zl(
    {
      type: "superscript",
      propSchema: "boolean"
    },
    {
      render: (props) => /* @__PURE__ */ jsxRuntimeExports.jsx("sup", { ref: props.contentRef })
    }
  );
  const schema = Pe.create({
    blockSpecs: {
      ...On,
      inlineMath: inlineMathBlockSpec(),
      blockMath: blockMathBlockSpec(),
      pageBreak: pageBreakBlockSpec()
    },
    inlineContentSpecs: {
      ...Ie,
      inlineMathInline: inlineMathInlineSpec
    },
    styleSpecs: {
      ...He,
      subscript: Subscript,
      superscript: Superscript
    }
  });
  const editor = Se({
    schema,
    initialContent: collaboration ? void 0 : initialBlocks,
    // Collaboration config - BlockNote uses Yjs internally
    collaboration: collaboration ? {
      fragment: collaboration.ydoc.getXmlFragment("document"),
      user: collaboration.user || { name: "Anonymous", color: "#888888" },
      provider: collaboration.provider
    } : void 0
  });
  reactExports.useEffect(() => {
    editorRef.current = editor;
  }, [editor]);
  reactExports.useEffect(() => {
    if (!editor || !onSelectionChange) return;
    const handleSelectionChangeEvent = () => {
      try {
        const sel = window.getSelection();
        if (!sel || sel.rangeCount === 0) {
          onSelectionChange(null, null);
          return;
        }
        const range = sel.getRangeAt(0);
        const editorContainer = document.querySelector(".bn-container");
        const commonNode = range.commonAncestorContainer;
        const commonEl = commonNode instanceof Element ? commonNode : commonNode.parentElement;
        if (!editorContainer || !commonEl || !editorContainer.contains(commonEl)) {
          onSelectionChange(null, null);
          return;
        }
        const blockEl = commonEl.closest('[data-node-type="blockContainer"][data-id]');
        const blockId = blockEl?.getAttribute("data-id") ?? null;
        if (!blockId) {
          onSelectionChange(null, null);
          return;
        }
        const selectedText = sel.toString();
        if (selectedText && selectedText.trim()) {
          onSelectionChange(blockId, selectedText);
        } else {
          onSelectionChange(blockId, null);
        }
      } catch {
        onSelectionChange(null, null);
      }
    };
    document.addEventListener("selectionchange", handleSelectionChangeEvent);
    handleSelectionChangeEvent();
    return () => document.removeEventListener("selectionchange", handleSelectionChangeEvent);
  }, [editor, onSelectionChange]);
  reactExports.useEffect(() => {
    if (!highlightBlockId || !editor) return;
    const blockElement = document.querySelector(
      `[data-node-type="blockContainer"][data-id="${highlightBlockId}"]`
    );
    if (blockElement) {
      blockElement.scrollIntoView({ behavior: "smooth", block: "center" });
      blockElement.classList.add("ring-2", "ring-primary", "ring-offset-2", "rounded");
      setTimeout(() => {
        blockElement.classList.remove("ring-2", "ring-primary", "ring-offset-2", "rounded");
      }, 2e3);
    }
  }, [highlightBlockId, editor]);
  reactExports.useEffect(() => {
    if (editor && onAICommandsReady) {
      onAICommandsReady({
        define: handleDefineCommandFromToolbar,
        explain: handleExplainCommandFromToolbar,
        synonym: handleSynonymCommandFromToolbar,
        rephrase: handleRephraseCommandFromToolbar,
        grammar: handleGrammarCommandFromToolbar
      });
    }
  }, [editor, onAICommandsReady]);
  reactExports.useEffect(() => {
    if (!editor) return;
    const updateWordCount = () => {
      const blocks = editor.document;
      let text = "";
      blocks.forEach((block) => {
        if (block.content && Array.isArray(block.content)) {
          block.content.forEach((content) => {
            if (content.text) {
              text += content.text + " ";
            }
          });
        }
      });
      const words = text.trim().split(/\s+/).filter((w) => w.length > 0);
      setWordCount(words.length);
    };
    updateWordCount();
    editor.onChange(updateWordCount);
  }, [editor]);
  reactExports.useEffect(() => {
    if (!editor) return;
    const handleChange = () => {
      const blocks = editor.document;
      const html = blocksToHTML(blocks);
      if (onChange) {
        onChange(html);
      }
    };
    editor.onChange(handleChange);
  }, [editor, onChange]);
  reactExports.useEffect(() => {
    if (editor && onEditorReady) {
      onEditorReady(editor);
    }
  }, [editor, onEditorReady]);
  reactExports.useEffect(() => {
    if (!editor || !autocompleteEnabled) return;
    const handleAutocomplete = () => {
      try {
        if (suggestion || isAutocompleteLoading) return;
        const editorContainer = document.querySelector(".bn-container");
        const activeElement = document.activeElement;
        const sel = window.getSelection();
        const isCollapsed = !!sel && sel.rangeCount > 0 && sel.getRangeAt(0).collapsed;
        if (!editorContainer || !activeElement || !editorContainer.contains(activeElement) || !isCollapsed) {
          clearSuggestion();
          return;
        }
        const cursorPosition = editor.getTextCursorPosition();
        const currentBlock = cursorPosition.block;
        const blockText = currentBlock.content ? currentBlock.content.map((c) => c.text || "").join("") : "";
        if (blockText.trim().length < 15 || currentBlock.type !== "paragraph") {
          clearSuggestion();
          return;
        }
        const allBlocks = editor.document;
        const context = allBlocks.slice(Math.max(0, allBlocks.length - 5), allBlocks.length).map(
          (block) => Array.isArray(block.content) ? block.content.map((c) => c.text || "").join("") : ""
        ).join("\n");
        requestSuggestion(blockText, context);
      } catch (error) {
        console.error("Autocomplete error:", error);
      }
    };
    editor.onChange(handleAutocomplete);
  }, [editor, autocompleteEnabled, requestSuggestion, clearSuggestion, suggestion, isAutocompleteLoading]);
  reactExports.useEffect(() => {
    if (!editor || !autocorrectEnabled) return;
    const handleAutocorrect = () => {
      try {
        if (isAutocorrectOpen) {
          closeAutocorrect();
        }
        const selection = window.getSelection();
        if (!selection || selection.rangeCount === 0) return;
        const range = selection.getRangeAt(0);
        if (!range.collapsed) return;
        const textNode = range.startContainer;
        if (textNode.nodeType !== Node.TEXT_NODE) return;
        const text = textNode.textContent || "";
        const cursorPos = range.startOffset;
        let wordStart = cursorPos;
        let wordEnd = cursorPos;
        while (wordStart > 0 && /[a-zA-Z']/.test(text[wordStart - 1])) {
          wordStart--;
        }
        while (wordEnd < text.length && /[a-zA-Z']/.test(text[wordEnd])) {
          wordEnd++;
        }
        const word = text.slice(wordStart, wordEnd);
        const justFinishedWord = cursorPos === wordEnd && (cursorPos === text.length || /[\s.,!?;:]/.test(text[cursorPos]));
        if (word.length >= 3 && justFinishedWord) {
          const suggestions = getAutocorrectSuggestions(word);
          if (suggestions.length > 0) {
            lastTypedWordRef.current = { word, startOffset: wordStart, endOffset: wordEnd };
            const rect = range.getBoundingClientRect();
            showAutocorrectSuggestions(word, {
              top: rect.bottom + 5,
              left: rect.left
            });
          }
        }
      } catch (error) {
        console.error("Autocorrect error:", error);
      }
    };
    const handleKeyUp = (e) => {
      if ([" ", ".", ",", "!", "?", ";", ":", "Enter"].includes(e.key)) {
        setTimeout(handleAutocorrect, 10);
      }
    };
    const editorElement = document.querySelector(".bn-editor");
    if (editorElement) {
      editorElement.addEventListener("keyup", handleKeyUp);
    }
    return () => {
      if (editorElement) {
        editorElement.removeEventListener("keyup", handleKeyUp);
      }
    };
  }, [editor, autocorrectEnabled, isAutocorrectOpen, closeAutocorrect, getAutocorrectSuggestions, showAutocorrectSuggestions]);
  const handleAutocorrectSelect = reactExports.useCallback((correctedWord) => {
    if (!editor || !lastTypedWordRef.current) return;
    try {
      const cursorPosition = editor.getTextCursorPosition();
      const currentBlock = cursorPosition.block;
      if (!currentBlock.content) return;
      const blockContent = currentBlock.content;
      let newContent = [];
      let replaced = false;
      for (const item of blockContent) {
        if (item.type === "text" && !replaced && item.text) {
          const text = item.text;
          const { word, startOffset, endOffset } = lastTypedWordRef.current;
          const wordIndex = text.indexOf(word);
          if (wordIndex !== -1) {
            const newText = text.slice(0, wordIndex) + correctedWord + text.slice(wordIndex + word.length);
            newContent.push({ ...item, text: newText });
            replaced = true;
          } else {
            newContent.push(item);
          }
        } else {
          newContent.push(item);
        }
      }
      if (replaced) {
        editor.updateBlock(currentBlock, { content: newContent });
      }
    } catch (error) {
      console.error("Error replacing word:", error);
    }
    lastTypedWordRef.current = null;
    closeAutocorrect();
  }, [editor, closeAutocorrect]);
  useInlineGhostText({
    editor: editorReady ? editor : null,
    suggestion,
    enabled: autocompleteEnabled && editorReady,
    onAccept: () => {
      acceptAISuggestion();
    },
    onClear: clearSuggestion
  });
  reactExports.useEffect(() => {
    if (editor) {
      setEditorReady(true);
    }
  }, [editor]);
  reactExports.useEffect(() => {
    if (disablePagination) return;
    const container = editorContainerRef.current;
    if (!container) return;
    const PAGE_CONTENT_HEIGHT = 9 * 96;
    const updatePageBoundaries = () => {
      const editorContent = container.querySelector(".bn-editor");
      if (!editorContent) return;
      const totalHeight = editorContent.scrollHeight;
      const numPages = Math.max(1, Math.ceil(totalHeight / PAGE_CONTENT_HEIGHT));
      setPageCount(numPages);
      onPageCountChange?.(numPages);
      setPageBoundaries(
        Array.from({ length: numPages - 1 }, (_, i) => (i + 1) * PAGE_CONTENT_HEIGHT)
      );
    };
    const observer = new ResizeObserver(() => {
      updatePageBoundaries();
    });
    observer.observe(container);
    setTimeout(updatePageBoundaries, 100);
    return () => observer.disconnect();
  }, [editor, onPageCountChange, disablePagination]);
  reactExports.useEffect(() => {
    if (disablePagination || pageBoundaries.length === 0) return;
    const editorElement = editorContainerRef.current?.querySelector(".bn-editor");
    if (!editorElement) return;
    const totalPageBreakHeight = pageBoundaries.length * (2 * 96 + 40);
    editorElement.style.paddingBottom = `${totalPageBreakHeight}px`;
  }, [pageBoundaries, disablePagination]);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
    onTitleChange && /* @__PURE__ */ jsxRuntimeExports.jsx(
      "input",
      {
        type: "text",
        value: title || "",
        onChange: (e) => onTitleChange(e.target.value),
        placeholder: "Untitled Document",
        className: "w-full text-4xl font-bold border-none outline-none bg-transparent px-6 py-4 placeholder:text-muted-foreground/40"
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: disablePagination ? "endless-editor-container" : "page-editor-container", ref: editorContainerRef, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Ft,
        {
          editor,
          theme: "light",
          slashMenu: false,
          onKeyDown: (event) => {
            if ((event.metaKey || event.ctrlKey) && event.key === ",") {
              event.preventDefault();
              editor.toggleStyles({ subscript: true });
            }
            if ((event.metaKey || event.ctrlKey) && event.key === ".") {
              event.preventDefault();
              editor.toggleStyles({ superscript: true });
            }
          },
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            Vr,
            {
              triggerCharacter: "/",
              getItems: async (query) => vo(getCustomSlashMenuItems(editor), query)
            }
          )
        }
      ),
      explainBubble?.visible && /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          className: "fixed bg-card border rounded-lg p-4 shadow-xl z-50 w-[400px] max-h-[500px] flex flex-col animate-in fade-in slide-in-from-top-2",
          style: {
            left: Math.min(Math.max(explainBubble.position.x - 200, 10), window.innerWidth - 420),
            top: Math.min(explainBubble.position.y, window.innerHeight - 520)
          },
          children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3 overflow-hidden flex flex-col min-h-0", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-2 shrink-0", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-sm font-medium text-primary flex items-center gap-1.5", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { size: 14 }),
                "Explanation"
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  onClick: () => setExplainBubble(null),
                  className: "text-muted-foreground hover:text-foreground transition-colors",
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { size: 16 })
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-xs text-muted-foreground italic border-l-2 border-primary/30 pl-2 py-1 shrink-0", children: [
              '"',
              explainBubble.originalText,
              '"'
            ] }),
            explainBubble.loading ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 text-sm text-muted-foreground py-2 shrink-0", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "animate-spin h-4 w-4 border-2 border-primary border-t-transparent rounded-full" }),
              "Thinking..."
            ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm text-foreground whitespace-pre-wrap leading-relaxed overflow-y-auto flex-1 min-h-0", children: explainBubble.text }),
            !explainBubble.loading && explainBubble.text && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2 pt-2 border-t shrink-0", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Button,
                {
                  size: "sm",
                  variant: "default",
                  onClick: () => {
                    editor.insertInlineContent([
                      { type: "text", text: ` (${explainBubble.text})`, styles: { italic: true } }
                    ]);
                    setExplainBubble(null);
                    ue.success("Explanation inserted!");
                  },
                  children: "Insert"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Button,
                {
                  size: "sm",
                  variant: "ghost",
                  onClick: () => setExplainBubble(null),
                  children: "Dismiss"
                }
              )
            ] })
          ] })
        }
      ),
      Object.entries(blockFeedback).map(([blockId, { feedback, loading }]) => /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          className: "fixed bg-card border rounded-lg p-4 shadow-lg z-50 max-w-md",
          style: {
            left: "50%",
            top: "50%",
            transform: "translate(-50%, -50%)"
          },
          children: loading ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 text-sm text-muted-foreground", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "animate-spin h-4 w-4 border-2 border-primary border-t-transparent rounded-full" }),
            "Analyzing..."
          ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm font-medium text-primary", children: "AI Feedback" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  onClick: () => closeFeedback(blockId),
                  className: "text-muted-foreground hover:text-foreground",
                  children: "✕"
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm text-foreground whitespace-pre-wrap", children: feedback })
          ] })
        },
        blockId
      )),
      !disablePagination && pageBoundaries.map((boundary, index) => {
        const pageBreakHeight = 2 * 96 + 40;
        const accumulatedOffset = index * pageBreakHeight;
        return /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "page-boundary-overlay",
            style: { top: `calc(1in + ${boundary}px + ${accumulatedOffset}px)` },
            children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "page-boundary-inner", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "page-bottom-margin" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "page-gap", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "page-label", children: [
                "Page ",
                index + 2,
                " — Experimental"
              ] }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "page-top-margin" })
            ] })
          },
          index
        );
      }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-6 py-2 border-t bg-muted/30 text-xs text-muted-foreground flex justify-between", children: [
        !disablePagination && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
          "Page ",
          pageCount
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: disablePagination ? "ml-auto" : "", children: [
          wordCount,
          " ",
          wordCount === 1 ? "word" : "words"
        ] })
      ] })
    ] }),
    isAutocompleteLoading && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "fixed bottom-4 right-4 bg-primary/10 backdrop-blur-sm text-primary text-xs px-3 py-1.5 rounded-full border border-primary/20 z-50 flex items-center gap-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "animate-spin h-3 w-3 border-2 border-primary border-t-transparent rounded-full" }),
      "AI typing..."
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Dialog, { open: isDrawingDialogOpen, onOpenChange: setIsDrawingDialogOpen, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogContent, { className: "max-w-[95vw] max-h-[95vh] p-0", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(DialogHeader, { className: "sr-only", children: /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTitle, { children: "Drawing Editor" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "iframe",
        {
          src: "/drawings/index.html",
          className: "w-full h-[90vh] border-0",
          title: "Drawing Editor"
        }
      )
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Dialog, { open: isMoleculeDialogOpen, onOpenChange: setIsMoleculeDialogOpen, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogContent, { className: "max-w-[95vw] max-h-[95vh] p-0", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(DialogHeader, { className: "sr-only", children: /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTitle, { children: "Molecule Editor" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "iframe",
        {
          src: "/molecule",
          className: "w-full h-[90vh] border-0",
          title: "Molecule Editor"
        }
      )
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      CitationModal,
      {
        open: isCitationModalOpen,
        onClose: () => setIsCitationModalOpen(false),
        onInsert: (inlineText, citation, style) => {
          const currentBlock = editor.getTextCursorPosition().block;
          editor.insertBlocks(
            [
              {
                type: "paragraph",
                content: [{ type: "text", text: inlineText, styles: {} }]
              }
            ],
            currentBlock,
            "after"
          );
          setIsCitationModalOpen(false);
          ue.success("Citation inserted!");
        }
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      AutocorrectDropdown,
      {
        isOpen: isAutocorrectOpen,
        suggestions: autocorrectSuggestions,
        selectedIndex: autocorrectSelectedIndex,
        position: autocorrectPosition,
        currentWord: autocorrectCurrentWord,
        onSelect: handleAutocorrectSelect,
        onClose: closeAutocorrect,
        onNavigate: (direction) => {
          if (direction === "up") {
            selectPreviousAutocorrect();
          } else {
            selectNextAutocorrect();
          }
        }
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      ChartDialog,
      {
        open: chartDialogOpen,
        onOpenChange: setChartDialogOpen,
        onInsertChart: (imageDataUrl) => {
          const currentBlock = editor.getTextCursorPosition().block;
          editor.insertBlocks(
            [
              {
                type: "image",
                props: {
                  url: imageDataUrl,
                  caption: chartInitialTitle || "Chart",
                  previewWidth: 500
                }
              }
            ],
            currentBlock,
            "after"
          );
          setChartDialogOpen(false);
          setChartInitialData(void 0);
          setChartInitialTitle(void 0);
          ue.success("Chart inserted!");
        },
        initialData: chartInitialData,
        initialTitle: chartInitialTitle
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx("style", { children: `
        /* Page-based editor styling */
        .page-editor-container {
          width: 100%;
          background: hsl(var(--muted) / 0.5);
          padding: 2rem;
          position: relative;
          border-radius: 0.75rem;
        }

        .page-editor-container .bn-container {
          background: hsl(var(--card));
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
          border: 1px solid hsl(var(--border));
          border-radius: 0.5rem;
          padding: 1in;
          max-width: 8.5in;
          margin: 0 auto;
          position: relative;
        }

        /* Endless editor styling (no pagination) */
        .endless-editor-container {
          width: 100%;
          background: white;
          position: relative;
        }

        .endless-editor-container .bn-container {
          background: white;
          padding: 2rem;
          max-width: 100%;
          position: relative;
        }

        .page-boundary-overlay {
          position: absolute;
          left: 0;
          right: 0;
          width: 100%;
          height: calc(2in + 2.5rem);
          pointer-events: none;
          z-index: 10;
          display: flex;
          justify-content: center;
          background: hsl(var(--muted));
        }

        .page-boundary-inner {
          width: 8.5in;
          height: 100%;
          display: flex;
          flex-direction: column;
        }

        .page-bottom-margin {
          height: 1in;
          background: white;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
        }

        .page-gap {
          height: 2.5rem;
          background: hsl(var(--muted));
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .page-top-margin {
          height: 1in;
          background: white;
          box-shadow: 0 -2px 8px rgba(0, 0, 0, 0.1);
        }

        .page-label {
          font-size: 0.7rem;
          color: hsl(var(--muted-foreground));
          font-weight: 500;
          padding: 0.25rem 0.75rem;
          background: hsl(var(--background));
          border-radius: 0.25rem;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
        }

        .bn-editor {
          padding: 0;
          font-family: var(--bn-font-family, ui-sans-serif, system-ui, sans-serif);
        }

        /* Font family classes for styled text */
        .bn-editor [data-font-sans] { font-family: ui-sans-serif, system-ui, sans-serif; }
        .bn-editor [data-font-serif] { font-family: ui-serif, Georgia, Cambria, 'Times New Roman', Times, serif; }
        .bn-editor [data-font-mono] { font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace; }
        .bn-editor [data-font-comic] { font-family: 'Comic Sans MS', 'Comic Sans', cursive; }
        .bn-editor [data-font-georgia] { font-family: Georgia, serif; }
        .bn-editor [data-font-times] { font-family: 'Times New Roman', Times, serif; }
        .bn-editor [data-font-arial] { font-family: Arial, Helvetica, sans-serif; }
        .bn-editor [data-font-courier] { font-family: 'Courier New', Courier, monospace; }
        
        /* KaTeX styling within BlockNote */
        .bn-inline-content code:has-text('$') {
          background-color: hsl(var(--muted));
          padding: 0.1rem 0.3rem;
          border-radius: 0.25rem;
          font-family: 'KaTeX_Main', 'Times New Roman', serif;
        }
      ` })
  ] });
}

export { BlockNoteEditor as B, ChartDialog as C };
