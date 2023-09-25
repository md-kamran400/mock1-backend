const { Router } = require("express");
const { PostModel } = require("../models/post.model");
const PostRouter = Router();

PostRouter.post("/add", async (req, res) => {
  try {
    let Post = await new PostModel(req.body);
    Post.save();
    res.status(200).json({ msg: "Post Added", addPost: Post });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});


PostRouter.get("/", async (req, res) => {
  try {
    const { depart, sortBy, SearchTerm, page, pageSize } = req.query;
    const query = {};

    if (depart) {
      query.depart = depart;
    }

    const sorting = {};
    if (sortBy) {
      sorting[sortBy] = 1;
    }
    const skip =
      (parseInt(page, 10) || 1 - 1) * (parseInt(pageSize, 10) || 10 - 10);

    if (SearchTerm) {
      query.$text = { $search: SearchTerm };
    }

    const Posts = await PostModel.find(query)
      .sort(sorting)
      .skip(skip)
      .limit(parseInt(pageSize, 10) || 10)
      .exec();
    res.status(400).json(Posts);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

PostRouter.patch("/update/:id", async (req, res) => {
  const { id } = req.params;
  try {
    let Post = await PostModel.findByIdAndUpdate({ _id: id }, req.body);
    res.status(200).json({ msg: "Post Updated" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

PostRouter.delete("/delete/:id", async (req, res) => {
    const { id } = req.params;
    try {
      let Post = await PostModel.findByIdAndDelete(id);
      res.status(200).json({ msg: "Post Deleted" });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  });


  module.exports= {PostRouter}
  
