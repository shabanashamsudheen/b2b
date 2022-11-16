function server(){
    const { Server } = require("socket.io");
    let counter=0;
    const io = new Server(3000);
    setInterval(()=>{
        io.emit("heartbeat",{
            "type": "heatbeat",
            "updatedAt": new Date().getTime()
            })
    },1000);
    
    io.on("connection", (socket) => {
      // send a message to the client
      socket.on("message", message => {
        if (message.type === "Subscribe") {
            counter++;
            setTimeout(()=>{
                io.to(socket.id).emit("message", {
                    "type": message.type,
                    "status": "Subscribed",
                    "updatedAt": new Date().getTime()
                })
            },(4*1000))
          
        }else if (message.type === "Unscubscribe") {
            counter--;
            setTimeout(()=>{
                io.to(socket.id).emit("message", {
                    "type": message.type,
                    "status": "unsubscribed",
                    "updatedAt": new Date().getTime()
                })
            },(8*1000))
          
        }else if (message.type === "CountSubscribers") {
            io.to(socket.id).emit("message", {
                "type": CountSubscribers,
                "count": counter,
                "updatedAt": new Date().getTime()
            })
        }else{
            io.to(socket.id).emit("message",{
                "type": 'error',
                "error": "Requested method not implemented",
                "updatedAt": new Date().getTime()
                })
        }
       });
       socket.on("disconnect", () => {
         // handle disconnected user
       });
    });
}
exports.server=server;
