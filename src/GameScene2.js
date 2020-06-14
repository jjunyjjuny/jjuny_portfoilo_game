import Phaser from 'phaser'

export default class GameScene2 extends Phaser.Scene {
    constructor() {
        super('gameScene2')
    }

    preload() {

    }

    create() {
        this.createPlatforms()
        this.createPlayer()
        this.createCursor()
        this.cameras.main.startFollow(this.player, true)
    }

    createPlatforms() {

        const map = this.make.tilemap({
            key: 'map'
        })

        const tileset = map.addTilesetImage('map_tile_2', 'tiles')
        this.platform = map.createStaticLayer('platform', tileset)
        // const non = map.createStaticLayer('non', tileset)
        this.platform.setCollisionByProperty({
            collides: true
        })



    }
    createPlayer() {
        const fr = 10
        this.player = this.physics.add.sprite(100, 1500, 'player', 'stand_left_1.png')
        this.player.setBounce(0.05);
        // this.player.setCollideWorldBounds(true);
        this.player.body.checkCollision.up = false
        this.physics.add.collider(this.player, this.platform)


        this.anims.create({
            key: 'stand-left',
            frames: this.anims.generateFrameNames('player', {
                start: 1,
                end: 4,
                prefix: 'stand_left_',
                suffix: '.png'
            }),
            repeat: -1,
            frameRate: fr
        })
        this.anims.create({
            key: 'stand-right',
            frames: this.anims.generateFrameNames('player', {
                start: 1,
                end: 4,
                prefix: 'stand_right_',
                suffix: '.png'
            }),
            repeat: -1,
            frameRate: fr
        })
        this.anims.create({
            key: 'walk-left',
            frames: this.anims.generateFrameNames('player', {
                start: 1,
                end: 4,
                prefix: 'walk_left_',
                suffix: '.png'
            }),
            repeat: -1,
            frameRate: fr
        })
        this.anims.create({
            key: 'walk-right',
            frames: this.anims.generateFrameNames('player', {
                start: 1,
                end: 4,
                prefix: 'walk_right_',
                suffix: '.png'
            }),
            repeat: -1,
            frameRate: fr
        })
        this.anims.create({
            key: 'jump-left',
            frames: this.anims.generateFrameNames('player', {
                start: 1,
                end: 4,
                prefix: 'jump_left_',
                suffix: '.png'
            }),
            repeat: 2,
            frameRate: fr
        })
        this.anims.create({
            key: 'jump-right',
            frames: this.anims.generateFrameNames('player', {
                start: 1,
                end: 4,
                prefix: 'jump_right_',
                suffix: '.png'
            }),
            repeat: 1,
            frameRate: fr
        })
        this.anims.create({
            key: 'down-left',
            frames: this.anims.generateFrameNames('player', {
                start: 1,
                end: 4,
                prefix: 'down_left_',
                suffix: '.png'
            }),
            repeat: -1,
            frameRate: fr
        })
        this.anims.create({
            key: 'down-right',
            frames: this.anims.generateFrameNames('player', {
                start: 1,
                end: 4,
                prefix: 'down_right_',
                suffix: '.png'
            }),
            repeat: -1,
            frameRate: fr
        })
    }

    createCursor() {
        this.cursors = this.input.keyboard.createCursorKeys();
    }

    update() {
        const speed = 300

        if (this.cursors.left.isDown) {
            this.player.setVelocityX(-speed);
            if (this.player.body.blocked.down) {
                this.player.anims.play('walk-left', true);
            } else {
                this.player.anims.play('jump-left', true)

            }
            this.dir = true;
        } else if (this.cursors.right.isDown) {
            this.player.setVelocityX(speed);
            if (this.player.body.blocked.down) {
                this.player.anims.play('walk-right', true);
            } else {
                this.player.anims.play('jump-right', true)

            }
            this.dir = false;
        } else {
            this.player.setVelocityX(0);
            if (this.dir) {
                if (this.player.body.blocked.down) {
                    this.player.anims.play('stand-left', true);
                } 
            } else {
                if (this.player.body.blocked.down) {
                    this.player.anims.play('stand-right', true)
                } 
            }
        }
        if (this.cursors.up.isDown && this.player.body.blocked.down) {

            if (this.dir) {
                this.player.anims.play('jump-left', true);
            } else {
                this.player.anims.play('jump-right', true)
            }

            let power = 700
            this.player.setVelocityY(-power);

        }
    }

}