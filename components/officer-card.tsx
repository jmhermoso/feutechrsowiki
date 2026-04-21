// components/officer-card.tsx
'use client';

import { FaTimes } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { useState } from 'react';
import type { Officer } from '../lib/officers/types';

interface BadgeProps {
  tenure: { position: string; startYear: number; endYear: number | 'present' };
  orgColor: string;
  className?: string;
}

function BadgeWithHover({ tenure, orgColor, className }: BadgeProps) {
  const [hovered, setHovered] = useState(false);
  const isPast = tenure.endYear !== 'present';

  return (
    <div
      className={`flex flex-col items-center justify-center h-8 px-2 rounded-md border cursor-default overflow-hidden transition-all ${className} ${
        isPast ? 'bg-muted/10 border-dashed opacity-80' : 'bg-transparent'
      }`}
      style={{ borderColor: isPast ? '#88888840' : `${orgColor}60` }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <AnimatePresence mode="wait">
        {hovered ? (
          <motion.span
            key="date"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            transition={{ duration: 0.1 }}
            className="text-[10px] text-muted-foreground whitespace-nowrap"
          >
            {tenure.startYear}–{isPast ? tenure.endYear : 'Present'}
          </motion.span>
        ) : (
          <motion.span
            key="position"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            transition={{ duration: 0.1 }}
            className={`text-[10px] font-medium text-center truncate w-full px-1 ${
              isPast ? 'text-muted-foreground italic' : ''
            }`}
            style={{ color: isPast ? undefined : orgColor }}
          >
            {tenure.position}
          </motion.span>
        )}
      </AnimatePresence>
    </div>
  );
}

interface OfficerCardProps {
  officer: Officer;
  orgColor?: string;
}

export function OfficerCard({ officer, orgColor = '#888888' }: OfficerCardProps) {
  const [imgError, setImgError] = useState(false);
  const [nameHovered, setNameHovered] = useState(false);
  const [showAllTenures, setShowAllTenures] = useState(false);

  const allTenures = officer.tenures;

  const sortedTenures = [...allTenures].sort((a, b) => {
    if (a.endYear === 'present' && b.endYear !== 'present') return -1;
    if (a.endYear !== 'present' && b.endYear === 'present') return 1;
    return (b.startYear as number) - (a.startYear as number);
  });

  const displayTenures = sortedTenures.slice(0, 2);
  const hasMore = allTenures.length > 2;
  const showInitials = !officer.img || officer.img.trim() === '' || imgError;

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col items-center w-48 shrink-0 rounded-2xl border bg-card shadow-md overflow-hidden"
        style={{ borderColor: `${orgColor}80` }}
      >
        <div
          className="relative w-full aspect-square bg-muted flex items-center justify-center border-b-2"
          style={{ borderColor: orgColor }}
        >
          {showInitials ? (
            <span className="text-4xl font-bold" style={{ color: orgColor }}>
              {officer.firstName[0]}{officer.lastName[0]}
            </span>
          ) : (
            <Image
              src={officer.img!}
              alt={`${officer.firstName} ${officer.lastName}`}
              fill
              className="object-cover"
              onError={() => setImgError(true)}
            />
          )}
        </div>

        <div className="flex flex-col items-center gap-2 px-2.5 pt-2 pb-4 w-full h-[130px]">
          <div
            className="relative h-10 w-full flex items-center justify-center cursor-default"
            onMouseEnter={() => setNameHovered(true)}
            onMouseLeave={() => setNameHovered(false)}
          >
            <AnimatePresence mode="wait">
              {nameHovered && officer.nickname ? (
                <motion.p
                  key="nickname"
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                  className="absolute text-sm italic text-muted-foreground text-center w-full"
                >
                  "{officer.nickname}"
                </motion.p>
              ) : (
                <motion.p
                  key="fullname"
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                  className="absolute text-sm font-semibold text-foreground text-center w-full truncate px-2"
                >
                  {officer.firstName} {officer.lastName}
                </motion.p>
              )}
            </AnimatePresence>
          </div>

          <div className="flex flex-col w-full gap-1.5">
            {displayTenures[0] && (
              <BadgeWithHover tenure={displayTenures[0]} orgColor={orgColor} className="w-full" />
            )}
            <div className="flex w-full gap-1.5">
              {displayTenures[1] ? (
                <BadgeWithHover
                  tenure={displayTenures[1]}
                  orgColor={orgColor}
                  className={hasMore ? "flex-1" : "w-full"}
                />
              ) : (
                hasMore && <div className="flex-1 h-8" />
              )}
              {hasMore && (
                <button
                  onClick={() => setShowAllTenures(true)}
                  className="flex items-center justify-center h-8 w-10 shrink-0 rounded-md border border-dashed text-[10px] font-bold hover:bg-muted transition-colors text-muted-foreground"
                  style={{ borderColor: `#88888840` }}
                >
                  ...
                </button>
              )}
            </div>
          </div>
        </div>
      </motion.div>

      <AnimatePresence>
        {showAllTenures && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15 }}
              className="fixed inset-0 z-50 backdrop-blur-xs bg-fd-overlay"
              onClick={() => setShowAllTenures(false)}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: -8 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -8 }}
              transition={{ duration: 0.15 }}
              className="fixed left-1/2 top-4 md:top-[calc(50%-200px)] z-50 w-[calc(100%-1rem)] max-w-sm -translate-x-1/2 rounded-xl border bg-fd-popover text-fd-popover-foreground shadow-2xl shadow-black/50 overflow-hidden"
              style={{ borderColor: `${orgColor}60` }}
            >
              <div
                className="flex items-center justify-between p-3 border-b"
                style={{ borderColor: `${orgColor}30` }}
              >
                <h3 className="font-bold text-sm">Position History</h3>
                <button
                  onClick={() => setShowAllTenures(false)}
                  className="p-1 hover:bg-fd-accent rounded-full transition-colors"
                >
                  <FaTimes className="h-4 w-4" />
                </button>
              </div>
              <div className="p-3 flex flex-col gap-2 max-h-64 overflow-y-auto">
                {sortedTenures.map((tenure, i) => {
                  const isPast = tenure.endYear !== 'present';
                  return (
                    <div
                      key={i}
                      className="flex flex-col p-2 rounded-lg bg-fd-accent/20 border border-fd-border/40"
                    >
                      <span
                        className={`text-xs font-bold ${isPast ? 'text-fd-muted-foreground italic' : ''}`}
                        style={{ color: isPast ? undefined : orgColor }}
                      >
                        {tenure.position}
                      </span>
                      <span className="text-[10px] text-fd-muted-foreground">
                        {tenure.startYear} – {isPast ? tenure.endYear : 'Present'}
                      </span>
                    </div>
                  );
                })}
              </div>
              <div className="bg-fd-secondary/50 p-3 text-[10px] text-fd-muted-foreground text-center">
                Click outside to close
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}