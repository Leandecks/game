import { AUTO, Game } from "phaser";
import Player from "./Player";

const config = {
  type: AUTO,
  width: 750,
  height: 750,
  parent: "game-container",
  scene: {
    preload: preload,
    create: create,
    update: update,
  },
  physics: {
    default: "arcade",
  },
};

const game = new Game(config);

function preload() {
  this.load.setPath("assets");
  this.load.image("floor", "floor.png");
  this.load.image("wall", "wall.png");
  this.load.atlas("player", "player.png", "player.json");
}

function create() {
  // World generation

  const resolution = 75;
  const level = [
    ["w", "w", "w", "w", "w", "w", "w", "w", "w", "w"],
    ["w", "f", "f", "f", "f", "f", "f", "f", "f", "w"],
    ["w", "f", "f", "f", "f", "f", "f", "f", "f", "w"],
    ["w", "f", "f", "f", "f", "f", "f", "f", "f", "w"],
    ["w", "f", "f", "f", "f", "f", "f", "f", "f", "w"],
    ["w", "f", "f", "f", "f", "f", "f", "f", "f", "w"],
    ["w", "f", "f", "f", "f", "f", "f", "f", "f", "w"],
    ["w", "f", "f", "f", "f", "f", "f", "f", "f", "w"],
    ["w", "f", "f", "f", "f", "f", "f", "f", "f", "w"],
    ["w", "w", "w", "w", "w", "w", "w", "w", "w", "w"],
  ];

  for (let row = 0; row < level.length; row++) {
    for (let column = 0; column < level.length; column++) {
      const backgroundKey = level[row][column] === "w" ? "wall" : "floor";
      this.make.image({
        x: row * resolution + resolution / 2,
        y: column * resolution + resolution / 2,
        key: backgroundKey,
      });
    }
  }

  this.physics.world.setBounds(0, 0, config.width, config.height - 75);

  // Player

  // this.player = this.physics.add.sprite(100, 100, "player", 0);
  this.player = new Player(this, 100, 100, 0);
}

function update() {
  this.player.update();
}
