/*
Main entry point for the Kart Simulator game.

@author kingabreel
*/

import { createPlayer, movePlayer, checkForConfrontations, createBotPlayers, play } from "./src/service/game.js";

const TOTAL_BOTS = 2;

async function main() {
    const me = await createPlayer();
    if (!me) return;

    console.log(`You have selected: ${me.getName()}`);

    createBotPlayers(me, TOTAL_BOTS);

    await play();
}

main();
