var roleSimpleHarvester = require('role.simple_harvester');
var roleStationaryHarvester = require('role.stationary_harvester');
var roleCarrier = require('role.carrier');
var roleUpgrader = require('role.upgrader');
var roleBuilder = require('role.builder');
var roleMilitia = require('role.militia');

var analyserResources = require('analyser.resources');

module.exports.loop = function () {

    if(Game.time == 1) {
        analyserResources.run();
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