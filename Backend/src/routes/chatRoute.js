import {protectRoute} from "../middleware/protectRoute.js"
import { Router } from "express";
import {getStreamToken} from "../controllers/chatController.js"

const router = Router();
router.get("/",(req,res)=>{
    return res.json("Hi chat!!")
})
router.get("/getToken", protectRoute, getStreamToken);

export default router;