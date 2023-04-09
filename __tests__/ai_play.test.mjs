/* eslint-disable jest/valid-expect */
import aiPlay from '../src/models/ai_play.mjs';
import { expect } from 'chai';

describe("aiPlay", () =>{
  const marker = 'O'
  it('should return the same array if there are no empty squares', () => {
    const squares =[
      'X', 'O', 'X',
      'O', 'X', 'O',
      'X', 'O', 'X'
    ];
    const result = aiPlay(squares, marker, true);
    expect(result).to.deep.equal(squares);
  });

  it("should win the game if a winning move is available", () => {
    const squares = [
      null, null, null,
      'O', 'X', null,
      'O', null, null
    ];
    const result = aiPlay(squares, marker, true);
    expect(result[0]).to.equal(marker);
  });

  it("should block a winning move from the opponent if available", () => {
    const squares =[
      null, null, null,
      null, 'X', null,
      'O', null, 'X'
    ];
    const result = aiPlay(squares, marker, true);
    expect(result[0]).to.equal(marker);
  });

  it("should mark the center square if available", () => {
    const squares = [
      'X', null, null,
      null, null , null,
      null, null, null
    ];
    const result = aiPlay(squares, marker, true);
    expect(result[4]).to.equal(marker);
  });

  it("should mark any corner square if available", () => {
    const squares = [
      null, null, null,
      null, 'X' , null,
      null, null, null
    ];
    const result = aiPlay(squares, marker, true);
    expect(result[0] || result[2] || result[6] || result[8]).to.equal(marker);
  });

  it("should make a random move if no winning moves are available", () => {
    const squares = [
      "O",   "X", "X",
      "X",   "O", "O",
      "O", null, "X"
    ];
    const result = aiPlay(squares, marker, true);
    expect(result[7]).to.equal(marker);
  });
});