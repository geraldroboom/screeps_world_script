var roleSimpleHarvester = require('role.simple_harvester');
var roleStationaryHarvester = require('role.stationary_harvester');
var roleDedicatedCarrier = require('role.dedicated_carrier');
var roleCarrier = require('role.carrier');
var roleUpgrader = require('role.upgrader');
var roleBuilder = require('role.builder');
var roleMilitia = require('role.militia');

var analyserResources = require('analyser.resources');

var managerCreepSpawner = require('manager.creep_spawner');
var managerMemory = require('manager.memory');

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
}