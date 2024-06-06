class Hero extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y) {
        super(scene, x, y, 'archer_idle', 0);
        scene.add.existing(this);
        scene.physics.add.existing(this);
        this.setCollideWorldBounds(true);

        // Definir propiedades del héroe
        this.hp = 10;
        this.speed = 200; // Ajustamos la velocidad para el movimiento
        this.attackSpeed = 100; // Delay de ataque en milisegundos
        this.strength = 1;
        this.resistance = 1;

        // Dirección inicial del héroe
        this.direction = 'down';

        // Iniciar animaciones
        this.play('idle_down');
    }

    receiveDamage(damage) {
        this.hp -= damage;
        if (this.hp <= 0) {
            this.destroy();
            // Lógica adicional para manejar la muerte del héroe
        }
    }

    attack() {
        this.play('attack_' + this.direction);
        // Lógica adicional para el ataque
    }

    move(direction) {
        this.direction = direction;
        this.play('move_' + direction);
        // Lógica adicional para el movimiento
    }

    idle() {
        this.play('idle_' + this.direction);
    }
}
