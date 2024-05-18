import kaboom from "kaboom";

kaboom();

loadSprite("floor", "sprites/floor.png");
loadSprite("wall", "sprites/wall.png");

const level1 = addLevel([
	"wwwwwwwwww",
	"w        w",
	"w        w",
	"w        w",
	"w        w",
	"w        w",
	"w        w",
	"w        w",
	"w        w",
	"wwwwwwwwww",
], {
	tileWidth: 75,
	tileHeight: 75,
	pos: vec2((width() - 75 * 10) / 2, (height() - 75 * 10) / 2),
	tiles: {
		"w": () => [
			sprite("wall"),
			area(),
			scale(.75),
			body(),
		],
		" ": () => [
			sprite("floor"),
			area(),
			scale(.75)
		],
	}
});
