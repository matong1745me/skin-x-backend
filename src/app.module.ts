import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import dbConfig from '@/database/db.config';

import { AppController } from '@/app.controller';
import { AppService } from '@/app.service';

import { UsersModule } from '@/modules/users/users.module';
import { AuthModule } from '@/modules/auth/auth.module';

@Module({
  imports: [TypeOrmModule.forRoot(dbConfig), UsersModule, AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
