import mongoose from "mongoose";

    const pyqSchema = new mongoose.Schema({
    title:{ type: String, required: true },
    year:{ type: String, required: true },
    branch : {type : String, required: true},
    subject:{ type: String, required: true },
    subjectCode : {type : String, required: true},
    url:{ type: String, required: true },
    createdAt: {
        type: Date,
        default: Date.now
    },

});



const Pyq = mongoose.models.Pyq || mongoose.model('Pyq', pyqSchema);
export default Pyq;