const roleSimpleHarvester = require('role.simple_harvester');
const roleStationaryHarvester = require('role.stationary_harvester');
const roleDedicatedCarrier = require('role.dedicated_carrier');
const roleCarrier = require('role.carrier');
const roleAmmorunner = require('./role.ammorunner');
const roleUpgrader = require('role.upgrader');
const roleBuilder = require('role.builder');
const roleMilitia = require('role.militia');

const analyserResources = require('analyser.resources');

const managerCreepSpawner = require('manager.creep_spawner');
const managerMemory = require('manager.memory');

module.exports.loop = function () {
    // When executed the first time run memory manager
    if(Memory.cmd == undefined) {
        managerMemory.run('all');
    }

    // mem_manager_rooms queue
    if(Memory.cmd.mem_manager['rooms'].length) {
        managerMemory.run(Memory.cmd.mem_manager['rooms'].pop());
    }

    // analyser_rooms queue
    if(Memory.cmd.analyser['rooms'].length) {
        analyserResources.run(Memory.cmd.analyser['rooms'].pop());
    } 

    /* Checking if there is an idle spawn and then wether or not another creep needs to be spawned */
    if(Memory.cmd.spawner['active']) {
        for(var s in Game.spawns) {
            if(!(Game.spawns[s].spawning) && Game.spawns[s].my) {
                managerCreepSpawner.run(s);
            }
        }
    }

    /* Deletes Memory of dead Creeps */
    // https://screeps.com/forum/topic/1862/small-snippet-to-clear-the-memory-of-dead-creeps
    for(var i in Memory.creeps) {
        if(!Game.creeps[i]) {
            delete Memory.creeps[i];
        }
    }

    /* Cycling throug all creep-roles and performs their programms. */
    for(var name in Game.creeps) {
        var creep = Game.creeps[name];
        if(creep.memory.role == 'simple_harvester') {
            roleSimpleHarvester.run(creep);
        }
        if(creep.memory.role == 'sationary_harvester') {
            roleStationaryHarvester.run(creep);
        }
        if(creep.memory.role == 'dedicated_carrier') {
            roleDedicatedCarrier.run(creep);
        }
        if(creep.memory.role == 'carrier') {
            roleCarrier.run(creep);
        }
        if(creep.memory.role == 'ammorunner') {
            roleAmmorunner.run(creep);
        }
        if(creep.memory.role == 'upgrader') {
            roleUpgrader.run(creep);
        }
        if(creep.memory.role == 'builder') {
            roleBuilder.run(creep);
        }
        if(creep.memory.role == 'militia') {
            roleMilitia.run(creep);
        }
    }

    // Defence protocoll
    var roomName = 'E25N59';
    var hostiles = Game.rooms[roomName].find(FIND_HOSTILE_CREEPS);
    if(hostiles.length > 0) {
        var username = hostiles[0].owner.username;
        Game.notify(`User ${username} spotted in room ${roomName}`);
        var towers = Game.rooms[roomName].find(
            FIND_MY_STRUCTURES, {filter: {structureType: STRUCTURE_TOWER}});
        towers.forEach(tower => tower.attack(hostiles[0]));
    }
}