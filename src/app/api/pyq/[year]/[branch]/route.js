import ConnectDb from "@/dbConfig/dbConfig"
import Pyq from "@/models/pyq";
import { NextResponse , NextRequest} from "next/server";

ConnectDb();


export async function GET(request, {params}){
    try {
        const  { branch , year} = await params;
        let response;

        // If it's the first year, ignore the branch and query ONLY by year
        if (year == '1') {
            response = await Pyq.find({ 
                year: year 
            });
        } 
        // For years 2, 3, and 4, query by BOTH branch and year
        else {
            response = await Pyq.find({ 
                branch: branch, 
                year: year 
            });
        }

        // Handle the 404 case if no documents match the query
        if (response.length === 0) {
            return NextResponse.json({
                message: 'Notes Not Found!',
                status: 404,
                success: false
            });
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