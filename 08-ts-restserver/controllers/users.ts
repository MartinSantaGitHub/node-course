import { Request, Response } from "express";
import dotenv from "dotenv";
import User from "../models/user";

dotenv.config();

const getUsers = async (req: Request, res: Response) => {
    const users = await User.findAll();

    res.json({
        users,
    });
};

const getUser = async (req: Request, res: Response) => {
    const { id } = req.params;
    const user = await User.findByPk(id);

    if (!user) {
        return res.status(404).json({
            msg: `User with id ${id} does not exist`,
        });
    }

    res.json({
        user,
    });
};

const postUser = async (req: Request, res: Response) => {
    const { body } = req;

    try {
        const isEmail = await User.findOne({
            where: {
                email: body.email,
            },
        });

        if (isEmail) {
            return res.status(400).json({
                msg: `The email (${body.email}) already exists`,
            });
        }

        const user = User.build(body);

        await user.save();
    } catch (error) {
        console.log(error);

        return res.status(500).json({
            msg: "Conctact the Admin for further help",
        });
    }

    res.status(201).json({
        msg: "postUser",
        body,
    });
};

const putUser = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { body } = req;

    try {
        const user = await User.findByPk(id);

        if (!user) {
            return res.status(404).json({
                msg: `User with id '${id}' does not exist`,
            });
        }

        await user.update({
            name: body.name,
        });

        res.json(user);
    } catch (error) {
        console.log(error);

        res.status(500).json({
            msg: "Conctact the Admin for further help",
        });
    }
};

const deleteUser = async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
        const user = await User.findByPk(id);

        if (!user) {
            return res.status(404).json({
                msg: `User with id '${id}' does not exist`,
            });
        }

        if (process.env.DELETE_LOGIC === "LOGICAL") {
            await user.update({ status: false });
        } else {
            await user.destroy();
        }

        res.json({
            msg: "User deleted",
            userInfo: user,
        });
    } catch (error) {
        console.log(error);

        res.status(500).json({
            msg: "Conctact the Admin for further help",
        });
    }
};

export { getUsers, getUser, postUser, putUser, deleteUser };
