var analyserResources = {

    run: function() {
        /* 
            multidimensional Array to store all collected Data
            1 Dimension -> rooms
            2 Dimension -> types
            3 Dimension -> the different types 
            4 Dimension -> data
                Sources: [ID, free_tiles, distance to spawn
                Creeps: [role, max_amount]
        */

        for(var room in Game.rooms) {
            var terrain = Game.map.getRoomTerrain(room.name);
            // TODO: find enemy structures and automate a response
            // var enemies = room.find(FIND_HOSTILE_CREEPS);
            // var enemies_structures = room.find(FIND_HOSTILE_STRUCTURES);

            var spawn = room.find(FIND_MY_SPAWNS)[0];
            var sources = room.find(FIND_SOURCES);
            for(var s in sources) {
               // s.pos.x;
               // s.pos.y;
               // terrain.get(x,y) => TERRAIN_MASK_WALL 
               var path = room.findPath(s.pos, spawn.pos, {ignoreCreeps: true});
               // path.lenght;
            }
            

        }
    }

}

module.export = analyserResources;