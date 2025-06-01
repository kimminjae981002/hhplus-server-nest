import { Module } from "@nestjs/common";
import { DatabaseModule } from "./database/database.module";
import { AuthModule } from './auth/auth.module';
import { ConcertModule } from './concert/concert.module';

@Module({
  imports: [DatabaseModule, AuthModule, ConcertModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
