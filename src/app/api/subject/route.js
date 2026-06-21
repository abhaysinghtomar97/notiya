import ConnectDb from "@/dbConfig/dbConfig";
import Subject from "@/models/Subject";
import { NextRequest,NextResponse } from "next/server";


ConnectDb();
export async function POST(request){
    const SubjectData = await request.json();
    try {
        
         const isExist = await Subject.findOne({
            subjectName : SubjectData.subjectName,
            subjectCode : SubjectData.subjectCode
                                                    
         })
         if(isExist){
            return NextResponse.json({
                message: "Subject Already Exists! ",
                status : 200,
            })
         }

        const res = Subject.insertOne(SubjectData);


        return NextResponse.json({
                message: "Subject Created Successfully!",
                status : 200,
                success : true,
                subject : res
        
            })

        
    } catch (error) {
        console.log("Subject Creation Error: ", error);
        return NextResponse.json({
            message : error,
            status : 500,
            success: false
        })
    }
}
export async function GET(request){
     const {searchParams} = new URL(request.url);
     const input = searchParams.get('input')
    
    try {
       
        let res = await  Subject.find({
           subjectName:{
            $regex:input,
            $options:"i",
           }
        });
        
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