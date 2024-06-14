import { User } from '../../models/user';
import { HttpResponse } from '../protocols';

export interface UpdateUserParams {
    firstName?: string;
    lastName?: string;
    password?: string
}

export interface IUpdateUserController {
    handle(): Promise<HttpResponse<User>>;
}

export interface IUpdateUserRepository {
    updateUser(id:string, params: UpdateUserParams): Promise<User>;
}
