import ConnectDb from "@/dbConfig/dbConfig";

const GATE_BRANCHES = {
  AE: "Aerospace Engineering",
  AG: "Agricultural Engineering",
  AR: "Architecture and Planning",
  BM: "Biomedical Engineering",
  BT: "Biotechnology",
  CE: "Civil Engineering",
  CH: "Chemical Engineering",
  CS: "Computer Science and Information Technology",
  CY: "Chemistry",
  DA: "Data Science and Artificial Intelligence",
  EC: "Electronics and Communication Engineering",
  EE: "Electrical Engineering",
  EY: "Ecology and Evolution",
  GG: "Geology and Geophysics",
  IN: "Instrumentation Engineering",
  MA: "Mathematics",
  ME: "Mechanical Engineering",
  MN: "Mining Engineering",
  MT: "Metallurgical Engineering",
  PE: "Petroleum Engineering",
  PH: "Physics",
  PI: "Production and Industrial Engineering",
  ST: "Statistics",
  TF: "Textile Engineering and Fibre Science",
  XE: "Engineering Sciences",
  XH: "Humanities and Social Sciences",
  XL: "Life Sciences"
};



export async function getGatePapers(page = 1, limit = 10, branch = '') {
    const mongooseInstance = await ConnectDb();
    const db = mongooseInstance.connection.db; 
    const collection = db.collection('gate_pyqs');

    // Filter by branch if one is selected
    const query = branch ? { Branch: branch } : {};
    const skip = (page - 1) * limit;

    const papers = await collection
        .find(query)
        .sort({ Year: -1 }) 
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
  const collection = db.collection("gate_pyqs");

  const branches = await collection.distinct("Branch");

  return branches
    .filter(Boolean)
    .sort()
    .map((code) => ({
      code,
      name: GATE_BRANCHES[code] || code,
    }));
}