var Cell = require('./Cell');

class Food extends Cell {
    constructor(gameServer, owner, position, size) {
        super(gameServer, owner, position, size);
        this.cellType = 1;
        this.overrideReuse = false;
    }
    // Main Functions
    onAdd(gameServer) {
        gameServer.nodesFood.push(this);
    }
    onRemove(gameServer) {
        // Remove from list of foods
        var index = gameServer.nodesFood.indexOf(this);
        if (index != -1) {
            gameServer.nodesFood.splice(index, 1);
        }
        ;
        // Respawn
        if (!this.overrideReuse)
            gameServer.spawnFood();
    }
}

module.exports = Food;