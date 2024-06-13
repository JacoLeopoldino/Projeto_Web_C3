/*import { Prisma, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

class AuthService {
    constructor() {

    }

    async signIn() {

    }

    async signUp(user: Prisma.UserCreateInput) {
        try {
            const newuser = await prisma.user.create({
                data: user,
            });
            return newuser;
        } catch (error) {
            console.log(error);
            return null;
        }
    }

    async signOut() {

    }
}

export default new AuthService();*/

import { Prisma, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

class AuthService {
    constructor() { }

    async signIn() {
        // Implementação do método signIn
    }

    async signUp(user: Prisma.UserCreateInput) {
        try {
            const newuser = await prisma.user.create({
                data: user,
            });
            return newuser;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    async signOut() {
        // Implementação do método signOut
    }
}

export default new AuthService();
