"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import type { Organization } from "@/lib/organizations";

interface OrgBubbleProps {
  org: Organization;
  isMatching: boolean;
  isBestMatch: boolean;
  searchQuery: string;
}

export function OrgBubble({
  org,
  isMatching,
  isBestMatch,
  searchQuery,
}: OrgBubbleProps) {
  const hasSearch = searchQuery.length > 0;
  /** Landing bubbles: accent (or legacy `color`); matches doc theme highlights. */
  const brand = org.theme_accent ?? org.color;

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{
        opacity: hasSearch ? (isMatching ? 1 : 0.2) : 1,
        scale: hasSearch ? (isBestMatch ? 1.15 : isMatching ? 1 : 0.7) : 1,
      }}
      transition={{
        type: "spring",
        stiffness: 300,
        damping: 25,
      }}
      className="relative w-28 flex flex-col items-center"
    >
      <Link href={`${org.id}`}>
        <motion.div
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.95 }}
          className="group relative flex flex-col items-center gap-2"
        >
          <div
            className="flex h-20 w-20 items-center justify-center rounded-full border-2 bg-card shadow-lg transition-all duration-300 group-hover:shadow-xl md:h-24 md:w-24"
            style={{
              borderColor: brand,
              boxShadow: isBestMatch
                ? `0 0 20px ${brand}50, 0 0 36px ${brand}28`
                : undefined,
            }}
          >
            <span
              className="text-lg font-bold md:text-xl"
              style={{ color: brand }}
            >
              {org.abbreviation}
            </span>
          </div>
          <motion.span
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-[100px] text-center text-xs text-muted-foreground"
          >
            {org.name}
          </motion.span>
          {isBestMatch && (
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              className="absolute -top-2 -right-2 flex h-6 w-6 items-center justify-center rounded-full border-2 bg-card text-xs font-bold shadow-md"
              style={{ borderColor: brand, color: brand }}
            >
              1
            </motion.div>
          )}
        </motion.div>
      </Link>
    </motion.div>
  );
}
