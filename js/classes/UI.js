class UI {
    constructor(scene, player) {
        this.scene = scene;
        this.player = player;
        this.createStats();
    }

    createStats() {
        // Crear un rectángulo negro semitransparente como fondo del HUD
        this.hudBackground = this.scene.add.rectangle(20, 20, 200, 100, 0x000000, 0.5);
        this.hudBackground.setOrigin(0, 0); // Establecer el origen en la esquina superior izquierda

        // Crear textos para HP, MP y flechas en la esquina superior izquierda
        this.hpText = this.scene.add.text(30, 30, 'HP: 3', { fontSize: '16px', fill: '#fff' });
        this.mpText = this.scene.add.text(30, 50, 'MP: 0', { fontSize: '16px', fill: '#fff' });
        this.arrowsText = this.scene.add.text(30, 70, 'Arrows: 10/10', { fontSize: '16px', fill: '#fff' });

        // Asegurarse de que los textos y el fondo del HUD no se muevan con la cámara
        this.hudBackground.setScrollFactor(0);
        this.hpText.setScrollFactor(0);
        this.mpText.setScrollFactor(0);
        this.arrowsText.setScrollFactor(0);
    }

    updateStats(hp, mp, arrows) {
        this.hpText.setText(`HP: ${hp}`);
        this.mpText.setText(`MP: ${mp}`);
        this.arrowsText.setText(`Arrows: ${arrows}/10`);
    }

    clearUI() {
        this.hudBackground.destroy();
        this.hpText.destroy();
        this.mpText.destroy();
        this.arrowsText.destroy();
    }
}

export default UI;
