import { AUTO, Game } from "phaser";

const config = {
  type: AUTO,
  width: 750,
  height: 750,
  parent: "game-container",
  scene: {
    preload: preload,
    create: create,
  },
};

const game = new Game(config);

function preload() {
  this.load.setPath("assets");
  this.load.image("floor", "floor2.png");
  this.load.image("wall", "wall2.png");
}

function create() {
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
}
