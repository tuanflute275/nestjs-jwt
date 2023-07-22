import { NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { Repository } from 'typeorm';
import { UserEntity } from './user.entity';
export declare class UniqueEmailMiddleware implements NestMiddleware {
    private usersRepository;
    constructor(usersRepository: Repository<UserEntity>);
    use(req: Request, res: Response, next: NextFunction): Promise<Response<any, Record<string, any>>>;
}
