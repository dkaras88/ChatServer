//const { Socket } = require("dgram");
var express = require("express")

var app = express();

var server = require("http").Server(app);
var io = require("socket.io")(server);

app.set("view engine", "jade");
app.set("views", __dirname +"/views");

app.use("/public", express.static("public"));

io.on("connection", function(socket){
        console.log("User is Connected");

        // Give the parameter to the server and broadcast it, if there is a new message. 
        socket.on("message", function(message){
                socket.broadcast.emit("newMessage", message);

        });


        socket.on("welcomeServer", function(message){
                console.log("welcomeServer", message);
        });
        setInterval(function(){
                socket.emit("welcome", {
                        datum: Date.now()
                });

        }, 5000);
});

server.listen(8080);


// Socket io (server communication), jquery (send a message)
// jQuery !!!!