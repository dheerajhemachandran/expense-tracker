import express from "express"
import cors from "cors"
import authRouter from "./route/auth.js"
import postRouter from "./route/post.js"

const app = express();
app.use(express.json())
app.use(cors());
const port = 5000;

app.use("/auth",authRouter)
app.use("/post",postRouter)


app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});
