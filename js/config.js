import MainScene from './classes/MainScene.js';

const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 800,
    physics: {
        default: 'arcade',
        arcade: {
            debug: false, // Habilitar depuración para ver las cajas de colisión
            gravity: { y: 0 }
        }
    },
    scene: MainScene
};

const game = new Phaser.Game(config);

export default game;

