
export const EDUCATION_PROGRAMS = [
  { value: "ib", label: "IB (International Baccalaureate)", region: "International" },
  { value: "cambridge-international", label: "Cambridge International", region: "International" },
  { value: "a-levels", label: "A Levels", region: "UK" },
  { value: "igcse", label: "IGCSE / GCSE", region: "UK" },
  { value: "ap", label: "Advanced Placement (AP)", region: "USA" },
  { value: "us-high-school", label: "US High School Diploma", region: "USA" },
  { value: "canadian-high-school", label: "Canadian High School", region: "Canada" },
  { value: "abitur", label: "German Abitur", region: "Europe" },
  { value: "french-bac", label: "French Baccalauréat", region: "Europe" },
  { value: "swiss-matura", label: "Swiss Matura", region: "Europe" },
  { value: "dutch-vwo", label: "Dutch VWO", region: "Europe" },
  { value: "swedish-gymnasium", label: "Swedish Gymnasium", region: "Europe" },
  { value: "spanish-bachillerato", label: "Spanish Bachillerato", region: "Europe" },
  { value: "italian-maturita", label: "Italian Maturità", region: "Europe" },
  { value: "polish-matura", label: "Polish Matura", region: "Europe" },
  { value: "russian-ege", label: "EGE (Russia)", region: "Europe" },
  { value: "australian-year-12", label: "Australian Year 12 / ATAR", region: "Asia Pacific" },
  { value: "nz-ncea", label: "NCEA (New Zealand)", region: "Asia Pacific" },
  { value: "indian-cbse", label: "CBSE (India)", region: "Asia Pacific" },
  { value: "indian-icse", label: "ICSE (India)", region: "Asia Pacific" },
  { value: "chinese-gaokao", label: "Gaokao (China)", region: "Asia Pacific" },
  { value: "japanese-high-school", label: "Japanese High School", region: "Asia Pacific" },
  { value: "korean-suneung", label: "Korean Suneung", region: "Asia Pacific" },
  { value: "singapore-a-levels", label: "Singapore A Levels", region: "Asia Pacific" },
  { value: "hong-kong-dse", label: "HKDSE (Hong Kong)", region: "Asia Pacific" },
  { value: "brazilian-enem", label: "ENEM (Brazil)", region: "Other" },
  { value: "bachelor-degree", label: "University - Bachelor's", region: "University" },
  { value: "master-degree", label: "University - Master's", region: "University" },
  { value: "phd-program", label: "University - PhD", region: "University" },
  { value: "other", label: "Other", region: "Other" },
];

export const groupedPrograms = EDUCATION_PROGRAMS.reduce((acc, program) => {
  if (!acc[program.region]) acc[program.region] = [];
  acc[program.region].push(program);
  return acc;
}, {} as Record<string, typeof EDUCATION_PROGRAMS>);
