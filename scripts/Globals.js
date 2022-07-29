const default_width = 1364;

export function getScale() {
        return (window.innerWidth / default_width);
}

export const STATUS = {
        LOBBY: 0,
        GAME: 1
};

export const GAME = {
        WIDTH_GAME: window.innerWidth,
        HEIGHT_GAME: window.innerHeight,
        SMALL_SIZE: getScale() * 20,
        BIG_SIZE: getScale() * 100,
        DIAMETER: 16 * getScale(),
        RADIUS: 8 * getScale(),
        SCALE: 20 * getScale(),
        STATUS: STATUS.LOBBY,
        IN_GAME: false,
        game: null
};
