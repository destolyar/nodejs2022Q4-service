import { FavoritesService } from './favorites.service';
import { Controller, Delete, Get, HttpCode, HttpException, HttpStatus, Param, Post, Res } from '@nestjs/common';
import { Response } from 'express';
import { validate as uuidValidate } from 'uuid'

@Controller('favs')
export class FavoritesController {
  constructor(private readonly favoritesService: FavoritesService) { }

  @Get('/')
  getFavs(@Res() response: Response) {
    const favorites = this.favoritesService.getFavs()
    response.json(favorites)
  }

  @Post('/track/:id')
  addTrack(@Param() params, @Res() response: Response) {
    const trackId = params.id

    const isValidId = uuidValidate(trackId)
    if (!isValidId) {
      throw new HttpException('BAD_REQUEST', HttpStatus.BAD_REQUEST);
    }

    const findedTrack = this.favoritesService.getItemById(trackId, "tracks")
    if (!findedTrack) {
      throw new HttpException('UNPROCESSABLE_ENTITY', HttpStatus.UNPROCESSABLE_ENTITY);
    }

    const addedTrack = this.favoritesService.addToFavs(findedTrack, "favTracks")
    if (!addedTrack) {
      throw new HttpException('CREATED', HttpStatus.CREATED);
    }

    response.json(addedTrack)
  }

  @Delete('/track/:id')
  @HttpCode(204)
  deleteTrack(@Param() params, @Res() response: Response) {
    const trackId = params.id

    const isValidId = uuidValidate(trackId)
    if (!isValidId) {
      throw new HttpException('BAD_REQUEST', HttpStatus.BAD_REQUEST);
    }

    const deletedTrack = this.favoritesService.deleteFromFavs(trackId, "favTracks")
    if (!deletedTrack) {
      throw new HttpException('NOT_FOUND', HttpStatus.NOT_FOUND);
    }

    response.json(deletedTrack)
  }

  @Post('/album/:id')
  addAlbum(@Param() params, @Res() response: Response) {
    const albumId = params.id

    const isValidId = uuidValidate(albumId)
    if (!isValidId) {
      throw new HttpException('BAD_REQUEST', HttpStatus.BAD_REQUEST);
    }

    const findedAlbum = this.favoritesService.getItemById(albumId, "albums")
    if (!findedAlbum) {
      throw new HttpException('UNPROCESSABLE_ENTITY', HttpStatus.UNPROCESSABLE_ENTITY);
    }

    const addedAlbum = this.favoritesService.addToFavs(findedAlbum, "favAlbums")
    if (!addedAlbum) {
      throw new HttpException('CREATED', HttpStatus.CREATED);
    }

    response.json(addedAlbum)
  }

  @Delete('/album/:id')
  @HttpCode(204)
  deleteAlbum(@Param() params, @Res() response: Response) {
    const albumId = params.id

    const isValidId = uuidValidate(albumId)
    if (!isValidId) {
      throw new HttpException('BAD_REQUEST', HttpStatus.BAD_REQUEST);
    }

    const deletedAlbum = this.favoritesService.deleteFromFavs(albumId, "favAlbums")
    if (!deletedAlbum) {
      throw new HttpException('NOT_FOUND', HttpStatus.NOT_FOUND);
    }

    response.json(deletedAlbum)
  }

  @Post('/artist/:id')
  addArtist(@Param() params, @Res() response: Response) {
    const artistId = params.id

    const isValidId = uuidValidate(artistId)
    if (!isValidId) {
      throw new HttpException('BAD_REQUEST', HttpStatus.BAD_REQUEST);
    }

    const findedArtist = this.favoritesService.getItemById(artistId, "artists")
    if (!findedArtist) {
      throw new HttpException('UNPROCESSABLE_ENTITY', HttpStatus.UNPROCESSABLE_ENTITY);
    }

    const addedArtist = this.favoritesService.addToFavs(findedArtist, "favArtists")
    if (!addedArtist) {
      throw new HttpException('CREATED', HttpStatus.CREATED);
    }

    response.json(addedArtist)
  }

  @Delete('/artist/:id')
  @HttpCode(204)
  deleteArtist(@Param() params, @Res() response: Response) {
    const artistId = params.id

    const isValidId = uuidValidate(artistId)
    if (!isValidId) {
      throw new HttpException('BAD_REQUEST', HttpStatus.BAD_REQUEST);
    }

    const deletedArtist = this.favoritesService.deleteFromFavs(artistId, "favArtists")
    if (!deletedArtist) {
      throw new HttpException('NOT_FOUND', HttpStatus.NOT_FOUND);
    }

    response.json(deletedArtist)
  }
}