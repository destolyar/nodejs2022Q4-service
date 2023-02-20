import { Module } from '@nestjs/common';
import { AlbumsController } from './albums.controller';
import { AlbumsService } from './albums.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Albums } from '../../db/entities/albums.entity';
import { FavoriteAlbums } from '../../db/entities/favoriteAlbums.entity';
import { FavoriteTracks } from '../../db/entities/favoriteTracks.entity';
import { Tracks } from '../../db/entities/tracks.entity';


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