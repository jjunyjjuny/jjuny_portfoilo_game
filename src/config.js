import Phaser from 'phaser'
import GameScene2 from './GameScene2'
import Preloader from './Preloader'
var config = {
    type: Phaser.AUTO,
    parent: 'phaser-example',
    width: 1920,
    height: 930,
    scene: [Preloader, GameScene2],
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 1000 },
            debug: true
        }
    }
};

export { config }