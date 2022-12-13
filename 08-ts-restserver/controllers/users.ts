import { Request, Response } from "express";

const getUsers = (req: Request, res: Response) => {
    res.json({
        msg: "getUsers",
    });
};

const getUser = (req: Request, res: Response) => {
    const { id } = req.params;

    res.json({
        msg: "getUsers",
        id,
    });
};

const postUser = (req: Request, res: Response) => {
    const { body } = req;

    res.json({
        msg: "postUser",
        body,
    });
};

const putUser = (req: Request, res: Response) => {
    const { id } = req.params;
    const { body } = req;

    res.json({
        msg: "putUser",
        id,
        body,
    });
};

const deleteUser = (req: Request, res: Response) => {
    const { id } = req.params;

    res.json({
        msg: "deleteUser",
        id,
    });
};

export { getUsers, getUser, postUser, putUser, deleteUser };
