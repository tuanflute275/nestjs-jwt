import { UserDto } from './dto/user.dto';
import { UsersService } from './users.service';
export declare class UsersController {
    private readonly userService;
    constructor(userService: UsersService);
    register(user: UserDto): Promise<UserDto>;
    login(user: any, response: Response): Promise<{
        message: string;
    }>;
    logout(response: Response): Promise<{
        message: string;
    }>;
    getAll(request: Request): Promise<{
        name: string;
        email: string;
    }>;
    getOne(id: number): Promise<UserDto>;
    update(id: number, userData: UserDto): Promise<{
        result: string;
    }>;
    deleteById(id: number): Promise<{
        result: string;
    }>;
}
