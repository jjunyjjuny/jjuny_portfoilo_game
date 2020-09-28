import Phaser from 'phaser'

export default class Preloader extends Phaser.Scene {
    constructor() {
        super('preloader')
    }

    preload(){
        // player
        this.load.atlas('player', 'assets/player/texture2.png', 'assets/player/texture2.json')
        //home
        this.load.image('tiles_home', './assets/tile/tile_home.png')
        this.load.tilemapTiledJSON('map_home', 'assets/tile/map_home.json')
        //map1
        this.load.image('tiles_1', './assets/tile/tile_1.png')
        this.load.tilemapTiledJSON('map_1', 'assets/tile/map_1.json')
        //map2
        this.load.image('tiles_2', './assets/tile/tile_final.png')
        this.load.tilemapTiledJSON('map_2', 'assets/tile/map_final.json')
        
    }
    

    create(){
        this.scene.start('gameScene')
    }
}