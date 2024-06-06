class Arrow extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, direction) {
        super(scene, x, y, 'arrow');
        this.scene = scene;
        this.direction = direction;
        
        scene.add.existing(this);
        scene.physics.add.existing(this);

        this.setScale(0.5); // Ajustar el tamaño de la flecha
        this.setCollideWorldBounds(true);
        this.body.onWorldBounds = true;
        this.body.world.on('worldbounds', body => {
            if (body.gameObject === this) {
                this.destroy();
            }
        });

        this.setDirection(direction);
    }

    setDirection(direction) {
        switch (direction) {
            case 'up':
                this.setVelocityY(-300);
                this.setAngle(270);
                break;
            case 'down':
                this.setVelocityY(300);
                this.setAngle(90);
                break;
            case 'left':
                this.setVelocityX(-300);
                this.setAngle(180);
                break;
            case 'right':
                this.setVelocityX(300);
                this.setAngle(0);
                break;
            default:
                this.setVelocityX(0);
                this.setVelocityY(0);
        }
    }
}

export default Arrow;
