import mongoose from "mongoose";

export const connectDB = (url) => {
    mongoose.set('strictQuery', true);
    return (
        mongoose.connect(url, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            // useCreateIndex: true,
            // useFindAndModify: false,
        })
    );
}