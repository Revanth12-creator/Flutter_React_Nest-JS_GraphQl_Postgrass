import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ApplicationratingResolver } from './applicationrating.resolver';
import { ApplicationratingService } from './applicationrating.service';
import { Applicationrating } from './entities/applicationrating.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Applicationrating])],
  providers: [ApplicationratingResolver, ApplicationratingService],
  exports: [ApplicationratingService],
})
export class ApplicationratingModule {}
