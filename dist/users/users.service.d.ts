import { UserEntity } from './entities/user.entity';
import { Repository } from 'typeorm';
import { UserDto } from './dto/user.dto';
import { JwtService } from '@nestjs/jwt';
export declare class UsersService {
    private jwtService;
    private usersRepository;
    constructor(jwtService: JwtService, usersRepository: Repository<UserEntity>);
    register(data: UserDto): Promise<UserDto>;
    login(data: any, response: any): Promise<{
        message: string;
    }>;
    logout(response: any): Promise<{
        message: string;
    }>;
    findAll(request: any): Promise<{
        name: string;
        email: string;
    }>;
    findOneUser(id: number): Promise<UserDto>;
    findUserWithEmail(email: string): Promise<UserEntity>;
    update(id: number, data: UserDto): Promise<{
        result: string;
    }>;
    deleteById(id: number): Promise<{
        result: string;
    }>;
}
