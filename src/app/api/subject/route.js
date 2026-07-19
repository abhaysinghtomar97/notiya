import ConnectDb from "@/dbConfig/dbConfig";
import Subject from "@/models/Subject";
import { NextRequest,NextResponse } from "next/server";

export async function POST(request){
    await ConnectDb();
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
export async function GET(request) {
  try {
    await ConnectDb();
    
    const { searchParams } = new URL(request.url);
    const input = searchParams.get("input");
    const currentBranch = searchParams.get("currentBranch"); // Grab layout context if present (e.g., 'ECE')

    if (!input) {
      return NextResponse.json({ success: true, subject: [] });
    }

    // Perform query parsing (regex or text indexes can be dropped here)
    const queryRegex = new RegExp(input.trim(), "i");
    const subjects = await Subject.find({
      $or: [
        { subjectName: queryRegex },
        { subjectCode: queryRegex }
      ]
    }).lean();

    // Contextual evaluation loop
    const mappedSubjects = subjects.map((sub) => {
      let finalPath = sub.path;

      // If we are looking for a multi-branch subject and the frontend provided a valid layout context
      if (
        currentBranch && 
        sub.branches && 
        sub.branches.map(b => b.toUpperCase()).includes(currentBranch.toUpperCase())
      ) {
        // Dynamically compute the context URL variant for the UI execution layer
        finalPath = `${sub.university}/${sub.course}/${sub.year}/${currentBranch.toLowerCase()}/${sub.slug}`;
      }

      return {
        ...sub,
        path: finalPath // Seamless transition; frontend navigation reads this value perfectly
      };
    });

    return NextResponse.json({ success: true, subject: mappedSubjects });
  } catch (error) {
    console.error("Search API Error:", error);
    return NextResponse.json({ success: false, message: "Server error" }, { status: 500 });
  }
}