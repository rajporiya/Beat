import { Router } from "express";

const router = Router()

router.get('/' , (req,res)=>{
    res.send('Album route with Start')
})

export default router