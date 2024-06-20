import express from 'express';
import { config } from 'dotenv';
import { GetUsersController } from './controllers/get-users/get-users';
import { MongoGetUsersRepository } from './repositories/get-users/mongo-get-users';
import { MongoClient } from './database/mongo';
import { MongoCreateUserRepository } from './repositories/create-user/mongo-create-user';
import { CreateUserController } from './controllers/create-user/create-user';
import { UpdateUserController } from './controllers/update-user/update-user';
import { MongoUpdateUserRepository } from './repositories/update-user/mongo-update-user';
import { MongoDeleteUserRepository } from './repositories/delete-user/mongo-delete-user';
import { DeleteUserController } from './controllers/delete-user/delete-user';
import { MongoGetUserRepository } from './repositories/get-user/mongo-get-user';
import { GetUserController } from './controllers/get-user/get-user';

const main = async () => {
    config();

    const app = express();

    app.use(express.json());

    await MongoClient.connect();

    app.get('/users', async (req, res) => {
        const mongoGetUsersRepository = new MongoGetUsersRepository();
        const getUsersController = new GetUsersController(
            mongoGetUsersRepository
        );

        const { body, statusCode } = await getUsersController.handle();

        res.status(statusCode).send(body);
    });

    app.get('/users/:id', async (req, res) => {
        const mongoGetUserRepository = new MongoGetUserRepository();
        const getUserController = new GetUserController(mongoGetUserRepository);

        const { statusCode, body } = await getUserController.handle({
            params: req.params
        });

        res.status(statusCode).send(body);
    });

    app.post('/users', async (req, res) => {
        const mongoCreateUserRepository = new MongoCreateUserRepository();
        const createUserController = new CreateUserController(
            mongoCreateUserRepository
        );

        const { body, statusCode } = await createUserController.handle({
            body: req.body
        });

        res.status(statusCode).send(body);
    });

    app.put('/users/:id', async (req, res) => {
        const mongoUpdateUserRepository = new MongoUpdateUserRepository();
        const updateUserController = new UpdateUserController(
            mongoUpdateUserRepository
        );

        const { statusCode, body } = await updateUserController.handle({
            params: req.params,
            body: req.body
        });

        res.status(statusCode).send(body);
    });

    app.delete('/users/:id', async (req, res) => {
        const mongoDeleteUserRepository = new MongoDeleteUserRepository();
        const deleteUserController = new DeleteUserController(
            mongoDeleteUserRepository
        );

        const { statusCode, body } = await deleteUserController.handle({
            params: req.params
        });

        res.status(statusCode).send(body);
    });

    const port = process.env.PORT || 8000;

    app.listen(port, () => console.log(`Listening on port ${port}!`));
};

main();
