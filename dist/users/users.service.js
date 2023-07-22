"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const user_entity_1 = require("./entities/user.entity");
const typeorm_2 = require("typeorm");
const user_dto_1 = require("./dto/user.dto");
const class_transformer_1 = require("class-transformer");
const bcrypt = require("bcrypt");
const jwt_1 = require("@nestjs/jwt");
require('dotenv').config();
let UsersService = exports.UsersService = class UsersService {
    constructor(jwtService, usersRepository) {
        this.jwtService = jwtService;
        this.usersRepository = usersRepository;
    }
    async register(data) {
        data.password = await bcrypt.hash(data.password, 10);
        let dataReal = (0, class_transformer_1.plainToInstance)(user_dto_1.UserDto, data, { excludeExtraneousValues: true });
        delete dataReal.password;
        return this.usersRepository.save(dataReal);
    }
    async login(data, response) {
        const user = await this.findUserWithEmail(data.email);
        if (!user) {
            throw new common_1.BadRequestException('invalid credentials');
        }
        if (!bcrypt.compare(data.password, user.password)) {
            throw new common_1.BadRequestException('invalid credentials');
        }
        const payload = { id: user.id, email: user.email };
        const jwt = await this.jwtService.sign(payload, { secret: process.env.SECRET });
        response.cookie('jwt', jwt, { httpOnly: true });
        return { message: 'login success' };
    }
    async logout(response) {
        response.clearCookie('jwt');
        return { message: 'logout success' };
    }
    async findAll(request) {
        try {
            const cookie = request.cookies['jwt'];
            const data = await this.jwtService.verifyAsync(cookie, { secret: process.env.SECRET });
            if (!data) {
                throw new common_1.UnauthorizedException();
            }
            const user = await this.findOneUser(data['id']);
            const { password, ...result } = user;
            return result;
        }
        catch (err) {
            throw new common_1.UnauthorizedException();
        }
    }
    async findOneUser(id) {
        const userId = this.usersRepository.findOne({
            where: { id: id }
        });
        if (userId == null) {
        }
        return (0, class_transformer_1.plainToInstance)(user_dto_1.UserDto, userId, { excludeExtraneousValues: true });
    }
    async findUserWithEmail(email) {
        return this.usersRepository.findOne({
            where: { email: email }
        });
    }
    async update(id, data) {
        await this.usersRepository.update(id, data);
        return { result: 'update success' };
    }
    async deleteById(id) {
        await this.usersRepository.softDelete(id);
        return { result: 'delete success' };
    }
};
exports.UsersService = UsersService = __decorate([
    (0, common_1.Injectable)(),
    __param(1, (0, typeorm_1.InjectRepository)(user_entity_1.UserEntity)),
    __metadata("design:paramtypes", [jwt_1.JwtService,
        typeorm_2.Repository])
], UsersService);
//# sourceMappingURL=users.service.js.map