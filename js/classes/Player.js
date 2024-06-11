import Arrow from './Arrow.js';

class Player {
    constructor(scene, x, y) {
        this.scene = scene;
        this.sprite = scene.physics.add.sprite(x, y, 'archer_idle');
        this.sprite.setOrigin(0.5, 0.5); // Centrar el origen del sprite
        this.sprite.play('idle_down');
        this.lastDirection = 'down';
        this.isAttacking = false; // Estado para verificar si el personaje está atacando
        this.attackSpeed = 500; // Velocidad de ataque en milisegundos
        this.lastAttackTime = 0; // Última vez que se realizó un ataque
        this.movementSpeed = 300; // Aumentar la velocidad de movimiento al triple
        this.cursors = scene.input.keyboard.createCursorKeys();
        this.wasd = {
            up: scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W),
            left: scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A),
            down: scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S),
            right: scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D),
            attack: scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.K)
        };

        // Propiedades del Personaje
        this.hp = 3; // Puntos de vida
        this.mp = 0; // Puntos de magia
        this.arrows = 10; // Cantidad de flechas

        // Evento para restablecer isAttacking cuando la animación de ataque termina
        this.sprite.on('animationcomplete', this.animationComplete, this);

        // Evento para ajustar la caja de colisión cuando comienza la animación de ataque
        this.sprite.on('animationstart', this.animationStart, this);

        // Configurar el sprite del personaje para que sea inamovible por colisiones
        this.sprite.body.immovable = true;
    }

    animationStart(animation, frame) {
        if (animation.key.startsWith('attack_')) {
            // Ajustar el tamaño y la posición de la caja de colisión durante la animación de ataque
            this.sprite.body.setOffset(50, 50); // Ajustar el desplazamiento de la caja de colisión
        }
    }

    animationComplete(animation, frame) {
        if (animation.key.startsWith('attack_')) {
            this.isAttacking = false;
            this.sprite.play(`idle_${this.lastDirection}`, true);

            // Restaurar la caja de colisión a su tamaño y posición original
            this.sprite.body.setOffset(0, 0); // Desplazamiento original de la caja de colisión
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
            this.sprite.setVelocityY(-this.movementSpeed);
            this.sprite.setVelocityX(0);
            this.sprite.play('move_up', true);
            this.lastDirection = 'up';
            moving = true;
        } else if (this.wasd.down.isDown) {
            this.sprite.setVelocityY(this.movementSpeed);
            this.sprite.setVelocityX(0);
            this.sprite.play('move_down', true);
            this.lastDirection = 'down';
            moving = true;
        } else if (this.wasd.left.isDown) {
            this.sprite.setVelocityX(-this.movementSpeed);
            this.sprite.setVelocityY(0);
            this.sprite.play('move_left', true);
            this.lastDirection = 'left';
            moving = true;
        } else if (this.wasd.right.isDown) {
            this.sprite.setVelocityX(this.movementSpeed);
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
        if (this.isAttacking || this.arrows <= 0) {
            return;
        }
        // En cada ataque, se verifica si la tecla K fue presionada y si ha pasado el tiempo suficiente
        if (Phaser.Input.Keyboard.JustDown(this.wasd.attack) && time > this.lastAttackTime + this.attackSpeed) {
            this.isAttacking = true;
            this.lastAttackTime = time;
            this.arrows--; // Disminuir la cantidad de flechas
            this.scene.ui.updateStats(this.hp, this.mp, this.arrows); // Actualizar la UI

            if (this.lastDirection === 'down') {
                this.sprite.play('attack_down');
            } else if (this.lastDirection === 'up') {
                this.sprite.play('attack_up');
            } else if (this.lastDirection === 'left') {
                this.sprite.play('attack_left');
            } else if (this.lastDirection === 'right') {
                this.sprite.play('attack_right');
            }

            this.scene.time.delayedCall(200, () => {
                new Arrow(this.scene, this.sprite.x, this.sprite.y, this.lastDirection);
            });
        }
    }


}

export default Player;
