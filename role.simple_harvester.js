var roleSimpleHarvester = {

    /** @param {Creep} creep **/
    run: function(creep) {
	    if(creep.store.getFreeCapacity() > 0) {
            // find and harvest energy from sources
            var sources = creep.room.find(FIND_SOURCES);
            const closest = creep.pos.findClosestByRange(sources);

            if(creep.harvest(closest) == ERR_NOT_IN_RANGE) {
                creep.moveTo(closest);
            }
        }
        else {
            // deliver energy to extensions ans spawns
            var targets = creep.room.find(FIND_STRUCTURES, {
                    filter: (structure) => {
                        return (structure.structureType == STRUCTURE_EXTENSION || structure.structureType == STRUCTURE_SPAWN) &&
                            structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0;
                    }
            });
            if(targets.length > 0) {
                if(creep.transfer(targets[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(targets[0]);
                }
            }
        }
	}
};

module.exports = roleSimpleHarvester;