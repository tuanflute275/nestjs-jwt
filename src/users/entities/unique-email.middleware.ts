// unique-email.middleware.ts

import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { Repository } from 'typeorm';
import { UserEntity } from './user.entity';
import { InjectRepository } from '@nestjs/typeorm';


@Injectable()
export class UniqueEmailMiddleware implements NestMiddleware {

    constructor(
        @InjectRepository(UserEntity)
        private usersRepository: Repository<UserEntity>,
    ) {

    }

    async use(req: Request, res: Response, next: NextFunction) {
        const email = req.body.email; // Lấy email từ body của yêu cầu đăng ký.

        const user = await this.usersRepository.findOne({
            where: { email: email }
        });

        if (user) {
            return res
                .status(400)
                .json({ message: 'Email already exists in the system. Please use a different email address.' });
        }

        next();
    }
}
