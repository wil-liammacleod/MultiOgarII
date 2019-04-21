var Cell = require('./Cell');
var Packet = require('../packet');

class PlayerCell extends Cell {
    constructor(server, owner, position, size) {
        super(server, owner, position, size);
        this.type = 0;
        this._canRemerge = false;
    };

    canEat(cell) {
        return true; 
    };
    
    getSpeed(dist) {
        return Math.min(dist, 2.2 * Math.pow(this._size, -0.45) * 40) / dist;
    };

    onAdd(server) {
        this.color = this.owner.color;
        this.owner.cells.push(this);
        this.owner.socket.packetHandler.sendPacket(new Packet.AddNode(this.owner, this));
        this.server.nodesPlayer.unshift(this);
        server.mode.onCellAdd(this);
    }
    onRemove(server) {
        let index = this.owner.cells.indexOf(this);
        if (index != -1)
            this.owner.cells.splice(index, 1);
        index = this.server.nodesPlayer.indexOf(this);

        if (index != -1)
            this.server.nodesPlayer.splice(index, 1);

        server.mode.onCellRemove(this);
    };
};

module.exports = PlayerCell;