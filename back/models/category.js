import mongoose from 'mongoose';



const { Schema } = mongoose


const CategorySchema = new Schema({
    categoryName: {
        type: String,
        default: "미분류"
    }, 
    posts: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "post",
        },
    ],
})

const Category = mongoose.model("category", CategorySchema)
export default Category;