var Mode = require('./Mode');

class FFA extends Mode {
    constructor() {
        super();
        this.ID = 0;
        this.name = "Free For All";
        this.specByLeaderboard = true;
    }
    // Gamemode Specific Functions
    onPlayerSpawn(gameServer, player) {
        player.color = gameServer.getRandomColor();
        // Spawn player
        gameServer.spawnPlayer(player, gameServer.randomPos());
    }
    updateLB(gameServer, lb) {
        gameServer.leaderboardType = this.packetLB;
        for (var i = 0, pos = 0; i < gameServer.clients.length; i++) {
            var player = gameServer.clients[i].playerTracker;
            if (player.isRemoved || !player.cells.length ||
                player.socket.isConnected == false || (!gameServer.config.minionsOnLeaderboard && player.isMi))
                continue;
            for (var j = 0; j < pos; j++)
                if (lb[j]._score < player._score)
                    break;
            lb.splice(j, 0, player);
            pos++;
        }
        this.rankOne = lb[0];
    }
}

module.exports = FFA;
FFA.prototype = new Mode();



