var roleAmmorunner = {

    run: function(creep) {
        if(creep.memory.running && creep.store[RESOURCE_ENERGY] == 0) {
            creep.memory.running = false;
	    }
	    if(!creep.memory.running && creep.store.getFreeCapacity() == 0) {
	        creep.memory.running = true;
	    }

        if(creep.memory.running) {
            var targets = [];

            if(targets.length == 0) {
                targets = creep.room.find(FIND_STRUCTURES, {filter: (structure) => {
                    return structure.structureType == STRUCTURE_TOWER && structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0;}});

                var target = creep.pos.findClosestByRange(targets);

                if(creep.transfer(target, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(target);
                }
            }
            if(targets.length == 0) {
                targets = creep.room.find(FIND_STRUCTURES, {filter: (structure) => {
                    return structure.structureType == STRUCTURE_RAMPART || structure.structureType == STRUCTURE_WALL}});

                var target = targets[0];

                for(var t in targets) {
                    if(t.hits <= target.hits) {
                        target = t;
                    }
                }
    
                if(creep.repair(target, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(target);
                }    
        
            }

            var target = creep.pos.findClosestByRange(targets);

            if(creep.transfer(target, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                creep.moveTo(target);
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
                    return structure.structureType == STRUCTURE_SPAWN && structure.store.getUsedCapacity(RESOURCE_ENERGY) > 0 && !creep.room.memory.cmd.spawningPriority;}});
            }

            var target = creep.pos.findClosestByRange(targets);
            

            // Try to pickup the energy. If it's not in range
            if (creep.withdraw(target, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {

                // Move to it
                creep.moveTo(target);
            }
        }
    }
};

module.exports = roleAmmorunner;