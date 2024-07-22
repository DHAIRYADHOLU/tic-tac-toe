export const checkWinner = (board) => {
  const lines = [];

  // Add rows and columns
  for (let l = 0; l < 4; l++) {
    for (let r = 0; r < 4; r++) {
      lines.push([
        [l, r, 0],
        [l, r, 1],
        [l, r, 2],
        [l, r, 3],
      ]); // rows
      lines.push([
        [l, 0, r],
        [l, 1, r],
        [l, 2, r],
        [l, 3, r],
      ]); // columns
    }
  }

  // Add layers
  for (let r = 0; r < 4; r++) {
    for (let c = 0; c < 4; c++) {
      lines.push([
        [0, r, c],
        [1, r, c],
        [2, r, c],
        [3, r, c],
      ]); // layers
    }
  }

  // Add diagonals (4x4x4)
  lines.push([
    [0, 0, 0],
    [1, 1, 1],
    [2, 2, 2],
    [3, 3, 3],
  ]);
  lines.push([
    [0, 0, 3],
    [1, 1, 2],
    [2, 2, 1],
    [3, 3, 0],
  ]);

  for (let line of lines) {
    const [a, b, c, d] = line;
    if (
      board[a[0]][a[1]][a[2]] &&
      board[a[0]][a[1]][a[2]] === board[b[0]][b[1]][b[2]] &&
      board[a[0]][a[1]][a[2]] === board[c[0]][c[1]][c[2]] &&
      board[a[0]][a[1]][a[2]] === board[d[0]][d[1]][d[2]]
    ) {
      return board[a[0]][a[1]][a[2]];
    }
  }
  return null;
};

export const getBestMove = (board) => {
  const emptyCells = [];
  for (let l = 0; l < 4; l++) {
    for (let r = 0; r < 4; r++) {
      for (let c = 0; c < 4; c++) {
        if (!board[l][r][c]) {
          emptyCells.push({ layer: l, row: r, col: c });
        }
      }
    }
  }

  if (emptyCells.length > 0) {
    return emptyCells[Math.floor(Math.random() * emptyCells.length)];
  }
  return null;
};
