var analyserResources = {

    /** @param {Room} room **/      //?
    run: function(room) {        
        // Finding out how many Harvesters each source can support.
        var sources = room.find(FIND_SOURCES);
        var counter;
        var position;

        for(var i=0; i<sources.length; i++) {
            counter = 0;
            position = sources[i].pos;
            if(new RoomPosition(position.x-1, position.y-1, room.name).lookFor(LOOK_TERRAIN) != 'wall') {counter++;}
            if(new RoomPosition(position.x-1, position.y,   room.name).lookFor(LOOK_TERRAIN) != 'wall') {counter++;}
            if(new RoomPosition(position.x-1, position.y+1, room.name).lookFor(LOOK_TERRAIN) != 'wall') {counter++;}
            if(new RoomPosition(position.x,   position.y+1, room.name).lookFor(LOOK_TERRAIN) != 'wall') {counter++;}
            if(new RoomPosition(position.x,   position.y-1, room.name).lookFor(LOOK_TERRAIN) != 'wall') {counter++;}
            if(new RoomPosition(position.x+1, position.y-1, room.name).lookFor(LOOK_TERRAIN) != 'wall') {counter++;}
            if(new RoomPosition(position.x+1, position.y,   room.name).lookFor(LOOK_TERRAIN) != 'wall') {counter++;}
            if(new RoomPosition(position.x+1, position.y+1, room.name).lookFor(LOOK_TERRAIN) != 'wall') {counter++;}

            room.memory.sources[sources[i].id] = counter;
        }
    }

}

module.export = analyserResources;