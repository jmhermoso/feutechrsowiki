'use client';

import { useEffect } from 'react';
import { usePuzzleContext } from './Puzzle';

interface TileProps {
  name: string;
  icon: string;
  children: string;
}

export function Tile({ name, icon, children }: TileProps) {
  const { registerTile } = usePuzzleContext();

  useEffect(() => {
    registerTile(name, {
      name,
      icon,
      label: children,
    });
  }, [name, icon, children, registerTile]);

  // Tile doesn't render directly; it's metadata for the Graph component
  return null;
}