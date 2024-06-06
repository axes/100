import Arrow from './Arrow.js';

class Player {
    constructor(scene, x, y) {
        this.scene = scene;
        this.sprite = scene.physics.add.sprite(x, y, 'archer_idle');
        this.sprite.play('idle_down');
        this.lastDirection = 'down';
        this.isAttacking = false; // Estado para verificar si el personaje está atacando

        this.attackSpeed = 500; // Velocidad de ataque en milisegundos
        this.lastAttackTime = 0; // Última vez que se realizó un ataque

        this.cursors = scene.input.keyboard.createCursorKeys();
        this.wasd = {
            up: scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W),
            left: scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A),
            down: scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S),
            right: scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D),
            attack: scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.K)
        };

        // Evento para restablecer isAttacking cuando la animación de ataque termina
        this.sprite.on('animationcomplete', this.animationComplete, this);
    }

    animationComplete(animation, frame) {
        if (animation.key.startsWith('attack_')) {
            this.isAttacking = false;
            this.sprite.play(`idle_${this.lastDirection}`, true);
        }
    }

    update(time, delta) {
        this.handleMovement();
        this.handleAttack(time);
    }

    handleMovement() {
        if (this.isAttacking) {
            // No moverse ni cambiar animación mientras está atacando
            this.sprite.setVelocity(0);
            return;
        }

        let moving = false;

        if (this.wasd.up.isDown) {
            this.sprite.setVelocityY(-100);
            this.sprite.setVelocityX(0);
            this.sprite.play('move_up', true);
            this.lastDirection = 'up';
            moving = true;
        } else if (this.wasd.down.isDown) {
            this.sprite.setVelocityY(100);
            this.sprite.setVelocityX(0);
            this.sprite.play('move_down', true);
            this.lastDirection = 'down';
            moving = true;
        } else if (this.wasd.left.isDown) {
            this.sprite.setVelocityX(-100);
            this.sprite.setVelocityY(0);
            this.sprite.play('move_left', true);
            this.lastDirection = 'left';
            moving = true;
        } else if (this.wasd.right.isDown) {
            this.sprite.setVelocityX(100);
            this.sprite.setVelocityY(0);
            this.sprite.play('move_right', true);
            this.lastDirection = 'right';
            moving = true;
        } else {
            this.sprite.setVelocity(0);
            // Si no se presiona ninguna tecla, reproducir la animación idle en la última dirección
            if (!moving && !this.isAttacking) {
                this.sprite.play(`idle_${this.lastDirection}`, true);
            }
        }
    }

    handleAttack(time) {
        if (this.isAttacking) {
            return;
        }

        if (Phaser.Input.Keyboard.JustDown(this.wasd.attack) && time > this.lastAttackTime + this.attackSpeed) {
            console.log('Attack initiated');
            this.isAttacking = true;
            this.lastAttackTime = time;

            if (this.lastDirection === 'down') {
                this.sprite.play('attack_down');
                console.log('Attack down');
            } else if (this.lastDirection === 'up') {
                this.sprite.play('attack_up');
                console.log('Attack up');
            } else if (this.lastDirection === 'left') {
                this.sprite.play('attack_left');
                console.log('Attack left');
            } else if (this.lastDirection === 'right') {
                this.sprite.play('attack_right');
                console.log('Attack right');
            }

            // Crear una nueva flecha
            new Arrow(this.scene, this.sprite.x, this.sprite.y, this.lastDirection);
        }
    }
}

export default Player;
