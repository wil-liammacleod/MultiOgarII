class FakeSocket {
    constructor(server) {
        this.server = server;
        this.isCloseRequest = false;
    };
    
    sendPacket(packet) {
        return;
    };

    close(error) {
        this.isCloseRequest = true;
    };
};

module.exports = FakeSocket;