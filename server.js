const express = require("express");
const app = express();
const Blog = require("./models/blog");
const database = require("./database");
const body_parserc = require("body-parser");
app.use(body_parser.json());

//getting the blog data
app.get("/getblog", async (req, res) => {
  try {
    const blog_data = await Blog.find();
    res.status(200).response(blog_data);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

//savind the data given by the user to the database
app.post("/addpost", async function (req, res) {
  try {
    const data = req.body;
    const new_blog = new Blog(data);
    const response = await new_blog.save();
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

//getting the blog data by using the blog id
app.get("/addpost:id", async function (req, res) {
  try {
    const blog = req.params.id;
    const data = await Blog.findById(blog);
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: "Internal Server error" });
  }
});

//editing the blog

app.put("/edit:id", async function (req, res) {
  try {
    const data = req.body;
    const data_id = req.params.id;
    const blog = await Blog.findByIdAndUpdate(data_id, data, {
      new: true,
    });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.delete("/deleteblog", async function (req, res) {
  try {
    await Blog.deleteMany();
    res.status(200).json({ message: "All blogs Deleted Successfully" });
  } catch (error) {}
});

app.delete("/delete:id", async function (req, res) {
  try { 
    const id = req.params.id;
    const blog = await Blog.findByIdAndDelete(id);
    res.status(200).json({ message: "Blog Successfully deleted" });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});
const port = 3000;
app.listen(port, function () {
  console.log("The server is running on the Port :: ", port);
});
