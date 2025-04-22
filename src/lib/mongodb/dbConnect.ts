import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;

type connectionStateType={
    conn:any;
    promise:any
}

var connectionState : connectionStateType = {
    conn:null,
    promise:null
};

export async function dbConnect() {
    if (connectionState.conn) {
        return connectionState.conn;
    }

    if (!connectionState.promise) {
        if (!MONGODB_URI) {
            throw new Error("Please define the MONGODB_URI environment variable");
        }

        connectionState.promise = mongoose
            .connect(MONGODB_URI)
            .then((mongoose) => {
                console.log("✅ MongoDB connected");
                return mongoose;
            })
            .catch((err) => {
                console.error("❌ MongoDB connection error:", err.message);
                throw err;
            });
    }

    connectionState.conn = await connectionState.conn;
    return connectionState.conn;
}
