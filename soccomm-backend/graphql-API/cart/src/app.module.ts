import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { GraphQLFederationModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';
import { ConnectionOptions } from 'typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { CartModule } from './cart/cart.module';
import { Post } from './cart/entities/post.entity';
import { User } from './cart/entities/user.entity';
import { config } from './config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [config],
    }),
      TypeOrmModule.forRoot({
      url: process.env.DATABASE_URL,
      type: "postgres",
      ssl: {
        rejectUnauthorized: false,
      },
      entities: ["dist/**/*.entity{.ts,.js}"],
      synchronize: true, // This for development
      autoLoadEntities: true,
    }),
    // TypeOrmModule.forRootAsync({
    //   imports: [ConfigModule],
    //   useFactory: (configService: ConfigService) =>
    //     configService.get<ConnectionOptions>('database'),
    //   inject: [ConfigService],
    // }),
    GraphQLFederationModule.forRoot({
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      buildSchemaOptions: {
        orphanedTypes: [User, Post],
      },
      context: ({ req }) => ({
        jwt: `bearer ${req.cookies['jwt']}`,
        user: req.user,
      }),
    }),
    AuthModule,
    CartModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
