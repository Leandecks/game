class Preloader extends Phaser.Scene {
  constructor() {
    super("Preloader");
  }

  preload() {
    this.load.setPath("assets");
    this.load.image("floor", "floor.png");
    this.load.image("wall", "wall.png");
    this.load.atlas("player", "player.png", "player.json");
  }
}

export default Preloader;
