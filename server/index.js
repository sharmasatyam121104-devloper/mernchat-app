import express from 'express';
import dotenv from 'dotenv';
import chalk from "chalk";
import userRoute from './routes/user.route.js'
import connectDB from './DB/db.js';
import { errorMiddleware } from './middlewares/error.middleware.js';
import cookieParser from 'cookie-parser';
import morgan from "morgan";
import Messagerouter from './routes/message.route.js';
import cors from 'cors'
import {app, server} from './Socket.io/socket.js'



// //config dotenv file here
// dotenv.config()

// const app = express();

//In express you have to use json only for one time
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}));
app.use(express.json())
app.use(cookieParser())
// app.use(morgan("combined"));   // or "dev" for concise colored logs
// app.use(morgan((tokens, req, res) => {
//   return chalk.blue(`${tokens.method(req, res)} ${tokens.url(req, res)} ${tokens.status(req, res)}`);
// }));


//connectDB help to connect database
connectDB();




//user api 
app.use('/api/v1/user',userRoute)
//message route api
app.use('/api/v1/message',Messagerouter)

//middleware
app.use(errorMiddleware)

//connect port to run server
const PORT = process.env.PORT || 5008;
server.listen(PORT,()=>{
    console.log(chalk.green(`Server is running on http://localhost:${PORT}`));
    
})
