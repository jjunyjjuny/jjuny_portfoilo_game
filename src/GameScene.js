import { Scene } from 'phaser'

class GameScene extends Scene {

    preload() {
        this.load.image('background', 'assets/hometest.png');
        this.load.image('ground', 'assets/ground.png');
        this.load.image('bed', 'assets/bed.png')
        this.load.image('desk', 'assets/desk.png')
        this.load.spritesheet('dude',
            'assets/player.png', {
                frameWidth: 84,
                frameHeight: 96
            }
        );
    }

    create() {
        const background = this.add.image(0, 0, 'background')
        background.setOrigin(0, 0)
        this.createPlatforms()
        this.createPlayer()
        this.createCursor()
    }

    createPlatforms() {
        this.platforms = this.physics.add.staticGroup();
        this.platforms.create(0, 863, 'ground').setOrigin(0,0).refreshBody();
        this.platforms.create(1420, 691, 'bed').setOrigin(0,0).refreshBody();
        const plat = this.platforms.create(583, 617, 'desk').setOrigin(0,0).refreshBody();
        plat.body.checkCollision.down = false
        plat.body.checkCollision.left = false
        plat.body.checkCollision.right = false

        
    }
    createPlayer() {
        this.dir = true;
        this.player = this.physics.add.sprite(100, 450, 'dude')
        this.player.setBounce(0.2);
        this.player.setCollideWorldBounds(true);
        this.physics.add.collider(this.player, this.platforms)

        this.anims.create({
            key: 'left',
            frames: this.anims.generateFrameNumbers('dude', {
                start: 0,
                end: 3
            }),
            frameRate: 10,
            repeat: -1
        });
        
        this.anims.create({
            key: 'left_stand',
            frames: this.anims.generateFrameNumbers('dude', {
                start: 4,
                end: 8
            }),
            frameRate: 10
        });
        this.anims.create({
            key: 'right_stand',
            frames: this.anims.generateFrameNumbers('dude', {
                start: 9,
                end: 13
            }),
            frameRate: 10
        });
     
    }
    createCursor() {
        this.cursors = this.input.keyboard.createCursorKeys();
    }

    update() {
        if (this.cursors.left.isDown) {
            this.player.setVelocityX(-220);
            this.player.anims.play('left', true);
            this.dir = true;
        } else if (this.cursors.right.isDown) {
            this.player.setVelocityX(220);
            this.player.anims.play('right', true);
            this.dir = false;
        } else {
            this.player.setVelocityX(0);
            if(this.dir){
                this.player.anims.play('left_stand', true);
            } else {
                this.player.anims.play('right_stand', true)
            }
        }
        if (this.cursors.up.isDown && this.player.body.touching.down) {
            this.player.setVelocityY(-320);
        }
    }
}

export default GameScene