<script>
  import { onMount } from "svelte";

  onMount(async () => {
    const Phaser = (await import("phaser")).default;

    let player;
    let cursors;

    const config = {
      type: Phaser.AUTO,
      width: 600,
      height: 800,
      backgroundColor: "#87CEEB",
      parent: "canvas-text", // 👈 ใส่ Phaser canvas ลง element ที่มี id นี้
      physics: {
        default: "arcade",
        arcade: {
          gravity: { y: 0 },
          debug: false,
        },
      },
      scale: {
        mode: Phaser.Scale.RESIZE, // responsive เต็มหน้าจอ
        autoCenter: Phaser.Scale.CENTER_BOTH,
      },
      scene: {
        preload,
        create,
        update,
      },
    };

    new Phaser.Game(config);

    function preload() {
      this.load.image("player", "/favicon.png");
      this.load.image("button", "/assent_Eng3/bg_1.png");
    }

    function create() {
      player = this.physics.add.sprite(400, 300, "player").setScale(0.1);

      const button = this.add.image(400, 500, "button").setInteractive();
      button.setScale(0.3);
      button.on("pointerdown", () => {
        console.log("ปุ่มถูกกด!");
      });
      button.on("pointerover", () => button.setScale(0.35));
      button.on("pointerout", () => button.setScale(0.3));

      cursors = this.input.keyboard.createCursorKeys();
    }

    function update() {
      player.setVelocity(0);

      if (cursors.left.isDown) player.setVelocityX(-200);
      else if (cursors.right.isDown) player.setVelocityX(200);

      if (cursors.up.isDown) player.setVelocityY(-200);
      else if (cursors.down.isDown) player.setVelocityY(200);
    }
  });
</script>

<style>
  #canvas-text {
    overflow: hidden;
  }
</style>

<div class="justify-center items-center w-full flex" id="canvas-text"></div>

