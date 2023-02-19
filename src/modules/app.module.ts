import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { User } from 'src/modules/Users/user.entity';
import { UsersModule } from './Users/users.module';
import { Tracks } from './Tracks/tracks.entity';
import { Artists } from './Artists/artists.entity';
import { Albums } from './Albums/albums.entity';
import { TracksModule } from './Tracks/tracks.module';
import { FavoritesModule } from './Favorites/favorites.module';
import { ArtistsModule } from './Artists/artists.module';
import { AlbumsModule } from './Albums/albums.module';
import { FavoriteAlbums } from './Favorites/entity/favoriteAlbums.entity';
import { FavoriteTracks } from './Favorites/entity/favoriteTracks.entity';
import { FavoriteArtists } from './Favorites/entity/favoriteArtists.entity';


@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: '1234',
      database: 'postgres',
      entities: [
        User,
        Tracks,
        Artists,
        Albums,
        FavoriteAlbums,
        FavoriteTracks,
        FavoriteArtists
      ],
      synchronize: true
    }),
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