"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const typeorm_1 = require("@nestjs/typeorm");
const users_module_1 = require("./users/users.module");
const user_entity_1 = require("./users/entities/user.entity");
const unique_email_middleware_1 = require("./users/entities/unique-email.middleware");
const jwt_1 = require("@nestjs/jwt");
let AppModule = exports.AppModule = class AppModule {
    configure(consumer) {
        consumer
            .apply(unique_email_middleware_1.UniqueEmailMiddleware)
            .forRoutes({ path: 'users', method: common_1.RequestMethod.POST });
    }
};
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forRoot({
                type: 'mysql',
                host: 'localhost',
                port: 3306,
                username: 'root',
                password: '',
                database: 'nestjs',
                entities: [user_entity_1.UserEntity],
                logger: 'debug',
                logging: 'all',
                synchronize: true,
            }),
            typeorm_1.TypeOrmModule.forFeature([user_entity_1.UserEntity]),
            jwt_1.JwtModule.register({
                global: true,
                secret: 'DO NOT USE THIS VALUE. INSTEAD, CREATE A COMPLEX SECRET AND KEEP IT SAFE OUTSIDE OF THE SOURCE CODE.',
                signOptions: { expiresIn: '20h' }
            }),
            users_module_1.UsersModule,
        ],
        controllers: [app_controller_1.AppController],
        providers: [app_service_1.AppService],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map