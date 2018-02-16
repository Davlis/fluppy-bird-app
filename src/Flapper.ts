module FruitBird {

	export const FLAPPER_GRAVITY = 3500;
	export const FLAPPER_SCALE = .2;

	export class Flapper extends Phaser.Sprite {

		killed: boolean = false;

		constructor(game: Phaser.Game, x: number, y: number) {

			super(game, x, y, 'flapper');

			this.scale.setTo(FLAPPER_SCALE);

			this.game.physics.enable(this, Phaser.Physics.ARCADE);
			
			this.body.gravity.y = FLAPPER_GRAVITY; 

			this.game.add.existing(this);
		}

		flapKill() {
			this.angle = -90;
			this.body.gravity.y = FLAPPER_GRAVITY;
			this.killed = true;
		}

		update() {

			if (this.killed) {
				return;
			}

			this.body.velocity.x = 0;
			this.body.velocity.y = 0;

			if (this.game.input.keyboard.isDown(Phaser.Keyboard.UP)) {
				this.body.velocity.y = -350;
			} else if (this.game.input.keyboard.isDown(Phaser.Keyboard.DOWN)) {
				this.body.velocity.y = 350;
			} else if (this.game.input.keyboard.isDown(Phaser.Keyboard.LEFT)) {
				this.body.velocity.x = -350;
			} else if (this.game.input.keyboard.isDown(Phaser.Keyboard.RIGHT)) {
				this.body.velocity.x = 350;
			}

			if (this.game.input.mousePointer.isDown) {
				this.body.velocity.y = -350;
			}
		}
	}
}
