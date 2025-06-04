import { LoginUserDto } from "./dto/LoginUserDto";
import { UserService } from "./user.service";
import { Body, Controller, Post } from "@nestjs/common";

@Controller("user")
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post("login")
  async login(@Body() dto: LoginUserDto) {
    return await this.userService.login(dto);
  }
}
