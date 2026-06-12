import ConnectDb from "@/dbConfig/dbConfig"
import Note from "@/models/note";
import { NextResponse , NextRequest} from "next/server";

ConnectDb();


export async function GET(request, {params}){
    try {
        const  { branch ,year} = await params;
        console.log(year, branch)
     const response = await Note.find({
       branch: branch,
       year : year
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