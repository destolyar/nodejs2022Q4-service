import { Module } from '@nestjs/common';
import { ArtistsController } from './artists.controller';
import { ArtistsService } from './artists.service';
import { Artists } from '../../db/entities/artists.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Tracks } from '../../db/entities/tracks.entity';
import { FavoriteTracks } from '../../db/entities/favoriteTracks.entity';
import { FavoriteArtists } from '../../db/entities/favoriteArtists.entity';


@Module({
  imports: [TypeOrmModule.forFeature([
    Artists,
    Tracks,
    FavoriteTracks,
    FavoriteArtists
  ])],
  controllers: [ArtistsController],
  providers: [ArtistsService]
})

export class ArtistsModule { }