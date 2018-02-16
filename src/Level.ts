module FruitBird {

    // TODO: generate abstract classes, interfaces before implementation classes.

    export abstract class Level extends Phaser.State {

        abstract setLabelScore(): void;
        abstract initGroups(): void;
        abstract initTimeEvents(): void;
        abstract onUpdate(): void;

        flapper: FruitBird.Flapper;
        obstacles: Phaser.Group;
        rewards: Phaser.Group;
        labelScore: Phaser.Text;

        create() {
            this.setBackground();

            this.addFlapper();

            this.setLabelScore();

            this.initGroups();

            this.initTimeEvents();
        }

        update() {
            if (this.flapper.killed) {
                if (this.flapper.y + this.flapper.height === this.game.height) {
                    setTimeout(this.restartGame.bind(this), 500);
                }
                return;
            }

            this.onUpdate();
        }

        setBackground() {
            this.game.stage.backgroundColor = 'rgba(68, 136, 170, 0.5)';
        }

        addFlapper() {
            this.flapper = new Flapper(this.game, 100, 245);
            this.flapper.body.collideWorldBounds = true;
        }

        addScore(score: number) {
            const parsedScore = +this.labelScore.text;
            this.labelScore.text = `${parsedScore + score}`
        }

        restartGame() {
            this.game.state.start('ScoreBoard', true, false, +this.labelScore.text);
        }
    }
}
