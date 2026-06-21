
import ConnectDb from "@/dbConfig/dbConfig";
import Subject from "@/models/Subject";
import { NextRequest,NextResponse } from "next/server";


ConnectDb();

export async function GET(request, {params}){
   const {university, course} = await params ;
    try {
       
        let res = await  Subject.find({university : university , course : course });
        
        if(!res){
            return NextResponse.json({
                message: "Subjects Not Found!",
                status : 400,
                success : false
        
            })

        }
      
        return NextResponse.json({
                message: "fetched Subjects!",
                status : 200,
                success : true,
                subject : res
        
            })

        
    } catch (error) {
        console.log("Subject Fetching Error: ", error);
        return NextResponse.json({
            message : error,
            status : 500,
            success: false
        })
    }
}