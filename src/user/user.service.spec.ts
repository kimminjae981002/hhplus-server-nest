import { Test, TestingModule } from "@nestjs/testing";
import { UserService } from "./user.service";
import { getRepositoryToken } from "@nestjs/typeorm";
import { User } from "./entity/user.entity";
import { JwtService } from "@nestjs/jwt";

// mock 함수 정의
const mockUserRepository = {
  findOne: jest.fn(),
};

const mockJwtService = {
  sign: jest.fn(),
};

describe("UserService", () => {
  let service: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: getRepositoryToken(User),
          useValue: mockUserRepository,
        },
        {
          provide: JwtService,
          useValue: mockJwtService,
        },
      ],
    }).compile();

    service = module.get<UserService>(UserService);
  });

  it("service가 존재하는 지", () => {
    expect(service).toBeDefined();
  });

  describe("login", () => {
    it("login가 존재하는 지", () => {
      expect(service.login).toBeDefined();
    });

    it("존재하지 않는 유저 찾을 시 에러", async () => {
      mockUserRepository.findOne.mockResolvedValueOnce(null);

      const dto = { email: "test@test.com", password: "test" };

      await expect(service.login(dto)).rejects.toThrow(
        "유저가 존재하지 않습니다."
      );
    });

    it("존재하는 유저 로그인 성공 시 토큰 반환", async () => {
      const user = {
        email: "test@test.com",
        password: "test",
      };

      // mock을 이용하여 user 있음을 명시
      mockUserRepository.findOne.mockResolvedValue(user);

      // mock을 이용하여 token 생성
      mockJwtService.sign.mockReturnValue("mockAccessToken");

      const dto = {
        email: "test@test.com",
        password: "test",
      };

      // 실제 서비스 로직
      const result = await service.login(dto);

      // 실제 서비스 로직 반환값과 같는지
      expect(result).toEqual({
        result: "success",
        token: "mockAccessToken",
      });
    });
  });
});
