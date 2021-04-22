
window.onload = function () {

    const socket = io();
    let actions  = document.getElementById('chat-actions');
    let btn      = document.getElementById("chat-button");
    let messages = document.getElementById('message');
    let userName = document.getElementById('user');
    let output   = document.getElementById("chat-content");
    let outputO  = document.getElementById("chat-content-origin");
    let userId   = 'different'; 
    
    socket.on( 'chat:user', (data) => {
        userId = data;
    });

    btn.addEventListener('click', function() {
            let mensaje = {
                user    : userName.value,
                message : messages.value,
                id      : userId, 
            };
            socket.emit('chat:myMessage', mensaje);
    });
    
    messages.addEventListener('keypress', () => {
        socket.emit('chat:typing', userName.value);
    });
    socket.on('chat:myMessage', ( data ) => {
        console.log( 'idUser: ' ,data.id , 'id: ', userId);
        if ( userId == data.id ) {
            outputO.innerHTML += `<p><strong>${data.user}</strong></p><br/>
            <p>${data.message}</p>
            <p>origen<p/>`
        } else if( userId != data.id){
            output.innerHTML += `<p><strong>${data.user}</strong></p><br/>
            <p>${data.message}</p>
            <p>destino<p/>`
        }
    });
    
    socket.on('chat:typing', ( data ) => {
        actions.innerHTML = `<p><em>${data} está escribiendo...</em></p>`
    });
};
// function tipear(){
// }
    
    // messages.addEventListener('keypress',function (){
    //     socket.emit('chat:typing', userName.value);
    // });
    


// console.log('print this?', messages);