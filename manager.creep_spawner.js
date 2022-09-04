

var managerCreepSpawner = {

    run: function() {
        this.spawn('test');
    },

    spawn: function(role, specification) {
        let creepName, spawnName;

        switch(role) {
            case 'simple_harvester':
                Game.spawns[spawnName].spawnCreep([WORK, CARRY, CARRY, MOVE], creepName, {memory: {role: 'simple_harvester', target: specification}});
                console.log('manager.creep_spawner>>: ' + role + 'with name: ' + creepName + 'at' + spawnName + 'created');
                break;
            case 'sationary_harvester':
                Game.spawns[spawnName].spawnCreep([], creepName, {memory: {role: 'sationary_harvester', target: specification}});
                console.log('manager.creep_spawner>>: ' + role + 'with name: ' + creepName + 'at' + spawnName + 'created');
                break;
            case 'carrier':
                Game.spawns[spawnName].spawnCreep([], creepName, {memory: {role: 'carrier'}});
                console.log('manager.creep_spawner>>: ' + role + 'with name: ' + creepName + 'at' + spawnName + 'created');
                break;
            case 'upgrader':
                Game.spawns[spawnName].spawnCreep([WORK, CARRY, CARRY, MOVE], creepName, {memory: {role: 'upgrader'}});
                console.log('manager.creep_spawner>>: ' + role + 'with name: ' + creepName + 'at' + spawnName + 'created');
                break;
            case 'builder':
                Game.spawns[spawnName].spawnCreep([WORK, CARRY, CARRY, MOVE], creepName, {memory: {role: 'builder'}});
                console.log('manager.creep_spawner>>: ' + role + 'with name: ' + creepName + 'at' + spawnName + 'created');
                break;
            case 'militia':
                Game.spawns[spawnName].spawnCreep([ATTACK, ATTACK, MOVE, MOVE], creepName, {memory: {role: 'militia', designatedRoom: specification}});
                console.log('manager.creep_spawner>>: ' + role + 'with name: ' + creepName + 'at' + spawnName + 'created');
                break;
            default:
                break;
          }

    },

    find_missing_creeps: function() {

    }

};

module.exports = managerCreepSpawner;