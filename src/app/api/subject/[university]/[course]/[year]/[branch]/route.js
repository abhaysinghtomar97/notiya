
import { yearMap } from "@/components/YearMap";
import ConnectDb from "@/dbConfig/dbConfig";
import Subject from "@/models/Subject";
import { NextRequest, NextResponse } from "next/server";


ConnectDb();
export async function GET(request, { params }) {
    const {university, course, year, branch} = await params;

      
    try {
        let res;
       
        if (year === '1') {
            res = await Subject.find({
               university,course,year
            });
        } else {
            res = await Subject.find({
            university, 
            course,year,branch
        });
        }


        
        if (res.length === 0) {
            return NextResponse.json({
                success: true,
                message: "Subjects not found",
                subject : []
            }, { status: 200 });
        }

        return NextResponse.json(
    {
        success: true,
        message: "Fetched Subjects",
        subject: res
    },
    { status: 200 }
);


    } catch (error) {
        console.log("Subject Fetching Error: ", error);
        return NextResponse.json({
            message: error.message,
            
            success: false
        },{
            status: 500
        })
    }
}