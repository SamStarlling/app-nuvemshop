import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CredentialsEntity } from './modules/entities/credentials.entity';

@Module({
  imports: [
    HttpModule,
    TypeOrmModule.forFeature([CredentialsEntity]),
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: () => {
        return {
          type: 'sqlite',
          database: 'sqlite.db',
          synchronize: true,
          entities: [CredentialsEntity],
        };
      },
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
