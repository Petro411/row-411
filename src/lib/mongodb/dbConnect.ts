import mongoose from "mongoose";

export async function dbConnect() {
    try {
        if (mongoose.connection.readyState !== 1) {
            const dbURI = process.env.MONGODB_URI ?? "";
            const options = {
                family: 4,
                useNewUrlParser: true,
                useUnifiedTopology: true,
                maxPoolSize: 10,
            };
            mongoose.connect(dbURI, options);
            console.log('Connected to MongoDB');
            return;
        }
        console.log('already connected to MongoDB');
        return;
    } catch (error: any) {
        console.error('Error connecting to MongoDB:', error.message);
        process.exit(1);
    }
}
