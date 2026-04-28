'use client';

import React, { createContext, useState, ReactNode } from 'react';

export interface PuzzleContextType {
  pieces: Map<string, PieceData>;
  tiles: Map<string, TileData>;
  registerPiece: (name: string, data: PieceData) => void;
  registerTile: (name: string, data: TileData) => void;
  placedConnections: Array<{ from: string; to: string }>;
  setPlacedConnections: (connections: Array<{ from: string; to: string }>) => void;
}

export interface PieceData {
  name: string;
  icon: string;
  label: string;
}

export interface TileData {
  name: string;
  icon: string;
  label: string;
}

export const PuzzleContext = createContext<PuzzleContextType | null>(null);

interface PuzzleProps {
  children: ReactNode;
}

export function Puzzle({ children }: PuzzleProps) {
  const [pieces] = useState<Map<string, PieceData>>(new Map());
  const [tiles] = useState<Map<string, TileData>>(new Map());
  const [placedConnections, setPlacedConnections] = useState<Array<{ from: string; to: string }>>([]);

  const registerPiece = (name: string, data: PieceData) => {
    pieces.set(name, data);
  };

  const registerTile = (name: string, data: TileData) => {
    tiles.set(name, data);
  };

  return (
    <PuzzleContext.Provider
      value={{
        pieces,
        tiles,
        registerPiece,
        registerTile,
        placedConnections,
        setPlacedConnections,
      }}
    >
      {children}
    </PuzzleContext.Provider>
  );
}

export function usePuzzleContext() {
  const context = React.useContext(PuzzleContext);
  if (!context) {
    throw new Error('usePuzzleContext must be used within <Puzzle>');
  }
  return context;
}