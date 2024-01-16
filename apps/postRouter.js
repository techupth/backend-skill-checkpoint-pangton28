import { Router } from "express";
import { db } from "../utils/db.js";
import { ObjectId } from "mongodb";

const postRouter = Router();
const collection = db.collection("softwareRequirements");

postRouter.post("/", async (req, res) => {
  try {
    const postData = { ...req.body, created_at: new Date() };
    await collection.insertOne(postData);
    return res.json({
      message: "Post has been created successfully",
    });
  } catch (error) {
    return res.json({
      message: `${error}`,
    });
  }
});

postRouter.get("/", async (req, res) => {
  try {
    const posts = await collection.find({}).limit(10).toArray();
    return res.json({ data: posts });
  } catch (error) {
    return res.json({
      message: `${error}`,
    });
  }
});

postRouter.get("/:postId", async (req, res) => {
  try {
    const postId = new ObjectId(req.params.postId);
    const post = await collection.findOne({ _id: postId });
    return res.json({ data: post });
  } catch (error) {
    return res.json({
      message: `${error}`,
    });
  }
});

postRouter.put("/:postId", async (req, res) => {
  try {
    const postId = new ObjectId(req.params.postId);
    const newPost = { ...req.body, modified_at: new Date() };
    await collection.updateOne(
      {
        _id: postId,
      },
      {
        $set: newPost,
      }
    );
    return res.json({
      message: "Post has been updated successfully",
    });
  } catch (error) {
    return res.json({
      message: `${error}`,
    });
  }
});

postRouter.delete("/:postId", async (req, res) => {
  try {
    const postId = new ObjectId(req.params.postId);
    await collection.deleteOne({ _id: postId });
    return res.json({
      message: "Post has been deleted successfully",
    });
  } catch (error) {
    return res.json({
      message: `${error}`,
    });
  }
});

export default postRouter;
