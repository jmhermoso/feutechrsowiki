'use client';

import { useEffect } from 'react';
import { usePuzzleContext } from './Puzzle';

interface PieceProps {
  name: string;
  icon: string;
  children: string;
}

export function Piece({ name, icon, children }: PieceProps) {
  const { registerPiece } = usePuzzleContext();

  useEffect(() => {
    registerPiece(name, {
      name,
      icon,
      label: children,
    });
  }, [name, icon, children, registerPiece]);

  // Piece doesn't render directly; it's metadata for the Graph component
  return null;
}