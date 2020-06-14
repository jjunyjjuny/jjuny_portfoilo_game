import Phaser from 'phaser'

export default class GameScene2 extends Phaser.Scene {
    constructor() {
        super('gameScene2')
    }

    preload() {

    }

    create() {
        
        const map = this.make.tilemap({
            key: 'map'
        })

        const tileset = map.addTilesetImage('map_tile', 'tiles')

        map.createStaticLayer('non', tileset)
        const platform = map.createStaticLayer('platform', tileset)

        platform.setCollisionByProperty({
            collides: true
        })

       

        const fr = 12
        this.player = this.physics.add.sprite(100, 100, 'player', 'stand_left_1.png')
        this.player.setBounce(0.2);
        this.player.setCollideWorldBounds(true);

        this.anims.create({
            key: 'stand-left',
            frames: this.anims.generateFrameNames('player', {start: 1, end: 4, prefix: 'stand_left_', suffix:'.png'}),
            repeat: -1,
            frameRate: fr
        })
        this.anims.create({
            key: 'stand-right',
            frames: this.anims.generateFrameNames('player', {start: 1, end: 4, prefix: 'stand_right_', suffix:'.png'}),
            repeat: -1,
            frameRate: fr
        })
        this.anims.create({
            key: 'walk-left',
            frames: this.anims.generateFrameNames('player', {start: 1, end: 4, prefix: 'walk_left_', suffix:'.png'}),
            repeat: -1,
            frameRate: fr
        })
        this.anims.create({
            key: 'walk-right',
            frames: this.anims.generateFrameNames('player', {start: 1, end: 4, prefix: 'walk_right_', suffix:'.png'}),
            repeat: -1,
            frameRate: fr
        })
        this.anims.create({
            key: 'jump-left',
            frames: this.anims.generateFrameNames('player', {start: 1, end: 4, prefix: 'jump_left_', suffix:'.png'}),
            repeat: -1,
            frameRate: fr
        })
        this.anims.create({
            key: 'jump-right',
            frames: this.anims.generateFrameNames('player', {start: 1, end: 4, prefix: 'jump_right_', suffix:'.png'}),
            repeat: -1,
            frameRate: fr
        })
        this.anims.create({
            key: 'down-left',
            frames: this.anims.generateFrameNames('player', {start: 1, end: 4, prefix: 'down_left_', suffix:'.png'}),
            repeat: -1,
            frameRate: fr
        })
        this.anims.create({
            key: 'down-right',
            frames: this.anims.generateFrameNames('player', {start: 1, end: 4, prefix: 'down_right_', suffix:'.png'}),
            repeat: -1,
            frameRate: fr
        })

        this.physics.add.collider(this.player, platform)
        this.createCursor()

    }


    createCursor() {
        this.cursors = this.input.keyboard.createCursorKeys();
    }

    update() {
        const speed = 300
        if (this.cursors.left.isDown) {
            this.player.setVelocity(-speed, 0);
            this.player.anims.play('walk-left', true);
            this.dir = true;
        } else if (this.cursors.right.isDown) {
            this.player.setVelocity(speed, 0);
            this.player.anims.play('walk-right', true);
            this.dir = false;
        } else {
            this.player.setVelocity(0, 0);
            if(this.dir){
                this.player.anims.play('stand-left', true);
            } else {
                this.player.anims.play('stand-right', true)
            }
        }
        if (this.cursors.up.isDown && this.player.body.blocked.down) {
                this.player.setVelocityY(-320);
        }
    }
    
}