import express from "express"
import { additem, deleteitem, readitems } from "../controllers/post.js"

const router=express.Router()

router.post("/add",additem)
router.delete("/delete",deleteitem)
router.get("/read",readitems)

export default router