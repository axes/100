import Player from './Player.js';
import createAnimations from './animations.js';

class MainScene extends Phaser.Scene {
    constructor() {
        super({ key: 'MainScene' });
    }

    preload() {
        // Cargar los spritesheets y JSONs
        this.load.aseprite('archer_idle', 'assets/Archer_Idle.png', 'assets/Archer_Idle.json');
        this.load.aseprite('archer_move', 'assets/Archer_Move.png', 'assets/Archer_Move.json');
        this.load.aseprite('archer_attack', 'assets/Archer_Attack.png', 'assets/Archer_Attack.json'); // Cargar spritesheet de ataque
        this.load.image('arrow', 'assets/arrow.png'); // Cargar imagen de la flecha
    }

    create() {
        const gameWidth = 640;
        const gameHeight = 640;
        const uiHeight = 160;

        // Crear área de juego
        this.add.rectangle(gameWidth / 2, gameHeight / 2, gameWidth, gameHeight, 0x000000);

        // Crear barra de interacción
        this.uiBar = this.add.rectangle(gameWidth / 2, gameHeight + uiHeight / 2, gameWidth, uiHeight, 0x333333);

        this.createUI();

        // Crear las animaciones
        createAnimations(this);

        // Crear y añadir el jugador
        const archerX = gameWidth / 2;
        const archerY = gameHeight / 2;
        this.player = new Player(this, archerX, archerY);

        // Ajustar los límites del mundo y del jugador
        this.physics.world.setBounds(0, 0, gameWidth, gameHeight);
        this.player.sprite.setCollideWorldBounds(true); // Evita que el arquero salga del área de juego
    }

    createUI() {

    }

    update(time, delta) {
        this.player.update(time, delta);
    }

    shootArrow(x, y, direction) {
        const arrow = this.physics.add.sprite(x, y, 'arrow');
        arrow.setScale(0.5);
        arrow.setCollideWorldBounds(true);
        arrow.body.allowGravity = false;

        switch (direction) {
            case 'up':
                arrow.setVelocityY(-300);
                arrow.setAngle(270);
                break;
            case 'down':
                arrow.setVelocityY(300);
                arrow.setAngle(90);
                break;
            case 'left':
                arrow.setVelocityX(-300);
                arrow.setAngle(180);
                break;
            case 'right':
                arrow.setVelocityX(300);
                arrow.setAngle(0);
                break;
        }

        this.arrows.add(arrow);
    }
}

export default MainScene;
