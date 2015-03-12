var mongoose = require('mongoose');
var Room = mongoose.model('Room');
exports.getRooms = function (req, res) {
    Room.find({}).exec(function (err, rooms) {
        if (err) {
            res.sendStatus(404);
        } else {
            res.send(rooms);
        }
    })
}

exports.joinRoom = function (req, res) {
    Room.findOne({_id: req.body.id}, function (err, room) {
        if (err)throw err;
        else {
            req.session.roomTitle = room.name;
            res.sendStatus(200);
        }
    });


}