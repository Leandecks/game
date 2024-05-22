import kaboom from "kaboom";

kaboom();

loadSprite("floor", "sprites/floor.png");
loadSprite("wall", "sprites/wall.png");
loadSprite("knight", "sprites/knight.png");

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
		],
		" ": () => [
			sprite("floor"),
			scale(.75),
			tile({ isObstacle: false }),
		],
	}
});

const knight = level1.spawn([
	"knight",
	sprite("knight"),
	scale(3.5),
	anchor("center"),
	tile(),
	body(),
	area({ shape: new Rect(vec2(0, 6), 12, 12) }),
], 2, 2);

onKeyDown("w", () => {
	knight.move(0, -SPEED);
	knight.flipX = false;
});

onKeyDown("a", () => {
	knight.move(-SPEED, 0);
	knight.flipX = true;
});

onKeyDown("s", () => {
	knight.move(0, SPEED);
	knight.flipX = true;
});

onKeyDown("d", () => {
	knight.move(SPEED, 0);
	knight.flipX = false;
});

onUpdate("knight", (knight) => {
	if (knight.pos.x < 75) {
		knight.pos.x = 75;
	} else if (knight.pos.x > 675) {
		knight.pos.x = 675
	}
});
