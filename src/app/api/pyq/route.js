import ConnectDb from "@/dbConfig/dbConfig"
import Pyq from "@/models/pyq";
import { NextResponse } from "next/server";

ConnectDb();


export async function GET(request){
    try {
        
        const response = await Pyq.find();

        if(!response){
            return NextResponse.json({
                message : 'PYQs Not Found !',
                status : 404,
                success : true
            })
        }

        return NextResponse.json({
            message : 'PYQ Fetched Successfully !',
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
    const pyq =await request.json();
    try {
    const res = await Pyq.insertOne(
        pyq
    )
    return NextResponse.json({
        message: "PYQ Uploaded",
        status : 200,
        success : true,
        pyq : res

    })

    } catch (error) {
        console.log("Posting PYQ : ", error)
        return NextResponse.json({
            message : error,
            status : 500,
            success : false
        })
        
    }
}