var express = require('express');
var roomController = require('../controllers/RoomController');

module.exports = function(app) {

    app.get('/rooms/get', roomController.getRooms);
    app.post('/room/join', roomController.joinRoom);


}
