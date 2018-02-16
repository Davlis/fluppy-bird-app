module FruitBird {

    export class Pipe extends Phaser.Sprite {

        constructor(game: Phaser.Game, x: number, y: number) {
            super(game, x, y, 'pipe');
            this.game.physics.enable(this, Phaser.Physics.ARCADE);
        }

        update() {
            this.body.velocity.x = -200;
        }

    }

}
