'use client';

import React from 'react';
import { PieceData } from './Puzzle';

interface SidebarProps {
  pieces: Map<string, PieceData>;
}

export function Sidebar({ pieces }: SidebarProps) {
  const pieceArray = Array.from(pieces.entries());

  return (
    <div className="w-48 bg-gray-100 dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
      <h3 className="text-sm font-bold text-gray-700 dark:text-gray-300 mb-3 uppercase tracking-wide">
        Available Pieces
      </h3>
      <div className="space-y-2">
        {pieceArray.map(([name, piece]) => (
          <div
            key={name}
            draggable
            onDragStart={(e) => {
              e.dataTransfer.effectAllowed = 'copy';
              e.dataTransfer.setData('pieceName', name);
            }}
            className="p-3 bg-white dark:bg-gray-700 border-2 border-blue-400 dark:border-blue-500 rounded-md cursor-move hover:shadow-md transition-shadow"
          >
            <div className="text-sm font-semibold text-blue-600 dark:text-blue-400">{piece.icon}</div>
            <div className="text-xs text-gray-700 dark:text-gray-300 mt-1">{piece.label}</div>
          </div>
        ))}
      </div>
      <div className="mt-4 text-xs text-gray-600 dark:text-gray-400 italic">
        Drag pieces to the empty slots in the graph
      </div>
    </div>
  );
}