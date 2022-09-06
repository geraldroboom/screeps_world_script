var roleCarrier = {

    /** @param {Creep} creep **/
    run: function(creep) {
        // If the hauler isn't full
        if (creep.store.getFreeCapacity() > 0) {

            // Find energy on the ground
            const droppedEnergy = creep.room.find(FIND_DROPPED_RESOURCES, {
                filter: resource => resource.resourceType == RESOURCE_ENERGY
            })

            // Find the closest energy on the ground
            const closestDroppedEnergy = creep.pos.findClosestByRange(droppedEnergy)

            // Try to pickup the energy. If it's not in range
            if (creep.pickup(closestDroppedEnergy) == ERR_NOT_IN_RANGE) {

                // Move to it
                creep.moveTo(closestDroppedEnergy, { visualizePathStyle: { stroke: '#ffaa00' } });
            }
        } else {
            // deliver energy to extensions and spawns
            var targets = creep.room.find(FIND_STRUCTURES, {
                filter: (structure) => {
                    return (structure.structureType == STRUCTURE_CONTAINER || structure.structureType == STRUCTURE_EXTENSION || structure.structureType == STRUCTURE_SPAWN) &&
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

module.exports = roleCarrier;