var analyserResources = {

    run: function(roomName) {        
        // Finding out how many Harvesters each source can support.
        var sources = Game.rooms[roomName].find(FIND_SOURCES);
        var counter;
        var position;

        for(var i=0; i<sources.length; i++) {
            counter = 0;
            position = sources[i].pos;
            if(new RoomPosition(position.x-1, position.y-1, roomName).lookFor(LOOK_TERRAIN) != 'wall') {counter++;}
            if(new RoomPosition(position.x-1, position.y,   roomName).lookFor(LOOK_TERRAIN) != 'wall') {counter++;}
            if(new RoomPosition(position.x-1, position.y+1, roomName).lookFor(LOOK_TERRAIN) != 'wall') {counter++;}
            if(new RoomPosition(position.x,   position.y-1, roomName).lookFor(LOOK_TERRAIN) != 'wall') {counter++;}
            if(new RoomPosition(position.x,   position.y+1, roomName).lookFor(LOOK_TERRAIN) != 'wall') {counter++;}
            if(new RoomPosition(position.x+1, position.y-1, roomName).lookFor(LOOK_TERRAIN) != 'wall') {counter++;}
            if(new RoomPosition(position.x+1, position.y,   roomName).lookFor(LOOK_TERRAIN) != 'wall') {counter++;}
            if(new RoomPosition(position.x+1, position.y+1, roomName).lookFor(LOOK_TERRAIN) != 'wall') {counter++;}

            Game.rooms[roomName].memory.sources[sources[i].id] = counter;
        }
    }

};

module.exports = analyserResources;