(function(window, undefined) {
    'use strict';
    var KEY_ENTER = 13,
        KEY_LEFT = 37,
        KEY_UP = 38,
        KEY_RIGHT = 39,
        KEY_DOWN = 40,
        
        canvas = null,
        ctx = null,
        lastPress = null,
        pressing = [],
        pause = false,
        gameover = true,
        currentMap = 0,
        worldWidth = 0,
        worldHeight = 0,
        elapsed = 0,
        cam = null,
        player = null,
        wall = [],
        lava = [],
        enemies = [],
        maps = [],
        spritesheet = new Image();
    
    maps[0] = [
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 2, 2, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 2, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1],
        [1, 1, 1, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 2, 2, 0, 0, 1, 0, 0, 1],
        [0, 2, 1, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 2, 2, 0, 0, 1, 0, 0, 0],
        [0, 2, 1, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 2, 2, 0, 0, 1, 0, 0, 0],
        [1, 1, 1, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 2, 2, 0, 0, 1, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1],
        [1, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 1, 1, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
    ];
    maps[1] = [
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 1],
        [1, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 1],
        [1, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 2, 0, 2, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 3, 0, 1, 0, 0, 0, 0, 0, 0, 0, 2, 2, 0, 2, 2, 0, 0, 0, 1, 2, 2, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 3, 0, 1],
        [1, 0, 0, 0, 0, 1, 0, 0, 0, 1, 1, 1, 1, 1, 2, 0, 2, 1, 1, 1, 1, 1, 2, 2, 1, 1, 1, 0, 0, 2, 2, 0, 0, 1, 1, 1, 0, 0, 1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 1, 1, 1, 0, 0, 1, 1, 2, 2, 2, 2, 2, 0, 2, 2, 2, 2, 2, 2, 2, 2, 0, 0, 1, 0, 2, 2, 2, 2, 0, 1, 0, 0, 0, 0, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 1, 0, 0, 0, 0, 1, 0, 0, 1],
        [1, 0, 0, 1, 0, 0, 0, 0, 1, 2, 2, 2, 2, 2, 1, 0, 1, 2, 2, 2, 2, 2, 2, 0, 0, 0, 1, 1, 2, 2, 2, 2, 1, 1, 0, 0, 0, 0, 0, 2, 2, 2, 2, 2, 1, 2, 1, 2, 2, 2, 2, 1, 0, 0, 0, 0, 1, 0, 0, 1],
        [1, 1, 1, 1, 0, 0, 0, 0, 1, 2, 2, 2, 2, 1, 1, 0, 1, 1, 2, 2, 2, 2, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 2, 2, 2, 2, 1, 1, 1, 1, 1, 2, 2, 2, 1, 0, 0, 0, 0, 1, 1, 1, 1],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [1, 1, 1, 1, 0, 0, 0, 0, 1, 2, 2, 2, 2, 1, 1, 0, 1, 1, 2, 2, 2, 2, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 2, 2, 2, 2, 1, 1, 0, 1, 1, 2, 2, 2, 1, 0, 0, 0, 0, 1, 1, 1, 1],
        [1, 0, 0, 1, 0, 0, 0, 0, 1, 2, 2, 2, 2, 2, 1, 0, 1, 2, 2, 2, 2, 2, 2, 0, 0, 0, 1, 1, 2, 2, 2, 2, 1, 1, 0, 0, 0, 0, 0, 2, 2, 2, 2, 2, 1, 0, 1, 2, 2, 2, 2, 1, 0, 0, 0, 0, 1, 0, 0, 1],
        [1, 0, 0, 1, 1, 1, 0, 0, 1, 1, 2, 2, 2, 2, 2, 0, 2, 2, 2, 2, 2, 2, 2, 2, 0, 0, 1, 0, 2, 2, 2, 2, 0, 1, 0, 0, 0, 0, 2, 2, 2, 2, 2, 2, 2, 0, 2, 2, 2, 2, 1, 1, 0, 0, 0, 0, 1, 0, 0, 1],
        [1, 0, 0, 0, 0, 1, 0, 0, 0, 1, 1, 1, 1, 1, 2, 0, 2, 1, 1, 1, 1, 1, 2, 2, 1, 1, 1, 0, 0, 2, 2, 0, 0, 1, 1, 1, 0, 0, 1, 1, 1, 1, 2, 2, 2, 0, 2, 2, 2, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 3, 0, 1, 0, 0, 0, 0, 0, 0, 0, 2, 2, 0, 2, 2, 0, 0, 0, 1, 2, 2, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 1, 1, 1, 2, 0, 2, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 3, 0, 1],
        [1, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 2, 0, 2, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 1],
        [1, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
    ];
    maps[2] = [
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4, 0, 0, 1, 0, 0, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 2, 2, 1, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 2, 0, 0, 0, 0, 0, 0, 2, 1, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 1, 2, 1, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1],
        [0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 1, 1, 2, 2, 2, 1, 1, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 2, 2, 2, 2, 2, 2, 2, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0],
        [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 2, 2, 2, 2, 2, 2, 2, 2, 2, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 0, 0, 0, 1, 0, 0, 0, 0, 1],
        [1, 0, 2, 1, 1, 1, 0, 0, 0, 0, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 0, 0, 0, 1, 1, 1, 2, 0, 1],
        [1, 2, 2, 1, 0, 0, 0, 0, 0, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 0, 0, 0, 0, 1, 2, 2, 1],
        [1, 1, 1, 1, 0, 0, 0, 0, 0, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 0, 0, 0, 0, 1, 1, 1, 1],
        [1, 2, 2, 0, 0, 4, 0, 0, 0, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 0, 0, 4, 0, 0, 2, 2, 1],
        [1, 2, 0, 0, 0, 0, 0, 1, 1, 2, 2, 2, 2, 2, 0, 0, 0, 2, 2, 2, 2, 2, 1, 1, 0, 0, 0, 0, 2, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 2, 0, 0, 0, 0, 0, 2, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 2, 0, 0, 0, 0, 0, 2, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 1, 1, 2, 2, 2, 2, 2, 0, 0, 0, 2, 2, 2, 2, 2, 1, 1, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 1, 1, 2, 2, 0, 0, 0, 0, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 0, 0, 0, 0, 0, 0, 1, 1, 1],
        [1, 1, 2, 2, 0, 0, 0, 0, 0, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1],
        [1, 2, 2, 0, 0, 0, 0, 0, 0, 0, 1, 1, 2, 2, 2, 2, 2, 2, 2, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 2, 0, 0, 0, 0, 0, 0, 0, 0, 2, 1, 1, 1, 2, 2, 2, 0, 0, 0, 2, 2, 2, 0, 0, 0, 0, 0, 0, 1],
        [1, 2, 0, 0, 0, 1, 1, 1, 0, 2, 2, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 2, 1, 1, 1, 0, 0, 0, 0, 1],
        [1, 2, 0, 0, 0, 0, 0, 1, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 2, 2, 0, 0, 0, 0, 1],
        [1, 2, 0, 0, 0, 0, 0, 1, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 2, 0, 0, 0, 0, 0, 1],
        [1, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 0, 0, 1],
        [1, 2, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
    ];

    function Camera() {
        this.x = 0;
        this.y = 0;
    }

    Camera.prototype = {
        constructor: Camera,
        
        focus: function (x, y) {
            this.x = x - canvas.width / 2;
            this.y = y - canvas.height / 2;

            if (this.x < 0) {
                this.x = 0;
            } else if (this.x > worldWidth - canvas.width) {
                this.x = worldWidth - canvas.width;
            }
            if (this.y < 0) {
                this.y = 0;
            } else if (this.y > worldHeight - canvas.height) {
                this.y = worldHeight - canvas.height;
            }
        },
        
        isoFocus: function (x, y) {
            this.x = (x / 2) - (y / 2) - canvas.width / 2;
            this.y = (x / 4) + (y / 4) - canvas.height / 2;
        }
    };
    
    function Rectangle2D(x, y, width, height, createFromTopLeft) {
        this.width = (width === undefined) ? 0 : width;
        this.height = (height === undefined) ? this.width : height;
        if (createFromTopLeft) {
            this.left = (x === undefined) ? 0 : x;
            this.top = (y === undefined) ? 0 : y;
        } else {
            this.x = (x === undefined) ? 0 : x;
            this.y = (y === undefined) ? 0 : y;
        }
    }
    
    Rectangle2D.prototype = {
        constructor: Rectangle2D,
        left: 0,
        top: 0,
        width: 0,
        height: 0,
        vx: 0,
        vy: 0,
        dir: 0,
        
        get x() {
            return this.left + this.width / 2;
        },
        set x(value) {
            this.left = value - this.width / 2;
        },
        
        get y() {
            return this.top + this.height / 2;
        },
        set y(value) {
            this.top = value - this.height / 2;
        },
        
        get right() {
            return this.left + this.width;
        },
        set right(value) {
            this.left = value - this.width;
        },
        
        get bottom() {
            return this.top + this.height;
        },
        set bottom(value) {
            this.top = value - this.height;
        },
        
        intersects: function (rect) {
            if (rect !== undefined) {
                return (this.left < rect.right &&
                    this.right > rect.left &&
                    this.top < rect.bottom &&
                    this.bottom > rect.top);
            }
        },
        
        fill: function (ctx) {
            if (ctx !== undefined) {
                if (cam !== undefined) {
                    ctx.fillRect(this.left - cam.x, this.top - cam.y, this.width, this.height);
                } else {
                    ctx.fillRect(this.left, this.top, this.width, this.height);
                }
            }
        },
        
        drawImageArea: function (ctx, cam, img, sx, sy, sw, sh) {
            if (ctx !== undefined) {
                if (cam !== undefined) {
                    if (img.width) {
                        ctx.drawImage(img, sx, sy, sw, sh, this.left - cam.x, this.top - cam.y, this.width, this.height);
                    } else {
                        ctx.strokeRect(this.left - cam.x, this.top - cam.y, this.width, this.height);
                    }
                } else {
                    if (img.width) {
                        ctx.drawImage(img, sx, sy, sw, sh, this.left, this.top, this.width, this.height);
                    } else {
                        ctx.strokeRect(this.left, this.top, this.width, this.height);
                    }
                }
            }
        },
        
        drawIsoImageArea: function (ctx, cam, img, z, sx, sy, sw, sh) {
            if (ctx !== undefined) {
                z = (z === undefined) ? 0 : z;
                if (cam !== undefined) {
                    if (img.width) {
                        ctx.drawImage(img, sx, sy, sw, sh, this.left / 2 - this.top / 2 - cam.x, this.left / 4 + this.top / 4 - z - cam.y, this.width, this.height);
                    } else {
                        ctx.strokeRect(this.left / 2 - this.top / 2 - cam.x, this.left / 4 + this.top / 4 - z - cam.y, this.width, this.height);
                    }
                } else {
                    if (img.width) {
                        ctx.drawImage(img, sx, sy, sw, sh, this.left / 2 - this.top / 2, this.left / 4 + this.top / 4 - z, this.width, this.height);
                    } else {
                        ctx.strokeRect(this.left / 2 - this.top / 2, this.left / 4 + this.top / 4 - z, this.width, this.height);
                    }
                }
            }
        }
    };

    document.addEventListener('keydown', function (evt) {
        lastPress = evt.which;
        pressing[evt.which] = true;
    }, false);

    document.addEventListener('keyup', function (evt) {
        pressing[evt.which] = false;
    }, false);

    function setMap(map, blockSize) {
        var col = 0,
            row = 0,
            columns = 0,
            rows = 0,
            enemy = null;
        wall.length = 0;
        lava.length = 0;
        enemies.length = 0;
        for (row = 0, rows = map.length; row < rows; row += 1) {
            for (col = 0, columns = map[row].length; col < columns; col += 1) {
                if (map[row][col] === 1) {
                    wall.push(new Rectangle2D(col * blockSize, row * blockSize, blockSize, blockSize, true));
                } else if (map[row][col] === 2) {
                    lava.push(new Rectangle2D(col * blockSize, row * blockSize, blockSize, blockSize, true));
                } else if (map[row][col] > 2) {
                    enemy = new Rectangle2D(col * blockSize, row * blockSize, blockSize, blockSize, true);
                    if (map[row][col] === 3) {
                        enemy.vx = 8;
                        enemy.dir = 1;
                    } else if (map[row][col] === 4) {
                        enemy.vy = 8;
                        enemy.dir = 2;
                    }
                    enemies.push(enemy);
                }
            }
        }
        worldWidth = columns * blockSize;
        worldHeight = rows * blockSize;
    }

    function reset() {
        player.dir = 1;
        player.left = 64;
        player.top = 160;
        gameover = false;
    }

    /*function fillMap(ctx, map, blockSize) {
        var col = 0,
            row = 0,
            columns = 0,
            rows = 0;
        for (row = 0, rows = map.length; row < rows; row += 1) {
            for (col = 0, columns = map[row].length; col < columns; col += 1) {
                if (map[row][col] === 1) {
                    ctx.drawImage(spritesheet, 32, 16, 16, 16, col * blockSize, row * blockSize, blockSize, blockSize);
                } else if (map[row][col] === 2) {
                    ctx.drawImage(spritesheet, 32, 32 + (~~(elapsed * 10) % 2) * 16, 16, 16, col * blockSize, row * blockSize, blockSize, blockSize);
                } else {
                    ctx.drawImage(spritesheet, 32, 0, 16, 16, col * blockSize, row * blockSize, blockSize, blockSize);
                }
            }
        }
    }*/

    function fillIsoMap(ctx, map, blockSize) {
        var col = 0,
            row = 0,
            columns = 0,
            rows = 0;
        for (row = 0, rows = map.length; row < rows; row += 1) {
            for (col = 0, columns = map[row].length; col < columns; col += 1) {
                if (map[row][col] === 1) {
                    // Draw wall
                    ctx.drawImage(spritesheet, 32, 16, 16, 16, (col * blockSize / 2) - (row * blockSize / 2) - cam.x, (row * blockSize / 4) + (col * blockSize / 4) - cam.y, blockSize, blockSize);
                } else if (map[row][col] === 2) {
                    // Draw lava
                    ctx.drawImage(spritesheet, 32, 32 + (~~(elapsed * 10) % 2) * 16, 16, 16, (col * blockSize / 2) - (row * blockSize / 2) - cam.x, (row * blockSize / 4) + (col * blockSize / 4) - cam.y, blockSize, blockSize);
                } else {
                    // Draw soil
                    ctx.drawImage(spritesheet, 32, 0, 16, 16, (col * blockSize / 2) - (row * blockSize / 2) - cam.x, (row * blockSize / 4) + (col * blockSize / 4) - cam.y, blockSize, blockSize);
                }
            }
        }
    }

    function paint(ctx) {
        var i = 0,
            l = 0;
        
        // Clean canvas
        ctx.fillStyle = '#000';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // Draw map
        fillIsoMap(ctx, maps[currentMap], 16);

        // Draw player
        player.drawIsoImageArea(ctx, cam, spritesheet, 8, (~~(elapsed * 10) % 2) * 16, player.dir * 16, 16, 16);

        // Draw enemies
        for (i = 0, l = enemies.length; i < l; i += 1) {
            enemies[i].drawIsoImageArea(ctx, cam, spritesheet, 8, 48 + (~~(elapsed * 10) % 2) * 16, enemies[i].dir * 16, 16, 16);
        }

        // Debug last key pressed
        ctx.fillStyle = '#fff';
        ctx.fillText('Last Press: ' + lastPress, 0, 20);
        
        // Draw pause
        if (pause) {
            ctx.textAlign = 'center';
            if (gameover) {
                ctx.fillText('GAMEOVER', 120, 80);
            } else {
                ctx.fillText('PAUSE', 120, 80);
            }
            ctx.textAlign = 'left';
        }
    }

    function act(deltaTime) {
        var i = 0,
            l = 0,
            j = 0,
            jl = 0;
        
        if (!pause) {
            // GameOver Reset
            if (gameover) {
                reset();
            }

            // Move Rect
            if (pressing[KEY_UP]) {
                player.dir = 0;
                player.y -= 8;
                for (i = 0, l = wall.length; i < l; i += 1) {
                    if (player.intersects(wall[i])) {
                        player.top = wall[i].bottom;
                    }
                }
            }
            if (pressing[KEY_RIGHT]) {
                player.dir = 1;
                player.x += 8;
                for (i = 0, l = wall.length; i < l; i += 1) {
                    if (player.intersects(wall[i])) {
                        player.right = wall[i].left;
                    }
                }
            }
            if (pressing[KEY_DOWN]) {
                player.dir = 2;
                player.y += 8;
                for (i = 0, l = wall.length; i < l; i += 1) {
                    if (player.intersects(wall[i])) {
                        player.bottom = wall[i].top;
                    }
                }
            }
            if (pressing[KEY_LEFT]) {
                player.dir = 3;
                player.x -= 8;
                for (i = 0, l = wall.length; i < l; i += 1) {
                    if (player.intersects(wall[i])) {
                        player.left = wall[i].right;
                    }
                }
            }

            // Out Screen
            if (player.x > worldWidth) {
                currentMap += 1;
                if (currentMap > maps.length - 1) {
                    currentMap = 0;
                }
                setMap(maps[currentMap], 16);
                player.x = 0;
            }
            if (player.y > worldHeight) {
                player.y = 0;
            }
            if (player.x < 0) {
                currentMap -= 1;
                if (currentMap < 0) {
                    currentMap = maps.length - 1;
                }
                setMap(maps[currentMap], 16);
                player.x = worldWidth;
            }
            if (player.y < 0) {
                player.y = worldHeight;
            }

            // Move enemies
            for (i = 0, l = enemies.length; i < l; i += 1) {
                if (enemies[i].vx !== 0) {
                    enemies[i].x += enemies[i].vx;

                    for (j = 0, jl = wall.length; j < jl; j += 1) {
                        if (enemies[i].intersects(wall[j])) {
                            enemies[i].vx *= -1;
                            enemies[i].x += enemies[i].vx;
                            enemies[i].dir += 2;
                            if (enemies[i].dir > 3) {
                                enemies[i].dir -= 4;
                            }
                            break;
                        }
                    }
                }

                if (enemies[i].vy !== 0) {
                    enemies[i].y += enemies[i].vy;

                    for (j = 0, jl = wall.length; j < jl; j += 1) {
                        if (enemies[i].intersects(wall[j])) {
                            enemies[i].vy *= -1;
                            enemies[i].y += enemies[i].vy;
                            enemies[i].dir += 2;
                            if (enemies[i].dir > 3) {
                                enemies[i].dir -= 4;
                            }
                            break;
                        }
                    }
                }

                // Player Intersects Enemy
                if (player.intersects(enemies[i])) {
                    gameover = true;
                    pause = true;
                }
            }

            // Player Intersects Lava
            for (i = 0, l = lava.length; i < l; i += 1) {
                if (player.intersects(lava[i])) {
                    gameover = true;
                    pause = true;
                }
            }

            // Focus player
            //cam.focus(player.x, player.y);
            cam.isoFocus(player.x, player.y);

            // Elapsed time
            elapsed += deltaTime;
            if (elapsed > 3600) {
                elapsed -= 3600;
            }
        }
        // Pause/Unpause
        if (lastPress === KEY_ENTER) {
            pause = !pause;
            lastPress = null;
        }
    }

    function repaint() {
        window.requestAnimationFrame(repaint);
        paint(ctx);
    }

    function run() {
        setTimeout(run, 50);
        act(0.05);
    }

    function init() {
        // Get canvas and context
        canvas = document.getElementById('canvas');
        ctx = canvas.getContext('2d');
        canvas.width = 240;
        canvas.height = 160;
        worldWidth = canvas.width;
        worldHeight = canvas.height;
        
        // Load assets
        spritesheet.src = 'assets/iso-sprites.png';
        
        // Create camera and player
        cam = new Camera();
        player = new Rectangle2D(64, 64, 16, 16, true);

        // Set initial map
        setMap(maps[0], 16);
        
        // Start game
        run();
        repaint();
    }

    window.addEventListener('load', init, false);
}(window));