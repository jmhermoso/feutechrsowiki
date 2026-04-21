// components/officer-carousel.tsx
"use client";

import useSWR from "swr";
import { OfficerCard } from "@/components/officer-card";
import { useRef, useState, useEffect } from "react";
import type { Officer, Tenure } from "../lib/officers/types";

interface Props {
  orgId: string;
  department: string;
}

const fetcher = (url: string) =>
  fetch(url).then((res) => {
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return res.json();
  });

export function OfficerCarousel({ orgId, department }: Props) {
  const { data, error, isLoading } = useSWR(
    `/api/officers?org=${orgId}`,
    fetcher,
    {
      revalidateOnFocus: false,
      dedupingInterval: 1000 * 60 * 60,
    }
  );

  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const checkScroll = () => {
    const el = scrollRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 0);
    setCanScrollRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 1);
  };

  useEffect(() => {
    checkScroll();
    const el = scrollRef.current;
    el?.addEventListener("scroll", checkScroll);
    return () => el?.removeEventListener("scroll", checkScroll);
  }, [data]);

  const scroll = (dir: "left" | "right") => {
    scrollRef.current?.scrollBy({ left: dir === "left" ? -300 : 300, behavior: "smooth" });
  };

  if (isLoading) {
    return (
      <div className="flex gap-4 overflow-hidden py-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <div
            key={i}
            className="h-64 w-48 shrink-0 animate-pulse rounded-xl bg-muted"
          />
        ))}
      </div>
    );
  }

  if (error || !data?.ok) {
    return (
      <div className="rounded-xl border border-yellow-500/30 bg-yellow-500/10 px-5 py-4 text-sm text-yellow-400">
        Officer data is currently unavailable. A connection to our database
        could not be established — please check back later.
      </div>
    );
  }

  const officers: Officer[] = (data.officers as Officer[]).filter((o: Officer) =>
    o.tenures.some((t: Tenure) => t.department === department)
  );

  if (officers.length === 0) {
    return (
      <p className="text-sm text-muted-foreground">
        No officers listed under <strong>{department}</strong> yet.
      </p>
    );
  }

  return (
    <div className="relative">
      {canScrollLeft && (
        <button
          onClick={() => scroll("left")}
          className="absolute left-0 top-1/2 z-10 -translate-y-1/2 rounded-full bg-background/80 p-2 shadow backdrop-blur"
          aria-label="Scroll left"
        >
          ‹
        </button>
      )}
      <div
        ref={scrollRef}
        className="flex gap-4 overflow-x-auto scroll-smooth py-4 scrollbar-hide"
        onScroll={checkScroll}
      >
        {officers.map((officer) => (
          <OfficerCard key={officer.studentNumber} officer={officer} />
        ))}
      </div>
      {canScrollRight && (
        <button
          onClick={() => scroll("right")}
          className="absolute right-0 top-1/2 z-10 -translate-y-1/2 rounded-full bg-background/80 p-2 shadow backdrop-blur"
          aria-label="Scroll right"
        >
          ›
        </button>
      )}
    </div>
  );
}