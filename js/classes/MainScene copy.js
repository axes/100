import Player from './Player.js';
import createAnimations from './animations.js';
import UI from './UI.js';

class MainScene extends Phaser.Scene {
    constructor() {
        super({ key: 'MainScene' });
    }

    preload() {
        // Cargar los spritesheets y JSONs
        this.load.atlas('archer_idle', 'assets/Archer_Idle.png', 'assets/Archer_Idle.json');
        this.load.atlas('archer_move', 'assets/Archer_Move.png', 'assets/Archer_Move.json');
        this.load.atlas('archer_attack', 'assets/Archer_Attack.png', 'assets/Archer_Attack.json'); // Cargar spritesheet de ataque
        this.load.image('arrow', 'assets/arrow.png'); // Cargar imagen de la flecha

        // Cargar el mapa de Tiled y el tileset
        this.load.image('tiles', 'assets/tiles.png'); // Cambia 'tiles' y la ruta al nombre del tileset que usaste en Tiled
        this.load.tilemapTiledJSON('map', 'assets/maps.json'); // Asegúrate de que el nombre y la ruta coincidan con tu archivo

    }

    create() {
        // Crear la UI
        this.ui = new UI(this);

        // Crear las animaciones
        createAnimations(this);

        // // Crear y renderizar el mapa
        const map = this.make.tilemap({ key: 'map', tilewidth: 16, tileheight: 16});
        const tileset = map.addTilesetImage('Cave', 'tiles'); // El nombre 'tiles' debe coincidir con el nombre que le diste en Tiled
        const layer = map.createLayer('bg_layer', tileset, 0, 0);
        const layer2 = map.createLayer('top_layer', tileset, 1, 1);
        layer.setScale(2); // Ajustar la escala del mapa
        layer2.setScale(2); // Ajustar la escala del mapa


        // Crear y añadir el jugador
        const archerX = this.ui.gameArea.x;
        const archerY = this.ui.gameArea.y;
        this.player = new Player(this, archerX, archerY);

        // Ajustar los límites del mundo y del jugador
        this.physics.world.setBounds(this.ui.gameArea.x - 320, this.ui.gameArea.y - 320, 640, 640);
        this.player.sprite.setCollideWorldBounds(true); // Evita que el arquero salga del área de juego

        // Actualizar los stats en la UI
        this.ui.updateStats(this.player.hp, this.player.mp, this.player.arrows);
    }

    update(time, delta) {
        this.player.update(time, delta);
    }
}

export default MainScene;
