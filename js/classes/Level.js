class Level {
    constructor(scene) {
        this.scene = scene;
        this.tileSize = 32; // Tamaño de cada tile
        this.gridSize = 20; // Tamaño de la matriz (20x20)
        this.levelMatrix = this.createLevelMatrix();
    }

    createLevelMatrix() {
        // Crear una matriz 20x20 llena de ceros
        const matrix = [];
        for (let y = 0; y < this.gridSize; y++) {
            const row = [];
            for (let x = 0; x < this.gridSize; x++) {
                row.push(0);
            }
            matrix.push(row);
        }

        // Definir las posiciones de los enemigos (1 representa un enemigo)
        matrix[5][2] = 1;
        matrix[7][2] = 1;
        matrix[9][2] = 1;
        matrix[11][2] = 1;
        matrix[13][2] = 1;
        matrix[15][2] = 1;

        return matrix;
    }

    placeEnemies() {
        const enemies = [];
        for (let y = 0; y < this.gridSize; y++) {
            for (let x = 0; x < this.gridSize; x++) {
                if (this.levelMatrix[y][x] === 1) {
                    const enemyX = x * this.tileSize;
                    const enemyY = y * this.tileSize;
                    const enemy = new Enemy(this.scene, enemyX, enemyY, 'enemy1');
                    enemies.push(enemy);
                    this.scene.enemies.add(enemy);
                }
            }
        }
        return enemies;
    }
}
