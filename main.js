var roleSimpleHarvester = require('role.simple_harvester');
var roleStationaryHarvester = require('role.stationary_harvester');
var roleCarrier = require('role.carrier');
var roleUpgrader = require('role.upgrader');
var roleBuilder = require('role.builder');
var roleMilitia = require('role.militia');

var analyserResources = require('analyser.resources');

var managerCreepSpawner = require('manager.creep_spawner');

module.exports.loop = function () {

    /* Initializing Variables to communicate with the programm. */
    if (Memory.cmd === undefined)
        Memory.cmd = {};

    if (Memory.cmd.analyser === undefined)
        Memory.cmd.analyser = {};

    if (Memory.cmd.spawner === undefined)
        Memory.cmd.spawner = {};

    if (Memory.cmd.analyser['all'] === undefined) 
        Memory.cmd.analyser['all'] = true;

    if (Memory.cmd.spawner['active'] === undefined) 
        Memory.cmd.spawner['active'] = true;

    if (Memory.cmd.spawner['stationary_active'] === undefined) 
        Memory.cmd.spawner['stationary_active'] = false;

    /* Checking if there is a command to analyze something. */
    if(Memory.cmd.analyser['all']) {
        for(let roomName in Memory.rooms) {
            analyserResources.run(roomName);
        }

        Memory.cmd.analyser['all'] = false;
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
        if(creep.memory.role == 'stationary_harvester') {
            roleStationaryHarvester.run(creep);
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