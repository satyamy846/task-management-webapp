const express = require('express');
const mongoose = require('mongoose');
const app = express();
const cors = require('cors');
const cookieParser = require('cookie-parser');
// const socket = require('socket.io');
// const http = require('http');
// const server = http.createServer(app);
// const io = socket(server);
const taskRouter = require('./Routes/Task');
const userRouter = require('./Routes/User');
const taskController = require('./Controllers/Task');
require('dotenv').config();

const server = require('http').createServer(app);
// const io = require('socket.io')(server, {
//     cors: {
//       origin: "*",
//     }
//   });

// io.on('connection', (socket)=>{
//     console.log("socket is connected");

//     socket.on('client-event', (data) => {
//         console.log('Client says:', data);
//         let response = taskController.updateTaskStatus(data);
//         // Respond to the client
//         console.log("response == ", response);
//         socket.emit('server-response', response);
//       });

//     //   socket.on('disconnect', () => {
//     //     console.log('User disconnected');
//     //   });
// })

const corsOptions = {
  origin: 'http://localhost:5173', // Allow requests from this origin
  credentials: true, // Allow credentials (cookies)
};

app.use(cors(corsOptions)); // Move this line up

app.use(express.json());
app.use(cookieParser());
app.use(taskRouter);
app.use(userRouter);




const url = "mongodb+srv://satyamy846:SbBjEU2zCej7N98y@atlascluster.poptvp7.mongodb.net/taskManagement?retryWrites=true"

// const connect = async function(){
//     await mongoose.connect(url);
// }

// connect();

mongoose.connect(url).then(()=>{
    console.log("Database connected")
})

app.get("/", (req,res)=>{
    res.send("Server is running ");
});

// let count = 0;
// io.on('connection', (socket) => {
//   count++;
// //   socket.on('update-task', sendUpdateTask);
// console.log(`Socket io connection ${count}`);

// });


const port = 4000;
server.listen(port, ()=>{
    console.log(`server started on http://localhost:${port}`);
})


