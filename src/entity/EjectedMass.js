var Cell = require('./Cell');

class EjectedMass extends Cell {
    constructor(gameServer, owner, position, size) {
        super(gameServer, owner, position, size);
        this.cellType = 3;
    }
    // Main Functions
    onAdd(gameServer) {
        // Add to list of ejected mass
        gameServer.nodesEjected.push(this);
    }
    onRemove(gameServer) {
        // Remove from list of ejected mass
        var index = gameServer.nodesEjected.indexOf(this);
        if (index != -1) {
            gameServer.nodesEjected.splice(index, 1);
        }
    }
}

module.exports = EjectedMass;