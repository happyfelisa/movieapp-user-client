import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ClientProxyFactory, Transport } from '@nestjs/microservices';

@Module({
  imports: [ConfigModule.forRoot()],
  controllers: [AppController],
  providers: [
    {
      provide: 'USER_SERVICE',
      inject: [ConfigService],
      useFactory: () => {
        return ClientProxyFactory.create({
          transport: Transport.TCP,
          options: {
            host: 'localhost' /*configService.get('')*/,
            port: 3000 /*configService.get('')*/,
          },
        });
      },
    },
  ],
})
export class AppModule {}
