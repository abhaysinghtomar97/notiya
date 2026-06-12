import ConnectDb from "@/dbConfig/dbConfig"
import Note from "@/models/note";
import { NextResponse } from "next/server";

ConnectDb();


export async function GET(request){
    try {
        
        const response = await Note.find().limit(10);

        if(!response){
            return NextResponse.json({
                message : 'Notes Not Found !',
                status : 404,
                success : true
            })
        }

        return NextResponse.json({
            message : 'Notes Fetched Successfully !',
            data : response,
            status : 200,
            success : true
        })

    } catch (error) {
        console.log(error)
        return NextResponse.json({
            message : error,
            status : 500,
            success : false

        })
        
    }
}

export async function POST(request){
    const note =await request.json();
    try {
    const res = await Note.insertOne(
        note
    )
    return NextResponse.json({
        message: "Notes Uploaded",
        status : 200,
        success : true,
        notes : res

    })

    } catch (error) {
        console.log("Posting Note : ", error)
        return NextResponse.json({
            message : error,
            status : 500,
            success : false
        })
        
    }
}