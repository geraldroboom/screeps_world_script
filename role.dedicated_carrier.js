var roleDedicatedCarrier = {

    /** @param {Creep} creep **/
    run: function(creep) {
        // If the hauler isn't full
        if (creep.store.getFreeCapacity() > 0) {
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
            else {
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
