import { NextResponse } from "next/server";
import ConnectDb from "@/dbConfig/dbConfig";
import Notes from "@/models/Notes";
import { extractDriveId } from "@/lib/extractDriveId";


export async function POST(req) {
    await ConnectDb();

    let {
        subjectId,
        unitId,
        title,
        driveId,
        type
    } = await req.json();

    let drivelink = extractDriveId(driveId);
    console.log(driveId)

if (!drivelink) {
    return NextResponse.json(
        {
            success:false,
            message:"Invalid Google Drive Link"
        },
        {status:400}
    );
}

    const notes = await Notes.findOne({
        subjectId
    });

    if (!notes) {

        return NextResponse.json(
            {
                success:false,
                message:"Notes not found"
            },
            {status:404}
        );

    }

    const unit = notes.units.id(unitId);

    if (!unit) {

        return NextResponse.json(
            {
                success:false,
                message:"Unit not found"
            },
            {status:404}
        );

    }

    const duplicate = unit.resources.find(
        r => r.driveId === drivelink
    );

    if (duplicate) {

        return NextResponse.json(
            {
                success:false,
                message:"Resource already exists"
            },
            {status:409}
        );

    }

    unit.resources.push({

        title,

        drivelink,

        type

    });

    await notes.save();

    return NextResponse.json({
        success:true
    });

}