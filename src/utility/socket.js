const crypto = require("crypto");
const Chat = require("../models/chat");


const initializeSocket = (server) => {
    const socket = require("socket.io");
    const io = socket(server, {
        cors:
        {
            origin:[
                "http://localhost:5173",
                "http://13.200.233.99"
            ]
        }
    });


    const getSecretRoomId = (userId, targetUserId) => {
        return crypto
        .createHash("sha256")
        .update([userId,targetUserId].sort().join("_"))
        .digest("hex");
    };



    io.on("connection", (socket) => {
        // Handle Events
        socket.on("joinChat", ({firstName, userId , targetUserId}) => {
            const roomId = getSecretRoomId(userId, targetUserId);
            socket.join(roomId);
            console.log(firstName + "joined" + roomId);
        });


        socket.on("sendMessage", async( {firstName, userId, targetUserId, text} ) => {
            try{
                //finds the room again 
                const roomId = getSecretRoomId(userId, targetUserId);

                //save messages to database
                let chat = await Chat.findOne({
                    participants: { $all : [userId, targetUserId]},
                })

                if(!chat){
                    chat = new Chat({
                        participants:[userId, targetUserId],
                        messages:[]
                    });   
                }

                chat.messages.push({
                    senderId: userId,
                    text
                })

                await chat.save();

                //sends the message to everyone inside the room
                io.to(roomId).emit("messageReceived", { firstName, userId, text });

            }catch(err){
                console.error(err);
            }
            
        });


        socket.on("disconnect", () => {

        });


    });

};

module.exports = initializeSocket;