import { createPlayer } from "./src/service/game.js";

const me = await createPlayer();

console.log(`You have selected: ${me.getName()}`);