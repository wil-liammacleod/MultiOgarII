const PlayerTracker = require('../PlayerTracker');
const Vec2 = require('../modules/Vec2');

class BotPlayer extends PlayerTracker {
    constructor(server, socket) {
        super(server, socket);
        this.influence = 0;
    };

    largest(list) {
        return list.sort((a, b) => {
            return b._size - a._size
        })[0];
    };

    checkConnection() {
        // Respawn if bot is dead
        if (!this.cells.length)
            this.server.mode.onPlayerSpawn(this.server, this);
    };

    sendUpdate() {
        this.decide(this.largest(this.cells));
    };

    decide(cell) {
        if (!cell)
            return;

        const result = new Vec2(0, 0);

        for (let i = 0; i < this.viewNodes.length; i++) {
            const node = this.viewNodes[i];
            if (node.owner == this)
                continue;

            // Make decisions
            switch (node.type) {
                case 0:
                    // Player cells
                    this.decidePlayer(node, cell);
                    break;
                case 1:
                    // Food cells
                    this.decideFood();
                    break;
                case 2:
                    // Virus cells and its derivatives
                    this.decideVirus(node, cell);
                    break;
                case 3:
                    // Ejected cells
                    this.decideEjected(node, cell);
                    break
            }

            // Conclude decisions
            // Apply this.influence if it isn't 0
            if (this.influence == 0)
                continue;

            // Calculate separation between cell and node
            const displacement = new Vec2(node.position.x - cell.position.x, node.position.y - cell.position.y);

            // Figure out distance between cells
            let distance = displacement.sqDist();

            if (this.influence < 0) {
                // Get edge distance
                distance -= cell._size + node._size;
            };

            // The farther they are the smaller influence it is
            if (distance < 1)
                distance = 1;

            this.influence /= distance;

            // Splitting conditions
            if (node.type != 1 && cell._size > node._size * 1.15 &&
                !this.splitCooldown && this.cells.length < 8 &&
                400 - cell._size / 2 - node._size >= distance) {
                // Splitkill the target
                this.splitCooldown = 15;
                this.mouse = node.position.clone();
                this.socket.packetHandler.pressSpace = true;
                return;
            } else {
                // Produce force vector exerted by this entity on the cell
                result.add(displacement.normalize(), this.influence);
            };
        };

        // Set bot's mouse position
        this.mouse = new Vec2(cell.position.x + result.x * 900, cell.position.y + result.y * 900);
    };

    decidePlayer(node, cell) {
        // Same team, don't eat
        if (this.server.mode.haveTeams && cell.owner.team == node.owner.team) {
            this.influence = 0;
        } else if (cell._size > node._size * 1.15) {
            // Eadible
            this.influence = node._size * 2.5;
        } else if (node._size > cell._size * 1.15) {
            // Bigger, avoid
            this.influence = -node._size;
        } else {
            this.influence = -(node._size / cell._size) / 3;
        }
    };

    decideFood() {
        // Always eadible
        this.influence = 1;
    };

    decideEjected(node, cell) {
        if (cell._size > node._size * 1.15)
            this.influence = node._size;
    };

    decideVirus(node, cell) {
        if (cell._size > node._size * 1.15) {
            // Eadible
            if (this.cells.length == this.server.config.playerMaxCells) {
                // Reached cell limit, won't explode
                this.influence = node._size * 2.5;
            } else {
                // Will explode, avoid
                this.influence = -1;
            }
        } else if (node.isMotherCell && node._size > cell._size * 1.15) {
            // Avoid mother cell if bigger than player
            this.influence = -1;
        }
    };
};
module.exports = BotPlayer;