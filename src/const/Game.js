export const RUN = {
    FORWARD: 'forward',
    TURN_LEFT: 'turn_left',
    TURN_RIGHT: 'turn_right',
};

export const GAME_BLOCK = {
    STRAIGHT: 'straight',
    CURVE: 'curve',
    CONFRONT: 'confront',
}

export const GAME_STATUS = {
    START: 'start',
    RUNNING: 'running',
    FINISHED: 'finished',
    ABORTED: 'aborted',
    ERROR: 'error'
}

export const GAME = [RUN, GAME_BLOCK, GAME_STATUS];