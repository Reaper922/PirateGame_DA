export const window = {
    width: 1024,
    height: 640
}

export const tileData = {
    width: 64,
    height: 64
}

export const gravity = 0.4;

export const playerData = {
    width: 44,
    height: 56,
    speed: 4,
    jumpVelocity: 9,
    spriteCorrection: {
        x: 28,
        y: 7
    },
    animationSpeed: 5,
    animations: {
        idle_left: {
            path: '/assets/sprites/player/idle_left',
            numSprites: 5
        },
        idle_right: {
            path: '/assets/sprites/player/idle_right',
            numSprites: 5
        },
        run_left: {
            path: '/assets/sprites/player/run_left',
            numSprites: 6
        },
        run_right: {
            path: '/assets/sprites/player/run_right',
            numSprites: 6
        },
        jump_left: {
            path: '/assets/sprites/player/jump_left',
            numSprites: 1
        },
        jump_right: {
            path: '/assets/sprites/player/jump_right',
            numSprites: 1
        },
        fall_left: {
            path: '/assets/sprites/player/fall_left',
            numSprites: 1
        },
        fall_right: {
            path: '/assets/sprites/player/fall_right',
            numSprites: 1
        },
        attack_right: {
            path: '/assets/sprites/player/attack_right',
            numSprites: 3
        },
        attack_left: {
            path: '/assets/sprites/player/attack_left',
            numSprites: 3
        }
    }
}

export const layerData = {
    sky: {
        id: 0,
        path: '/assets/sprites/terrain/clouds',
        data: [],
        numSprites: 3,
        spriteOffset: -5
    },
    background: {
        id: 1,
        path: '/assets/sprites/terrain/palm/bg',
        data: [],
        numSprites: 16,
        spriteOffset: -27
    },
    terrain: {
        id: 2,
        path: '/assets/sprites/terrain/land',
        data: [],
        numSprites: 53,
        spriteOffset: -40,
    },
    foreground: {
        id: 3,
        path: '/assets/sprites/terrain/palm/fg',
        data: [],
        numSprites: 16,
        spriteOffset: -8
    },
    water: {
        id: 4,
        path: '/assets/sprites/terrain/water',
        data: [],
        numSprites: 4,
        spriteOffset: 0
    }
}

export const treeBgData = {
    animationSpeed: 30,
    animations: {
        palmBig: {
            path: '/assets/sprites/terrain/palm/bg',
            numSprites: 4,
            start: 0
        },
        palmSmall: {
            path: '/assets/sprites/terrain/palm/bg',
            numSprites: 4,
            start: 4
        },
        palmLeft: {
            path: '/assets/sprites/terrain/palm/bg',
            numSprites: 4,
            start: 8
        },
        palmRight: {
            path: '/assets/sprites/terrain/palm/bg',
            numSprites: 4,
            start: 12
        }
    }
}

export const treeFgData = {
    animationSpeed: 30,
    animations: {
        palmBig: {
            path: '/assets/sprites/terrain/palm/fg',
            numSprites: 4,
            start: 0
        },
        palmSmall: {
            path: '/assets/sprites/terrain/palm/fg',
            numSprites: 4,
            start: 4
        },
        palmLeft: {
            path: '/assets/sprites/terrain/palm/fg',
            numSprites: 4,
            start: 8
        },
        palmRight: {
            path: '/assets/sprites/terrain/palm/fg',
            numSprites: 4,
            start: 12
        }
    }
}

export const waterData = {
    animationSpeed: 60,
    animations: {
        water: {
            path: '/assets/sprites/terrain/water',
            numSprites: 1,
            start: 0
        },
        water1: {
            path: '/assets/sprites/terrain/water',
            numSprites: 3,
            start: 1
        }
    }
}