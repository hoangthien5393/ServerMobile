const
    io = require("socket.io"),
    server = io.listen(8888);

let
    ClientListSocket = new Map(), ClientListIDDevice = new Map();

// event fired every time a new client connects:
server.on("connection", (socket) => {
    console.info(`Client connected [id=${socket.id}]`);
    socket.on("new connect", (data) => {
        if (data.IDDevice != undefined) {
            var tmp = ClientListIDDevice.get(data.IDDevice);
            if (tmp != undefined) {
                ClientListIDDevice.delete(data.IDDevice);
                ClientListSocket.delete(tmp);
                //
            }
            ClientListIDDevice.set(data.IDDevice, socket);
            ClientListSocket.set(socket, data.IDDevice);

            socket.emit("new connect", { state: true, IDDevice: data.IDDevice });
        }
        else {
            socket.emit("new connect", { state: false, IDDevice: data.IDDevice });
        }
    });

    // when socket disconnects, remove it from the list:
    socket.on("disconnect", () => {
        var tmp = ClientListSocket.get(socket);
        if (tmp != undefined) {
            ClientListIDDevice.delete(tmp);
        }
        ClientListSocket.delete(socket);
        console.info(`Client gone [id=${socket.id}]`);
    });

    socket.on("TPE_CONTROL", (data) => {
        if (ClientListSocket.get(socket) == undefined) {
            return;
        }
        if (data.Start != undefined) {
            switch (data.Start) {
                case 'AAUUDD': //Dieu khien UP/DN
                    if (data.Stop == 'XXUUDD') {
                        var SocketSend = ClientListIDDevice.get(data.IDDeviceReceive);
                        if (SocketSend != undefined) {
                            SocketSend.emit('CONTROL' + '_' + data.IDProject, data);
                        }
                        else {
                            socket.emit('CONTROL' + '_' + data.IDProject, { State: false, ErrMess: '' })
                        }
                    }
                    else {
                        socket.emit('CONTROL' + '_' + data.IDProject, { State: false, ErrMess: '' })
                    }
                    break;
                case 'ABUUDD': // Xac nhan dieu khien UP/DN
                    if (data.Stop == 'XYUUDD') {
                        var SocketSend = ClientListIDDevice.get(data.IDDeviceReceive);
                        if (SocketSend != undefined) {
                            SocketSend.emit('CONTROL' + '_' + data.IDProject, data);
                        }
                        else {
                            socket.emit('CONTROL' + '_' + data.IDProject, { State: false, ErrMess: '' })
                        }
                    }
                    else {
                        socket.emit('CONTROL' + '_' + data.IDProject, { State: false, ErrMess: '' })
                    }
                    break;
                case 'AAEELL': // Dieu khien tang
                    if (data.Stop == 'XXEELL') {
                        var SocketSend = ClientListIDDevice.get(data.IDDeviceReceive);
                        if (SocketSend != undefined) {
                            SocketSend.emit('CONTROL' + '_' + data.IDProject, data);
                        }
                        else {
                            socket.emit('CONTROL' + '_' + data.IDProject, { State: false, ErrMess: '' })
                        }
                    }
                    else {
                        socket.emit('CONTROL' + '_' + data.IDProject, { State: false, ErrMess: '' })
                    }
                    break;
                case 'ABEELL':// Xac nhan dieu khien tang
                    if (data.Stop == 'XYEELL') {
                        var SocketSend = ClientListIDDevice.get(data.IDDeviceReceive);
                        if (SocketSend != undefined) {
                            SocketSend.emit('CONTROL' + '_' + data.IDProject, data);
                        }
                        else {
                            socket.emit('CONTROL' + '_' + data.IDProject, { State: false, ErrMess: '' })
                        }
                    }
                    else {
                        socket.emit('CONTROL' + '_' + data.IDProject, { State: false, ErrMess: '' })
                    }
                    break;
                case 'CCRRFF':// refresh
                    if (data.Stop == 'TTRRFF') {
                        var SocketSend = ClientListIDDevice.get(data.IDDeviceReceive);
                        if (SocketSend != undefined) {
                            SocketSend.emit('CONTROL' + '_' + data.IDProject, data);
                        }
                        else {
                            socket.emit('CONTROL' + '_' + data.IDProject, { State: false, ErrMess: '' })
                        }
                    }
                    else {
                        socket.emit('CONTROL' + '_' + data.IDProject, { State: false, ErrMess: '' })
                    }
                case 'CDRRFF':// Xác nhận Refesh trạng thái
                    if (data.Stop == 'TXRRFF') {
                        var SocketSend = ClientListIDDevice.get(data.IDDeviceReceive);
                        if (SocketSend != undefined) {
                            SocketSend.emit('CONTROL' + '_' + data.IDProject, data);
                        }
                        else {
                            socket.emit('CONTROL' + '_' + data.IDProject, { State: false, ErrMess: '' })
                        }
                    }
                    else {
                        socket.emit('CONTROL' + '_' + data.IDProject, { State: false, ErrMess: '' })
                    }
                    break;
                default:
                    break;
            }
        }
    });

    socket.on("TPE_STATUS", (data) => {
        if (ClientListSocket.get(socket) == undefined) {
            return;
        }
        if (data.Start != undefined) {
            switch (data.Start) {
                case 'BBUUDD': //Trang thai UP/DN
                    if (data.Stop == 'YYUUDD') {
                        socket.broadcast.emit('STATUS' + '_' + data.IDProject, data)
                    }
                    break;
                case 'BBEELL': //Trạng thái gọi tầng
                    if (data.Stop == 'YYEELL') {
                        socket.broadcast.emit('STATUS' + '_' + data.IDProject, data)
                    }
                    break;
                case 'BCEELL': //Trạng thái tầng và chiều mũi tên hiện tại 
                    if (data.Stop == 'YZEELL') {
                        socket.broadcast.emit('STATUS' + '_' + data.IDProject, data)
                    }
                    break;
                default:
                    break;
            }
        }
    });
});

