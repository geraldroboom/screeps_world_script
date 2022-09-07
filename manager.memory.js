var managerMemory = {

    run: function(target) {
        if(target == 'all') {
            this.init_mem_general();
        }
        else {
            this.init_mem_room(target);
        }

    },

    // just needs to get called ones
    init_mem_general: function() {
        Memory.cmd = {};

        Memory.cmd.analyser = {};
        Memory.cmd.analyser['all'] = false;
        Memory.cmd.analyser['rooms'] = [];
        Memory.cmd.analyser['rooms'].push(Game.spawns['Spawn1'].room.name);
        
        Memory.cmd.spawner = {};
        Memory.cmd.spawner['active'] = false;
        Memory.cmd.spawner['tier'] = 0;

        Memory.cmd.mem_manager = {};
        Memory.cmd.mem_manager['rooms'] = [];
        Memory.cmd.mem_manager['rooms'].push(Game.spawns['Spawn1'].room.name);

        
        Memory.nameIndex = {};
        
        Memory.rooms = {};

    },

    // needs to run whenever a new room is colonized
    init_mem_room: function(roomName) {
        Memory.rooms[roomName] = {};

        Memory.rooms[roomName].maxCreeps = {}
        Memory.rooms[roomName].maxCreeps['carrier'] = 0;
        Memory.rooms[roomName].maxCreeps['upgrader'] = 1;
        Memory.rooms[roomName].maxCreeps['builder'] = 1;
        Memory.rooms[roomName].maxCreeps['militia'] = 0;

        Memory.rooms[roomName].cmd = {};
        Memory.rooms[roomName].cmd['spawningPriority'] = false;

        Memory.rooms[roomName].sources = {};
        Memory.cmd.analyser['rooms'].push(roomName);

    }

};

module.exports = managerMemory;