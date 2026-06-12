import mongoose from 'mongoose';

console.log("URL : ", process.env.MONGODB_URI)
const ConnectDb = async () => {

    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('Connected to MongoDB');

    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
    }
}

export default ConnectDb;