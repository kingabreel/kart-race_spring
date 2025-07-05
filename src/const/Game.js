export const LANE = {
    CENTER: 'center',
    LEFT: 'left',
    RIGHT: 'right',
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

export const GAME = [LANE, GAME_BLOCK, GAME_STATUS];