module FruitBird {

    export class Apple extends Phaser.Sprite implements IReward {

        score: number = 50;

        constructor(game: Phaser.Game, x: number, y: number) {
            super(game, x, y, 'apple');
            this.scale.setTo(0.2);
            this.game.physics.arcade.enable(this);
        }

        update() {
            this.body.velocity.x = -150;
        }
    }
}