module FruitBird {

	export class MainMenu extends Phaser.State {

		// TODO: create menu

		create() {
			this.startGame()
		}

		startGame() {
			this.game.state.start('Level1');
		}
	}
}
