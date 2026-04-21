"use client";

import { useState, useMemo } from "react";
import { Search, Loader2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { organizations as fallbackOrganizations } from "@/lib/organizations";
import { OrgBubble } from "./org-bubble";
import { motion, AnimatePresence } from "framer-motion";
import useSWR from "swr";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

interface DbOrganization {
  id: string;
  name: string;
  abbreviation: string;
  description: string;
  created_at: string;
  theme_background?: string | null;
  theme_accent?: string | null;
  theme_text?: string | null;
}

export function OrgSearch() {
  const [searchQuery, setSearchQuery] = useState("");
  
  const { data: dbOrgs, isLoading } = useSWR<DbOrganization[]>(
    "/api/organizations",
    fetcher
  );
  
  // Map DB orgs to match the Organization interface, or use fallback
  const organizations = useMemo(() => {
    if (dbOrgs && dbOrgs.length > 0) {
      return dbOrgs.map((org) => ({
        id: org.id,
        name: org.name,
        abbreviation: org.abbreviation,
        description: org.description || "",
        color: fallbackOrganizations.find((f) => f.id === org.id)?.color || "#009900",
        theme_background: org.theme_background,
        theme_accent: org.theme_accent,
        theme_text: org.theme_text,
      }));
    }
    return fallbackOrganizations;
  }, [dbOrgs]);

  const { matchingOrgs, bestMatch } = useMemo(() => {
    if (!searchQuery.trim()) {
      return { matchingOrgs: organizations, bestMatch: null };
    }

    const query = searchQuery.toLowerCase();
    const matches = organizations.filter(
      (org) =>
        org.name.toLowerCase().includes(query) ||
        org.abbreviation.toLowerCase().includes(query) ||
        org.description.toLowerCase().includes(query)
    );

    // Find best match - prioritize abbreviation matches, then name starts with
    let best = null;
    for (const org of matches) {
      if (org.abbreviation.toLowerCase() === query) {
        best = org;
        break;
      }
      if (org.abbreviation.toLowerCase().startsWith(query)) {
        best = org;
        break;
      }
      if (org.name.toLowerCase().startsWith(query)) {
        best = org;
        break;
      }
    }
    if (!best && matches.length > 0) {
      best = matches[0];
    }

    return { matchingOrgs: matches, bestMatch: best };
  }, [searchQuery, organizations]);

  return (
    <div className="flex w-full flex-col items-center gap-8">
      {/* Search Bar */}
      <div className="relative w-full max-w-xl">
        <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
        <Input
          type="text"
          placeholder="Search organizations..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="h-14 pl-12 pr-4 text-lg shadow-lg"
        />
      </div>

      {/* Results Info */}
      <AnimatePresence mode="wait">
        {searchQuery && (
          <motion.p
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="text-sm text-muted-foreground"
          >
            {matchingOrgs.length === 0
              ? "No organizations found"
              : `Found ${matchingOrgs.length} organization${matchingOrgs.length !== 1 ? "s" : ""}`}
          </motion.p>
        )}
      </AnimatePresence>

      {/* Organization Bubbles */}
      {isLoading ? (
        <div className="flex items-center gap-2 text-muted-foreground">
          <Loader2 className="h-5 w-5 animate-spin" />
          <span>Loading organizations...</span>
        </div>
      ) : (
        <motion.div
          layout
          className="flex flex-wrap justify-center gap-6 md:gap-8 max-w-4xl mx-auto"
        >
          <AnimatePresence>
            {organizations.map((org) => (
              <OrgBubble
                key={org.id}
                org={org}
                isMatching={matchingOrgs.includes(org)}
                isBestMatch={bestMatch?.id === org.id}
                searchQuery={searchQuery}
              />
            ))}
          </AnimatePresence>
        </motion.div>
      )}
    </div>
  );
}
