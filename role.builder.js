var roleBuilder = {

    /** @param {Creep} creep **/
    run: function(creep) {

	    if(creep.memory.building && creep.store[RESOURCE_ENERGY] == 0) {
            creep.memory.building = false;
	    }
	    if(!creep.memory.building && creep.store.getFreeCapacity() == 0) {
	        creep.memory.building = true;
	    }

	    if(creep.memory.building) {
	        var targets = creep.room.find(FIND_CONSTRUCTION_SITES);
            if(targets.length) {
                if(creep.build(targets[0]) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(targets[0], {visualizePathStyle: {stroke: '#ffffff'}});
                }
            }
	    }
	    else {
	        // find all containers and spawns with energy in them
            var targets = creep.room.find(FIND_STRUCTURES, {
                filter: (structure) => {
                    return (/*structure.structureType == STRUCTURE_CONTAINER ||*/ structure.structureType == STRUCTURE_SPAWN) &&
                        (structure.store.getUsedCapacity(RESOURCE_ENERGY) > 0);
                }
            });

            // Find the closest energy on the ground
            const closest = creep.pos.findClosestByRange(targets);

            // Try to pickup the energy. If it's not in range
            if (creep.withdraw(closest, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {

                // Move to it
                creep.moveTo(closest);
            }
	    }
	}
};

module.exports = roleBuilder;