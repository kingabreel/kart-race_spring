import { LANE } from '../const/Game.js';

export class Player {
    constructor(player) {
        this.player = player;
        this.position = 0;
        this.isFinished = false;
        this.lane = LANE.CENTER;
    }

    getName() {
        return this.player.NAME;
    }

    getSpeed() {
        return this.player.SPEED;
    }

    getDirection() {
        return this.player.DIRECTION;
    }

    getPower() {
        return this.player.POWER;
    }

    getPosition() {
        return this.position;
    }
}