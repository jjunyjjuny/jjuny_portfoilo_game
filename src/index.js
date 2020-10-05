import Phaser from "phaser";
import MainMenuScene from "./scenes/mainMenuScene";

const config = {
  type: Phaser.AUTO,
  width: window.innerWidth,
  height: window.innerHeight,
  parent: "divId",
  dom: {
    createContainer: true,
  },
  physics: {
    default: "arcade",
    arcade: {
      gravity: { y: 1000 },
      debug: false,
    },
  },
  scene: [MainMenuScene],
};

const game = new Phaser.Game(config); // eslint-disable-line no-unused-vars
