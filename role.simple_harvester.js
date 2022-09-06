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
            // deliver energy to extensions and spawns
            var targets = [];

            if(targets.length == 0) {
                targets = creep.room.find(FIND_STRUCTURES, {filter: (structure) => {
                    return structure.structureType == STRUCTURE_SPAWN && structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0;}});
            }
            if(targets.length == 0) {
                targets = creep.room.find(FIND_STRUCTURES, {filter: (structure) => {
                    return structure.structureType == STRUCTURE_EXTENSION && structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0;}});
            }
            if(targets.length == 0) {
                targets = creep.room.find(FIND_STRUCTURES, {filter: (structure) => {
                    return structure.structureType == STRUCTURE_CONTAINER && structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0;}});
            }

            var target = creep.pos.findClosestByRange(targets)

            if(targets.length > 0) {
                if(creep.transfer(target, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(target);
                }
            }
        }
	}
};

module.exports = roleSimpleHarvester;