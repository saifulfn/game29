this.Game29 = this.Game29 || {};
(function () {
    function Board() {
        //this.name = name;
    }

    var p = Board.prototype;

    p.CARD_WIDTH = 72;
    p.CARD_HEIGHT = 96;
    p.GAP = 10;

    p.cardBackgrounds = [];
    p.cards = [];
    p.playableCards = [];
    p.scoreCards = [];
    p.colorCards = [];
    p.table;
    p.selectedCardBackgroundIndex = Math.floor(Math.random() * 13);


    p.setBackgrounds = function (cardsBackground, stage) {
        var bgBmp = new createjs.Bitmap(cardsBackground);
        stage.addChild(bgBmp);
        update = true;
    }

    p.cropCardImages = function (cardsImage) {
        for (var i = 0; i < 5; i++) {
            for (var j = 0; j < 13; j++) {
                var bmp = new createjs.Bitmap(cardsImage);
                bmp.sourceRect = new createjs.Rectangle(73 * j + 1, 1 + 98 * i, 72, 96);
                if (i == 4) {
                    this.cardBackgrounds.push(bmp);
                } else {
                    this.cards.push(bmp);
                }

            }
        }
        console.log(this.cards.length, this.cardBackgrounds.length);
    }

    p.setPlayableCards = function () {
        for (var i = 0; i < 52; i++) {
            var suitIndex = i % 13;
            var suit;
            if (Math.floor(i / 13) == 1) {
                suit = 2;
            } else if (Math.floor(i / 13) == 2) {
                suit = 1;
            } else {
                suit = Math.floor(i / 13);
            }
            var cardType = i % 13;
            if (suitIndex == 0 || (suitIndex >= 6 && suitIndex <= 12)) {
                this.playableCards.push(this.cards[i]);
                this.playableCards[this.playableCards.length - 1].suit = suit;
                switch (suitIndex) {
                    case 0:
                        this.playableCards[this.playableCards.length - 1].point = 1;
                        this.playableCards[this.playableCards.length - 1].priority = 6;
                        break;
                    case 6:
                        this.playableCards[this.playableCards.length - 1].point = 0;
                        this.playableCards[this.playableCards.length - 1].priority = 1;
                        break;
                    case 7:
                        this.playableCards[this.playableCards.length - 1].point = 0;
                        this.playableCards[this.playableCards.length - 1].priority = 2;
                        break;
                    case 8:
                        this.playableCards[this.playableCards.length - 1].point = 2;
                        this.playableCards[this.playableCards.length - 1].priority = 7;
                        break;
                    case 9:
                        this.playableCards[this.playableCards.length - 1].point = 1;
                        this.playableCards[this.playableCards.length - 1].priority = 5;
                        break;
                    case 10:
                        this.playableCards[this.playableCards.length - 1].point = 3;
                        this.playableCards[this.playableCards.length - 1].priority = 8;
                        break;
                    case 11:
                        this.playableCards[this.playableCards.length - 1].point = 0;
                        this.playableCards[this.playableCards.length - 1].priority = 3;
                        break;
                    case 12:
                        this.playableCards[this.playableCards.length - 1].point = 0;
                        this.playableCards[this.playableCards.length - 1].priority = 4;
                        break;
                    default:
                        this.playableCards[this.playableCards.length - 1].point = 0;
                        break;
                }
                switch (cardType) {
                    case 0:
                        this.playableCards[this.playableCards.length - 1].cardType = "ACE";
                        break;
                    case 1:
                        this.playableCards[this.playableCards.length - 1].cardType = "TWO";
                        break;
                    case 2:
                        this.playableCards[this.playableCards.length - 1].cardType = "THREE";
                        break;
                    case 3:
                        this.playableCards[this.playableCards.length - 1].cardType = "FOUR";
                        break;
                    case 4:
                        this.playableCards[this.playableCards.length - 1].cardType = "FIVE";
                        break;
                    case 5:
                        this.playableCards[this.playableCards.length - 1].cardType = "SIX";
                        break;
                    case 6:
                        this.playableCards[this.playableCards.length - 1].cardType = "SEVEN";
                        break;
                    case 7:
                        this.playableCards[this.playableCards.length - 1].cardType = "EIGHT";
                        break;
                    case 8:
                        this.playableCards[this.playableCards.length - 1].cardType = "NINE";
                        break;
                    case 9:
                        this.playableCards[this.playableCards.length - 1].cardType = "TEN";
                        break;
                    case 10:
                        this.playableCards[this.playableCards.length - 1].cardType = "JACK";
                        break;
                    case 11:
                        this.playableCards[this.playableCards.length - 1].cardType = "QUEEN";
                        break;
                    case 12:
                        this.playableCards[this.playableCards.length - 1].cardType = "KING";
                        break;
                }
            } else if (suitIndex == 5) {
                this.scoreCards.push(this.cards[i]);
                this.scoreCards[this.scoreCards.length - 1].cardType = "SIX";
                this.scoreCards[this.scoreCards.length - 1].suit = suit;
            } else {
                this.colorCards.push(this.cards[i]);
                switch (cardType) {
                    case 1:
                        this.colorCards[this.colorCards.length - 1].cardType = "TWO";
                        break;
                    case 2:
                        this.colorCards[this.colorCards.length - 1].cardType = "THREE";
                        break;
                    case 3:
                        this.colorCards[this.colorCards.length - 1].cardType = "FOUR";
                        break;
                    case 4:
                        this.colorCards[this.colorCards.length - 1].cardType = "FIVE";
                        break;
                }
            }
        }
    }

    p.shuffleCard = function (round) {
        if (round == 1) {
            for (var i = 0; i < this.playableCards.length; i++) {
                var rand = Math.floor(Math.random() * this.playableCards.length);
                var temp = this.playableCards[rand];
                this.playableCards[rand] = this.playableCards[i];
                this.playableCards[i] = temp;
            }
        } else {

        }
    }

    p.distributeCards = function (players) {
        for (var i = 0; i < players.length; i++) {
            players[i].cards = [];
            for (var j = 0; j < 8; j++) {
                players[i].cards.push(this.playableCards[i * 8 + j]);
            }
            players[i].cards = this.sortCard(players[i].cards);
        }
    }

    p.sortCard = function (cards) {
        for (var i = 0; i < cards.length; i++) {
            for (var j = i + 1; j < cards.length; j++) {
                if (cards[j].priority + cards[j].suit * 100 > cards[i].priority + cards[i].suit * 100) {
                    var temp = cards[i];
                    cards[i] = cards[j];
                    cards[j] = temp;
                }
            }
        }
        return cards;
    }

    p.prepareStage = function (players, selectedColorSuit, stage, update) {
        this.setupTable(stage, update);
        this.setupPlayerCards(players);
        this.setupScoreBoard(players, stage, update);
    }

    p.setupTable = function (stage, update) {
        this.table = new createjs.Shape();
        this.table.graphics.beginFill("#ffffAA").drawRect(0, 0, stage.canvas.width - this.CARD_WIDTH * 2 - this.GAP * 4, stage.canvas.height - this.CARD_HEIGHT * 2 - this.GAP * 4);
        this.table.x = this.CARD_WIDTH + this.GAP * 2;
        this.table.y = this.CARD_HEIGHT + this.GAP * 2;
        this.table.width = stage.canvas.width - this.CARD_WIDTH * 2 - this.GAP * 4;
        this.table.height = stage.canvas.height - this.CARD_HEIGHT * 2 - this.GAP * 4;

        stage.addChild(this.table);
        update = true;
    }

    p.setupPlayerCards = function (players) {
        console.log("setupPlayerCards");
        for (var i = 0; i < players.length; i++) {
            for (var j = 0; j < 8; j++) {
                var card = players[i].cards[j];
                if (i != 0) {
                    card = this.cardBackgrounds[this.selectedCardBackgroundIndex].clone();
                }
                card.index = j;
                card.playerIndex = i;
                /*card.on('click', function () {
                 console.log(this.cardType, this.priority + this.suit*100);
                 });*/
                card.on("mousedown", function (evt) {

                    this.parent.addChild(this);
                    this.offset = {x: this.x - evt.stageX, y: this.y - evt.stageY};
                    update = true;

                });
                card.on("pressmove", function (evt) {
                    this.x = evt.stageX + this.offset.x;
                    this.y = evt.stageY + this.offset.y;
                    // indicate that the stage should be updated on the next tick:
                    update = true;
                });
                card.on("pressup", function (event) {
                    console.log("mouse released")
                    if (checkBoardCardCollision(this)) {
                        switch (currentPlayerIndex) {
                            case 0:
                                this.x = 2 * (board.width - 3 * 72) / 4 + 72 + board.x;
                                this.y = 2 * (board.height - 96 * 2) / 3 + 96 + board.y;
                                break;
                            case 1:
                                this.x = 1 * (board.width - 3 * 72) / 4 + board.x;
                                this.y = (board.height - 96) / 2 + board.y;
                                break;
                            case 2:
                                this.x = 2 * (board.width - 3 * 72) / 4 + 72 + board.x;
                                this.y = 1 * (board.height - 96 * 2) / 3 + 96 * 0 + board.y;
                                break;
                            case 3:
                                this.x = 3 * (board.width - 3 * 72) / 4 + 72 * 2 + board.x;
                                this.y = (board.height - 96) / 2 + board.y;
                                break;
                        }
                        currentPlayerIndex++;
                        if (currentPlayerIndex > 3)
                            currentPlayerIndex = 0;

                    } else {
                        console.log(board.x, board.y, board.rec, board.height);
                        this.x = this.originalPosition.x;
                        this.y = this.originalPosition.y;
                    }
                    update = true;
                });
                switch (i) {
                    case 0:
                        card.x = j * 20 + (stage.canvas.width - 72 - 7 * 20) / 2;
                        card.y = stage.canvas.height - 10 - 96;
                        break;
                    case 1:
                        card.x = 10;
                        card.y = j * 25 + (stage.canvas.height - 96 - 7 * 25) / 2;
                        break;
                    case 2:
                        card.x = j * 20 + (stage.canvas.width - 72 - 7 * 20) / 2;
                        card.y = 10;
                        break;
                    case 3:
                        card.x = stage.canvas.width - 72 - 10;
                        card.y = j * 25 + (stage.canvas.height - 96 - 7 * 25) / 2;
                        break;
                }
                card.originalPosition = {x: card.x, y: card.y};

                //console.log(card.cardType, card.point, card.suit, card.priority);
                stage.addChild(card);
            }
        }
    }

    p.setupScoreBoard = function (players, stage, update) {
        var userScore = players[0].score + players[2].score;
        var opponentScore = players[1].score + players[3].score;

        for (var i=0; i<4; i++) {
            //var card = this.scoreCards[i];
            var card = this.cardBackgrounds[this.selectedCardBackgroundIndex].clone();

            console.log(card);
            card.regX = this.CARD_WIDTH/2;
            card.regY = this.CARD_HEIGHT/2;
            switch (i) {
                case 0:
                    card.x = this.table.x + this.table.width - this.GAP*2 - this.CARD_WIDTH/2;
                    card.y = this.table.y + this.table.height - this.GAP*2 - this.CARD_HEIGHT/2 ;
                    card.rotation = Math.random()*40-20;
                    stage.addChild(card);
                    break;
                case 1:
                    card.x = this.table.x + this.table.width - this.GAP*2 - this.CARD_WIDTH/2;
                    card.y = this.table.y + this.table.height - this.GAP*2 - this.CARD_HEIGHT/2;
                    card.rotation = Math.random()*40-20;
                    stage.addChild(card);
                    break;
                case 2:
                    card.x = this.table.x + this.GAP*2 + this.CARD_WIDTH/2;
                    card.y = this.table.y + this.GAP*2 + this.CARD_HEIGHT/2 ;
                    card.rotation = Math.random()*40-20;
                    stage.addChild(card);
                    break;
                case 3:
                    card.x = this.table.x + this.GAP*2 + this.CARD_WIDTH/2;
                    card.y = this.table.y + this.GAP*2 + this.CARD_HEIGHT/2 ;
                    card.rotation = Math.random()*40-20;
                    stage.addChild(card);
                    break;
            }
        }
        update = true;
    }

    Game29.Board = Board;
})();