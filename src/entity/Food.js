var Cell = require('./Cell');

class Food extends Cell {
    constructor(server, owner, position, size) {
        super(server, owner, position, size);
        this.type = 1;
        this.overrideReuse = false;
    }
    // Main Functions
    onAdd(server) {
        server.nodesFood.push(this);
    }
    onRemove(server) {
        // Remove from list of foods
        var index = server.nodesFood.indexOf(this);
        if (index != -1) {
            server.nodesFood.splice(index, 1);
        }
        ;
        // Respawn
        if (!this.overrideReuse)
            server.spawnFood();
    }
}

module.exports = Food;