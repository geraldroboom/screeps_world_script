var roleMilitia = {

    /** @param {Creep} creep **/
    run: function(creep) {
        var roomName = creep.memory.designatedRoom;
        var hostiles = Game.rooms[roomName].find(FIND_HOSTILE_CREEPS);
        if(hostiles.length > 0) {
            var username = hostiles[0].owner.username;
            Game.notify('User ' + username + ' spotted in room ' + roomName);
            
            const target = creep.pos.findClosestByRange(hostiles);
            if(target) {
                if(creep.attack(target) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(target, { visualizePathStyle: { stroke: '#ffaa00' } });
                }
            }
        }
        else {
            creep.moveTo(creep.room.find(FIND_FLAGS, {filter: (flag) => {
                return flag.name == 'FlagMilitia';}})[0]);
        }
    }
};

module.exports = roleMilitia;