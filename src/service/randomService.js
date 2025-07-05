/* 
Service to generate random values.

@author kingabreel
*/
import { GAME_BLOCK } from '../const/Game.js';

function rollDice() {
    min = Math.ceil(1);
    max = Math.floor(6);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getRandomBlock() {
    const blocks = [
        GAME_BLOCK.STRAIGHT,
        GAME_BLOCK.CURVE,
        GAME_BLOCK.CONFRONT
    ];
    const randomIndex = Math.floor(Math.random() * blocks.length);
    return blocks[randomIndex];
}


export const randomService = {rollDice, getRandomBlock};