import Phaser from "phaser";
import playerPng from "../assets/player/texture.png";
import playerJson from "../assets/player/texture.json";
import mapPng from "../assets/tile/tile_first.png";
import mapJson from "../assets/tile/map_first.json";

class MainMenuScene extends Phaser.Scene {
  constructor() {
    super({ key: "MainMenuScene" });
  }

  preload() {
    this.load.atlas("player", playerPng, playerJson);
    this.load.image("tiles", mapPng);
    this.load.tilemapTiledJSON("map", mapJson);
  }

  create() {
    this.startPositionX = 0;
    this.startPositionY = 0;
    this.createMap();
    this.createPlayer();
    this.createCursor();

    this.cameras.main.startFollow(this.player, true, 1, 1, 0.01, 150);
  }

  createMap() {
    const map_1 = this.make.tilemap({
      key: "map",
    });

    const tileset_map = map_1.addTilesetImage("mpa_tiles", "tiles");
    this.back = map_1
      .createDynamicLayer("background", tileset_map)
      .setOrigin(0, 0);
    this.platform = map_1
      .createDynamicLayer("platfomer", tileset_map)
      .setOrigin(0, 0);
    this.onlyTop = map_1
      .createDynamicLayer("onlyTop", tileset_map)
      .setOrigin(0, 0);
    this.platform.setCollisionByProperty({
      collides: true,
    });
    this.onlyTop.setCollisionByProperty({
      collides: true,
    });
    this.physics.world.bounds.width = this.platform.width;
    this.physics.world.bounds.height = this.platform.height;
    this.cameras.main.setBounds(
      0,
      0,
      map_1.widthInPixels,
      map_1.gheightInPixels
    );
    map_1.layers[2].data.forEach((tiles) =>
      tiles.forEach((tile) => {
        if (tile.properties.collides === true) {
          tile.collideLeft = false;
          tile.collideRight = false;
        }
      })
    );
    this.startPositionX = 470;
    this.startPositionY = 2300;
  }
  createPlayer() {
    const fr = 10;
    this.player = this.physics.add.sprite(
      this.startPositionX,
      this.startPositionY,
      "player",
      "stand_right_1.png"
    );
    this.player.setBounce(0.05);
    this.player.body.checkCollision.up = false;
    this.physics.add.collider(this.player, this.platform);
    this.physics.add.collider(this.player, this.onlyTop);

    this.player.body.setSize(this.player.width - 10, this.player.height, false);
    this.player.setCollideWorldBounds(true);
    this.anims.create({
      key: "stand-left",
      frames: this.anims.generateFrameNames("player", {
        start: 1,
        end: 4,
        prefix: "stand_left_",
        suffix: ".png",
      }),
      repeat: -1,
      frameRate: fr,
    });
    this.anims.create({
      key: "stand-right",
      frames: this.anims.generateFrameNames("player", {
        start: 1,
        end: 4,
        prefix: "stand_right_",
        suffix: ".png",
      }),
      repeat: -1,
      frameRate: fr,
    });
    this.anims.create({
      key: "walk-left",
      frames: this.anims.generateFrameNames("player", {
        start: 1,
        end: 4,
        prefix: "walk_left_",
        suffix: ".png",
      }),
      repeat: -1,
      frameRate: fr,
    });
    this.anims.create({
      key: "walk-right",
      frames: this.anims.generateFrameNames("player", {
        start: 1,
        end: 4,
        prefix: "walk_right_",
        suffix: ".png",
      }),
      repeat: -1,
      frameRate: fr,
    });
    this.anims.create({
      key: "jump-left",
      frames: this.anims.generateFrameNames("player", {
        start: 1,
        end: 4,
        prefix: "jump_left_",
        suffix: ".png",
      }),
      repeat: 0,
      frameRate: fr,
    });
    this.anims.create({
      key: "jump-right",
      frames: this.anims.generateFrameNames("player", {
        start: 1,
        end: 4,
        prefix: "jump_right_",
        suffix: ".png",
      }),
      repeat: 0,
      frameRate: fr,
    });

    this.anims.create({
      key: "jumping-left",
      frames: this.anims.generateFrameNames("player", {
        start: 4,
        end: 4,
        prefix: "jump_left_",
        suffix: ".png",
      }),
      repeat: 0,
      frameRate: fr,
    });
    this.anims.create({
      key: "jumping-right",
      frames: this.anims.generateFrameNames("player", {
        start: 4,
        end: 4,
        prefix: "jump_right_",
        suffix: ".png",
      }),
      repeat: 0,
      frameRate: fr,
    });

    this.anims.create({
      key: "down-left",
      frames: this.anims.generateFrameNames("player", {
        start: 1,
        end: 4,
        prefix: "down_left_",
        suffix: ".png",
      }),
      repeat: -1,
      frameRate: fr,
    });
    this.anims.create({
      key: "down-right",
      frames: this.anims.generateFrameNames("player", {
        start: 1,
        end: 4,
        prefix: "down_right_",
        suffix: ".png",
      }),
      repeat: -1,
      frameRate: fr,
    });
  }

  createCursor() {
    this.cursors = this.input.keyboard.createCursorKeys();
    this.keyW = this.input.keyboard.addKey("w");
    this.keyA = this.input.keyboard.addKey("a");
    this.keyS = this.input.keyboard.addKey("s");
    this.keyD = this.input.keyboard.addKey("d");
    this.keySpacebar = this.input.keyboard.addKey(
      Phaser.Input.Keyboard.KeyCodes.SPACE
    );
  }

  update() {
    const speed = 500;

    if (this.cursors.left.isDown || this.keyA.isDown) {
      this.player.setVelocityX(-speed);
      if (this.player.body.blocked.down) {
        this.player.anims.play("walk-left", true);
      } else {
        this.player.anims.play("jump-left", true);
      }
      this.dir = true;
    } else if (this.cursors.right.isDown || this.keyD.isDown) {
      this.player.setVelocityX(speed);
      if (this.player.body.blocked.down) {
        this.player.anims.play("walk-right", true);
      } else {
        this.player.anims.play("jump-right", true);
      }
      this.dir = false;
    } else {
      this.player.setVelocityX(0);
      if (this.dir) {
        if (this.player.body.blocked.down) {
          this.player.anims.play("stand-left", true);
        }
      } else {
        if (this.player.body.blocked.down) {
          this.player.anims.play("stand-right", true);
        }
      }
    }
    if (this.keySpacebar.isDown && this.player.body.blocked.down) {
      let power = 800;
      this.player.setVelocityY(-power);
      if (this.dir) {
        this.player.anims.play("jump-left", true);
      } else {
        this.player.anims.play("jump-right", true);
      }
    }
  }
}

export default MainMenuScene;
