import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient()
import express , { Router } from 'express'
import zod from 'zod'
const router:Router = express.Router();

const signupBody = zod.object({
    username: zod.string().email(),
    firstName: zod.string(),
    lastName: zod.string(),
})

const signinBody = zod.object({
    username: zod.string().email(),
    password: zod.string(),
    
})

router.post('/getuser', async(req,res) =>{
    const result = await prisma.user.findUnique({
        where:{
            id: req.body.id
        },
        select:{
            firstName: true
        }
    })
    return res.status(200).json({
        "firstName": result?.firstName
    })
})

router.post('/signup', async(req,res) => {
    const {success} = signupBody.safeParse(req.body);
    if(!success){
        return res.status(411).json({
            message: "Enter a valid email !",
        });
    }
    const existingUser = await prisma.user.findUnique({
        where:{
            username: req.body.username
        }
    })
    if(existingUser){
        return res.status(411).json({
            message: "username already exists! "
        })
    }

    const result = await prisma.user.create({
        data:req.body,
        select: {
            id: true
        }
    })

    return res.json({
        id: result.id
    })
})  

router.post("/signin", async(req,res)=>{
    const { success } = signinBody.safeParse(req.body);
    if(!success) {
        return res.status(411).json({
            message: "Incorrect username or password"
        });
    }
    const user = await prisma.user.findUnique({
        where:{
            username : req.body.username,
            password: req.body.password
        },
        select:{
            id: true
        }
    })
    if(user) {
        return res.json({
            id: user.id
        })
    }

    res.status(411).json({
        message: "Error while loggin in"
    })
})


export default router;