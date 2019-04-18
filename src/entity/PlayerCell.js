var Cell = require('./Cell');
var Packet = require('../packet');

class PlayerCell extends Cell {
    constructor(server, owner, position, size) {
        super(server, owner, position, size);
        this.type = 0;
        this._canRemerge = false;
    }
    // Main Functions
    canEat(cell) {
        return true; // player cell can eat anyone
    }
    getSpeed(dist) {
        var speed = 2.2 * Math.pow(this._size, -0.439);
        speed *= 40 * this.server.config.playerSpeed;
        return Math.min(dist, speed) / dist;
    }
    onAdd(server) {
        // Add to player nodes list
        this.color = this.owner.color;
        this.owner.cells.push(this);
        this.owner.socket.packetHandler.sendPacket(new Packet.AddNode(this.owner, this));
        this.server.nodesPlayer.unshift(this);
        // Gamemode actions
        server.gameMode.onCellAdd(this);
    }
    onRemove(server) {
        // Remove from player cell list
        var index = this.owner.cells.indexOf(this);
        if (index != -1)
            this.owner.cells.splice(index, 1);
        index = this.server.nodesPlayer.indexOf(this);
        if (index != -1)
            this.server.nodesPlayer.splice(index, 1);
        // Gamemode actions
        server.gameMode.onCellRemove(this);
    }
}

module.exports = PlayerCell;