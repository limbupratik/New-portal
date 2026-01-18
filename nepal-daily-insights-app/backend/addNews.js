import mongoose from "mongoose";
import News from "./models/News.js";

mongoose.connect("mongodb://localhost:27017/nepalnews");

const sample = new News({
  title: "Nepal launches new digital education policy",
  content: "The Government of Nepal has introduced a new digital policy...",
  category: "National",
  author: "Nepal Daily Insights",
  image: "https://via.placeholder.com/400"
});

await sample.save();
console.log("Sample news added");
process.exit();
