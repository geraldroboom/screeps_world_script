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
            }
            else {
                if(targets.length == 0) {
                    targets = creep.room.find(FIND_STRUCTURES, {filter: (structure) => {
                        return structure.structureType == STRUCTURE_RAMPART && (structure.hits < structure.hitsMax)}});
                }
                if(targets.length == 0) {
                    targets = creep.room.find(FIND_STRUCTURES, {filter: (structure) => {
                        return structure.structureType == STRUCTURE_WALL && (structure.hits < structure.hitsMax)}});
                }
                /*

                var target;
    
                for(var i=0.01; i<1; i+=0.01) {
                    for(var t in targets) {
                        if(t.hits < t.hitsMax * i) {
                            target = t;
                            i = 1.1;
                            break;
                        }
                    }

                    // TODO

                    
                }
                */

    
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