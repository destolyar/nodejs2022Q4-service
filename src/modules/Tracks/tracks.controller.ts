import { Body, Controller, Delete, Get, HttpCode, HttpException, HttpStatus, Param, Post, Put, Res } from '@nestjs/common';
import { Response } from 'express';
import { TracksService } from './tracks.service';
import { validate as uuidValidate } from 'uuid'
import { CreateTrackDto, UpdateTrackDto } from './dto';

@Controller('track')
export class TracksController {
  constructor(private readonly tracksService: TracksService) { }

  @Get('/')
  getTracks(@Res() response: Response) {
    const tracks = this.tracksService.getTracks()

    response.json(tracks)
  }

  @Get(':id')
  getUserById(@Param() params, @Res() response: Response) {
    const trackId = params.id

    const isValidId = uuidValidate(trackId)
    if (!isValidId) {
      throw new HttpException('BAD_REQUEST', HttpStatus.BAD_REQUEST);
    }

    const findedTracks = this.tracksService.getTrackById(trackId)
    if (!findedTracks) {
      throw new HttpException('NOT_FOUND', HttpStatus.NOT_FOUND);
    }

    response.json(findedTracks)
  }

  @Post('/')
  createTrack(@Body() createTrackDto: CreateTrackDto, @Res() response: Response) {
    const createdTrack = this.tracksService.createTrack(createTrackDto)
    response.json(createdTrack)
  }

  @Put(':id')
  updateTrack(@Body() updatePasswordDto: UpdateTrackDto, @Param() params, @Res() response: Response) {
    const trackId = params.id

    const isValidId = uuidValidate(trackId)
    if (!isValidId) {
      throw new HttpException('BAD_REQUEST', HttpStatus.BAD_REQUEST);
    }

    const track = this.tracksService.getTrackById(trackId)
    if (!track) {
      throw new HttpException('NOT_FOUND', HttpStatus.NOT_FOUND);
    }

    const updatedTrack = this.tracksService.updateTrack(updatePasswordDto, trackId, track)
    if (!updatedTrack) {
      throw new HttpException('FORBIDDEN', HttpStatus.FORBIDDEN);
    }

    response.json(updatedTrack)
  }

  @Delete(':id')
  @HttpCode(204)
  deleteUserById(@Param() params, @Res() response: Response) {
    const trackId = params.id

    const isValidId = uuidValidate(trackId)
    if (!isValidId) {
      throw new HttpException('BAD_REQUEST', HttpStatus.BAD_REQUEST);
    }

    const trackForDeleting = this.tracksService.getTrackById(trackId)
    if (!trackForDeleting) {
      throw new HttpException('NOT_FOUND', HttpStatus.NOT_FOUND);
    }

    this.tracksService.deleteTrackById(trackId)

    response.json(trackForDeleting)
  }
}
