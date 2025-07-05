/*
Game logic service to handle game operations.

@author kingabreel
*/

import { GAME } from '../const/Game.js';
import { randomService } from './randomService.js';
import { Player } from '../model/player.js';
import { PLAYERS as Players } from '../const/Player.js';
import { createInterface } from 'readline/promises';
import { stdin as input, stdout as output } from 'node:process';

const TRACK_LENGTH = 30;


export async function createPlayer() {
    const rl = createInterface({ input, output });

    for (let i = 0; i < Players.length; i++) {
        console.log(`${i + 1} - ${Players[i].NAME} | spd: ${Players[i].SPEED} | dir: ${Players[i].DIRECTION} | pwr: ${Players[i].POWER} |`);
    }

    const answer = await rl.question('Select a player: ');
    rl.close();

    const index = parseInt(answer, 10);

    if (isNaN(index) || index < 1 || index > Players.length) {
        console.log('Invalid player selection. Please try again.');
        return null;
    }

    return new Player(Players[index - 1]);
}

