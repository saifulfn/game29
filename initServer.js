var mongoose = require('mongoose');
var Room = mongoose.model('Room');


(function () {
    console.log('server initiating');
    Room.remove(function (err, success) {
        console.log('removed'+ success);
        addRoom('Lily', 1);
        addRoom('Rose', 2);
        addRoom('Cinnamon', 3);
        addRoom('Begonia', 4);
        addRoom('Chili', 5);
        addRoom('Adda', 6);
        addRoom('Mint', 7);
    });
})();


function addRoom(name, index) {
    var room = new Room({name: name, position: index});
    room.save(function (err, result) {
        if (err)throw(err);
    });
}
