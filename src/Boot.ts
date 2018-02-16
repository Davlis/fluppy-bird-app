module FruitBird {

	export class Boot extends Phaser.State {

		init() {
			this.input.maxPointers = 1;

			this.stage.disableVisibilityChange = true;

			this.game.physics.startSystem(Phaser.Physics.ARCADE);

			if (this.game.device.desktop) {
				this.scale.pageAlignHorizontally = true;
			} else {
				this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
				this.scale.setMinMax(480, 260, 1024, 768);
				this.scale.forceLandscape = true;
				this.scale.pageAlignHorizontally = true;
			}
		}

		preload() {
			this.load.image('preloadBar', 'assets/image/loader.png');
		}

		create() {
			this.game.state.start('Preloader');
		}
	}
}

