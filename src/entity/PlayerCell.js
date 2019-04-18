var Cell = require('./Cell');
var Packet = require('../packet');

class PlayerCell extends Cell {
    constructor(gameServer, owner, position, size) {
        super(gameServer, owner, position, size);
        this.cellType = 0;
        this._canRemerge = false;
    }
    // Main Functions
    canEat(cell) {
        return true; // player cell can eat anyone
    }
    getSpeed(dist) {
        var speed = 2.2 * Math.pow(this._size, -0.439);
        speed *= 40 * this.gameServer.config.playerSpeed;
        return Math.min(dist, speed) / dist;
    }
    onAdd(gameServer) {
        // Add to player nodes list
        this.color = this.owner.color;
        this.owner.cells.push(this);
        this.owner.socket.packetHandler.sendPacket(new Packet.AddNode(this.owner, this));
        this.gameServer.nodesPlayer.unshift(this);
        // Gamemode actions
        gameServer.gameMode.onCellAdd(this);
    }
    onRemove(gameServer) {
        // Remove from player cell list
        var index = this.owner.cells.indexOf(this);
        if (index != -1)
            this.owner.cells.splice(index, 1);
        index = this.gameServer.nodesPlayer.indexOf(this);
        if (index != -1)
            this.gameServer.nodesPlayer.splice(index, 1);
        // Gamemode actions
        gameServer.gameMode.onCellRemove(this);
    }
}

module.exports = PlayerCell;