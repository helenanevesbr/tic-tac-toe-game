/* eslint-disable jest/valid-expect */
import aiPlay from '../src/models/ai_play.mjs';
import { expect } from 'chai';

describe("aiPlay", () =>{ 
  it('should return the same array if there are no empty squares', () => {
    const squares =[
      'X', 'O', 'X',
      'O', 'X', 'O',
      'X', 'O', 'X'
    ];
    const marker = 'O';
    const result = aiPlay(squares, marker);
    expect(result).to.deep.equal(squares);
  });
});
