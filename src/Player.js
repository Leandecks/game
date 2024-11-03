class Player extends Phaser.GameObjects.Sprite {
  constructor(scene, x, y) {
    super(scene, x, y, "player");
    scene.add.existing(this);
    scene.physics.world.enable(this);

    this.createAnimations(this);
    this.anims.play("idle", true);
    this.body.setCollideWorldBounds(true);
    this.body.setVelocity(0);

    this.keyObjects = scene.input.keyboard.addKeys({
      up: "W",
      down: "S",
      left: "A",
      right: "D",
      attack: "SPACE",
    });
  }

  createAnimations(player) {
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
  }

  update(...args) {
    super.update(...args);

    // Movement

    if (this.keyObjects.left.isDown) {
      this.body.setVelocityX(-100);
    } else if (this.keyObjects.right.isDown) {
      this.body.setVelocityX(100);
    }
    if (this.keyObjects.up.isDown) {
      this.body.setVelocityY(-100);
    } else if (this.keyObjects.down.isDown) {
      this.body.setVelocityY(100);
    }

    // Animations

    if (this.keyObjects.left.isDown) {
      this.anims.play("walk", true);
      this.flipX = true;
    } else if (this.keyObjects.right.isDown) {
      this.anims.play("walk", true);
      this.flipX = false;
    } else if (this.keyObjects.up.isDown) {
      this.anims.play("walk", true);
      this.flipX = false;
    } else if (this.keyObjects.down.isDown) {
      this.anims.play("walk", true);
      this.flipX = true;
    } else if (this.keyObjects.attack.isDown) {
      this.anims.play("attack", true);
    } else {
      this.anims.play("idle", true);
    }
  }
}

export default Player;
