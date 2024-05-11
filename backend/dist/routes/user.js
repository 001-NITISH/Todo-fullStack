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
const zod_1 = __importDefault(require("zod"));
const router = express_1.default.Router();
const signupBody = zod_1.default.object({
    username: zod_1.default.string().email(),
    firstName: zod_1.default.string(),
    lastName: zod_1.default.string(),
});
const signinBody = zod_1.default.object({
    username: zod_1.default.string().email(),
    password: zod_1.default.string(),
});
router.post('/signup', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { success } = signupBody.safeParse(req.body);
    if (!success) {
        return res.status(411).json({
            message: "Enter a valid email !",
        });
    }
    const existingUser = yield prisma.user.findUnique({
        where: {
            username: req.body.username
        }
    });
    if (existingUser) {
        return res.status(411).json({
            message: "username already exists! "
        });
    }
    const result = yield prisma.user.create({
        data: req.body,
        select: {
            id: true
        }
    });
    return res.json({
        id: result.id
    });
}));
router.post("/signin", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { success } = signinBody.safeParse(req.body);
    if (!success) {
        return res.status(411).json({
            message: "Incorrect username or password"
        });
    }
    const user = yield prisma.user.findUnique({
        where: {
            username: req.body.username,
            password: req.body.password
        },
        select: {
            id: true
        }
    });
    if (user) {
        return res.json({
            id: user.id
        });
    }
    res.status(411).json({
        message: "Error while loggin in"
    });
}));
exports.default = router;
