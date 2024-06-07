import Player from './Player.js';
import createAnimations from './animations.js';
import UI from './UI.js';

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
        // Crear la UI
        this.ui = new UI(this);

        // Crear las animaciones
        createAnimations(this);

        // Crear y añadir el jugador
        const archerX = this.ui.gameArea.x;
        const archerY = this.ui.gameArea.y;
        this.player = new Player(this, archerX, archerY);

        // Ajustar los límites del mundo y del jugador
        this.physics.world.setBounds(this.ui.gameArea.x - 320, this.ui.gameArea.y - 320, 640, 640);
        this.player.sprite.setCollideWorldBounds(true); // Evita que el arquero salga del área de juego
    }

    update(time, delta) {
        this.player.update(time, delta);
    }
}

export default MainScene;
