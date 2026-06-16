import ConnectDb from "@/dbConfig/dbConfig"
import Note from "@/models/note";
import { NextResponse, NextRequest } from "next/server";

ConnectDb();


export async function GET(request, { params }) {
    try {
        const { branch, year } = await params;
        console.log(year, branch)
            console.log(year == 1)
       let response; 


if (year === '1') {
    response = await Note.find({
        year: year
    });
} else {
    response = await Note.find({
        branch: branch,
        year: year
    });
}

// 3. Check if the array is empty, not if it is 'falsy'
if (response.length === 0) {
    return NextResponse.json({
        message: 'Notes Not Found!',
        status: 404,
        success: false // 4. Set success to false for a 404
    });
}

        return NextResponse.json({
            message: 'Notes Fetched Successfully !',
            data: response,
            status: 200,
            success: true
        })

    } catch (error) {
        console.log(error)
        return NextResponse.json({
            message: error,
            status: 500,
            success: false

        })

    }
}