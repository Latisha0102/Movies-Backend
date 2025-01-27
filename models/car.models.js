import { Schema, model as _model } from "mongoose"

const carSchema = new Schema({
    model: String,
    releaseYear: Number,
    make: String,
})

const Car = _model("Car" , carSchema)

export default Car

