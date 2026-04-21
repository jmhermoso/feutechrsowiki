// lib/organizations.ts
export interface Organization {
  id: string;
  name: string;
  abbreviation: string;
  description: string;
  color: string;
  theme_background?: string | null;
  theme_accent?: string | null;
  theme_text?: string | null;
}

// Used ONLY by lib/source.ts at build time.
// All runtime UI reads from Supabase via /api/organizations.
export const organizations: Organization[] = [
  { id: "tec", name: "іTamaraws Esports Club", abbreviation: "TEC", description: "іTamaraws Esports Club", color: "#009900" },
  { id: "jpcs", name: "Junior Philippine Computer Society", abbreviation: "JPCS", description: "Junior Philippine Computer Society", color: "#1E40AF" },
  { id: "acm", name: "Association for Computing Machinery", abbreviation: "ACM", description: "Association for Computing Machinery", color: "#0891B2" },
  { id: "innov", name: "The Innovators", abbreviation: "INNOV", description: "The Innovators", color: "#7C3AED" },
  { id: "prism", name: "Pioneers of Relentless and Innovative Storytellers in Multimedia Arts", abbreviation: "PRISM", description: "Pioneers of Relentless and Innovative Storytellers in Multimedia Arts", color: "#DB2777" },
  { id: "cpeo", name: "Computer Engineering Organization", abbreviation: "CPEO", description: "Computer Engineering Organization", color: "#EA580C" },
  { id: "sage", name: "Student Association for Game Endeavors", abbreviation: "SAGE", description: "Student Association for Game Endeavors", color: "#059669" },
  { id: "tbtv", name: "TAMbayan TV", abbreviation: "TBTV", description: "TAMbayan TV", color: "#DC2626" },
  { id: "aits", name: "Alliance of Information Technology Students", abbreviation: "AITS", description: "Alliance of Information Technology Students", color: "#4F46E5" },
  { id: "asti", name: "Association of Student Technopreneurs and Innovators", abbreviation: "ASTI", description: "Association of Student Technopreneurs and Innovators", color: "#0D9488" },
  { id: "ac", name: "Artist Connection", abbreviation: "AC", description: "Artist Connection", color: "#C026D3" },
  { id: "ecess", name: "Electronics Engineering Students' Society", abbreviation: "ECESS", description: "Electronics Engineering Students' Society", color: "#CA8A04" },
  { id: "mechs", name: "Mechanical Engineering Chain of Societies", abbreviation: "MECHs", description: "Mechanical Engineering Chain of Societies", color: "#64748B" },
  { id: "scc", name: "Student Coordinating Council", abbreviation: "SCC", description: "Student Coordinating Council", color: "#009900" },
  { id: "rac", name: "Recreation and Athletics Club", abbreviation: "RAC", description: "Recreation and Athletics Club", color: "#F97316" },
];