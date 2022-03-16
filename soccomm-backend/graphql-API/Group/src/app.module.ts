import { ConfigModule, ConfigService } from "@nestjs/config";
import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { GroupModule } from "./group/group.module";
import { GroupUserModule } from "./group-user/group-user.module";
import { GroupPostsModule } from "./group-posts/group-posts.module";
import { TypeOrmModule } from "@nestjs/typeorm";
import { GraphQLFederationModule } from "@nestjs/graphql";
import { config } from "./config";
import { join } from "path";
import { AuthModule } from "./auth/auth.module";
import { User } from "./group-user/entities/user.entity";
import { Location } from "graphql";
import { ConnectionOptions } from "typeorm";

@Module({
  imports: [
    GroupModule,
    GroupUserModule,
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
    //     configService.get<ConnectionOptions>("database"),
    //   inject: [ConfigService],
    // }),
    GraphQLFederationModule.forRoot({
      autoSchemaFile: join(process.cwd(), "src/schema.gql"),
      buildSchemaOptions: {
        orphanedTypes: [User, Location],
      },
      context: ({ req }) => ({
        jwt: req.headers.authorization,
        user: req.user,
      }),
    }),
    GroupPostsModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
