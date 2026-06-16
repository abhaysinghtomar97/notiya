import mongoose from 'mongoose';

 

    const noteSchema = new mongoose.Schema({
        title:{ type: String, required: true },
        subject:{ type: String, required: true },
        subjectCode : {type: String, required : true},
        year: { type: String, required: true },
        branch : {type: String , required : true},
        url: { type: String, required: true },
        type: { type: String, enum: ['Handwrittern', 'Class Notes', 'Other'], required: true },
        createdAt: {
            type: Date,
            default: Date.now
        }
    });



const Note = mongoose.models.Note || mongoose.model('Note', noteSchema);

export default Note;