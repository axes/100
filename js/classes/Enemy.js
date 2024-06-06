class Enemy extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y) {
        super(scene, x, y, 'enemy');
        this.scene = scene;
        this.hp = 3; // Puntos de vida

        scene.add.existing(this);
        scene.physics.add.existing(this);
    }

    takeDamage() {
        this.hp -= 1;
        if (this.hp <= 0) {
            this.destroy();
        }
    }
}

export default Enemy;
