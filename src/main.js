import kaboom from "kaboom";

kaboom();

// Sprites

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
loadSprite("swing", "sprites/swing.png", {
	sliceX: 8,
	anims: {
		"idle": 7,
		"attack": {
			from: 0,
			to: 6,
			speed: 12,
		}
	}
});
loadSprite("enemy", "sprites/ogre.png");

// Constants

const SPEED = 260;
const ENEMY_SPEED = 160;
const ENEMY_DAMAGE = 40;

// Levels

const level1 = addLevel([
	"wwwwwwwwww",
	"w        w",
	"w        w",
	"w    w   w",
	"w    w   w",
	"w    w   w",
	"w        w",
	"w        w",
	"w        w",
	"wwwwwwwwww",
], {
	tileWidth: 75,
	tileHeight: 75,
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

// Player

const player = level1.spawn([
	"player",
	sprite("player", { anim: "idle" }),
	anchor("center"),
	tile(),
	body(),
	area({ shape: new Rect(vec2(0, 0), 40, 90) }),
	z(1),
	health(100),
], 2, 2);

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

player.on("death", () => {
	destroy(player);
});

const playerHealth = add([
	text(`Health: ${player.hp()}`),
]);

onUpdate("player", () => {
	playerHealth.text = player.hp();
});

// Swing

const swing = player.add([
	"swing",
	sprite("swing"),
	area({ shape: new Rect(vec2(16, 16), 40, 80) }),
	rotate(270),
	pos(0, 32),
]);

swing.play("idle");

onKeyDown("space", () => {
	if (swing.curAnim() !== "attack") {
		swing.play("attack");
	}
});

onKeyRelease("space", () => {
	swing.play("idle");
});

onCollideUpdate("swing", "enemy", () => {
	if (swing.curAnim() === "attack") {
		enemy.destroy();
	}
});

// Enemies

const enemy = level1.spawn([
	"enemy",
	sprite("enemy"),
	pos(525, 525),
	area(),
]);

enemy.flipX = true;

onUpdate(() => {
	if (player.exists()) {
		const dir = player.pos.sub(enemy.pos).unit();
		enemy.move(dir.scale(ENEMY_SPEED))
	}
});

onCollideUpdate("player", "enemy", () => {
	player.hurt();
});

// Camera

player.onUpdate(() => {
	camPos(player.pos);
});

player.onPhysicsResolve(() => {
	camPos(player.pos);
});
