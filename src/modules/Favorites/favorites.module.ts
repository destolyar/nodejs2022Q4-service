import { Module } from '@nestjs/common';
import { FavoritesController } from './favorites.controller';
import { FavoritesService } from './favorites.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FavoriteAlbums } from './entity/favoriteAlbums.entity';
import { FavoriteArtists } from './entity/favoriteArtists.entity';
import { FavoriteTracks } from './entity/favoriteTracks.entity';
import { Tracks } from '../Tracks/tracks.entity';
import { Albums } from '../Albums/albums.entity';
import { Artists } from '../Artists/artists.entity';

@Module({
  imports: [TypeOrmModule.forFeature([
    FavoriteAlbums,
    FavoriteArtists,
    FavoriteTracks,
    Tracks,
    Albums,
    Artists
  ])],
  controllers: [FavoritesController],
  providers: [FavoritesService]
})

export class FavoritesModule { }