import { Body, Controller, Delete, Get, HttpCode, HttpException, HttpStatus, Param, Post, Put, Res } from '@nestjs/common';
import { Response } from 'express';
import { AlbumsService } from './albums.service';
import { validate as uuidValidate } from 'uuid'
import { CreateAlbumDto, UpdateAlbumDto } from './dto';


@Controller('album')
export class AlbumsController {
  constructor(private readonly albumsService: AlbumsService) { }

  @Get('/')
  getAlbums(@Res() response: Response) {
    const albums = this.albumsService.getAlbums()
    response.json(albums)
  }

  @Get(':id')
  getUserById(@Param() params, @Res() response: Response) {
    const albumId = params.id

    const isValidId = uuidValidate(albumId)
    if (!isValidId) {
      throw new HttpException('BAD_REQUEST', HttpStatus.BAD_REQUEST);
    }

    const findedAlbums = this.albumsService.getAlbumById(albumId)
    if (!findedAlbums) {
      throw new HttpException('NOT_FOUND', HttpStatus.NOT_FOUND);
    }

    response.json(findedAlbums)
  }

  @Post('/')
  createAlbum(@Body() createAlbumDto: CreateAlbumDto, @Res() response: Response) {
    const createdAlbum = this.albumsService.createAlbum(createAlbumDto)
    response.json(createdAlbum)
  }

  @Put(':id')
  updateAlbum(@Body() updateAlbumDto: UpdateAlbumDto, @Param() params, @Res() response: Response) {
    const albumId = params.id

    const isValidId = uuidValidate(albumId)
    if (!isValidId) {
      throw new HttpException('BAD_REQUEST', HttpStatus.BAD_REQUEST);
    }

    const album = this.albumsService.getAlbumById(albumId)
    if (!album) {
      throw new HttpException('NOT_FOUND', HttpStatus.NOT_FOUND);
    }

    const updatedAlbum = this.albumsService.updateAlbum(updateAlbumDto, albumId, album)
    if (!updatedAlbum) {
      throw new HttpException('FORBIDDEN', HttpStatus.FORBIDDEN);
    }

    response.json(updatedAlbum)
  }

  @Delete(':id')
  @HttpCode(204)
  deleteAlbumById(@Param() params, @Res() response: Response) {
    const albumId = params.id

    const isValidId = uuidValidate(albumId)
    if (!isValidId) {
      throw new HttpException('BAD_REQUEST', HttpStatus.BAD_REQUEST);
    }

    const albumForDeleting = this.albumsService.getAlbumById(albumId)
    if (!albumForDeleting) {
      throw new HttpException('NOT_FOUND', HttpStatus.NOT_FOUND);
    }

    this.albumsService.deleteAlbumById(albumId)

    response.json(albumForDeleting)
  }
}