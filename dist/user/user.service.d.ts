import { User } from "./entity/user.entity";
import { Repository } from "typeorm";
import { CreateUserDto } from "./dto/CreateUserDto";
import { JwtService } from "@nestjs/jwt";
export declare class UserService {
    private readonly userRepository;
    private readonly jwtService;
    constructor(userRepository: Repository<User>, jwtService: JwtService);
    login(dto: CreateUserDto): Promise<void>;
}
