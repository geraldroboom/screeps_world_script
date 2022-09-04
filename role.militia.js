var roleMilitia = {

    /** @param {Creep} creep **/
    run: function(creep) {
        var roomName = creep.memory.designatedRoom.name;
        var hostiles = Game.rooms[roomName].find(FIND_HOSTILE_CREEPS);
        if(hostiles.length > 0) {
            var username = hostiles[0].owner.username;
            Game.notify('User ' + username + ' spotted in room ' + roomName);
            
            const target = creep.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
            if(target) {
                if(creep.attack(target) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(target);
                }
            }
        }
        else {
            // const target = creep.pos.findClosestByRange(SPAWN);
            // creep.moveTo(target);
        }
    }
};

module.exports = roleMilitia;