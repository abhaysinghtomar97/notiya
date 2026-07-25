import ConnectDb from "@/dbConfig/dbConfig";
export async function getGatePapers(page = 1, limit = 10, branch = '') {
    const mongooseInstance = await ConnectDb();
    const db = mongooseInstance.connection.db; 
    const collection = db.collection('gate_pyqs');

    // Filter by branch if one is selected
    const query = branch ? { Branch: branch } : {};
    const skip = (page - 1) * limit;

    const papers = await collection
        .find(query)
        .skip(skip)
        .limit(limit)
        .toArray();

    const totalCount = await collection.countDocuments(query);

    const formattedPapers = papers.map(paper => ({
        ...paper,
        _id: paper._id.toString()
    }));

    return {
        papers: formattedPapers,
        totalCount
    };
}

// Extract distinct branches for the dropdown
export async function getBranches() {
    const mongooseInstance = await ConnectDb();
    const db = mongooseInstance.connection.db; 
    const collection = db.collection('gate_pyqs');

    const branches = await collection.distinct('Branch');
    return branches.filter(Boolean); // Remove null/undefined
}