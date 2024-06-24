import express from "express";
const app = express();
import passport from "passport";
import { errorMiddleware } from "./middlewares/errorMiddleware.js";
//dot env config
import dotenv from "dotenv";
dotenv.config({
    path: "./config/config.env",
});
//session
import session from "express-session";
import cookieParser from "cookie-parser";
//connect passport
import { connectPassport } from "./utils/passportProvider.js";
// Using Middlewares
app.use(
    session({
        secret: process.env.SESSION_SECRET,
        resave: false,
        saveUninitialized: false,

        //   cookie: {
        //     secure: process.env.NODE_ENV === "development" ? false : true,
        //     httpOnly: process.env.NODE_ENV === "development" ? false : true,
        //     sameSite: process.env.NODE_ENV === "development" ? false : "none",
        //   },
    })
);
//   app.use(cookieParser());
//   app.use(express.json());
//   app.use(
//     urlencoded({
//       extended: true,
//     })
//   );

//   app.use(
//     cors({
//       credentials: true,
//       origin: process.env.FRONTEND_URL,
//       methods: ["GET", "POST", "PUT", "DELETE"],
//     })
//   );
app.use(cookieParser());
app.use(passport.authenticate("session"));
app.use(passport.initialize());
app.use(passport.session());

//passport connection
connectPassport();
// app.get("/",(req,res,next)=>{
// res.send("working")
// })
//importing routes
import userRoutes from "./routes/user.js";


app.use("/api/v1", userRoutes);

// Using Error Middleware
app.use(errorMiddleware);

export default app;
