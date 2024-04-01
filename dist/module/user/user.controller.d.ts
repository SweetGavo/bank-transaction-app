import { UserService } from './user.service';
export declare class UserController {
    private readonly userservice;
    constructor(userservice: UserService);
    getUsers(): string;
}
