// A fake socket for bot players
class FakeSocket {
    constructor(gameServer) {
        this.server = gameServer;
        this.isCloseRequest = false;
    }
    sendPacket(packet) {
        // Fakes sending a packet
        return;
    }
    close(error) {
        this.isCloseRequest = true;
    }
}

module.exports = FakeSocket;