import Phaser from "phaser";

export default class GameScene extends Phaser.Scene {
  constructor() {
    super("gameScene");
  }

  preload() {}

  create() {
    this.startPositionX = 0;
    this.startPositionY = 0;
    // this.creatMapHome()
    this.createMap1();
    this.createPlayer();
    this.createCursor();

    this.cameras.main.startFollow(this.player, true, 1, 1, 0.01, 150);
  }

  creatMapHome() {
    const map_home = this.make.tilemap({
      key: "map_home",
    });

    const tileset_home = map_home.addTilesetImage("home_json_6", "tiles_home");
    this.back = map_home
      .createDynamicLayer("background", tileset_home)
      .setOrigin(0, 0);
    this.platform = map_home
      .createDynamicLayer("platform", tileset_home)
      .setOrigin(0, 0);
    this.platform.setCollisionByProperty({
      collides: true,
    });

    this.physics.world.bounds.width = this.platform.width;
    this.physics.world.bounds.height = this.platform.height;
    this.cameras.main.setBounds(
      0,
      0,
      map_home.widthInPixels,
      map_home.gheightInPixels
    );
    this.startPositionX = 200;
    this.startPositionY = 750;
  }

  createMap1() {
    //map_1
    const map_1 = this.make.tilemap({
      key: "map_2",
    });

    const tileset_map = map_1.addTilesetImage("mpa_tiles", "tiles_2");
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
  }

  update() {
    const speed = 300;

    if (this.cursors.left.isDown) {
      this.player.setVelocityX(-speed);
      if (this.player.body.blocked.down) {
        this.player.anims.play("walk-left", true);
      } else {
        this.player.anims.play("jump-left", true);
      }
      this.dir = true;
    } else if (this.cursors.right.isDown) {
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
    if (this.cursors.up.isDown && this.player.body.blocked.down) {
      let power = 700;
      this.player.setVelocityY(-power);
      if (this.dir) {
        this.player.anims.play("jump-left", true);
      } else {
        this.player.anims.play("jump-right", true);
      }
    }
  }
}
