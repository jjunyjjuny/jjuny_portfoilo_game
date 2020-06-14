import Phaser from 'phaser'

export default class Preloader extends Phaser.Scene {
    constructor() {
        super('preloader')
    }

    preload(){
        this.load.image('tiles', './assets/tile/tile.png')
        this.load.tilemapTiledJSON('map', 'assets/tile/map.json')
        this.load.atlas('player', 'assets/player/texture.png', 'assets/player/texture.json')
    }
    

    create(){
        this.scene.start('gameScene2')
    }
}