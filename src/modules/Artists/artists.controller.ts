import { Body, Controller, Delete, Get, HttpCode, HttpException, HttpStatus, Param, Post, Put, Res } from '@nestjs/common';
import { Response } from 'express';
import { ArtistsService } from './artists.service';
import { validate as uuidValidate } from 'uuid'
import { CreateArtistDto, UpdateArtistDto } from './dto';

@Controller('artist')
export class ArtistsController {
  constructor(private readonly artistsService: ArtistsService) { }

  @Get('/')
  getArtists(@Res() response: Response) {
    const artists = this.artistsService.getArtists()
    response.json(artists)
  }

  @Get(':id')
  getArtistById(@Param() params, @Res() response: Response) {
    const artistId = params.id

    const isValidId = uuidValidate(artistId)
    if (!isValidId) {
      throw new HttpException('BAD_REQUEST', HttpStatus.BAD_REQUEST);
    }

    const findedArtist = this.artistsService.getArtistById(artistId)
    if (!findedArtist) {
      throw new HttpException('NOT_FOUND', HttpStatus.NOT_FOUND);
    }

    response.json(findedArtist)
  }

  @Post('/')
  createAlbum(@Body() createArtistDto: CreateArtistDto, @Res() response: Response) {
    const createdArtist = this.artistsService.createArtist(createArtistDto)
    response.json(createdArtist)
  }

  @Put(':id')
  updateAlbum(@Body() updateArtistDto: UpdateArtistDto, @Param() params, @Res() response: Response) {
    const artistId = params.id

    const isValidId = uuidValidate(artistId)
    if (!isValidId) {
      throw new HttpException('BAD_REQUEST', HttpStatus.BAD_REQUEST);
    }

    const artist = this.artistsService.getArtistById(artistId)
    if (!artist) {
      throw new HttpException('NOT_FOUND', HttpStatus.NOT_FOUND);
    }

    const updatedArtist = this.artistsService.updateArtist(updateArtistDto, artistId, artist)
    if (!updatedArtist) {
      throw new HttpException('FORBIDDEN', HttpStatus.FORBIDDEN);
    }

    response.json(updatedArtist)
  }

  @Delete(':id')
  @HttpCode(204)
  deleteAlbumById(@Param() params, @Res() response: Response) {
    const artistId = params.id

    const isValidId = uuidValidate(artistId)
    if (!isValidId) {
      throw new HttpException('BAD_REQUEST', HttpStatus.BAD_REQUEST);
    }

    const artistForDeleting = this.artistsService.getArtistById(artistId)
    if (!artistForDeleting) {
      throw new HttpException('NOT_FOUND', HttpStatus.NOT_FOUND);
    }

    this.artistsService.deleteArtistById(artistId)

    response.json(artistForDeleting)
  }
}