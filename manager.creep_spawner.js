var managerCreepSpawner = {
    spawnName: undefined,
    // "max Dedicated Carriers Per Source"
    maxDCpS: 3,

    run: function(spawn) {
        this.spawnName = spawn;
        var tier = Memory.cmd.spawner['tier'];
        var b = false;


        if(this.spawnName == undefined) {return;}
        
        switch(tier) {
            case 0:
                if(!b) {b = this.missing_simple_harvester(tier);}
                if(!b) {b = this.missing_upgrader(tier);}
                if(!b) {b = this.missing_builder(tier);}
                if(!b) {b = this.missing_carriers(tier);}
                if(!b) {b = this.missing_ammorunner(tier)};
                if(!b) {b = this.missing_militia(tier);}
                break;
            case 1:
                if(!b) {b = this.missing_stationary_harvester(tier);}
                if(!b) {b = this.missing_dedicated_carrier(tier);}
                if(!b) {b = this.missing_upgrader(tier);}
                if(!b) {b = this.missing_builder(tier);}
                if(!b) {b = this.missing_carriers(tier);}
                if(!b) {b = this.missing_ammorunner(tier)};
                if(!b) {b = this.missing_militia(tier);}
                break;
            case 2:
                if(!b) {b = this.missing_stationary_harvester(tier);}
                if(!b) {b = this.missing_dedicated_carrier(tier);}
                if(!b) {b = this.missing_upgrader(tier);}
                if(!b) {b = this.missing_builder(tier);}
                if(!b) {b = this.missing_carriers(tier);}
                if(!b) {b = this.missing_ammorunner(tier)};
                if(!b) {b = this.missing_militia(tier);}
                break;
        }
    },

    getName: function(role) {
        if (Memory.nameIndex[role] === undefined) 
            Memory.nameIndex[role] = 0;

        return role + (Memory.nameIndex[role] + 1);
    },

    commitName: function(role) {
        var newIndex = Memory.nameIndex[role] + 1;
        Memory.nameIndex[role] = newIndex;
    },

    spawn: function(role, specification) {
        var creepName = this.getName(role.slice(0, -1));
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
        
        switch(role) {
            case 'simple_harvester0': // COSTS = 300
                reValue = Game.spawns[this.spawnName].spawnCreep([WORK, CARRY, CARRY, MOVE, MOVE], creepName, {memory: {role: 'simple_harvester', target: specification}});
                break;
            case 'sationary_harvester1': // COSTS = 550
                reValue = Game.spawns[this.spawnName].spawnCreep([WORK, WORK, WORK, WORK, WORK, MOVE], creepName, {memory: {role: 'sationary_harvester', target: specification}});
                break;
            case 'sationary_harvester2': // COSTS = 550
                reValue = Game.spawns[this.spawnName].spawnCreep([WORK, WORK, WORK, WORK, WORK, MOVE], creepName, {memory: {role: 'sationary_harvester', target: specification}});
                break;
            case 'dedicated_carrier1': // COSTS = 500
                reValue = Game.spawns[this.spawnName].spawnCreep([CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE], creepName, {memory: {role: 'dedicated_carrier', target: specification}});
                break;
            case 'dedicated_carrier2': // COSTS = 500
                reValue = Game.spawns[this.spawnName].spawnCreep([CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE], creepName, {memory: {role: 'dedicated_carrier', target: specification}});
                break;   
            case 'carrier0': // COSTS = 300
                reValue = Game.spawns[this.spawnName].spawnCreep([CARRY, CARRY, CARRY, MOVE, MOVE, MOVE], creepName, {memory: {role: 'carrier'}});
                break;
            case 'carrier1': // COSTS = 300
                reValue = Game.spawns[this.spawnName].spawnCreep([CARRY, CARRY, CARRY, MOVE, MOVE, MOVE], creepName, {memory: {role: 'carrier'}});
                break;
            case 'carrier2': // COSTS = 300
                reValue = Game.spawns[this.spawnName].spawnCreep([CARRY, CARRY, CARRY, MOVE, MOVE, MOVE], creepName, {memory: {role: 'carrier'}});
                break;
            case 'ammorunner0': // COSTS = 300
                reValue = Game.spawns[this.spawnName].spawnCreep([CARRY, CARRY, CARRY, MOVE, MOVE, MOVE], creepName, {memory: {role: 'ammorunner'}});
                break;
            case 'ammorunner1': // COSTS = 550
                reValue = Game.spawns[this.spawnName].spawnCreep([WORK, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE], creepName, {memory: {role: 'ammorunner'}});
                break;
            case 'ammorunner2': // COSTS = 550
                reValue = Game.spawns[this.spawnName].spawnCreep([WORK, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE], creepName, {memory: {role: 'ammorunner'}});
                break;
            case 'upgrader0': // COSTS = 300
                reValue = Game.spawns[this.spawnName].spawnCreep([WORK, CARRY, CARRY, MOVE, MOVE], creepName, {memory: {role: 'upgrader'}});
                break;
            case 'upgrader1': // COSTS = 550
                reValue = Game.spawns[this.spawnName].spawnCreep([WORK, WORK, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE], creepName, {memory: {role: 'upgrader'}});
                break;
            case 'upgrader2': // COSTS = 550
                reValue = Game.spawns[this.spawnName].spawnCreep([WORK, WORK, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE], creepName, {memory: {role: 'upgrader'}});
                break;
            case 'builder0': // COSTS = 300
                reValue = Game.spawns[this.spawnName].spawnCreep([WORK, CARRY, CARRY, MOVE, MOVE], creepName, {memory: {role: 'builder'}});
                break;
            case 'builder1': // COSTS = 550
                reValue = Game.spawns[this.spawnName].spawnCreep([WORK, WORK, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE], creepName, {memory: {role: 'builder'}});
                break;
            case 'builder2': // COSTS = 550
                reValue = Game.spawns[this.spawnName].spawnCreep([WORK, WORK, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE], creepName, {memory: {role: 'builder'}});
                break;
            case 'militia0': // COSTS = 280/300
                reValue = Game.spawns[this.spawnName].spawnCreep([ TOUGH, TOUGH, ATTACK, ATTACK, MOVE, MOVE], creepName, {memory: {role: 'militia', designatedRoom: specification}});
                break;
            case 'militia1': // COSTS = 380/550
                reValue = Game.spawns[this.spawnName].spawnCreep([TOUGH, TOUGH, ATTACK, ATTACK, MOVE, MOVE, MOVE, MOVE], creepName, {memory: {role: 'militia', designatedRoom: specification}});
                break;
            case 'militia2': // COSTS = 260
                reValue = Game.spawns[this.spawnName].spawnCreep([TOUGH, TOUGH, ATTACK, ATTACK, MOVE, MOVE, MOVE, MOVE], creepName, {memory: {role: 'militia', designatedRoom: specification}});
                break;
            default:
                reValue = 1;
                break;
          }

        switch(reValue) {
            case 0:
                Game.spawns[this.spawnName].room.memory.cmd.spawningPriority = false;
                console.log('manager.creep_spawner>>: ' + role + ' with name: ' + creepName + ' at ' + this.spawnName + ' created');
                break;
            case -1:
                console.log('manager.creep_spawner>>: ERR_NOT_OWNER of ' + this.spawnName);
                break;
            case -3:
                console.log('manager.creep_spawner>>: ERR_NAME_EXISTS');
                this.commitName(role.slice(0, -1));
                this.spawn(role, specification);
                break;
            case -4:
                console.log('manager.creep_spawner>>: ERR_BUSY ' + this.spawnName);
                break;
            case -6:
                Game.spawns[this.spawnName].room.memory.cmd.spawningPriority = true;
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

    missing_stationary_harvester: function(tier) {
        var sources = Game.spawns[this.spawnName].room.memory.sources;

        for(var sourceID in sources) {
            
            /* Creating Array with all stationary Harvester Creeps for a Source to check if there are enough */
            var creeps = Game.spawns[this.spawnName].room.find(FIND_MY_CREEPS, {filter: (c) => {return c.memory.role == 'sationary_harvester' && c.memory.target == sourceID;}});

            if(creeps.length < 1) {
                this.spawn('sationary_harvester'+tier, sourceID);
                return true;
            }
        }
        return false;
    },

    missing_dedicated_carrier: function(tier) {
        var sources = Game.spawns[this.spawnName].room.memory.sources;

        for(var sourceID in sources) {
            
            /* Creating Array with all stationary Harvester Creeps for a Source to check if there are enough */
            var creeps = Game.spawns[this.spawnName].room.find(FIND_MY_CREEPS, {filter: (c) => {return c.memory.role == 'dedicated_carrier' && c.memory.target == sourceID;}});

            if(creeps.length < this.maxDCpS) {
                this.spawn('dedicated_carrier'+tier, sourceID);
                return true;
            }
        }
        return false;
    },

    missing_carriers: function(tier) {
        var creeps = Game.spawns[this.spawnName].room.find(FIND_MY_CREEPS, {filter: (c) => {return c.memory.role == 'carrier';}});

        if(creeps.length < Game.spawns[this.spawnName].room.memory.maxCreeps['carrier']) {
            this.spawn('carrier'+tier, undefined);
            return true;
        }
        return false;
    },

    missing_ammorunner: function(tier) {
        var creeps = Game.spawns[this.spawnName].room.find(FIND_MY_CREEPS, {filter: (c) => {return c.memory.role == 'ammorunner';}});

        if(creeps.length < Game.spawns[this.spawnName].room.memory.maxCreeps['ammorunner']) {
            this.spawn('ammorunner'+tier, undefined);
            return true;
        }
        return false;
    },

    missing_upgrader: function(tier) {
        var creeps = Game.spawns[this.spawnName].room.find(FIND_MY_CREEPS, {filter: (c) => {return c.memory.role == 'upgrader';}});

        if(creeps.length < Game.spawns[this.spawnName].room.memory.maxCreeps['upgrader']) {
            this.spawn('upgrader'+tier, undefined);
            return true;
        }
        return false;

    },

    missing_simple_harvester: function(tier) {
        var sources = Game.spawns[this.spawnName].room.memory.sources;

        for(var sourceID in sources) {
            
            /* Creating Array with all simple Harvester Creeps for a Source to check if there are enough */
            var creeps = Game.spawns[this.spawnName].room.find(FIND_MY_CREEPS, {filter: (c) => {return c.memory.role == 'simple_harvester' && c.memory.target == sourceID;}});

            if(creeps.length < (sources[sourceID])) {
                this.spawn('simple_harvester'+tier, sourceID);
                return true;
            }
        }
        return false;
    },

    missing_builder: function(tier) {
        var creeps = Game.spawns[this.spawnName].room.find(FIND_MY_CREEPS, {filter: (c) => {return c.memory.role == 'builder';}});

        if(creeps.length < Game.spawns[this.spawnName].room.memory.maxCreeps['builder']) {
            this.spawn('builder'+tier, undefined);
            return true;
        }

        return false;

    },

    missing_militia: function(tier) {
        var creeps = Game.spawns[this.spawnName].room.find(FIND_MY_CREEPS, {filter: (c) => {return c.memory.role == 'militia';}});
            
        if(creeps.length < Game.spawns[this.spawnName].room.memory.maxCreeps['militia']) {
            this.spawn('militia'+tier, Game.spawns[this.spawnName].room.name);
            return true;
        }

        return false;

    }

};

module.exports = managerCreepSpawner;