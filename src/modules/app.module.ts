import { Module } from '@nestjs/common';
import { AlbumsService } from './Albums/albums.service';
import { AlbumsController } from './Albums/albums.controller';
import { ArtistsController } from './Artists/artists.controller';
import { FavoritesController } from './Favorites/favorites.controller';
import { TracksController } from './Tracks/tracks.controller';
import { UsersController } from './Users/users.controller';
import { ArtistsService } from './Artists/artists.service';
import { FavoritesService } from './Favorites/favorites.service';
import { TracksService } from './Tracks/tracks.service';
import { UsersService } from './Users/users.service';

@Module({
  imports: [],
  controllers: [AlbumsController, ArtistsController, FavoritesController, TracksController, UsersController],
  providers: [AlbumsService, ArtistsService, FavoritesService, TracksService, UsersService],
})
export class AppModule {}