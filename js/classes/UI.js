class UI {
    constructor(scene) {
        this.scene = scene;
        this.createGameArea();
        this.createInteractionArea();
    }

    createGameArea() {
        const gameWidth = 640;
        const gameHeight = 640;

        // Crear el área de juego con fondo negro
        this.gameArea = this.scene.add.rectangle(0, 0, gameWidth, gameHeight, 0x000000);
        // Agregar un borde rojo temporal
        this.gameArea.setStrokeStyle(2, 0xff0000);

        // Centrando el área de juego en la pantalla
        const centerX = this.scene.cameras.main.width / 2;
        const centerY = this.scene.cameras.main.height / 2 - 80; // Ajustar por la mitad del área de interacción
        this.gameArea.setPosition(centerX, centerY);

        // Configurar los límites de colisión para el área de juego
        this.scene.physics.world.setBounds(centerX - gameWidth / 2, centerY - gameHeight / 2, gameWidth, gameHeight);
    }

    createInteractionArea() {
        const gameWidth = 640;
        const uiHeight = 160;

        // Crear la barra de interacción con fondo gris
        this.interactionArea = this.scene.add.rectangle(0, 0, gameWidth, uiHeight, 0x333333);

        // Centrando el área de interacción en la pantalla
        const centerX = this.scene.cameras.main.width / 2;
        const centerY = this.scene.cameras.main.height / 2 + 320; // Ajustar por la mitad del área de interacción
        this.interactionArea.setPosition(centerX, centerY);
    }

    clearUI() {
        this.interactionArea.removeAll(true);
    }
}

export default UI;
