class ServerStat {
    constructor(playerTracker) {
        this.playerTracker = playerTracker;
    }
    build(protocol) {
        var server = this.playerTracker.server;
        // Get server statistics
        var totalPlayers = 0;
        var alivePlayers = 0;
        var spectPlayers = 0;
        for (var i = 0; i < server.clients.length; i++) {
            var socket = server.clients[i];
            if (socket == null || !socket.isConnected)
                continue;
            totalPlayers++;
            if (socket.playerTracker.cells.length > 0)
                alivePlayers++;
            else
                spectPlayers++;
        }
        var obj = {
            'name': server.config.serverName,
            'mode': server.mode.name,
            'uptime': Math.round((server.stepDateTime - server.startTime) / 1000),
            'update': server.updateTimeAvg.toFixed(3),
            'playersTotal': totalPlayers,
            'playersAlive': alivePlayers,
            'playersSpect': spectPlayers,
            'playersLimit': server.config.serverMaxConnections
        };
        var json = JSON.stringify(obj);
        // Serialize
        var BinaryWriter = require("./BinaryWriter");
        var writer = new BinaryWriter();
        writer.writeUInt8(254); // Message Id
        writer.writeStringZeroUtf8(json); // JSON
        return writer.toBuffer();
    }
}

module.exports = ServerStat;