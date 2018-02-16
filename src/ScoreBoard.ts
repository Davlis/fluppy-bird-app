module FruitBird {

    declare var $: any;
    declare var process: any;
    declare var PhaserInput: any;

    export class ScoreBoard extends Phaser.State {

        labelScore: Phaser.Text;
        score: number;

        topScores: any[];

        nickname: any;
        input: any;

        init(score: number) {
            this.score = score;
        }

        create() {

            this.game.add.text(this.game.world.centerX - 100, this.game.world.centerY, `Your score: ${this.score}`,
                { font: "30px Arial", fill: "#ffffff" });

            const button = this.game.add.button(
                this.game.world.centerX - 200,
                this.game.world.centerY + 50,
                'start',
                this.startGame,
                this,
            ).scale.setTo(0.5);

            const submitButton = this.game.add.button(
                this.game.world.centerX - 160 + 200,
                this.game.world.centerY + 50,
                'submit',
                this.sendScore,
                this,
            ).scale.setTo(0.5);

            this.game.add.plugin(PhaserInput.Plugin);

            this.input = (<any>(this.game)).add.inputField(this.game.world.centerX - 100, this.game.world.centerY - 50, {
                font: '18px Arial',
                fill: '#212121',
                fontWeight: 'bold',
                width: 200,
                padding: 8,
                borderWidth: 1,
                borderColor: '#000',
                borderRadius: 6,
                placeHolder: 'Nickname',
                type: PhaserInput.InputType.text,
            });
        }

        update() {
            if (this.game.input.keyboard.isDown(Phaser.Keyboard.ENTER)
                || this.game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)) {

                this.startGame();
            }
        }

        startGame() {
            this.game.state.start('Level1', true, false);
        }

        sendScore() {
            if (this.input.value) {
                const that = this;
                $.getJSON("/env/env.json", function (data: any) {
                    const apiUrl = data.API_URL;
                    $.ajax(apiUrl + '/stats', {
                        data: JSON.stringify({ nickname: 'Anon', score: that.score }),
                        contentType: 'application/json',
                        type: 'POST',
                    });
                });
                this.startGame();
            } else {
                alert('You need provide nickname if you want perform submit.');
            }
        }
    }
}
