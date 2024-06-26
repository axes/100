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

        // Cargar música de fondo (desde assets/BGM)
        this.load.audio('bgm', ['assets/bgm/01_-_xdeviruchi_-_title_theme.mp3', 'assets/bgm/01_-_xdeviruchi_-_title_theme.ogg']);
    }

    create() {
        // Crear la UI
        this.ui = new UI(this, this.player);

        // Crear las animaciones
        createAnimations(this);

        // Crear y renderizar el mapa
        const map = this.make.tilemap({ key: 'map', tileWidth: 16, tileHeight: 16 });
        const tileset = map.addTilesetImage('Cave', 'tiles'); // El nombre 'Cave' debe coincidir con el nombre que le diste en Tiled
        const layer = map.createLayer('bg_layer', tileset, 0, 0);
        const layer2 = map.createLayer('top_layer', tileset, 0, 0);
        layer.setScale(2); // Ajustar la escala del mapa
        layer2.setScale(2); // Ajustar la escala del mapa

        // Ajustar las colisiones del layer2 si hay objetos colisionables
        layer2.setCollisionByProperty({ collides: true });

        // Crear y añadir el jugador
        const archerX = 400; // Centramos el personaje en el área de juego de 800x800
        const archerY = 400;
        this.player = new Player(this, archerX, archerY);

        // Crear la UI después de crear el jugador
        this.ui = new UI(this, this.player);

        // Ajustar los límites del mundo y del jugador
        this.physics.world.setBounds(0, 0, map.widthInPixels * 2, map.heightInPixels * 2);
        this.player.sprite.setCollideWorldBounds(true); // Evita que el arquero salga del área de juego

        // Configurar la cámara para seguir al jugador
        this.cameras.main.setBounds(0, 0, map.widthInPixels * 2, map.heightInPixels * 2);
        this.cameras.main.startFollow(this.player.sprite);
        this.cameras.main.setViewport(0, 0, 800, 800); // Establecer la vista de la cámara en 800x800

        // Actualizar los stats en la UI
        this.ui.updateStats(this.player.hp, this.player.mp, this.player.arrows);

        // Reproducir la música de fondo
        this.sound.pauseOnBlur = false;
        this.bgm = this.sound.add('bgm', { loop: true });
        this.bgm.play();
        this.bgm.setVolume(0.5); // Reducir volumen de la música

        console.log("bgm");
    }

    update(time, delta) {
        this.player.update(time, delta);
        this.ui.updateStats(this.player.hp, this.player.mp, this.player.arrows);
    }
}

export default MainScene;
