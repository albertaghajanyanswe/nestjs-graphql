import { UsersRoleType } from "../enum/users.role.type";
export declare class EditUserInput {
    id?: number;
    firstName?: string;
    lastName: string;
    email: string;
    username: string;
    role?: UsersRoleType;
    password: string;
}
