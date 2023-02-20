import { Module } from '@nestjs/common';
import { TracksController } from './tracks.controller';
import { TracksService } from './tracks.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Tracks } from '../../db/entities/tracks.entity';
import { FavoriteTracks } from '../../db/entities/favoriteTracks.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Tracks, FavoriteTracks])],
  controllers: [TracksController],
  providers: [TracksService]
})

export class TracksModule { }