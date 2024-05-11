import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
import express , { Router } from 'express';
const router:Router = express.Router();
import zod from 'zod';

const todoBody = zod.object({
    title: zod.string(),
    description: zod.string(),
    userId: zod.number()
})

const updateBody = zod.object({
    id: zod.number(),
    userId: zod.number(),
    done: zod.boolean()
})

router.post('/add', async(req, res) => {
    const {success} = todoBody.safeParse(req.body);
    if(!success) {
        return res.status(411).json({
            message: "Enter valid credentials"
        })
    }

    const existingUser = await prisma.user.findUnique({
        where:{
            id: req.body.userId
        }
    })

    if(!existingUser){
        return res.status(411).json({
            message: "user not found! "
        })
    }

    const result = await prisma.todo.create({
        data: req.body,
    })

    return res.json({
        message: "Todo added successfully! "
    })

})

router.put('/update', async(req,res)=>{
    const {success} = updateBody.safeParse(req.body);
    if(!success){
        return res.status(411).json({
            message: "Enter valid credentials"
        })
    }

    const updater = await prisma.todo.update({
        where: {
            id: req.body.id,
            userId:req.body.userId
        },
        data: {
            done: req.body.done
        }
    })

    res.json({
        message: "Todo updated!"
    })
})

router.get("/get", async(req,res) =>{
    const result = await prisma.todo.findMany({
        where:{
            userId: req.body.userId
        },
        select:{
            title: true,
            description: true,
            done: true
        }
    })
    if(result.length <= 0){
        return res.status(411).json({
            message: "Todos not found"
        })
    }
    return res.status(200).json(result) 
})

router.put("/delete", async(req, res) =>{
    const result = await prisma.todo.delete({
        where:{
            id: req.body.id
        }
    })

    if(!result){
        return res.status(411).json({
            message: "Invalid todo"
        })
    }

    return res.status(200).json({
        message: "todo deleted"
    })
})

export default router;