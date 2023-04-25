import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import multer from "multer";
import helmet from "helmet";
import morgan from "morgan";
import path from "path";

import { fileURLToPath } from "url";
import { verifyToken } from "./middleware/auth.js";
import { register } from "./controllers/auth.js";
import { createPost } from "./controllers/posts.js";
import { connectDB } from "./db/connect.js";

import authRouter from "./routes/auth.js";
import userRouter from "./routes/user.js";
import postRouter from "./routes/posts.js";

const PORT = 5000;

const filename = fileURLToPath(import.meta.url); 
const dirname = path.dirname(filename);

dotenv.config();

const app = express(); 
app.use(express.json());

app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));

app.use(morgan("common"));

app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));

app.use(cors());

app.use("/assets", express.static(path.join(dirname, "public/assets")));

//use static middleware here later

/* FILE STORAGE */
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "public/assets");
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname);
    },
  });
const upload = multer({ storage });

//auth registeration
app.post("/auth/register", upload.single("picture"), register);
app.post("/post", verifyToken, upload.single("picture"), createPost);

//auth routes
app.use('/auth', authRouter);

//user routes
app.use('/users', userRouter);

//post routes
app.use('/posts', postRouter);


//MONGOOSE 
const start = async () => {
    try {
        await connectDB(process.env.MONGO_URI);
        app.listen(PORT, () => { console.log(`server is listening on port ${PORT}`)});
    } catch (error) {
        console.log(error);
    }
}

start();