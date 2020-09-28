import Phaser from "phaser";
import GameScene from "./GameScene";
import Preloader from "./Preloader";
const config = {
  type: Phaser.AUTO,
  parent: "phaser-example",
  width: 1920,
  height: 930,
  scene: [Preloader, GameScene],
  physics: {
    default: "arcade",
    arcade: {
      gravity: { y: 1000 },
    },
  },
};

export { config };
