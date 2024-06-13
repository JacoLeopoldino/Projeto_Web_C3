import { Request, Response } from "express";
import AuthService from "../services/AuthService";
import { generateHash } from "../utils/BcriptUtils";
import { Prisma } from "@prisma/client";

class AuthController {
    constructor() { }

    async signUp(req: Request, res: Response) {
        const body = req.body;
        console.log(body);

        if (!body.email || !body.name || !body.password) {
            res.json({
                status: "error",
                message: "Falta parâmetros",
            });
            return;
        }

        try {
            const hashPassword = await generateHash(body.password);

            if (!hashPassword) {
                res.json({
                    status: "error",
                    message: "Erro ao criptografar senha ...",
                });
                return;
            }

            const userCreateInput: Prisma.UserCreateInput = {
                name: body.name,
                email: body.email,
                password: hashPassword, // Incluímos `password` aqui
            };

            const newuser = await AuthService.signUp(userCreateInput);

            if (newuser) {
                res.json({
                    status: "ok",
                    newuser: newuser,
                });
            } else {
                res.json({
                    status: "error",
                    message: "Erro ao criar usuário",
                });
            }
        } catch (error) {
            let errorMessage = "Erro desconhecido";
            if (error instanceof Error) {
                errorMessage = error.message;
            }
            res.json({
                status: "error",
                message: errorMessage,
            });
        }
    }

    async signIn() {
        // Implementação do método signIn
    }

    async signOut() {
        // Implementação do método signOut
    }
}

export default AuthController;
