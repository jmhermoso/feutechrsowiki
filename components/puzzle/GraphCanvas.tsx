'use client';

import React, { useState } from 'react';
import { PieceData, TileData } from './Puzzle';

interface Connection {
  from: string;
  to: string;
}

interface GraphCanvasProps {
  pieces: Map<string, PieceData>;
  tiles: Map<string, TileData>;
  solution: Connection[];
  placedConnections: Connection[];
  onConnectionsChange: (connections: Connection[]) => void;
}

interface Node {
  id: string;
  label: string;
  icon: string;
  type: 'piece' | 'tile';
  x: number;
  y: number;
}

export function GraphCanvas({
  pieces,
  tiles,
  placedConnections,
  onConnectionsChange,
}: GraphCanvasProps) {
  const [draggingConnection, setDraggingConnection] = useState<{
    from: string;
    currentX: number;
    currentY: number;
  } | null>(null);

  // Build nodes from pieces and tiles
  const nodes: Node[] = [
    ...Array.from(pieces.entries()).map(([id, piece], idx) => ({
      id,
      label: piece.label,
      icon: piece.icon,
      type: 'piece' as const,
      x: 50,
      y: 80 + idx * 100,
    })),
    ...Array.from(tiles.entries()).map(([id, tile], idx) => ({
      id,
      label: tile.label,
      icon: tile.icon,
      type: 'tile' as const,
      x: 400,
      y: 80 + idx * 100,
    })),
  ];

  const handleStartConnection = (fromId: string, e: React.MouseEvent) => {
    e.preventDefault();
    const node = nodes.find((n) => n.id === fromId);
    if (node) {
      setDraggingConnection({
        from: fromId,
        currentX: e.clientX,
        currentY: e.clientY,
      });
    }
  };

  const handleMouseMove = (e: React.MouseEvent<SVGSVGElement>) => {
    if (draggingConnection) {
      setDraggingConnection((prev) =>
        prev ? { ...prev, currentX: e.clientX, currentY: e.clientY } : null,
      );
    }
  };

  const handleEndConnection = (toId: string) => {
    if (draggingConnection && draggingConnection.from !== toId) {
      const fromNode = nodes.find((n) => n.id === draggingConnection.from);
      const toNode = nodes.find((n) => n.id === toId);

      // Only allow connections from pieces to tiles
      if (fromNode?.type === 'piece' && toNode?.type === 'tile') {
        const newConnection = { from: draggingConnection.from, to: toId };

        // Check if connection already exists
        const exists = placedConnections.some(
          (conn) => conn.from === newConnection.from && conn.to === newConnection.to,
        );

        if (!exists) {
          onConnectionsChange([...placedConnections, newConnection]);
        }
      }
    }
    setDraggingConnection(null);
  };

  const removeConnection = (from: string, to: string) => {
    onConnectionsChange(
      placedConnections.filter((conn) => !(conn.from === from && conn.to === to)),
    );
  };

  return (
    <div className="flex-1 bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-700 p-6 relative overflow-hidden">
      <svg
        className="w-full h-96"
        onMouseMove={handleMouseMove}
        onMouseLeave={() => setDraggingConnection(null)}
      >
        {/* Grid background */}
        <defs>
          <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
            <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#e5e7eb" strokeWidth="0.5" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid)" />

        {/* Draw existing connections */}
        {placedConnections.map((conn, idx) => {
          const fromNode = nodes.find((n) => n.id === conn.from);
          const toNode = nodes.find((n) => n.id === conn.to);
          if (!fromNode || !toNode) return null;

          return (
            <g key={`conn-${idx}`}>
              <line
                x1={fromNode.x + 50}
                y1={fromNode.y}
                x2={toNode.x - 30}
                y2={toNode.y}
                stroke="#3b82f6"
                strokeWidth="2"
                markerEnd="url(#arrowhead)"
              />
              <circle
                cx={(fromNode.x + toNode.x) / 2}
                cy={(fromNode.y + toNode.y) / 2}
                r="8"
                fill="#ef4444"
                className="cursor-pointer hover:r-10"
                onClick={() => removeConnection(conn.from, conn.to)}
              />
              <text
                x={(fromNode.x + toNode.x) / 2}
                y={(fromNode.y + toNode.y) / 2 + 4}
                textAnchor="middle"
                fontSize="10"
                fill="white"
                className="pointer-events-none select-none"
                fontWeight="bold"
              >
                ×
              </text>
            </g>
          );
        })}

        {/* Draw dragging connection preview */}
        {draggingConnection && (
          <line
            x1={nodes.find((n) => n.id === draggingConnection.from)?.x || 0}
            y1={nodes.find((n) => n.id === draggingConnection.from)?.y || 0}
            x2={draggingConnection.currentX}
            y2={draggingConnection.currentY}
            stroke="#9ca3af"
            strokeWidth="2"
            strokeDasharray="5,5"
            opacity="0.5"
          />
        )}

        {/* Arrow marker */}
        <defs>
          <marker
            id="arrowhead"
            markerWidth="10"
            markerHeight="10"
            refX="9"
            refY="3"
            orient="auto"
          >
            <polygon points="0 0, 10 3, 0 6" fill="#3b82f6" />
          </marker>
        </defs>

        {/* Draw nodes */}
        {nodes.map((node) => (
          <g key={node.id}>
            {/* Node circle */}
            <circle
              cx={node.x}
              cy={node.y}
              r="30"
              fill={node.type === 'piece' ? '#dbeafe' : '#f3f4f6'}
              stroke={node.type === 'piece' ? '#3b82f6' : '#9ca3af'}
              strokeWidth="2"
              className={node.type === 'piece' ? 'cursor-move' : 'cursor-default'}
              onMouseDown={(e) => {
                if (node.type === 'piece') {
                  handleStartConnection(node.id, e);
                }
              }}
              onMouseUp={() => handleEndConnection(node.id)}
            />
            {/* Icon */}
            <text
              x={node.x}
              y={node.y - 8}
              textAnchor="middle"
              fontSize="20"
              className="pointer-events-none select-none"
            >
              {node.icon}
            </text>
            {/* Label */}
            <text
              x={node.x}
              y={node.y + 18}
              textAnchor="middle"
              fontSize="12"
              fontWeight="bold"
              fill={node.type === 'piece' ? '#1e40af' : '#4b5563'}
              className="pointer-events-none select-none"
            >
              {node.label.substring(0, 12)}
            </text>
          </g>
        ))}
      </svg>

      {/* Connection count */}
      <div className="mt-3 text-xs text-gray-600 dark:text-gray-400">
        Connections: {placedConnections.length} / {nodes.filter((n) => n.type === 'piece').length}
      </div>
    </div>
  );
}