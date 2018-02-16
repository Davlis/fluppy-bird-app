var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var FruitBird;
(function (FruitBird) {
    var Apple = (function (_super) {
        __extends(Apple, _super);
        function Apple(game, x, y) {
            var _this = _super.call(this, game, x, y, 'apple') || this;
            _this.score = 50;
            _this.scale.setTo(0.2);
            _this.game.physics.arcade.enable(_this);
            return _this;
        }
        Apple.prototype.update = function () {
            this.body.velocity.x = -150;
        };
        return Apple;
    }(Phaser.Sprite));
    FruitBird.Apple = Apple;
})(FruitBird || (FruitBird = {}));
var FruitBird;
(function (FruitBird) {
    var Boot = (function (_super) {
        __extends(Boot, _super);
        function Boot() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        Boot.prototype.init = function () {
            this.input.maxPointers = 1;
            this.stage.disableVisibilityChange = true;
            this.game.physics.startSystem(Phaser.Physics.ARCADE);
            if (this.game.device.desktop) {
                this.scale.pageAlignHorizontally = true;
            }
            else {
                this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
                this.scale.setMinMax(480, 260, 1024, 768);
                this.scale.forceLandscape = true;
                this.scale.pageAlignHorizontally = true;
            }
        };
        Boot.prototype.preload = function () {
            this.load.image('preloadBar', 'assets/image/loader.png');
        };
        Boot.prototype.create = function () {
            this.game.state.start('Preloader');
        };
        return Boot;
    }(Phaser.State));
    FruitBird.Boot = Boot;
})(FruitBird || (FruitBird = {}));
var FruitBird;
(function (FruitBird) {
    FruitBird.FLAPPER_GRAVITY = 3500;
    FruitBird.FLAPPER_SCALE = .2;
    var Flapper = (function (_super) {
        __extends(Flapper, _super);
        function Flapper(game, x, y) {
            var _this = _super.call(this, game, x, y, 'flapper') || this;
            _this.killed = false;
            _this.scale.setTo(FruitBird.FLAPPER_SCALE);
            _this.game.physics.enable(_this, Phaser.Physics.ARCADE);
            _this.body.gravity.y = FruitBird.FLAPPER_GRAVITY;
            _this.game.add.existing(_this);
            return _this;
        }
        Flapper.prototype.flapKill = function () {
            this.angle = -90;
            this.body.gravity.y = FruitBird.FLAPPER_GRAVITY;
            this.killed = true;
        };
        Flapper.prototype.update = function () {
            if (this.killed) {
                return;
            }
            this.body.velocity.x = 0;
            this.body.velocity.y = 0;
            if (this.game.input.keyboard.isDown(Phaser.Keyboard.UP)) {
                this.body.velocity.y = -350;
            }
            else if (this.game.input.keyboard.isDown(Phaser.Keyboard.DOWN)) {
                this.body.velocity.y = 350;
            }
            else if (this.game.input.keyboard.isDown(Phaser.Keyboard.LEFT)) {
                this.body.velocity.x = -350;
            }
            else if (this.game.input.keyboard.isDown(Phaser.Keyboard.RIGHT)) {
                this.body.velocity.x = 350;
            }
            if (this.game.input.mousePointer.isDown) {
                this.body.velocity.y = -350;
            }
        };
        return Flapper;
    }(Phaser.Sprite));
    FruitBird.Flapper = Flapper;
})(FruitBird || (FruitBird = {}));
var FruitBird;
(function (FruitBird) {
    var Game = (function (_super) {
        __extends(Game, _super);
        function Game() {
            var _this = _super.call(this, 800, 600, Phaser.AUTO, 'content', null) || this;
            _this.state.add('Boot', FruitBird.Boot, false);
            _this.state.add('Preloader', FruitBird.Preloader, false);
            _this.state.add('MainMenu', FruitBird.MainMenu, false);
            _this.state.add('Level1', FruitBird.Level1, false);
            _this.state.add('ScoreBoard', FruitBird.ScoreBoard, false);
            _this.state.start('Boot');
            return _this;
        }
        return Game;
    }(Phaser.Game));
    FruitBird.Game = Game;
    window.onload = function () {
        var game = new Game();
    };
})(FruitBird || (FruitBird = {}));
var FruitBird;
(function (FruitBird) {
    var Level = (function (_super) {
        __extends(Level, _super);
        function Level() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        Level.prototype.create = function () {
            this.setBackground();
            this.addFlapper();
            this.setLabelScore();
            this.initGroups();
            this.initTimeEvents();
        };
        Level.prototype.update = function () {
            if (this.flapper.killed) {
                if (this.flapper.y + this.flapper.height === this.game.height) {
                    setTimeout(this.restartGame.bind(this), 500);
                }
                return;
            }
            this.onUpdate();
        };
        Level.prototype.setBackground = function () {
            this.game.stage.backgroundColor = 'rgba(68, 136, 170, 0.5)';
        };
        Level.prototype.addFlapper = function () {
            this.flapper = new FruitBird.Flapper(this.game, 100, 245);
            this.flapper.body.collideWorldBounds = true;
        };
        Level.prototype.addScore = function (score) {
            var parsedScore = +this.labelScore.text;
            this.labelScore.text = "" + (parsedScore + score);
        };
        Level.prototype.restartGame = function () {
            this.game.state.start('ScoreBoard', true, false, +this.labelScore.text);
        };
        return Level;
    }(Phaser.State));
    FruitBird.Level = Level;
})(FruitBird || (FruitBird = {}));
var FruitBird;
(function (FruitBird) {
    FruitBird.OBSTACLE_SPAWN_IN_MS = 1500;
    FruitBird.REWARD_SPAWN_IN_MS = 1000;
    var Level1 = (function (_super) {
        __extends(Level1, _super);
        function Level1() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        Level1.prototype.create = function () {
            this.setBackground();
            this.setAudio();
            this.addFlapper();
            this.setLabelScore();
            this.initGroups();
            this.initTimeEvents();
        };
        Level1.prototype.setBackground = function () {
            this.stage.backgroundColor = 'rgba(68, 136, 170, 0.5)';
        };
        Level1.prototype.setAudio = function () {
            this.music = this.add.audio('level_1', 1, true);
            this.music.play();
        };
        Level1.prototype.addFlapper = function () {
            this.flapper = new FruitBird.Flapper(this.game, 100, 245);
            this.flapper.body.collideWorldBounds = true;
        };
        Level1.prototype.setLabelScore = function (value) {
            if (value === void 0) { value = "0"; }
            this.labelScore = this.add.text(20, 20, "0", { font: "30px Arial", fill: "#ffffff" });
        };
        Level1.prototype.initGroups = function () {
            this.obstacles = this.add.group();
            this.rewards = this.add.group();
        };
        Level1.prototype.initTimeEvents = function () {
            this.time.events.loop(FruitBird.OBSTACLE_SPAWN_IN_MS, this.addPipes, this);
            this.time.events.loop(FruitBird.REWARD_SPAWN_IN_MS, this.addReward, this);
        };
        Level1.prototype.addPipes = function () {
            this.addPipe(Math.random() * 400 + 400, Math.random() * 300);
            this.addPipe(Math.random() * 400 + 400, Math.random() * 300 + 300);
        };
        Level1.prototype.addReward = function () {
            var reward = new FruitBird.Apple(this.game, Math.random() * this.game.width, Math.random() * this.game.height);
            reward.scale.setTo(0.1);
            reward.checkWorldBounds = true;
            reward.outOfBoundsKill = true;
            this.rewards.add(reward);
        };
        Level1.prototype.addPipe = function (x, y) {
            if (x === void 0) { x = 0; }
            if (y === void 0) { y = 0; }
            var pipe = new FruitBird.Pipe(this.game, x, y);
            pipe.scale.setTo(1, Math.random() * 3 + 1);
            pipe.checkWorldBounds = true;
            pipe.outOfBoundsKill = true;
            this.obstacles.add(pipe);
        };
        Level1.prototype.update = function () {
            if (this.flapper.killed) {
                if (this.flapper.y + this.flapper.height === this.game.height) {
                    setTimeout(this.goToScoreBoard.bind(this), 500);
                }
                return;
            }
            this.physics.arcade.collide(this.flapper, this.obstacles, this.obscaleCollide, null, this);
            this.physics.arcade.collide(this.flapper, this.rewards, this.rewardCollide, null, this);
        };
        Level1.prototype.obscaleCollide = function () {
            this.flapper.flapKill();
        };
        Level1.prototype.rewardCollide = function (flapper, reward) {
            this.addScore(reward.score);
            reward.destroy();
        };
        Level1.prototype.addScore = function (score) {
            var parsedScore = +this.labelScore.text;
            this.labelScore.text = "" + (parsedScore + score);
        };
        Level1.prototype.goToScoreBoard = function () {
            this.music.destroy();
            this.state.start('ScoreBoard', true, false, +this.labelScore.text);
        };
        return Level1;
    }(Phaser.State));
    FruitBird.Level1 = Level1;
})(FruitBird || (FruitBird = {}));
var FruitBird;
(function (FruitBird) {
    var MainMenu = (function (_super) {
        __extends(MainMenu, _super);
        function MainMenu() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        MainMenu.prototype.create = function () {
            this.startGame();
        };
        MainMenu.prototype.startGame = function () {
            this.game.state.start('Level1');
        };
        return MainMenu;
    }(Phaser.State));
    FruitBird.MainMenu = MainMenu;
})(FruitBird || (FruitBird = {}));
var FruitBird;
(function (FruitBird) {
    var Pipe = (function (_super) {
        __extends(Pipe, _super);
        function Pipe(game, x, y) {
            var _this = _super.call(this, game, x, y, 'pipe') || this;
            _this.game.physics.enable(_this, Phaser.Physics.ARCADE);
            return _this;
        }
        Pipe.prototype.update = function () {
            this.body.velocity.x = -200;
        };
        return Pipe;
    }(Phaser.Sprite));
    FruitBird.Pipe = Pipe;
})(FruitBird || (FruitBird = {}));
var FruitBird;
(function (FruitBird) {
    var Preloader = (function (_super) {
        __extends(Preloader, _super);
        function Preloader() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.ready = false;
            return _this;
        }
        Preloader.prototype.preload = function () {
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
        };
        Preloader.prototype.create = function () {
            this.game.state.start('MainMenu');
        };
        return Preloader;
    }(Phaser.State));
    FruitBird.Preloader = Preloader;
})(FruitBird || (FruitBird = {}));
var FruitBird;
(function (FruitBird) {
    var ScoreBoard = (function (_super) {
        __extends(ScoreBoard, _super);
        function ScoreBoard() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        ScoreBoard.prototype.init = function (score) {
            this.score = score;
        };
        ScoreBoard.prototype.create = function () {
            this.game.add.text(this.game.world.centerX - 100, this.game.world.centerY, "Your score: " + this.score, { font: "30px Arial", fill: "#ffffff" });
            var button = this.game.add.button(this.game.world.centerX - 200, this.game.world.centerY + 50, 'start', this.startGame, this).scale.setTo(0.5);
            var submitButton = this.game.add.button(this.game.world.centerX - 160 + 200, this.game.world.centerY + 50, 'submit', this.sendScore, this).scale.setTo(0.5);
            this.game.add.plugin(PhaserInput.Plugin);
            this.input = (this.game).add.inputField(this.game.world.centerX - 100, this.game.world.centerY - 50, {
                font: '18px Arial',
                fill: '#212121',
                fontWeight: 'bold',
                width: 200,
                padding: 8,
                borderWidth: 1,
                borderColor: '#000',
                borderRadius: 6,
                placeHolder: 'Nickname',
                type: PhaserInput.InputType.text
            });
        };
        ScoreBoard.prototype.update = function () {
            if (this.game.input.keyboard.isDown(Phaser.Keyboard.ENTER)
                || this.game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)) {
                this.startGame();
            }
        };
        ScoreBoard.prototype.startGame = function () {
            this.game.state.start('Level1', true, false);
        };
        ScoreBoard.prototype.sendScore = function () {
            if (this.input.value) {
                var that_1 = this;
                $.getJSON("/env/env.json", function (data) {
                    var apiUrl = data.API_URL;
                    $.ajax(apiUrl + '/stats', {
                        data: JSON.stringify({ nickname: 'Anon', score: that_1.score }),
                        contentType: 'application/json',
                        type: 'POST'
                    });
                });
                this.startGame();
            }
            else {
                alert('You need provide nickname if you want perform submit.');
            }
        };
        return ScoreBoard;
    }(Phaser.State));
    FruitBird.ScoreBoard = ScoreBoard;
})(FruitBird || (FruitBird = {}));
//# sourceMappingURL=game.js.map