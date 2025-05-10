"use client";

import { useState, useEffect } from 'react';

export default function Othello() {
  const SIZE = 8;
  const [state, setState] = useState<string[][]>(
    Array.from({ length: SIZE }, () => Array(SIZE).fill(null))
  );
  const [currentPlayer, setCurrentPlayer] = useState<'black' | 'white'>('black');

  useEffect(() => {
    const newState = [...state];
    newState[3][3] = 'white';
    newState[4][4] = 'white';
    newState[3][4] = 'black';
    newState[4][3] = 'black';
    setState(newState);
  }, []);

  const handleMove = (row: number, col: number) => {
    if (!state[row][col]) {
      const newState = [...state.map(r => [...r])];
      newState[row][col] = currentPlayer;
      setState(newState);
      setCurrentPlayer(currentPlayer === 'black' ? 'white' : 'black');
    }
  };

  return (
    <div style={{ fontFamily: 'sans-serif', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <h1>Othello</h1>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: `repeat(${SIZE}, 50px)`,
          gridTemplateRows: `repeat(${SIZE}, 50px)`,
          gap: '2px',
          marginTop: '20px'
        }}
      >
        {state.map((row, rowIndex) =>
          row.map((cell, colIndex) => (
            <div
              key={`${rowIndex}-${colIndex}`}
              onClick={() => handleMove(rowIndex, colIndex)}
              style={{
                width: '50px',
                height: '50px',
                backgroundColor: 'green',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer'
              }}
            >
              {cell && (
                <div
                  style={{
                    width: '40px',
                    height: '40px',
                    borderRadius: '50%',
                    backgroundColor: cell
                  }}
                ></div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}
