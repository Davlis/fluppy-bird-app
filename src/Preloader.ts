module FruitBird {

	export class Preloader extends Phaser.State {

		preloadBar: Phaser.Sprite;
		background: Phaser.Sprite;
		ready: boolean = false;

		preload() {

			this.preloadBar = this.add.sprite(300, 400, 'preloadBar');

			this.load.setPreloadSprite(this.preloadBar);

			this.load.image('flapper', 'assets/image/flapper.svg');
			this.load.image('pipe', 'assets/image/pipe.png');
			this.load.image('apple', 'assets/image/apple.svg');
			this.load.image('start', 'assets/image/start.png');
			this.load.image('submit', 'assets/image/submit.png');
			this.load.image('ok', 'assets/image/ok.png');
			this.load.image('cancel', 'assets/image/cancel.png');

			this.load.audio('level_1', 'assets/audio/level_1.mp3');
		}

		create() {
			this.game.state.start('MainMenu');
		}
	}
}
