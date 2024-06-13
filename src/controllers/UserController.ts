import { Request, Response } from "express";
import UserDataBaseService from "../services/UserDataBaseService";
import { generateHash } from "../utils/BcriptUtils";

class UserController {
  constructor() {}

  async listUsers(req: Request, res: Response) {
    try {
      const users = await UserDataBaseService.listDBUsers();
      res.status(200).json({
        status: "ok",
        users: users,
      });
    } catch (error) {
      console.error("Error listing users:", error);
      res.status(500).json({
        status: "error",
        message: "Internal Server Error",
      });
    }
  }

  async createUser(req: Request, res: Response) {
    const { email, name, password } = req.body;

    if (!email || !name || !password) {
      return res.status(400).json({
        status: "error",
        message: "Missing parameters",
      });
    }

    try {
      const hashPassword = await generateHash(password);

      if (!hashPassword) {
        return res.status(500).json({
          status: "error",
          message: "Error encrypting password",
        });
      }

      const newUser = await UserDataBaseService.insertDBUser({
        name: name,
        email: email,
        password: hashPassword,
      });

      res.status(201).json({
        status: "ok",
        newUser: newUser,
      });
    } catch (error) {
      console.error("Error creating user:", error);
      res.status(500).json({
        status: "error",
        message: "Internal Server Error",
      });
    }
  }

  async updateUser(req: Request, res: Response) {
    const id = req.params.id;
    const { name, email } = req.body;

    if (!id) {
      return res.status(400).json({
        status: "error",
        message: "Missing ID",
      });
    }

    if (!email || !name) {
      return res.status(400).json({
        status: "error",
        message: "Missing parameters",
      });
    }

    try {
      const updatedUser = await UserDataBaseService.updateDBUser(
        { name: name, email: email },
        parseInt(id)
      );

      res.status(200).json({
        status: "ok",
        updatedUser: updatedUser,
      });
    } catch (error) {
      console.error("Error updating user:", error);
      res.status(500).json({
        status: "error",
        message: "Internal Server Error",
      });
    }
  }

  async deleteUser(req: Request, res: Response) {
    const id = req.params.id;

    if (!id) {
      return res.status(400).json({
        status: "error",
        message: "Missing ID",
      });
    }

    try {
      const response = await UserDataBaseService.deleteDBUser(parseInt(id));
      if (response) {
        res.status(200).json({
          status: "ok",
          message: "User deleted successfully",
        });
      } else {
        res.status(404).json({
          status: "error",
          message: "User not found",
        });
      }
    } catch (error) {
      console.error("Error deleting user:", error);
      res.status(500).json({
        status: "error",
        message: "Internal Server Error",
      });
    }
  }
}

export default new UserController();
