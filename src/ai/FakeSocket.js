class FakeSocket {
    constructor(server) {
        this.server = server;
        this.isCloseRequest = false;
    };
    
    sendPacket(packet) {
        return;
    };

    close() {
        this.isCloseRequest = true;
    };
};

module.exports = FakeSocket;