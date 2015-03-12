var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var RoomSchema = new Schema({
    name: String,
    position: {type: Number, unique: true},
    status: {
        type: String,
        uppercase: true,
        enum: ['HOST', 'JOIN', 'FULL', 'BUSY', 'WATCH', 'RANGE', 'TEAM', 'JOIN(AFK)', 'HELD'],
        default: 'HOST'
    }
    /*HOST: user can host the room
     JOIN: user can join the room, but can't be host at that time
     FULL: Room is ready to start
     BUSY: game is playing in the room, normally not accessible
     WATCH: people can join room as spectator,
     RANGE: user can't join the room as his range is too high or too low
     TEAM: only same team player can join the room
     JOIN(AFK): host is away from the room, idle
     HELD: room is made for premium users
     */
});
mongoose.model('Room', RoomSchema);
