import { BadRequestException, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "./entity/user.entity";
import { Repository } from "typeorm";
import { LoginUserDto } from "./dto/LoginUserDto";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly jwtService: JwtService
  ) {}

  // 유저 로그인
  async login(dto: LoginUserDto) {
    const user = await this.userRepository.findOne({
      where: { email: dto.email },
    });

    if (!user) {
      throw new BadRequestException("유저가 존재하지 않습니다.");
    }

    const payload = {
      email: user.email,
    };

    const accessToken = this.jwtService.sign(payload, {
      expiresIn: "1d",
    });

    return {
      result: "success",
      token: accessToken,
    };
  }
}
