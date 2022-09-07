var managerCreepSpawner = {
    spawnName: undefined,
    // "max Dedicated Carriers Per Source"
    maxDCpS: 3,

    run: function(spawn) {
        this.spawnName = spawn;
        var b = false;


        if(this.spawnName == undefined) {return;}

        if (Memory.cmd.spawner['stationary_active'] && !b) {b = this.missing_stationary_harvester();}
        if(Memory.cmd.spawner['stationary_active'] && !b) {b = this.missing_dedicated_carrier();}
        if(!Memory.cmd.spawner['stationary_active'] && !b) {b = this.missing_simple_harvester();}
        if(!b) {b = this.missing_carriers();}
        if(!b) {b = this.missing_upgrader();}
        if(!b) {b = this.missing_builder();}
        if(!b) {b = this.missing_militia();}
        
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
        
        switch(role) {
            case 'simple_harvester': // COSTS = 300
                reValue = Game.spawns[this.spawnName].spawnCreep([WORK, CARRY, CARRY, MOVE, MOVE], creepName, {memory: {role: 'simple_harvester', target: specification}});
                break;
            case 'sationary_harvester': // COSTS = 550
                reValue = Game.spawns[this.spawnName].spawnCreep([WORK, WORK, WORK, WORK, WORK, MOVE], creepName, {memory: {role: 'sationary_harvester', target: specification}});
                break;
            case 'dedicated_carrier': // COSTS = 350
                reValue = Game.spawns[this.spawnName].spawnCreep([CARRY, CARRY, CARRY, CARRY, MOVE, MOVE], creepName, {memory: {role: 'dedicated_carrier', target: specification}});
                break;   
            case 'carrier': // COSTS = 300
                reValue = Game.spawns[this.spawnName].spawnCreep([CARRY, CARRY, CARRY, MOVE, MOVE, MOVE], creepName, {memory: {role: 'carrier'}});
                break;
            case 'upgrader': // COSTS = 300
                reValue = Game.spawns[this.spawnName].spawnCreep([WORK, CARRY, CARRY, MOVE, MOVE], creepName, {memory: {role: 'upgrader'}});
                break;
            case 'builder': // COSTS = 300
                reValue = Game.spawns[this.spawnName].spawnCreep([WORK, CARRY, CARRY, MOVE, MOVE], creepName, {memory: {role: 'builder'}});
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

        // Preventing Economic cathastrophe due to no energy in spawn and no harvesters
        if(reValue == -6 && (role.match('harvester') || role.match('dedicated_carrier'))) {            
            Game.spawns[this.spawnName].room.memory.cmd.spawningPriority = true;
        }
        else if (reValue == 0 && (role.match('harvester') || role.match('dedicated_carrier'))) {
            Game.spawns[this.spawnName].room.memory.cmd.spawningPriority = false;
        }
    },

    missing_stationary_harvester: function() {
        var sources = Game.spawns[this.spawnName].room.memory.sources;

        for(var sourceID in sources) {
            
            /* Creating Array with all stationary Harvester Creeps for a Source to check if there are enough */
            var creeps = Game.spawns[this.spawnName].room.find(FIND_MY_CREEPS, {filter: (c) => {return c.memory.role == 'sationary_harvester' && c.memory.target == sourceID;}});

            if(creeps.length < 1) {
                this.spawn('sationary_harvester', sourceID);
                return true;
            }
        }
        return false;
    },

    missing_dedicated_carrier: function() {
        var sources = Game.spawns[this.spawnName].room.memory.sources;

        for(var sourceID in sources) {
            
            /* Creating Array with all stationary Harvester Creeps for a Source to check if there are enough */
            var creeps = Game.spawns[this.spawnName].room.find(FIND_MY_CREEPS, {filter: (c) => {return c.memory.role == 'dedicated_carrier' && c.memory.target == sourceID;}});

            if(creeps.length < this.maxDCpS) {
                this.spawn('dedicated_carrier', sourceID);
                return true;
            }
        }
        return false;
    },

    missing_carriers: function() {
        var creeps = Game.spawns[this.spawnName].room.find(FIND_MY_CREEPS, {filter: (c) => {return c.memory.role == 'carrier';}});

        if(creeps.length < Game.spawns[this.spawnName].room.memory.maxCreeps['carrier']) {
            this.spawn('carrier', undefined);
            return true;
        }
        return false;
    },

    missing_upgrader: function() {
        var creeps = Game.spawns[this.spawnName].room.find(FIND_MY_CREEPS, {filter: (c) => {return c.memory.role == 'upgrader';}});

        if(creeps.length < Game.spawns[this.spawnName].room.memory.maxCreeps['upgrader']) {
            this.spawn('upgrader', undefined);
            return true;
        }
        return false;

    },

    missing_simple_harvester: function() {
        var sources = Game.spawns[this.spawnName].room.memory.sources;

        for(var sourceID in sources) {
            
            /* Creating Array with all simple Harvester Creeps for a Source to check if there are enough */
            var creeps = Game.spawns[this.spawnName].room.find(FIND_MY_CREEPS, {filter: (c) => {return c.memory.role == 'simple_harvester' && c.memory.target == sourceID;}});

            if(creeps.length < (sources[sourceID])) {
                this.spawn('simple_harvester', sourceID);
                return true;
            }
        }
        return false;
    },

    missing_builder: function() {
        var creeps = Game.spawns[this.spawnName].room.find(FIND_MY_CREEPS, {filter: (c) => {return c.memory.role == 'builder';}});

        if(creeps.length < Game.spawns[this.spawnName].room.memory.maxCreeps['builder']) {
            this.spawn('builder', undefined);
            return true;
        }

        return false;

    },

    missing_militia: function() {
        var creeps = Game.spawns[this.spawnName].room.find(FIND_MY_CREEPS, {filter: (c) => {return c.memory.role == 'militia';}});
            
        if(creeps.length < Game.spawns[this.spawnName].room.memory.maxCreeps['militia']) {
            this.spawn('militia', Game.spawns[this.spawnName].room.name);
            return true;
        }

        return false;

    }

};

module.exports = managerCreepSpawner;