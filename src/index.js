import Phaser from "phaser";
import MainMenuScene from "./scenes/mainMenuScene";

const config = {
  type: Phaser.AUTO,
  width: window.innerWidth,
  height: window.innerHeight - 5,
  parent: "divId",
  dom: {
    createContainer: true,
  },
  physics: {
    default: "arcade",
    arcade: {
      gravity: { y: 300 },
      debug: false,
    },
  },
  scene: [MainMenuScene],
};

const game = new Phaser.Game(config); // eslint-disable-line no-unused-vars
