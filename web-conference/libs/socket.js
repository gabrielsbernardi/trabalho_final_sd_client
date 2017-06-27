module.exports = function (io) {
    const sockets = new Map();    

    io.sockets.on('connection', socket => {

        socket.on('peerOffer', offer => {
            console.log('peerOffer from', socket.id, 'to', offer.to);
            const remotePeer = offer.to;
            socket.to(remotePeer)
                .emit('peerOffer', { from: socket.id, sdp: offer.sdp });
        });

        socket.on('peerAnswer', answer => {
            console.log('peerAnswer from', socket.id, 'to', answer.to);
            const remotePeer = answer.to;
            socket.to(remotePeer)
                .emit('peerAnswer', { from: socket.id, sdp: answer.sdp });
        });

        socket.on('peerIceCandidate', ice => {
            console.log('peerIceCandidate from', socket.id, 'to', ice.to);
            const remotePeer = ice.to;
            socket.to(remotePeer)
                .emit('peerIceCandidate', { from: socket.id, candidate: ice.candidate });
        });

        socket.on('disconnect', reason => {                        
            var roomName = sockets.get(socket.id);
            if (roomName) {
                sockets.delete(socket.id);
                socket.to(roomName[1]).emit('peerDisconnected', { id: socket.id });
                socket.leave(roomName[1]);
            }
        });

        socket.on('subscribe', room => {            
            sockets.set(socket.id, [socket, room.name]);
            socket.join(room.name, () => {
                console.log(`emitindo peerConnected para sala ${room.name}`);
                socket.to(room.name).emit('peerConnected', { id: socket.id });
            });
        });        
    });
}