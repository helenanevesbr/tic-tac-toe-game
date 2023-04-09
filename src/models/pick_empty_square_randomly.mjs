export default function pickEmptySquareRandomly(emptySquaresIndexes){
    const randomIndex = Math.floor(Math.random() * emptySquaresIndexes.length);
    const randomEmptySquareIndex = emptySquaresIndexes[randomIndex];
    
    return randomEmptySquareIndex
}