var roleUpgrader = {

    /** @param {Creep} creep **/
    run: function(creep) {

        if(creep.memory.upgrading && creep.store[RESOURCE_ENERGY] == 0) {
            creep.memory.upgrading = false;
	    }
	    if(!creep.memory.upgrading && creep.store.getFreeCapacity() == 0) {
	        creep.memory.upgrading = true;
	    }

	    if(creep.memory.upgrading) {
            if(creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
                creep.moveTo(creep.room.controller);
            }
        }
        else {
            // find all containers and spawns with energy in them
            var targets = [];

            if(targets.length == 0) {
                targets = creep.room.find(FIND_STRUCTURES, {filter: (structure) => {
                    return structure.structureType == STRUCTURE_CONTAINER && structure.store.getUsedCapacity(RESOURCE_ENERGY) > 0;}});
            }
            if(targets.length == 0) {
                targets = creep.room.find(FIND_STRUCTURES, {filter: (structure) => {
                    return structure.structureType == STRUCTURE_STORAGE && structure.store.getUsedCapacity(RESOURCE_ENERGY) > 0;}});
            }
            if(targets.length == 0) {
                targets = creep.room.find(FIND_STRUCTURES, {filter: (structure) => {
                    return structure.structureType == STRUCTURE_SPAWN && structure.store.getUsedCapacity(RESOURCE_ENERGY) > 0 && !creep.room.memory.cmd.spawningPriority;}});
            }

            var target = creep.pos.findClosestByRange(targets)
            

            // Try to pickup the energy. If it's not in range
            if (creep.withdraw(target, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {

                // Move to it
                creep.moveTo(target);
            }
        }
	}
};

module.exports = roleUpgrader;