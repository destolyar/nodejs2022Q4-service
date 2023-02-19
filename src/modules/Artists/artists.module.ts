import { Module } from '@nestjs/common';
import { ArtistsController } from './artists.controller';
import { ArtistsService } from './artists.service';
import { Artists } from './artists.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Tracks } from '../Tracks/tracks.entity';
import { FavoriteTracks } from '../Favorites/entity/favoriteTracks.entity';
import { FavoriteArtists } from '../Favorites/entity/favoriteArtists.entity';


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