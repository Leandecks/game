import { AUTO, Game } from "phaser";
import Preloader from "./Preloader";
import Play from "./Play";

const config = {
  title: "Game",
  type: AUTO,
  width: 750,
  height: 750,
  parent: "game-container",
  scene: [Preloader, Play],
  physics: {
    default: "arcade",
  },
};

const game = new Game(config);

export { config };
