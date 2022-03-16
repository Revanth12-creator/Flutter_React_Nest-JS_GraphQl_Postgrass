import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { GraphQLFederationModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';
import { ConnectionOptions } from 'typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ApplicationratingModule } from './applicationrating/applicationrating.module';
import { AuthModule } from './auth/auth.module';
import { config } from './config';
import { User } from './rating/entities/user.entity';
import { Post } from './rating/entities/post.entity';
import { RatingModule } from './rating/rating.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [config],
    }),
    TypeOrmModule.forRoot({
      url: process.env.DATABASE_URL,
      type: 'postgres',
      ssl: {
        rejectUnauthorized: false,
      },
      entities: ['dist/**/*.entity{.ts,.js}'],
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
        jwt: req.headers.authorization,
        user: req.user,
      }),
    }),
    AuthModule,
    RatingModule,
    ApplicationratingModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
