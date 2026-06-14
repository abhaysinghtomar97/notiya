import ConnectDb from "@/dbConfig/dbConfig"
import Pyq from "@/models/pyq";
import { NextResponse } from "next/server";

ConnectDb();


export async function GET(request, {params}){
    try {
         const {year} = await params;
        const response = await Pyq.find({year : year});

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
