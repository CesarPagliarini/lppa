(function (window, undefined) {
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
        onGround = false,
        worldWidth = 0,
        worldHeight = 0,
        elapsed = 0,
        cam = null,
        player = null,
        wall = [],
        spritesheet = new Image(),
        map0 = [
            [2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2],
            [2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2],
            [2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2],
            [2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2],
            [2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 3, 3, 0, 0, 2],
            [2, 0, 0, 3, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 3, 3, 0, 0, 2],
            [2, 0, 0, 0, 0, 3, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2],
            [2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2],
            [2, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2],
            [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
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
        this.scale = {x: 1, y: 1};
    }
    
    Rectangle2D.prototype = {
        constructor: Rectangle2D,
        left: 0,
        top: 0,
        width: 0,
        height: 0,
        vx: 0,
        vy: 0,
        type: 0,
        
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
                if (img.width) {
                    ctx.save();
                    if (cam !== undefined) {
                        ctx.translate(this.x - cam.x, this.y - cam.y);
                    } else {
                        ctx.translate(this.x, this.y);
                    }
                    ctx.scale(this.scale.x, this.scale.y);
                    //ctx.rotate(this.rotation * Math.PI / 180);
                    ctx.drawImage(img, sx, sy, sw, sh, -this.width / 2, -this.height / 2, this.width, this.height);
                    ctx.restore();
                } else {
                    if (cam !== undefined) {
                        ctx.strokeRect(this.left - cam.x, this.top - cam.y, this.width, this.height);
                    } else {
                        ctx.strokeRect(this.left, this.top, this.width, this.height);
                    }
                }
            }
        }
    };

    document.addEventListener('keydown', function (evt) {
        if (!pressing[evt.which]) {
            lastPress = evt.which;
        }
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
            rect = null;
        wall.length = 0;
        for (row = 0, rows = map.length; row < rows; row += 1) {
            for (col = 0, columns = map[row].length; col < columns; col += 1) {
                if (map[row][col] > 0) {
                    rect = new Rectangle2D(col * blockSize, row * blockSize, blockSize, blockSize, true);
                    rect.type = map[row][col];
                    wall.push(rect);
                }
            }
        }
        worldWidth = columns * blockSize;
        worldHeight = rows * blockSize;
    }

    function reset() {
        player.left = 48;
        player.top = 16;
        player.vx = 0;
        player.vy = 0;
        gameover = false;
    }

    function paint(ctx) {
        var i = 0,
            l = 0;
        
        // Clean canvas
        ctx.fillStyle = '#9cf';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // Draw player
        ctx.strokeStyle = '#0f0';
        if (!onGround) {
            player.drawImageArea(ctx, cam, spritesheet, 16, 16, 16, 32);
        } else if (player.vx === 0) {
            player.drawImageArea(ctx, cam, spritesheet, 0, 16, 16, 32);
        } else {
            player.drawImageArea(ctx, cam, spritesheet, (~~(elapsed * 10) % 2) * 16, 16, 16, 32);
        }

        // Draw walls
        ctx.strokeStyle = '#999';
        for (i = 0, l = wall.length; i < l; i += 1) {
            wall[i].drawImageArea(ctx, cam, spritesheet, (wall[i].type - 1) * 16, 0, 16, 16);
        }

        // Debug last key pressed
        ctx.fillStyle = '#fff';
        //ctx.fillText('Last Press: ' + lastPress, 0, 20);
        
        // Draw pause
        if (pause) {
            ctx.textAlign = 'center';
            if (gameover) {
                ctx.fillText('GAMEOVER', canvas.width / 2, canvas.height / 2);
            } else {
                ctx.fillText('PAUSE', canvas.width / 2, canvas.height / 2);
            }
            ctx.textAlign = 'left';
        }
    }

    function act(deltaTime) {
        var i = 0,
            l = 0;
        
        if (!pause) {
            // GameOver Reset
            if (gameover) {
                reset();
            }

            // Set vectors
            if (pressing[KEY_RIGHT]) {
                player.scale.x = 1;
                if (player.vx < 10) {
                    player.vx += 1;
                }
            } else if (player.vx > 0) {
                player.vx -= 1;
            }
            if (pressing[KEY_LEFT]) {
                player.scale.x = -1;
                if (player.vx > -10) {
                    player.vx -= 1;
                }
            } else if (player.vx < 0) {
                player.vx += 1;
            }

            // Gravity
            player.vy += 1;
            if (player.vy > 10) {
                player.vy = 10;
            }

            // Jump
            if (onGround && lastPress === KEY_UP) {
                player.vy = -10;
            }

            // Move player in x
            player.x += player.vx;
            for (i = 0, l = wall.length; i < l; i += 1) {
                if (player.intersects(wall[i])) {
                    if (player.vx > 0) {
                        player.right = wall[i].left;
                    } else {
                        player.left = wall[i].right;
                    }
                    player.vx = 0;
                }
            }
            
            // Move player in y
            onGround = false;
            player.y += player.vy;
            for (i = 0, l = wall.length; i < l; i += 1) {
                if (player.intersects(wall[i])) {
                    if (player.vy > 0) {
                        player.bottom = wall[i].top;
                        onGround = true;
                    } else {
                        player.top = wall[i].bottom;
                    }
                    player.vy = 0;
                }
            }

            // Out Screen
            if (player.x > worldWidth) {
                player.x = 0;
            }
            if (player.x < 0) {
                player.x = worldWidth;
            }

            // Bellow world
            if (player.y > worldHeight) {
                gameover = true;
                pause = true;
            }

            // Focus player
            cam.focus(player.x, player.y);

            // Elapsed time
            elapsed += deltaTime;
            if (elapsed > 3600) {
                elapsed -= 3600;
            }
        }
        
        // Pause/Unpause
        if (lastPress === KEY_ENTER) {
            pause = !pause;
        }
    }

    function repaint() {
        window.requestAnimationFrame(repaint);
        paint(ctx);
    }

    function run() {
        setTimeout(run, 50);
        act(0.05);

        lastPress = null;
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
        spritesheet.src = 'assets/platformer-sprites.png';
        
        // Create camera and player
        cam = new Camera();
        player = new Rectangle2D(48, 16, 16, 32, true);

        // Set initial map
        setMap(map0, 16);
        
        // Start game
        run();
        repaint();
    }

    window.addEventListener('load', init, false);
}(window));