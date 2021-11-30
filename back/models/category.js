import mongoose from 'mongoose';



const { Schema } = mongoose


const CategorySchema = new Schema({
    categoryName: {
        type: String,
        default: "미분류"
    }, 
    posts: [ //일대 다, 다대 다 관계 설정할 때 여러개일때 배열로 만들면 됨
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "post",
        },
    ],
})

const Category = mongoose.model("category", CategorySchema)
export default Category;