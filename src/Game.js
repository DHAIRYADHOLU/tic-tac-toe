import React, { useState, useEffect } from 'react';
import { checkWinner, getBestMove } from './gameLogic';

const Game = () => {
  const initialBoard = Array(4)
    .fill(null)
    .map(() =>
      Array(4)
        .fill(null)
        .map(() => Array(4).fill(null))
    );
  const [board, setBoard] = useState(initialBoard);
  const [currentPlayer, setCurrentPlayer] = useState('X');
  const [winner, setWinner] = useState(null);
  const [firstMove, setFirstMove] = useState('Player');

  useEffect(() => {
    if (currentPlayer === 'O' && firstMove === 'Computer' && !winner) {
      const bestMove = getBestMove(board);
      if (bestMove) {
        handleClick(bestMove.layer, bestMove.row, bestMove.col);
      }
    }
  }, [currentPlayer, firstMove, winner, board]);

  const handleClick = (layer, row, col) => {
    if (board[layer][row][col] || winner) return; // Prevent move if cell is occupied or there's a winner

    const newBoard = board.map((layerArr, lIndex) =>
      layerArr.map((rowArr, rIndex) =>
        rowArr.map((cell, cIndex) =>
          lIndex === layer && rIndex === row && cIndex === col
            ? currentPlayer
            : cell
        )
      )
    );

    setBoard(newBoard);
    const newWinner = checkWinner(newBoard);
    setWinner(newWinner);
    setCurrentPlayer(currentPlayer === 'X' ? 'O' : 'X');
  };

  const handleFirstMoveChange = (event) => {
    const move = event.target.value;
    setFirstMove(move);
    setCurrentPlayer(move === 'Player' ? 'X' : 'O');

    // Reset the board for a new game when selecting first move
    const resetBoard = initialBoard.map((layer) =>
      layer.map((row) => row.slice())
    );
    setBoard(resetBoard);
    setWinner(null); // Clear the winner state

    if (move === 'Computer') {
      const bestMove = getBestMove(resetBoard);
      if (bestMove) {
        resetBoard[bestMove.layer][bestMove.row][bestMove.col] = 'O';
        setBoard(resetBoard);
        setCurrentPlayer('X');
      }
    }
  };

  const resetGame = () => {
    setBoard(initialBoard);
    setWinner(null);
    setCurrentPlayer('X');
    setFirstMove('Player');
  };

  return (
    <div className='game'>
      <div>
        <label>
          <input
            type='radio'
            value='Player'
            checked={firstMove === 'Player'}
            onChange={handleFirstMoveChange}
          />
          Play with Friend
        </label>
        <label>
          <input
            type='radio'
            value='Computer'
            checked={firstMove === 'Computer'}
            onChange={handleFirstMoveChange}
          />
          Play with Computer
        </label>
      </div>
      <div className='board'>
        {board.map((layer, layerIndex) => (
          <div key={layerIndex} className='layer'>
            {layer.map((row, rowIndex) => (
              <div key={rowIndex} className='row'>
                {row.map((cell, cellIndex) => (
                  <div
                    key={cellIndex}
                    className='cell'
                    onClick={() => handleClick(layerIndex, rowIndex, cellIndex)}
                  >
                    {cell}
                  </div>
                ))}
              </div>
            ))}
          </div>
        ))}
      </div>
      {winner && (
        <div>
          <p>Winner: {winner === 'X' ? 'Player' : 'Computer'}</p>
          <button onClick={resetGame}>Start A New Game</button>
        </div>
      )}
    </div>
  );
};

export default Game;
