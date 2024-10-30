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

  const player = this.add.sprite(100, 100, "player", 0);

  player.anims.create({
    key: "idle",
    frames: this.anims.generateFrameNames("player", {
      prefix: "idle",
      start: 1,
      end: 12,
    }),
    frameRate: 12,
    repeat: -1,
  });

  player.anims.create({
    key: "walk",
    frames: this.anims.generateFrameNames("player", {
      prefix: "walk",
      start: 1,
      end: 9,
    }),
    frameRate: 12,
    repeat: -1,
  });

  player.anims.create({
    key: "attack",
    frames: this.anims.generateFrameNames("player", {
      prefix: "attack",
      start: 1,
      end: 16,
    }),
    frameRate: 12,
    repeat: -1,
  });

  player.play("idle");
}
