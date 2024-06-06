class PlayerControls {
    constructor(scene, player) {
        this.scene = scene;
        this.player = player;
        this.wasd = {
            up: scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W),
            left: scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A),
            down: scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S),
            right: scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D),
            attack: scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.K),
            special: scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.L)
        };
    }

    update() {
        this.handleMovement();
        this.handleAttack();
    }

    handleMovement() {
        if (this.wasd.up.isDown) {
            this.player.setVelocityY(-this.player.speed);
            this.player.setVelocityX(0);
            this.player.move('up');
        } else if (this.wasd.down.isDown) {
            this.player.setVelocityY(this.player.speed);
            this.player.setVelocityX(0);
            this.player.move('down');
        } else if (this.wasd.left.isDown) {
            this.player.setVelocityX(-this.player.speed);
            this.player.setVelocityY(0);
            this.player.move('left');
        } else if (this.wasd.right.isDown) {
            this.player.setVelocityX(this.player.speed);
            this.player.setVelocityY(0);
            this.player.move('right');
        } else {
            this.player.setVelocity(0);
            this.player.idle();
        }
    }

    handleAttack() {
        if (Phaser.Input.Keyboard.JustDown(this.wasd.attack)) {
            this.player.attack();
            this.shootArrow();
        }
    }

    shootArrow() {
        const arrow = this.scene.arrows.get();
        if (arrow) {
            let targetX = this.player.x;
            let targetY = this.player.y;
            if (this.player.direction === 'up') {
                targetY -= 32;
            } else if (this.player.direction === 'down') {
                targetY += 32;
            } else if (this.player.direction === 'left') {
                targetX -= 32;
            } else if (this.player.direction === 'right') {
                targetX += 32;
            }
            arrow.fire(this.player.x, this.player.y, { x: targetX, y: targetY });

            // Añadir colisión entre la flecha y los enemigos
            this.scene.physics.add.overlap(arrow, this.scene.enemies, (arrow, enemy) => {
                arrow.setActive(false);
                arrow.setVisible(false);
                enemy.receiveDamage(this.player.strength);
            });
        }
    }
}
