var Cell = require('./Cell');

function Virus() {
    Cell.apply(this, Array.prototype.slice.call(arguments));
    this.cellType = 2;
    this.isSpiked = true;
    this.isMotherCell = false; // Not to confuse bots
    this.color = {
        r: 0x33,
        g: 0xff,
        b: 0x33
    };
}

module.exports = Virus;
Virus.prototype = new Cell();

// Main Functions

Virus.prototype.canEat = function (cell) {
    // cannot eat if virusMaxAmount is reached
    if (this.gameServer.nodesVirus.length < this.gameServer.config.virusMaxAmount)
        return cell.cellType == 3; // virus can eat ejected mass only
};

Virus.prototype.onEat = function (prey) {
    // Called to eat prey cell
    this.setSize(Math.sqrt(this.radius + prey.radius));

    if (this._size >= this.gameServer.config.virusMaxSize) {
        this.setSize(this.gameServer.config.virusMinSize); // Reset mass
        this.gameServer.shootVirus(this, prey.boostDirection.angle());
    }
};

Virus.prototype.onEaten = function (c) {
    if (!c.owner) return; // Only players can explode

    // Split in random directions at mass <size / 3>
    for (let i = 0; i < this.gameServer.config.playerMaxCells; i++) {
        this.gameServer.splitPlayerCell(c.owner, c, 2 * Math.PI * Math.random(), c._size / 3);
    }
};

Virus.prototype.onAdd = function (gameServer) {
    gameServer.nodesVirus.push(this);
};

Virus.prototype.onRemove = function (gameServer) {
    var index = gameServer.nodesVirus.indexOf(this);
    if (index != -1)
        gameServer.nodesVirus.splice(index, 1);
};