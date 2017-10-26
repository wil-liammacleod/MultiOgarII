var FFA = require('./FFA'); // Base gamemode

function Rainbow() {
    FFA.apply(this, Array.prototype.slice.call(arguments));

    this.ID = 3;
    this.name = "Rainbow FFA";
    this.specByLeaderboard = true;
    this.speed = 1; // Speed of color change
}

module.exports = Rainbow;
Rainbow.prototype = new FFA();

// Gamemode Specific Functions

Rainbow.prototype.changeColor = function (node, gameServer) {
    node.color = gameServer.getRandomColor();
};

// Override

Rainbow.prototype.onServerInit = function () {};

Rainbow.prototype.onTick = function (gameServer) {
    // Change color
    for (var i in gameServer.nodes) {
        var node = gameServer.nodes[i];
        if (!node) continue;
        this.changeColor(node, gameServer);
    }
};