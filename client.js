function client(){
const io= require("socket.io-client");
let counter=0;

const socket = io("ws://localhost:3000");
socket.emit('message',{
    type:'Subscribe'
})
socket.on("message", message => {
    if (message.type === "Subscribe") {
        counter++;
        setTimeout(()=>{
            socket.emit("message", {
                "type": message.type,
                "status": "Subscribed",
                "updatedAt": new Date().getTime()
            })
        },(4*1000))
      
    }else if (message.type === "Unscubscribe") {
        counter--;
        setTimeout(()=>{
            socket.emit("message", {
                "type": message.type,
                "status": "unsubscribed",
                "updatedAt": new Date().getTime()
            })
        },(8*1000))
      
    }else if (message.type === "CountSubscribers") {
        socket.emit("message", {
            "type": CountSubscribers,
            "count": counter,
            "updatedAt": new Date().getTime()
        })
    }else{
        socket.emit("message",{
            "type": 'error',
            "error": "Requested method not implemented",
            "updatedAt": new Date().getTime()
            })
    }
   });
}
exports.client=client;
