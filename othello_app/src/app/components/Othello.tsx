"use client";

import { useState, useEffect } from 'react';

type Cell = 'black' | 'white' | null;
const SIZE = 8;

export default function Othello() {
  const [state, setState] = useState<Cell[][]>(
    Array.from({ length: SIZE }, () => Array(SIZE).fill(null))
  );
  const [currentPlayer, setCurrentPlayer] = useState<'black' | 'white'>('black');

  useEffect(() => {
    const initialState = Array.from({ length: SIZE }, () => Array(SIZE).fill(null));
    initialState[3][3] = 'white';
    initialState[4][4] = 'white';
    initialState[3][4] = 'black';
    initialState[4][3] = 'black';
    setState(initialState);
  }, []);

  const directions = [
    [-1, -1], [-1, 0], [-1, 1],
    [0, -1],         [0, 1],
    [1, -1], [1, 0], [1, 1],
  ];

  const isValidMove = (row: number, col: number, player: 'black' | 'white'): boolean => {
    if (state[row][col]) return false;
    const opponent = player === 'black' ? 'white' : 'black';

    for (const [dx, dy] of directions) {
      let x = row + dx;
      let y = col + dy;
      let hasOpponentBetween = false;

      while (x >= 0 && x < SIZE && y >= 0 && y < SIZE) {
        if (state[x][y] === opponent) {
          hasOpponentBetween = true;
          x += dx;
          y += dy;
        } else if (state[x][y] === player && hasOpponentBetween) {
          return true;
        } else {
          break;
        }
      }
    }
    return false;
  };

  const flipPieces = (row: number, col: number, player: 'black' | 'white') => {
    const newState = state.map(r => [...r]);
    const opponent = player === 'black' ? 'white' : 'black';
    newState[row][col] = player;

    for (const [dx, dy] of directions) {
      let x = row + dx;
      let y = col + dy;
      const toFlip: [number, number][] = [];

      while (x >= 0 && x < SIZE && y >= 0 && y < SIZE && newState[x][y] === opponent) {
        toFlip.push([x, y]);
        x += dx;
        y += dy;
      }

      if (x >= 0 && x < SIZE && y >= 0 && y < SIZE && newState[x][y] === player) {
        for (const [fx, fy] of toFlip) {
          newState[fx][fy] = player;
        }
      }
    }

    return newState;
  };

  const countPieces = (board: Cell[][]) => {
    let black = 0;
    let white = 0;
    for (const row of board) {
      for (const cell of row) {
        if (cell === 'black') black++;
        if (cell === 'white') white++;
      }
    }
    return { black, white };
  };

  const hasValidMoves = (board: Cell[][], player: 'black' | 'white') =>
    board.some((row, rowIndex) =>
      row.some((_, colIndex) => isValidMove(rowIndex, colIndex, player))
    );

  const handleMove = (row: number, col: number) => {
    if (!isValidMove(row, col, currentPlayer)) return;

    const newState = flipPieces(row, col, currentPlayer);
    setState(newState);

    const nextPlayer = currentPlayer === 'black' ? 'white' : 'black';

    if (!hasValidMoves(newState, nextPlayer)) {
      if (!hasValidMoves(newState, currentPlayer)) {
        const { black, white } = countPieces(newState);
        setTimeout(() => {
          if (black > white) alert('Black wins!');
          else if (white > black) alert('White wins!');
          else alert('It\'s a tie!');
        }, 100);
      } else {
        alert(`${nextPlayer.toUpperCase()} has no valid moves. ${currentPlayer.toUpperCase()} goes again.`);
      }
    } else {
      setCurrentPlayer(nextPlayer);
    }
  };

  return (
    <div style={{ fontFamily: 'sans-serif', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <h1>Othello - {currentPlayer.toUpperCase()}'s Turn</h1>
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
