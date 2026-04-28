'use client';

import React, { useState, useEffect } from 'react';
import { usePuzzleContext } from './Puzzle';
import { Sidebar } from './Sidebar';
import { GraphCanvas } from './GraphCanvas';
import { FeedbackDisplay } from './FeedbackDisplay';

interface Connection {
  from: string;
  to: string;
}

interface GraphProps {
  solution: Connection[];
  successMessage?: string;
  failureMessage?: string;
}

export function Graph({ solution, successMessage, failureMessage }: GraphProps) {
  const { pieces, tiles, placedConnections, setPlacedConnections } = usePuzzleContext();
  const [validationResult, setValidationResult] = useState<{
    isValid: boolean;
    message: string;
  } | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const validatePuzzle = () => {
    // Check if all connections match the solution
    const isCorrect =
      placedConnections.length === solution.length &&
      solution.every((solutionConn) =>
        placedConnections.some(
          (placedConn) =>
            placedConn.from === solutionConn.from && placedConn.to === solutionConn.to,
        ),
      );

    setValidationResult({
      isValid: isCorrect,
      message: isCorrect ? successMessage || '✅ Success!' : failureMessage || '❌ Try again',
    });
  };

  const resetPuzzle = () => {
    setPlacedConnections([]);
    setValidationResult(null);
  };

  if (!mounted) return null;

  return (
    <div className="w-full space-y-4">
      <div className="flex gap-6">
        {/* Sidebar with draggable pieces */}
        <Sidebar pieces={pieces} />

        {/* Graph canvas */}
        <GraphCanvas
          pieces={pieces}
          tiles={tiles}
          solution={solution}
          placedConnections={placedConnections}
          onConnectionsChange={setPlacedConnections}
        />
      </div>

      {/* Feedback display */}
      <FeedbackDisplay validationResult={validationResult} />

      {/* Action buttons */}
      <div className="flex gap-3">
        <button
          onClick={validatePuzzle}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
        >
          Check Solution
        </button>
        <button
          onClick={resetPuzzle}
          className="px-4 py-2 bg-gray-300 text-gray-800 rounded-lg hover:bg-gray-400 transition-colors font-medium dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600"
        >
          Reset
        </button>
      </div>
    </div>
  );
}