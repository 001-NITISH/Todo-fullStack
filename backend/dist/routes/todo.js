"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const zod_1 = __importDefault(require("zod"));
const todoBody = zod_1.default.object({
    title: zod_1.default.string(),
    description: zod_1.default.string(),
    userId: zod_1.default.number()
});
const updateBody = zod_1.default.object({
    id: zod_1.default.number(),
    userId: zod_1.default.number(),
    done: zod_1.default.boolean()
});
router.post('/add', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { success } = todoBody.safeParse(req.body);
    if (!success) {
        return res.status(411).json({
            message: "Enter valid credentials"
        });
    }
    const existingUser = yield prisma.user.findUnique({
        where: {
            id: req.body.userId
        }
    });
    if (!existingUser) {
        return res.status(411).json({
            message: "user not found! "
        });
    }
    const result = yield prisma.todo.create({
        data: req.body,
    });
    return res.json({
        message: "Todo added successfully! "
    });
}));
router.put('/update', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { success } = updateBody.safeParse(req.body);
    if (!success) {
        return res.status(411).json({
            message: "Enter valid credentials"
        });
    }
    const updater = yield prisma.todo.update({
        where: {
            id: req.body.id,
            userId: req.body.userId
        },
        data: {
            done: req.body.done
        }
    });
    res.json({
        message: "Todo updated!"
    });
}));
router.get("/get", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma.todo.findMany({
        where: {
            userId: req.body.userId
        },
        select: {
            title: true,
            description: true,
            done: true
        }
    });
    if (result.length <= 0) {
        return res.status(411).json({
            message: "Todos not found"
        });
    }
    return res.status(200).json(result);
}));
router.put("/delete", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma.todo.delete({
        where: {
            id: req.body.id
        }
    });
    if (!result) {
        return res.status(411).json({
            message: "Invalid todo"
        });
    }
    return res.status(200).json({
        message: "todo deleted"
    });
}));
exports.default = router;
