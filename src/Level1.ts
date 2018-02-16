module FruitBird {

	export const OBSTACLE_SPAWN_IN_MS = 1500;
	export const REWARD_SPAWN_IN_MS = 1000;

	export class Level1 extends Phaser.State {

		flapper: FruitBird.Flapper;
		obstacles: Phaser.Group;
		rewards: Phaser.Group;

		labelScore: Phaser.Text;

		music: Phaser.Sound;

		create() {
			this.setBackground();

			this.setAudio();

			this.addFlapper();

			this.setLabelScore();

			this.initGroups();

			this.initTimeEvents();
		}

		setBackground() {
			this.stage.backgroundColor = 'rgba(68, 136, 170, 0.5)';
		}

		setAudio() {
			this.music = this.add.audio('level_1', 1, true);
			this.music.play();
		}

		addFlapper() {
			this.flapper = new Flapper(this.game, 100, 245);
			this.flapper.body.collideWorldBounds = true;
		}

		setLabelScore(value: string = "0") {
			this.labelScore = this.add.text(20, 20, "0",
				{ font: "30px Arial", fill: "#ffffff" });
		}

		initGroups() {
			this.obstacles = this.add.group();
			this.rewards = this.add.group();
		}

		initTimeEvents() {
			this.time.events.loop(OBSTACLE_SPAWN_IN_MS, this.addPipes, this);
			this.time.events.loop(REWARD_SPAWN_IN_MS, this.addReward, this);
		}

		addPipes() {
			this.addPipe(Math.random() * 400 + 400, Math.random() * 300);
			this.addPipe(Math.random() * 400 + 400, Math.random() * 300 + 300);
		}

		addReward() {
			const reward = new Apple(this.game, Math.random() * this.game.width, Math.random() * this.game.height);
			reward.scale.setTo(0.1);

			reward.checkWorldBounds = true;
			reward.outOfBoundsKill = true;

			this.rewards.add(reward);
		}

		addPipe(x: number = 0, y: number = 0) {
			const pipe = new Pipe(this.game, x, y);
			pipe.scale.setTo(1, Math.random() * 3 + 1);

			pipe.checkWorldBounds = true;
			pipe.outOfBoundsKill = true;

			this.obstacles.add(pipe);
		}

		update() {
			if (this.flapper.killed) {
				if (this.flapper.y + this.flapper.height === this.game.height) {
					setTimeout(this.goToScoreBoard.bind(this), 500);
				}
				return;
			}

			this.physics.arcade.collide(this.flapper, this.obstacles, this.obscaleCollide, null, this);
			this.physics.arcade.collide(this.flapper, this.rewards, this.rewardCollide, null, this);
		}

		obscaleCollide() {
			this.flapper.flapKill();
		}

		rewardCollide(flapper: Flapper, reward: any) {
			this.addScore(reward.score);
			reward.destroy();
		}

		addScore(score: number) {
			const parsedScore = +this.labelScore.text;
			this.labelScore.text = `${parsedScore + score}` 
		}

		goToScoreBoard() {
			this.music.destroy();
			this.state.start('ScoreBoard', true, false, +this.labelScore.text);
		}
	}
}
