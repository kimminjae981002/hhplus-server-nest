import { Module } from "@nestjs/common";
import { DatabaseModule } from "./database/database.module";
import { AuthModule } from './auth/auth.module';
import { ConcertModule } from './concert/concert.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [DatabaseModule, AuthModule, ConcertModule, UserModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
