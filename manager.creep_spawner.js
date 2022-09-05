var managerCreepSpawner = {
    spawnName: undefined,
    // "maxStationaryHarvestersPerSource"
    maxSHpS: 4,
    costs: {'simple_harvester': 250, 'sationary_harvester': 300, 'carrier': 200, 'upgrader': 250, 'builder': 250, 'militia': 260},

    run: function(spawn) {
        this.spawnName = spawn;
        var b = false;


        if(this.spawnName == undefined) {return;}

        if (Memory.cmd.spawner['stationary_active'] && !b) {b = this.missing_stationary_harvester();}
        if(Memory.cmd.spawner['stationary_active'] && !b) {b = this.missing_carriers();}
        if(!Memory.cmd.spawner['stationary_active'] && !b) {b = this.missing_simple_harvester();}
        if(!b) {b = this.missing_upgrader()}
        if(!b) {b = this.missing_builder()}
        if(!b) {b = this.missing_militia()}
        
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

        /*
        ++ COSTS ++

        MOVE = 50
        WORK = 100
        CARRY = 50
        ATTACK = 80
        RANGED ATTACK = 150
        HEAL = 250
        CLAIM = 600
        TOUGH = 10
        
        */

        // Without enough energy the spawning will be delayed
        if(Game.spawns[this.spawnName].room.energyCapacityAvailable < this.costs[role])
            return;
        
        switch(role) {
            case 'simple_harvester': // COSTS = 250
                reValue = Game.spawns[this.spawnName].spawnCreep([WORK, CARRY, CARRY, MOVE], creepName, {memory: {role: 'simple_harvester', target: specification}});
                break;
            case 'sationary_harvester': // COSTS = 300
                reValue = Game.spawns[this.spawnName].spawnCreep([WORK, WORK, MOVE, MOVE], creepName, {memory: {role: 'sationary_harvester', target: specification}});
                break;
            case 'carrier': // COSTS = 200
                reValue = Game.spawns[this.spawnName].spawnCreep([CARRY, CARRY, MOVE, MOVE], creepName, {memory: {role: 'carrier'}});
                break;
            case 'upgrader': // COSTS = 250
                reValue = Game.spawns[this.spawnName].spawnCreep([WORK, CARRY, MOVE, MOVE], creepName, {memory: {role: 'upgrader'}});
                break;
            case 'builder': // COSTS = 250
                reValue = Game.spawns[this.spawnName].spawnCreep([WORK, CARRY, CARRY, MOVE], creepName, {memory: {role: 'builder'}});
                break;
            case 'militia': // COSTS = 260
                reValue = Game.spawns[this.spawnName].spawnCreep([ATTACK, ATTACK, MOVE, MOVE], creepName, {memory: {role: 'militia', designatedRoom: specification}});
                break;
            default:
                reValue = 1;
                break;
          }

        switch(reValue) {
            case 0:
                console.log('manager.creep_spawner>>: ' + role + ' with name: ' + creepName + ' at ' + this.spawnName + ' created');
                break;
            case -1:
                console.log('manager.creep_spawner>>: ERR_NOT_OWNER of ' + this.spawnName);
                break;
            case -3:
                console.log('manager.creep_spawner>>: ERR_NAME_EXISTS');
                this.commitName(role);
                this.spawn(role, specification);
                break;
            case -4:
                console.log('manager.creep_spawner>>: ERR_BUSY ' + this.spawnName);
                break;
            case -6:
                console.log('manager.creep_spawner>>: ERR_NOT_ENOUGH_ENERGY in ' + this.spawnName + ' for ' + role);
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
        var data = Game.spawns[this.spawnName].room.memory.sources;

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
            if(harvesters.length <= data[i] && harvesters.length <= this.maxSHpS) {
                this.spawn('sationary_harvester', i);
                return true;
            }
        }
        return false;
    },

    missing_carriers: function() {
        var data = Game.spawns[this.spawnName].room.memory.sources;
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
        if (Game.spawns[this.spawnName].room.memory.maxCreeps === undefined)
            Game.spawns[this.spawnName].room.memory.maxCreeps = {};
        
        if (Game.spawns[this.spawnName].room.memory.maxCreeps['upgrader'] === undefined) 
            Game.spawns[this.spawnName].room.memory.maxCreeps['upgrader'] = 0;

        var upgraders = [];
        for(var i in Game.creeps) {
            if(Game.creeps[i].memory.role == 'upgrader') {
                upgraders.push(Game.creeps[i]);
            }
        }
        if(upgraders.length < Game.spawns[this.spawnName].room.memory.maxCreeps['upgrader']) {
            this.spawn('upgrader', undefined);
            return true;
        }

        return false;

    },

    missing_simple_harvester: function() {
        if (Game.spawns[this.spawnName].room.memory.maxCreeps === undefined)
            Game.spawns[this.spawnName].room.memory.maxCreeps = {};
        
        if (Game.spawns[this.spawnName].room.memory.maxCreeps['simple_harvester'] === undefined) 
            Game.spawns[this.spawnName].room.memory.maxCreeps['simple_harvester'] = 2;

        var simple_harvesters = [];
        for(var i in Game.creeps) {
            if(Game.creeps[i].memory.role == 'simple_harvester') {
                simple_harvesters.push(Game.creeps[i]);
            }
        }
        if(simple_harvesters.length < Game.spawns[this.spawnName].room.memory.maxCreeps['simple_harvester']) {
            this.spawn('simple_harvester', undefined);
            return true;
        }

        return false;

    },

    missing_builder: function() {
        if (Game.spawns[this.spawnName].room.memory.maxCreeps === undefined)
            Game.spawns[this.spawnName].room.memory.maxCreeps = {};
        
        if (Game.spawns[this.spawnName].room.memory.maxCreeps['builder'] === undefined) 
            Game.spawns[this.spawnName].room.memory.maxCreeps['builder'] = 1;

        var upgraders = [];
        for(var i in Game.creeps) {
            if(Game.creeps[i].memory.role == 'builder') {
                upgraders.push(Game.creeps[i]);
            }
        }
        if(upgraders.length < Game.spawns[this.spawnName].room.memory.maxCreeps['builder']) {
            this.spawn('builder', undefined);
            return true;
        }

        return false;

    },

    missing_militia: function() {
        if (Game.spawns[this.spawnName].room.memory.maxCreeps === undefined)
            Game.spawns[this.spawnName].room.memory.maxCreeps = {};
        
        if (Game.spawns[this.spawnName].room.memory.maxCreeps['militia'] === undefined) 
            Game.spawns[this.spawnName].room.memory.maxCreeps['militia'] = 0;

        var militias = [];
        for(var i in Game.creeps) {
            if(Game.creeps[i].memory.role == 'militia') {
                militias.push(Game.creeps[i]);
            }
        }
        if(militias.length < Game.spawns[this.spawnName].room.memory.maxCreeps['militia']) {
            this.spawn('militia', undefined);
            return true;
        }

        return false;

    }

};

module.exports = managerCreepSpawner;