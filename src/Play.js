import Player from "./Player";
import { config } from "./main";

class Play extends Phaser.Scene {
  constructor() {
    super({ key: "Play" });
  }

  create() {
    // World generation

    this.add.image(0, 0, "floor");

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

    this.player = new Player(this, 100, 100, 0);
  }

  update() {
    this.player.update();
  }
}

export default Play;
