var roleStationaryHarvester = {

    /** @param {Creep} creep **/
    run: function(creep) { 
        // Try to harvest the source. If it isn't in range
        if (creep.harvest(Game.getObjectById(creep.memory['target'])) == ERR_NOT_IN_RANGE) {
 
            // Move to it
 
            creep.moveTo(Game.getObjectById(creep.memory['target']), { visualizePathStyle: { stroke: '#ffffff' } });
        }
    }
};

module.exports = roleStationaryHarvester;