

var managerCreepSpawner = {
    spawnName: undefined,
    // "maxStationaryHarvestersPerSource"
    maxSHpS: 4,

    run: function(spawn) {
        this.spawnName = spawn;
        if (this.missing_stationary_harvester()) {}
        else if(this.missing_carriers()) {}
        else if(this.missing_upgrader()) {}
        else if(this.missing_builder()) {}
        else if(this.missing_militia()) {}
        
    },

    getName: function(role) {
        if (Memory.nameIndex === undefined)
            Memory.nameIndex = {};

        if (Memory.nameIndex[role] === undefined) 
            Memory.nameIndex[role] = 0;

        return role + (Memory.nameIndex[role] + 1);
    },

    commitName: function(role) {
        var newIndex = Memory.nameIndex[role] + 1;
        Memory.nameIndex[role] = newIndex;
    },

    spawn: function(role, specification) {
        var creepName = this.getName(role);
        var reValue;
        
        switch(role) {
            case 'simple_harvester':
                reValue = Game.spawns[this.spawnName].spawnCreep([WORK, CARRY, CARRY, MOVE], creepName, {memory: {role: 'simple_harvester', target: specification}});
                break;
            case 'sationary_harvester':
                reValue = Game.spawns[this.spawnName].spawnCreep([WORK, WORK, MOVE], creepName, {memory: {role: 'sationary_harvester', target: specification}});
                break;
            case 'carrier':
                reValue = Game.spawns[this.spawnName].spawnCreep([CARRY, CARRY, MOVE, MOVE], creepName, {memory: {role: 'carrier'}});
                break;
            case 'upgrader':
                reValue = Game.spawns[this.spawnName].spawnCreep([WORK, CARRY, MOVE, MOVE], creepName, {memory: {role: 'upgrader'}});
                break;
            case 'builder':
                reValue = Game.spawns[this.spawnName].spawnCreep([WORK, CARRY, CARRY, MOVE], creepName, {memory: {role: 'builder'}});
                break;
            case 'militia':
                reValue = Game.spawns[this.spawnName].spawnCreep([ATTACK, ATTACK, MOVE, MOVE], creepName, {memory: {role: 'militia', designatedRoom: specification}});
                break;
            default:
                reValue = 1;
                break;
          }

        switch(reValue) {
            case 0:
                console.log('manager.creep_spawner>>: ' + role + 'with name: ' + creepName + 'at' + spawnName + 'created');
                break;
            case -1:
                console.log('manager.creep_spawner>>: ERR_NOT_OWNER');
                break;
            case -3:
                console.log('manager.creep_spawner>>: ERR_NAME_EXISTS');
                this.commitName(role);
                this.spawn(role, specification);
                break;
            case -4:
                console.log('manager.creep_spawner>>: ERR_BUSY');
                break;
            case -6:
                console.log('manager.creep_spawner>>: ERR_NOT_ENOUGH_ENERGY');
                break;
            case -10:
                console.log('manager.creep_spawner>>: ERR_INVALID_ARGS');
                break;
            case -14:
                console.log('manager.creep_spawner>>: ERR_RCL_NOT_ENOUGH');
                break;
            default:
                console.log('manager.creep_spawner>>: role doesn_t exist');
                break;
        }
    },

    missing_stationary_harvester: function() {
        var data = Game.spawns[this.spawnName].memory.sources;

        for(var i in data) {
            // Game.getObjectById(data[i]);
            // Game.spawns[this.spawnName].room.find(FIND_MY_CREEPS, {})
            
            /* Creating Array with all stationary Harvester Creeps for a Source to check if there are enough */
            var harvesters = [];
            for(var i in Game.creeps) {
                if(Game.creeps[i].memory.role == 'sationary_harvester' && Game.creeps[i].memory.target == i) {
                    harvesters.push(Game.creeps[i]);
                }
            }
            if(harvesters.length < data[i] && harvesters.length < this.maxSHpS) {
                this.spawn('sationary_harvester', i);
                return true;
            }
        }
        return false;
    },

    missing_carriers: function() {
        var data = Game.spawns[this.spawnName].memory.sources;
        var creepName = 'Carrier';
        var counter = 0;

        for(var i in data) {
            if(data[i] > this.maxSHpS) {
                counter += this.maxSHpS;
            }
            else {
                counter += data[i];
            }
        }

        var carriers = [];
        for(var i in Game.creeps) {
            if(Game.creeps[i].memory.role == 'carrier') {
                carriers.push(Game.creeps[i]);
            }
        }
        if(carriers.length < counter) {
            this.spawn('carrier', undefined);
            return true;
        }

        return false;
    },

    missing_upgrader: function() {
        if (Memory.rooms.spawnName.maxCreeps === undefined)
            Memory.rooms.spawnName.maxCreeps = {};
        
        if (Memory.rooms.spawnName.maxCreeps['upgrader'] === undefined) 
            Memory.rooms.spawnName.maxCreeps['upgrader'] = 0;

        var upgraders = [];
        for(var i in Game.creeps) {
            if(Game.creeps[i].memory.role == 'upgrader') {
                upgraders.push(Game.creeps[i]);
            }
        }
        if(upgraders.length < Memory.rooms.spawnName.maxCreeps['upgrader']) {
            this.spawn('upgrader', undefined);
            return true;
        }

        return false;

    },

    missing_simple_harvester: function() {
        if (Memory.rooms.spawnName.maxCreeps === undefined)
            Memory.rooms.spawnName.maxCreeps = {};
        
        if (Memory.rooms.spawnName.maxCreeps['simple_harvester'] === undefined) 
            Memory.rooms.spawnName.maxCreeps['simple_harvester'] = 0;

        var simple_harvesters = [];
        for(var i in Game.creeps) {
            if(Game.creeps[i].memory.role == 'simple_harvester') {
                simple_harvesters.push(Game.creeps[i]);
            }
        }
        if(simple_harvesters.length < Memory.rooms.spawnName.maxCreeps['simple_harvester']) {
            this.spawn('simple_harvester', undefined);
            return true;
        }

        return false;

    },

    missing_builder: function() {
        if (Memory.rooms.spawnName.maxCreeps === undefined)
            Memory.rooms.spawnName.maxCreeps = {};
        
        if (Memory.rooms.spawnName.maxCreeps['builder'] === undefined) 
            Memory.rooms.spawnName.maxCreeps['builder'] = 0;

        var upgraders = [];
        for(var i in Game.creeps) {
            if(Game.creeps[i].memory.role == 'builder') {
                upgraders.push(Game.creeps[i]);
            }
        }
        if(upgraders.length < Memory.rooms.spawnName.maxCreeps['builder']) {
            this.spawn('builder', undefined);
            return true;
        }

        return false;

    },

    missing_militia: function() {
        if (Memory.rooms.spawnName.maxCreeps === undefined)
            Memory.rooms.spawnName.maxCreeps = {};
        
        if (Memory.rooms.spawnName.maxCreeps['militia'] === undefined) 
            Memory.rooms.spawnName.maxCreeps['militia'] = 0;

        var militias = [];
        for(var i in Game.creeps) {
            if(Game.creeps[i].memory.role == 'militia') {
                militias.push(Game.creeps[i]);
            }
        }
        if(militias.length < Memory.rooms.spawnName.maxCreeps['militia']) {
            this.spawn('militia', undefined);
            return true;
        }

        return false;

    }

};

module.exports = managerCreepSpawner;