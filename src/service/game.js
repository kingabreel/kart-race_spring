/*
Game logic service to handle game operations.

@author kingabreel
*/

import { GAME, LANE, GAME_BLOCK} from '../const/Game.js';
import { randomService } from './randomService.js';
import { Player } from '../model/player.js';
import { PLAYERS as Players } from '../const/Player.js';
import { createInterface } from 'readline/promises';
import { stdin as input, stdout as output } from 'node:process';

const LANES = [LANE.LEFT, LANE.CENTER, LANE.RIGHT];

const TRACK_LENGTH = 30;

const currentPlayers = [];

async function createPlayer() {
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

function movePlayer(playerName) {
    const player = currentPlayers.find(p => p.getName() === playerName);
    const roll = randomService.rollDice();

    console.log(`${playerName}: ${roll} points`);

    let newPosition = player.getPosition() + roll;

    if (newPosition > TRACK_LENGTH) {
        newPosition = TRACK_LENGTH;
    }

    player.setPosition(newPosition);

    if (roll === 6) {
        const currentLaneIndex = LANES.indexOf(player.lane);
        const laneOptions = [];

        if (currentLaneIndex > 0) {
        laneOptions.push(LANES[currentLaneIndex - 1]);
        }
        if (currentLaneIndex < LANES.length - 1) {
        laneOptions.push(LANES[currentLaneIndex + 1]);
        }

        const newLane = laneOptions[Math.floor(Math.random() * laneOptions.length)];
        console.log(`${playerName} changed to: ${player.lane} → ${newLane}`);
        player.lane = newLane;
    }

    console.log(`${playerName} is at ${player.position} (${player.lane})\n`);
}

async function handleConfrontation(player1, player2) {
    const roll1 = randomService.rollDice();
    const roll2 = randomService.rollDice();
    const blockType = randomService.getRandomBlock();

    let attr1 = 0;
    let attr2 = 0;
    let attrName = '';

    switch (blockType) {
        case GAME_BLOCK.STRAIGHT:
            attr1 = player1.getSpeed();
            attr2 = player2.getSpeed();
            attrName = 'speed';
            break;
        case GAME_BLOCK.CURVE:
            attr1 = player1.getDirection();
            attr2 = player2.getDirection();
            attrName = 'direction';
            break;
        case GAME_BLOCK.CONFRONT:
            attr1 = player1.getPower();
            attr2 = player2.getPower();
            attrName = 'power';
            break;
        default:
            console.log('error!');
            return;
    }

    const total1 = roll1 + attr1;
    const total2 = roll2 + attr2;

    console.log(`\nBattle (${blockType})`);
    console.log(`${player1.getName()}: d6(${roll1}) + ${attrName}(${attr1}) = ${total1}`);
    console.log(`${player2.getName()}: d6(${roll2}) + ${attrName}(${attr2}) = ${total2}`);

    await new Promise(resolve => setTimeout(resolve, 5000));
    if (blockType === GAME_BLOCK.CONFRONT) {
        if (total1 > total2) {
            applyLoss(player2);
        } else if (total2 > total1) {
            applyLoss(player1);
        } else {
            console.log('Draw.');
        }
    } else {
        if (total1 > total2) {
            player1.position += 1;
            console.log(`${player1.getName()} + 1 point! ${player1.getPosition()}`);
        } else if (total2 > total1) {
            player2.position += 1;
            console.log(`${player2.getName()} + 1 point! ${player2.getPosition()}`);
        } else {
            console.log('Draw.');
        }
    }
    await new Promise(resolve => setTimeout(resolve, 3000));
}

function applyLoss(player) {
    if (player.position > 0) {
        player.position = Math.max(0, player.position - 1);
        console.log(`${player.name} - 1 point! ${player.position}`);
    } else {
        console.log(`${player.name} - 0 points.`);
    }
}

async function checkForConfrontations() {
    for (let i = 0; i < currentPlayers.length; i++) {
        for (let j = i + 1; j < currentPlayers.length; j++) {
            const p1 = currentPlayers[i];
            const p2 = currentPlayers[j];

            if (p1.position === p2.position && p1.lane === p2.lane) {
                await new Promise(resolve => setTimeout(resolve, 5000));
                await handleConfrontation(p1, p2);
            }
        }
    }
}

function createBotPlayers(me, count) {
    const bots = [];
    const usedIndexes = new Set();

    while (bots.length < count) {
        const index = Math.floor(Math.random() * Players.length);
        if (!usedIndexes.has(index)) {
        usedIndexes.add(index);
        const bot = new Player(Players[index]);
        console.log(`Bot created: ${bot.getName()}`);
        bots.push(bot);
        }
    }

    currentPlayers.push(me, ...bots);
}

async function play() {
    let round = 1;
    let winner = null;

    while (!winner) {
        console.log(`\n ==--- Round ${round} ---== `);

        for (const player of currentPlayers) {
            await movePlayer(player.getName());
        }

        await checkForConfrontations();

        winner = checkWinner(currentPlayers);

        round++;
        await new Promise(resolve => setTimeout(resolve, 1000));
    }

    console.log(`\n${winner.getName()} won!`);
}

function checkWinner(players) {
    return players.find(player => player.position >= TRACK_LENGTH);
}

export {
  createPlayer,
  movePlayer,
  handleConfrontation,
  checkForConfrontations,
  createBotPlayers,
  play
};
