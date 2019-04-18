var Vec2 = require('../modules/Vec2');

class Cell {
    constructor(gameServer, owner, position, size) {
        this.gameServer = gameServer;
        this.owner = owner; // playerTracker that owns this cell
        this.color = { r: 0, g: 0, b: 0 };
        this.radius = 0;
        this._size = 0;
        this._mass = 0;
        this.cellType = -1; // 0 = Player Cell, 1 = Food, 2 = Virus, 3 = Ejected Mass
        this.isSpiked = false; // If true, then this cell has spikes around it
        this.isAgitated = false; // If true, then this cell has waves on it's outline
        this.killedBy = null; // Cell that ate this cell
        this.isMoving = false; // Indicate that cell is in boosted mode
        this.boostDistance = 0;
        this.boostDirection = new Vec2(1, 0);
        if (this.gameServer) {
            this.tickOfBirth = this.gameServer.tickCounter;
            this.nodeId = this.gameServer.lastNodeId++ >> 0;
            if (size)
                this.setSize(size);
            if (position)
                this.position = new Vec2(position.x, position.y);
        }
    }
    // Fields not defined by the constructor are considered private and need a getter/setter to access from a different class
    setSize(size) {
        this._size = size;
        this.radius = size * size;
        this._mass = this.radius / 100;
    }
    // by default cell cannot eat anyone
    canEat(cell) {
        return false;
    }
    // Returns cell age in ticks for specified game tick
    getAge() {
        return this.gameServer.tickCounter - this.tickOfBirth;
    }
    // Called to eat prey cell
    onEat(prey) {
        if (!this.gameServer.config.playerBotGrow) {
            if (this._size >= 250 && prey._size <= 41 && prey.cellType == 0)
                prey.radius = 0; // Can't grow from players under 17 mass
        }
        this.setSize(Math.sqrt(this.radius + prey.radius));
    }
    setBoost(distance, angle) {
        this.boostDistance = distance;
        this.boostDirection = new Vec2(Math.sin(angle), Math.cos(angle));
        this.isMoving = true;
        if (!this.owner) {
            var index = this.gameServer.movingNodes.indexOf(this);
            if (index < 0)
                this.gameServer.movingNodes.push(this);
        }
    }
    checkBorder(b) {
        var r = this._size / 2;
        if (this.position.x < b.minx + r || this.position.x > b.maxx - r) {
            this.boostDirection.scale(-1, 1); // reflect left-right
            this.position.x = Math.max(this.position.x, b.minx + r);
            this.position.x = Math.min(this.position.x, b.maxx - r);
        }
        if (this.position.y < b.miny + r || this.position.y > b.maxy - r) {
            this.boostDirection.scale(1, -1); // reflect up-down
            this.position.y = Math.max(this.position.y, b.miny + r);
            this.position.y = Math.min(this.position.y, b.maxy - r);
        }
    }
    onEaten(hunter) { }
    onAdd(gameServer) { }
    onRemove(gameServer) { }
}

module.exports = Cell;