var queue = new createjs.LoadQueue(true);

queue.on("complete", handleComplete, this);
queue.loadFile({id: "cardsImage", src: "/images/classic-playing-cards-with-background.png", loadNow: false});
queue.loadFile({id: "cardsBackground", src: "/images/background.png", loadNow: false});
queue.load();


//var cards = [];
//var cardBackgrounds = [];

var stage;
var update;
var board;
var players = [];
var currentPlayerIndex = 0;
var round = 1;
var selectedColorSuit;

function handleComplete() {
    console.log("cards file loaded");
    initTicker();
    initStage();
    initBoard();
    addPlayers();
    initRound();
}

function initTicker() {
    createjs.Ticker.addEventListener("tick", tick);
    createjs.Ticker.setFPS(60);
}
function tick(event) {
    if (update) {
        update = false; // only update once
        stage.update(event);
    }
}
function initStage() {

    stage = new createjs.Stage("game29");
}

function initBoard() {
    console.log("initBoard");
    board = new Game29.Board();
    board.setBackgrounds(queue.getResult("cardsBackground"), stage, update);
    board.cropCardImages(queue.getResult("cardsImage"));
    board.setPlayableCards();
}

function addPlayers() {
    console.log("addPlayers")
    players.push(new Game29.Player("Saif"));
    players.push(new Game29.Player("Zahid"));
    players.push(new Game29.Player("Shibbir"));
    players.push(new Game29.Player("Shaishab"));
}

function initRound() {
    console.log("initRound")
    board.shuffleCard(round);
    board.distributeCards(players);
    //initStage();
    board.prepareStage(players, selectedColorSuit, stage, update);
}

function initStage2() {


    var txt = new createjs.Text();
    txt.font = "bold 32px Oswald";
    txt.color = "#FF0000";
    txt.text = "Hello World! 1 2 3 4 5 6 7 8 9 0";
    txt.x = board.x;
    txt.y = board.y;
    stage.addChild(txt);


    console.log(stage.canvas.width, stage.canvas.height);
    stage.update();
}

function checkBoardCardCollision(card) {
    if (card.x >= board.x && card.x <= board.x + board.width) {
        if (card.y >= board.y && card.y <= board.y + board.height) {
            return true;
        }
    }
    return false;

}


