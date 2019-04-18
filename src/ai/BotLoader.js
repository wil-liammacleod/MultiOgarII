// Library imports
const fs = require("fs");

// Project imports
const FakeSocket = require('./FakeSocket');
const PacketHandler = require('../PacketHandler');
const BotPlayer = require('./BotPlayer');
const MinionPlayer = require('./MinionPlayer');

class BotLoader {
    constructor(server) {
        this.server = server;
        this.randomNames = fs.readFileSync("../src/ai/BotNames.txt", "utf-8").split("\n");
        this.nameIndex = 0;
    };

    getName() {
        // Query a random index and return name. If none is found, return bot + its index.
        return this.randomNames[Math.floor(Math.random() * this.randomNames.length)] || `bot ${this.nameIndex++}`;
    };

    addBot() {
        // Create a FakeSocket instance and assign it's properties.
        const socket = new FakeSocket(this.server);
        socket.playerTracker = new BotPlayer(this.server, socket);
        socket.packetHandler = new PacketHandler(this.server, socket);

        // Add to client list and spawn.
        this.server.clients.push(socket);
        socket.packetHandler.setNickname(this.getName());
    };

    addMinion(owner, name) {
        // Aliases
        const maxSize = this.server.config.minionMaxStartSize;
        const defaultSize = this.server.config.minionStartSize;

        // Create a FakeSocket instance and assign it's properties.
        const socket = new FakeSocket(this.server);
        socket.playerTracker = new MinionPlayer(this.server, socket, owner);
        socket.packetHandler = new PacketHandler(this.server, socket);
        socket.playerTracker.owner = owner;

        // Set minion spawn size
        socket.playerTracker.spawnmass = maxSize > defaultSize ? Math.floor(Math.random() * (maxSize - defaultSize) + defaultSize) : defaultSize;

        // Add to client list
        this.server.clients.push(socket);

        // Add to world 
        socket.packetHandler.setNickname(name == "" || !name ? this.server.config.defaultName : name);
    };
};

module.exports = BotLoader;

