var roleDedicatedCarrier = {

    /** @param {Creep} creep **/
    run: function(creep) {

	    if(creep.memory.delivering && creep.store[RESOURCE_ENERGY] == 0) {
            creep.memory.delivering = false;
	    }
	    if(!creep.memory.delivering && creep.store.getFreeCapacity() == 0) {
	        creep.memory.delivering = true;
	    }

        // If the hauler isn't full
        if (!creep.memory.delivering) {
            const droppedEnergy = creep.room.find(FIND_DROPPED_RESOURCES, {filter: (resource) => {
                return resource.resourceType == RESOURCE_ENERGY && resource.pos.inRangeTo(creep.pos, 3);}});
            
            // If there is dropped Energy in a 3 tile radius, move to pick it up.
            if(droppedEnergy.length) {
                const closestDroppedEnergy = creep.pos.findClosestByRange(droppedEnergy);

                if (creep.pickup(closestDroppedEnergy) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(closestDroppedEnergy);
                }

            }
            // else move to the designated target
            else if(Game.getObjectById(creep.memory['target']).pos.getRangeTo(creep.pos) > 2){
                creep.moveTo(Game.getObjectById(creep.memory['target']));
            }

        } else {
            // deliver energy to extensions and spawns (priorisation)
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
            if(targets.length == 0) {
                targets = creep.room.find(FIND_STRUCTURES, {filter: (structure) => {
                    return structure.structureType == STRUCTURE_STORAGE && structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0;}});
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

module.exports = roleDedicatedCarrier;
