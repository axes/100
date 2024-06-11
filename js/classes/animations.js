const createAnimations = (scene) => {
    scene.anims.create({
        key: 'idle_down',
        frames: scene.anims.generateFrameNames('archer_idle', { prefix: 'idle_down_', start: 1, end: 4 }),
        frameRate: 5, // Ajustado a 5 para velocidad más lenta
        repeat: -1
    });

    scene.anims.create({
        key: 'idle_up',
        frames: scene.anims.generateFrameNames('archer_idle', { prefix: 'idle_up_', start: 1, end: 4 }),
        frameRate: 5,
        repeat: -1
    });

    scene.anims.create({
        key: 'idle_left',
        frames: scene.anims.generateFrameNames('archer_idle', { prefix: 'idle_left_', start: 1, end: 4 }),
        frameRate: 5,
        repeat: -1
    });

    scene.anims.create({
        key: 'idle_right',
        frames: scene.anims.generateFrameNames('archer_idle', { prefix: 'idle_right_', start: 1, end: 4 }),
        frameRate: 5,
        repeat: -1
    });

    scene.anims.create({
        key: 'move_down',
        frames: scene.anims.generateFrameNames('archer_move', { prefix: 'move_down_', start: 1, end: 6 }),
        frameRate: 10,
        repeat: -1
    });

    scene.anims.create({
        key: 'move_up',
        frames: scene.anims.generateFrameNames('archer_move', { prefix: 'move_up_', start: 1, end: 6 }),
        frameRate: 10,
        repeat: -1
    });

    scene.anims.create({
        key: 'move_left',
        frames: scene.anims.generateFrameNames('archer_move', { prefix: 'move_left_', start: 1, end: 6 }),
        frameRate: 10,
        repeat: -1
    });

    scene.anims.create({
        key: 'move_right',
        frames: scene.anims.generateFrameNames('archer_move', { prefix: 'move_right_', start: 1, end: 6 }),
        frameRate: 10,
        repeat: -1
    });

    scene.anims.create({
        key: 'attack_down',
        frames: scene.anims.generateFrameNames('archer_attack', { prefix: 'attack_down_', start: 1, end: 6 }),
        frameRate: 10,
        repeat: 0
    });

    scene.anims.create({
        key: 'attack_up',
        frames: scene.anims.generateFrameNames('archer_attack', { prefix: 'attack_up_', start: 1, end: 6 }),
        frameRate: 10,
        repeat: 0
    });

    scene.anims.create({
        key: 'attack_left',
        frames: scene.anims.generateFrameNames('archer_attack', { prefix: 'attack_left_', start: 1, end: 6 }),
        frameRate: 10,
        repeat: 0
    });

    scene.anims.create({
        key: 'attack_right',
        frames: scene.anims.generateFrameNames('archer_attack', { prefix: 'attack_right_', start: 1, end: 6 }),
        frameRate: 10,
        repeat: 0
    });
};

export default createAnimations;
