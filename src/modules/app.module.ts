import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { UsersModule } from './Users/users.module';
import { Tracks } from '../db/entities/tracks.entity';
import { User } from 'src/db/entities/user.entity';
import { Artists } from '../db/entities/artists.entity';
import { Albums } from '../db/entities/albums.entity';
import { TracksModule } from './Tracks/tracks.module';
import { FavoritesModule } from './Favorites/favorites.module';
import { ArtistsModule } from './Artists/artists.module';
import { AlbumsModule } from './Albums/albums.module';
import { FavoriteAlbums } from '../db/entities/favoriteAlbums.entity';
import { FavoriteTracks } from '../db/entities/favoriteTracks.entity';
import { FavoriteArtists } from '../db/entities/favoriteArtists.entity';
import 'dotenv/config'
import { dataSourceOptions } from 'src/configTypeOrmPostgres';


@Module({
  imports: [
    TypeOrmModule.forRoot(dataSourceOptions),
    UsersModule,
    TracksModule,
    FavoritesModule,
    ArtistsModule,
    AlbumsModule
  ],
})


export class AppModule {
  constructor(private dataSource: DataSource) { }
}