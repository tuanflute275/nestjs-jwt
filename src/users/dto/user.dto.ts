import { Expose } from "class-transformer";
import { IsEmail, IsNotEmpty, Length, MinLength } from "class-validator";

export class UserDto {
    @IsNotEmpty()
    @MinLength(5)
    @Expose()
    name: string;

    @IsNotEmpty()
    @IsEmail()
    @Expose()
    email: string;

    @IsNotEmpty()
    @Length(3, 20)
    @Expose()
    password: string;
}
