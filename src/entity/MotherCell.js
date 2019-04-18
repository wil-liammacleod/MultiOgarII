var Cell = require('./Cell');
var Food = require('./Food');
var Virus = require('./Virus');

class MotherCell extends Virus{
    constructor(server, owner, position, size) {
        super(server, owner, position, size);
        this.type = 2;
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
        var maxMass = this.server.config.motherCellMaxMass;
        if (maxMass && this._mass >= maxMass)
            return false;
        return cell.type == 0 || // can eat player cell
            cell.type == 2 || // can eat virus
            cell.type == 3; // can eat ejected mass
    }
    onUpdate() {
        if (this._size == this.motherCellMinSize) {
            return;
        }
        var size1 = this._size;
        var size2 = this.server.config.foodMinSize;
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
            var food = new Food(this.server, null, pos, size2);
            food.color = this.server.getRandomColor();
            food.overrideReuse = true;
            this.server.addNode(food);
            // Eject to random distance
            food.setBoost(32 + 42 * Math.random(), angle);
        }
        this.server.updateNodeQuad(this);
    }
}

module.exports = MotherCell;
