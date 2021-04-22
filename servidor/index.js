const path = require('path');
const express = require( 'express' );
const app = express();
const SocketIO = require( 'socket.io' );

//Archivos estáticos
app.use(express.static( path.join( __dirname, 'public' ) ) );

//Configuraciones
app.set( 'port', process.env.PORT || 3030 );

//encencer el servidor
const server = app.listen( app.get('port'), () => {
    console.log( 'Server running on port', app.get('port') );
});

const io = SocketIO( server )

//Sockets
io.on('connection', ( socket ) => {
    console.log( 'new connectionss', socket.id );
    socket.broadcast.emit('chat:user', socket.id);
    socket.on('chat:myMessage', ( data ) => {
        // userId = socket.id;
        // data.userId = userId;
        io.emit('chat:myMessage', data);
        console.log(data);
    });

    socket.on('chat:typing', ( data ) => {
        socket.broadcast.emit('chat:typing', data);
    });
});


