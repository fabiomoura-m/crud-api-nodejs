import { IGetUsersRepository } from '../../controllers/get-users/protocols';
import { User } from '../../models/user';

export class MongoGetUsersRepository implements IGetUsersRepository {
    async getUsers(): Promise<User[]> {
        return [
            {
                firstName: 'Fabio',
                lastName: 'Moura',
                email: 'fabio.mmouras@hotmail.com',
                password: '1234'
            }
        ];
    }
}
