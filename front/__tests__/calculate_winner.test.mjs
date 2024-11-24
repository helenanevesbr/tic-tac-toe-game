/* eslint-disable jest/valid-expect */
/* eslint-disable no-unused-expressions */
import calculateWinner from "../src/models/calculate_winner.mjs";
import { expect } from 'chai';


describe("calculateWinner", () => {
    it("should return null if no winner", function() {
      const squares = Array(9).fill(null);
      const result = calculateWinner(squares);
      expect(result).to.be.null;
    });
  
    it("should return X if X wins horizontally", () => {
      const squares = [
        "X", "X", "X",
        null, null, null,
        null, null, null
    ];
      const result = calculateWinner(squares);
      expect(result).to.equal("X");
    });
  
    it("should return O if O wins diagonally", () => {
      const squares = [
        "O", null, null,
        null, "O", null,
        null, null, "O"
    ];
      const result = calculateWinner(squares);
      expect(result).to.equal("O");
    });
  
    it("should return X if X wins vertically", () => {
      const squares = [
        "X", null, null,
        "X", null, null,
        "X", null, null
    ];
      const result = calculateWinner(squares);
      expect(result).to.equal("X");
    });
  
    it("should return null if game is a tie", () => {
      const squares = [
        "X", "O", "X",
        "O", "X", "O",
        "O", "X", "O"
    ];
      const result = calculateWinner(squares);
      expect(result).to.be.null;
    });
});