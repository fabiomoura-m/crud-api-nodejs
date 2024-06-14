import { User } from "../../models/user"
import { HttpResponse } from "../protocols"

export interface IDeleteUserController {
    handle(): Promise<void>
}

export interface IDeleteUserRepository {
    deleteUser(id: string): Promise<User>
}