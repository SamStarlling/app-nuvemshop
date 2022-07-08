import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CredentialsEntity } from './modules/entities/credentials.entity';
import { ProductsModule } from './modules/products/products.module';

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
          database: 'credentials.db',
          synchronize: true,
          entities: [CredentialsEntity],
        };
      },
    }),
    ProductsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
