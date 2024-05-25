import kaboom from "kaboom";

kaboom();

loadSprite("floor", "sprites/floor.png");
loadSprite("wall", "sprites/wall.png");
loadSprite("player", "sprites/player.png", {
	sliceX: 12,
	anims: {
		"idle": {
			from: 0,
			to: 11,
			speed: 8,
			loop: true,
		}
	}
});

const SPEED = 260;

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
			body({ isStatic: true }),
			tile({ isObstacle: true }),
			z(2),
		],
		" ": () => [
			sprite("floor"),
			scale(.75),
			tile({ isObstacle: false }),
			z(0),
		],
	}
});

const player = level1.spawn([
	"player",
	sprite("player"),
	anchor("center"),
	tile(),
	body(),
	area({ shape: new Rect(vec2(0, 0), 40, 90) }),
	z(1),
], 2, 2);

player.play("idle");

onKeyDown("w", () => {
	player.move(0, -SPEED);
});

onKeyDown("a", () => {
	player.move(-SPEED, 0);
	player.flipX = true;
});

onKeyDown("s", () => {
	player.move(0, SPEED);
});

onKeyDown("d", () => {
	player.move(SPEED, 0);
	player.flipX = false;
});
