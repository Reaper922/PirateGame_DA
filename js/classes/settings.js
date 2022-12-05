export const window = {
    width: 1024,
    height: 640
}

export const gravity = 0.4;

export const playerData = {
    width: 44,
    height: 56,
    speed: 4,
    jumpVelocity: 9,
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
        sprites: [],
        numSprites: 3,
        spriteOffset: -5
    },
    background: {
        id: 1,
        path: '/assets/sprites/terrain/palm/bg',
        data: [],
        sprites: [],
        numSprites: 16,
        spriteOffset: -27
    },
    terrain: {
        id: 2,
        path: '/assets/sprites/terrain/land',
        data: [],
        sprites: [],
        numSprites: 53,
        spriteOffset: -40,
    },
    foreground: {
        id: 3,
        path: '/assets/sprites/terrain/palm/fg',
        data: [],
        sprites: [],
        numSprites: 16,
        spriteOffset: -8
    }
}
