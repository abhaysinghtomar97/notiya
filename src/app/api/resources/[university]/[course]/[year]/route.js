import ConnectDb from "@/dbConfig/dbConfig";
import Notes from "@/models/Notes";
import { NextResponse,NextRequest } from "next/server";

ConnectDb();


export async function GET(request, {params}){
    const {university, course, year} = await params;
    try {
        
        const response = await Notes.find({
            
        });

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
