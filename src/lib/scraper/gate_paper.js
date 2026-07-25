// scripts/seedDatabase.js

const { MongoClient } = require('mongodb');
const xlsx = require('xlsx');
const path = require('path');

// Replace with your MongoDB Atlas connection string
const uri = "mongodb+srv://abhaysinghtomar97_db_user:zU1FC5QEJDdwZmJg@notiya.glhas7c.mongodb.net/notiya"
const client = new MongoClient(uri);

async function seedDatabase() {
    try {
        // 1. Connect to MongoDB Atlas
        await client.connect();
        console.log("Connected successfully to MongoDB Atlas.");

        // Specify your database and collection names
        const db = client.db("notiya"); 
        const collection = db.collection("gate_pyqs");

        // 2. Read and parse the Excel file
        // Ensure the path points to where your Excel file is saved
        const filePath = path.join(__dirname, './GATE_Question_Papers_Extracted.xlsx');
        const workbook = xlsx.readFile(filePath);
        
        // Grab the first sheet
        const sheetName = workbook.SheetNames[0];
        const sheet = workbook.Sheets[sheetName];
        
        // Convert the sheet data into an array of JSON objects
        const records = xlsx.utils.sheet_to_json(sheet, { defval: "N/A" });

        // 3. Insert the records into the database
        if (records.length > 0) {
            const result = await collection.insertMany(records);
            console.log(`Success! Inserted ${result.insertedCount} documents into the collection.`);
        } else {
            console.log("The Excel sheet is empty. No data to insert.");
        }

    } catch (error) {
        console.error("Error inserting data into MongoDB:", error);
    } finally {
        // Ensure the connection is closed when done
        await client.close();
        console.log("Database connection closed.");
    }
}

seedDatabase();