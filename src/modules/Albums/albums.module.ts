import { Module } from '@nestjs/common';
import { AlbumsController } from './albums.controller';
import { AlbumsService } from './albums.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Albums } from './albums.entity';
import { FavoriteAlbums } from '../Favorites/entity/favoriteAlbums.entity';
import { FavoriteTracks } from '../Favorites/entity/favoriteTracks.entity';
import { Tracks } from '../Tracks/tracks.entity';


@Module({
  imports: [TypeOrmModule.forFeature([
    Albums,
    FavoriteAlbums,
    Tracks,
    FavoriteTracks
  ])],
  controllers: [AlbumsController],
  providers: [AlbumsService]
})

export class AlbumsModule { }