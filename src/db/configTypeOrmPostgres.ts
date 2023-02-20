import { DataSource, DataSourceOptions } from 'typeorm';
import { User } from './entities/user.entity';
import { Tracks } from './entities/tracks.entity';
import { Artists } from './entities/artists.entity';
import { Albums } from './entities/albums.entity';
import { FavoriteAlbums } from './entities/favoriteAlbums.entity';
import { FavoriteTracks } from './entities/favoriteTracks.entity';
import { FavoriteArtists } from './entities/favoriteArtists.entity';
import 'dotenv/config'

const datasource = new DataSource({
  type: "postgres",
  host: process.env.POSTGRES_HOST,
  port: +process.env.POSTGRES_PORT,
  username: process.env.POSTGRES_USERNAME,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB,
  entities: [
    User,
    Tracks,
    Artists,
    Albums,
    FavoriteAlbums,
    FavoriteTracks,
    FavoriteArtists
  ],
  migrations: ["dist/db/migrations/*.js"],
  synchronize: false,
  migrationsRun: true,
})

datasource.initialize()
export default datasource
