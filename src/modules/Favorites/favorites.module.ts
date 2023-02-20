import { Module } from '@nestjs/common';
import { FavoritesController } from './favorites.controller';
import { FavoritesService } from './favorites.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FavoriteAlbums } from '../../db/entities/favoriteAlbums.entity';
import { FavoriteArtists } from '../../db/entities/favoriteArtists.entity';
import { FavoriteTracks } from '../../db/entities/favoriteTracks.entity';
import { Tracks } from '../../db/entities/tracks.entity';
import { Albums } from '../../db/entities/albums.entity';
import { Artists } from '../../db/entities/artists.entity';

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