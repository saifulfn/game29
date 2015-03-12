this.Game29 = this.Game29||{};
(function() {
    function Player(name) {
        this.name = name;
        this.score = 0;
    }
    var p = Player.prototype;

    p.testFunction = function(){
        console.log(this.name);
    }
    Game29.Player = Player;
})();