import { Column } from "typeorm";

export class LoginUserDto {
  @Column()
  email: string;

  @Column()
  password: string;
}
