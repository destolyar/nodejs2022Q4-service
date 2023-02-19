import { FavoritesService } from './favorites.service';
import { Controller, Delete, Get, HttpCode, HttpException, HttpStatus, Param, Post, Res } from '@nestjs/common';
import { Response } from 'express';
import { validate as uuidValidate } from 'uuid'

@Controller('favs')
export class FavoritesController {
  constructor(private readonly favoritesService: FavoritesService) { }

  @Get('/')
  async getFavs(@Res() response: Response) {
    const favorites = await this.favoritesService.getFavs()
    response.json(favorites)
  }

  @Post('/track/:id')
  async addTrack(@Param() params, @Res() response: Response) {
    const trackId = params.id

    const isValidId = uuidValidate(trackId)
    if (!isValidId) {
      throw new HttpException('BAD_REQUEST', HttpStatus.BAD_REQUEST);
    }

    const findedTrack = await this.favoritesService.getTrackById(trackId)
    if (!findedTrack) {
      throw new HttpException('UNPROCESSABLE_ENTITY', HttpStatus.UNPROCESSABLE_ENTITY);
    }

    const addedTrack = await this.favoritesService.addFavoriteTrack(findedTrack)
    if (!addedTrack) {
      throw new HttpException('CREATED', HttpStatus.CREATED);
    }

    response.json(addedTrack)
  }

  @Delete('/track/:id')
  @HttpCode(204)
  async deleteTrack(@Param() params, @Res() response: Response) {
    const trackId = params.id

    const isValidId = uuidValidate(trackId)
    if (!isValidId) {
      throw new HttpException('BAD_REQUEST', HttpStatus.BAD_REQUEST);
    }

    const deletedTrack = await this.favoritesService.deleteFavoriteTrack(trackId)
    if (!deletedTrack) {
      throw new HttpException('NOT_FOUND', HttpStatus.NOT_FOUND);
    }

    response.json(deletedTrack)
  }

  @Post('/album/:id')
  async addAlbum(@Param() params, @Res() response: Response) {
    const albumId = params.id

    const isValidId = uuidValidate(albumId)
    if (!isValidId) {
      throw new HttpException('BAD_REQUEST', HttpStatus.BAD_REQUEST);
    }

    const findedAlbum = await this.favoritesService.getAlbumById(albumId)
    if (!findedAlbum) {
      throw new HttpException('UNPROCESSABLE_ENTITY', HttpStatus.UNPROCESSABLE_ENTITY);
    }

    const addedAlbum = await this.favoritesService.addFavoriteAlbum(findedAlbum)
    if (!addedAlbum) {
      throw new HttpException('CREATED', HttpStatus.CREATED);
    }

    response.json(addedAlbum)
  }

  @Delete('/album/:id')
  @HttpCode(204)
  async deleteAlbum(@Param() params, @Res() response: Response) {
    const albumId = params.id

    const isValidId = uuidValidate(albumId)
    if (!isValidId) {
      throw new HttpException('BAD_REQUEST', HttpStatus.BAD_REQUEST);
    }

    const deletedAlbum = await this.favoritesService.deleteFavoriteAlbum(albumId)
    if (!deletedAlbum) {
      throw new HttpException('NOT_FOUND', HttpStatus.NOT_FOUND);
    }

    response.json(deletedAlbum)
  }

  @Post('/artist/:id')
  async addArtist(@Param() params, @Res() response: Response) {
    const artistId = params.id

    const isValidId = uuidValidate(artistId)
    if (!isValidId) {
      throw new HttpException('BAD_REQUEST', HttpStatus.BAD_REQUEST);
    }

    const findedArtist = await this.favoritesService.getArtistById(artistId)
    if (!findedArtist) {
      throw new HttpException('UNPROCESSABLE_ENTITY', HttpStatus.UNPROCESSABLE_ENTITY);
    }

    const addedArtist = await this.favoritesService.addFavoriteArtist(findedArtist)
    if (!addedArtist) {
      throw new HttpException('CREATED', HttpStatus.CREATED);
    }

    response.json(addedArtist)
  }

  @Delete('/artist/:id')
  @HttpCode(204)
  async deleteArtist(@Param() params, @Res() response: Response) {
    const artistId = params.id

    const isValidId = uuidValidate(artistId)
    if (!isValidId) {
      throw new HttpException('BAD_REQUEST', HttpStatus.BAD_REQUEST);
    }

    const deletedArtist = await this.favoritesService.deleteFavoriteArtist(artistId)
    if (!deletedArtist) {
      throw new HttpException('NOT_FOUND', HttpStatus.NOT_FOUND);
    }

    response.json(deletedArtist)
  }
}