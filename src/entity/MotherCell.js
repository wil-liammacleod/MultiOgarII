var Cell = require('./Cell');
var Food = require('./Food');
var Virus = require('./Virus');

class MotherCell extends Virus{
    constructor(gameServer, owner, position, size) {
        super(gameServer, owner, position, size);
        this.cellType = 2;
        this.isSpiked = true;
        this.isMotherCell = true; // Not to confuse bots
        this.color = { r: 0xce, g: 0x63, b: 0x63 };
        this.motherCellMinSize = 149; // vanilla 149 (mass = 149*149/100 = 222.01)
        this.motherCellSpawnAmount = 2;
        if (!this._size) {
            this.setSize(this.motherCellMinSize);
        }
    }
    canEat(cell) {
        var maxMass = this.gameServer.config.motherCellMaxMass;
        if (maxMass && this._mass >= maxMass)
            return false;
        return cell.cellType == 0 || // can eat player cell
            cell.cellType == 2 || // can eat virus
            cell.cellType == 3; // can eat ejected mass
    }
    onUpdate() {
        if (this._size == this.motherCellMinSize) {
            return;
        }
        var size1 = this._size;
        var size2 = this.gameServer.config.foodMinSize;
        for (var i = 0; i < this.motherCellSpawnAmount; i++) {
            size1 = Math.sqrt(size1 * size1 - (size2 * size2) * 2);
            size1 = Math.max(size1, this.motherCellMinSize);
            this.setSize(size1);
            // Spawn food with size2
            var angle = Math.random() * 2 * Math.PI;
            var pos = {
                x: this.position.x + size1 * Math.sin(angle),
                y: this.position.y + size1 * Math.cos(angle)
            };
            // Spawn food
            var food = new Food(this.gameServer, null, pos, size2);
            food.color = this.gameServer.getRandomColor();
            food.overrideReuse = true;
            this.gameServer.addNode(food);
            // Eject to random distance
            food.setBoost(32 + 42 * Math.random(), angle);
        }
        this.gameServer.updateNodeQuad(this);
    }
}

module.exports = MotherCell;
