
window.onload = function () {

    const socket = io();
    let actions  = document.getElementById('chat-actions');
    let btn      = document.getElementById("chat-button");
    let messages = document.getElementById('message');
    let userName = document.getElementById('user');
    let output   = document.getElementById("chat-content");
    
    btn.addEventListener('click', function() {
            let mensaje = {
                user : userName.value,
                message : messages.value
            };
            socket.emit('chat:myMessage', mensaje);
            console.log(mensaje);
    });
    
    messages.addEventListener('keypress', () => {
        socket.emit('chat:typing', userName.value);
    });
    socket.on('chat:myMessage', (data) => {
        console.log('DEbe imprimir esto');
        output.innerHTML += `<p><strong>${data.user}</strong></p><br/>
        <p>${data.message}</p>`
        console.log(data.userName,'Prin');
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