export default function aiPlay(squares, xIsNext) {
    const emptySquaresIndexes = squares.reduce((acc, square_value, i) =>
        (square_value === null ? acc.concat(i): acc),[]
    );

    const randomIndex = Math.floor(Math.random() * emptySquaresIndexes.length);
    const randomEmptySquareIndex = emptySquaresIndexes[randomIndex];

    squares[randomEmptySquareIndex] = xIsNext ? 'X' : 'O';

    return squares
}