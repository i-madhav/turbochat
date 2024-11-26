import { Server } from "socket.io";

class SocketService {
    private _io: Server;

    constructor() {
        console.log("Init Socket Server");
        this._io = new Server();
    }

    public initListeners() {
        console.log("initialise socket listeners")
        const io = this._io;
        io.on("connect", socket => {
            console.log('New Socket Connected', socket.id);
            socket.on("event:message", async ({ message }: { message: string }) => {
                console.log('New Message', message);
                socket.emit("event:serverMessage",message);
            })
        })
    }

    get io() {
        return this._io;
    }
}

export default SocketService;