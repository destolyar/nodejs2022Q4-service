import { Module } from '@nestjs/common';
import { TracksController } from './tracks.controller';
import { TracksService } from './tracks.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Tracks } from './tracks.entity';
import { FavoriteTracks } from '../Favorites/entity/favoriteTracks.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Tracks, FavoriteTracks])],
  controllers: [TracksController],
  providers: [TracksService]
})

export class TracksModule { }