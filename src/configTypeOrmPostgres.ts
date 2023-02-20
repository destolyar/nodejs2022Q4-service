import { DataSource, DataSourceOptions } from 'typeorm';

import 'dotenv/config'
import { Tracks } from './db/entities/tracks.entity';
import { User } from './db/entities/user.entity';
import { Artists } from './db/entities/artists.entity';
import { Albums } from './db/entities/albums.entity';
import { FavoriteAlbums } from './db/entities/favoriteAlbums.entity';
import { FavoriteArtists } from './db/entities/favoriteArtists.entity';
import { FavoriteTracks } from './db/entities/favoriteTracks.entity';

export const dataSourceOptions: DataSourceOptions = {
  type: "postgres",
  host: process.env.POSTGRES_HOST,
  port: +process.env.POSTGRES_PORT,
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB,
  migrations: ['dist/migrations/*.js'],
  entities: [Tracks, User, Artists, Albums, FavoriteAlbums, FavoriteArtists, FavoriteTracks],
  synchronize: false,
  migrationsRun: true,
}


export default new DataSource(dataSourceOptions)
