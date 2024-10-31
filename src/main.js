import { AUTO, Game } from "phaser";

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

  this.player = this.physics.add.sprite(100, 100, "player", 0);

  this.player.anims.create({
    key: "idle",
    frames: this.anims.generateFrameNames("player", {
      prefix: "idle",
      start: 1,
      end: 12,
    }),
    frameRate: 12,
    repeat: -1,
  });

  this.player.anims.create({
    key: "walk",
    frames: this.anims.generateFrameNames("player", {
      prefix: "walk",
      start: 1,
      end: 9,
    }),
    frameRate: 12,
    repeat: -1,
  });

  this.player.anims.create({
    key: "attack",
    frames: this.anims.generateFrameNames("player", {
      prefix: "attack",
      start: 1,
      end: 16,
    }),
    frameRate: 12,
    repeat: -1,
  });

  this.player.play("idle", true);
  this.player.setCollideWorldBounds(true);

  // Player movement

  this.keyObjects = this.input.keyboard.addKeys({
    up: "W",
    down: "S",
    left: "A",
    right: "D",
    attack: "SPACE",
  });
}

function update() {
  // Player movement

  this.player.body.setVelocity(0);

  if (this.keyObjects.left.isDown) {
    this.player.body.setVelocityX(-100);
  } else if (this.keyObjects.right.isDown) {
    this.player.body.setVelocityX(100);
  }
  if (this.keyObjects.up.isDown) {
    this.player.body.setVelocityY(-100);
  } else if (this.keyObjects.down.isDown) {
    this.player.body.setVelocityY(100);
  }

  // Player animations

  if (this.keyObjects.left.isDown) {
    this.player.play("walk", true);
    this.player.flipX = true;
  } else if (this.keyObjects.right.isDown) {
    this.player.play("walk", true);
    this.player.flipX = false;
  } else if (this.keyObjects.up.isDown) {
    this.player.play("walk", true);
    this.player.flipX = false;
  } else if (this.keyObjects.down.isDown) {
    this.player.play("walk", true);
    this.player.flipX = true;
  } else if (this.keyObjects.attack.isDown) {
    this.player.play("attack", true);
  } else {
    this.player.play("idle", true);
  }
}
