import { RemoteGraphQLDataSource } from '@apollo/gateway';
import { Module } from '@nestjs/common';
import { GATEWAY_BUILD_SERVICE, GraphQLGatewayModule } from '@nestjs/graphql';
import FileUploadDataSource from '@profusion/apollo-federation-upload';
import { ApolloServerPluginLandingPageGraphQLPlayground } from 'apollo-server-core';
import { AppController } from './app.controller';
import { AppService } from './app.service';

class AuthenticatedDataSource extends RemoteGraphQLDataSource {
  async willSendRequest({ request, context }) {
    console.log('bearer ' + context.jwt);

    request.http.headers.set('Authorization', context.jwt);
  }
}
@Module({
  providers: [
    {
      provide: AuthenticatedDataSource,
      useValue: AuthenticatedDataSource,
    },
    {
      provide: GATEWAY_BUILD_SERVICE,
      useFactory: (AuthenticatedDataSource) => {
        return ({ name, url }) => new AuthenticatedDataSource({ url });
      },
      inject: [AuthenticatedDataSource],
    },
  ],
  exports: [GATEWAY_BUILD_SERVICE],
})
class BuildServiceModule {}
@Module({
  imports: [
    GraphQLGatewayModule.forRootAsync({
      useFactory: async () => ({
        gateway: {
          serviceList: [
            // { name: 'user', url: 'http://auth-microservice:5001/graphql' },
            // { name: 'group', url: 'http://group-microservice:5002/graphql' },
            // {
            //   name: 'proadmin',
            //   url: 'http://proadmin-microservice:5003/graphql',
            // },
            // {
            //   name: 'informational',
            //   url: 'http://informational-microservice:5004/graphql',
            // },
            // {
            //   name: 'notification',
            //   url: 'http://notification-microservice:5005/graphql',
            // },
            // { name: 'cart', url: 'http://cart-microservice:5007/graphql' },
            // { name: 'media', url: 'http://media-microservice:5008/graphql' },
            // { name: 'rating', url: 'http://rating-microservice:5009/graphql' },
            // { name: 'order', url: 'http://cart-microservice:5010/graphql' },

            { name: 'user', url: 'http://localhost:5001/graphql' },
            { name: 'group', url: 'http://localhost:5002/graphql' },
            { name: 'proadmin', url: 'http://localhost:5003/graphql' },
            { name: 'informational', url: 'http://localhost:5004/graphql' },
            // { name: 'notification', url: 'http://localhost:5005/graphql' },
            // { name: 'product', url: 'http://localhost:5006/graphql' },
            //  { name: 'cart', url: 'http://localhost:5007/graphql' },
            { name: 'media', url: 'http://localhost:5008/graphql' },
            // { name: 'rating', url: 'http://localhost:5009/graphql' },
            // { name: 'order', url: 'http://localhost:5010/graphql' },
          ],
        },
        subscriptions: false,

        //buildService: ({ url }) => new FileUploadDataSource({ url }),
        server: {
          context: ({ req }) => ({
            jwt: req.headers.authorization,
          }),
          //plugins: [ApolloServerPluginLandingPageGraphQLPlayground({})],
          cors: true,
        },
      }),
      imports: [BuildServiceModule],
      inject: [GATEWAY_BUILD_SERVICE],
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
