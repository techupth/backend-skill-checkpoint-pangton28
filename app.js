import express from "express";
import cors from "cors";
import postRouter from "./apps/postRouter.js";
import { client } from "./utils/db.js";

async function init() {
  const app = express();
  const port = 4000;
  
  await client.connect();
  
  app.use(cors());

  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  app.use("/post", postRouter);

  app.get("/", (req, res) => {
    res.send("Hello World!");
  });

  app.listen(port, () => {
    console.log(`Server is running at port ${port}`);
  });
}

init();