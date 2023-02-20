import { Body, Controller, Delete, Get, HttpCode, HttpException, HttpStatus, Param, Post, Put, Res } from '@nestjs/common';
import { Response } from 'express';
import { TracksService } from './tracks.service';
import { validate as uuidValidate } from 'uuid'
import { CreateTrackDto, UpdateTrackDto } from './dto';

@Controller('track')
export class TracksController {
  constructor(private readonly tracksService: TracksService) { }

  @Get('/')
  async getTracks(@Res() response: Response) {
    const tracks = await this.tracksService.getTracks()

    response.json(tracks)
  }

  @Get(':id')
  async getTrackById(@Param() params, @Res() response: Response) {
    const trackId = params.id

    const isValidId = uuidValidate(trackId)
    if (!isValidId) {
      throw new HttpException('BAD_REQUEST', HttpStatus.BAD_REQUEST);
    }

    const findedTracks = await this.tracksService.getTrackById(trackId)
    if (!findedTracks) {
      throw new HttpException('NOT_FOUND', HttpStatus.NOT_FOUND);
    }

    response.json(findedTracks)
  }

  @Post('/')
  async createTrack(@Body() createTrackDto: CreateTrackDto, @Res() response: Response) {
    const createdTrack = await this.tracksService.createTrack(createTrackDto)
    response.json(createdTrack)
  }

  @Put(':id')
  async updateTrack(@Body() updateTrackDto: UpdateTrackDto, @Param() params, @Res() response: Response) {
    const trackId = params.id

    const isValidId = uuidValidate(trackId)
    if (!isValidId) {
      throw new HttpException('BAD_REQUEST', HttpStatus.BAD_REQUEST);
    }

    const track = await this.tracksService.getTrackById(trackId)
    if (!track) {
      throw new HttpException('NOT_FOUND', HttpStatus.NOT_FOUND);
    }

    const updatedTrack = await this.tracksService.updateTrack(updateTrackDto, trackId, track)
    if (!updatedTrack) {
      throw new HttpException('FORBIDDEN', HttpStatus.FORBIDDEN);
    }

    response.json(updatedTrack)
  }

  @Delete(':id')
  @HttpCode(204)
  async deleteUserById(@Param() params, @Res() response: Response) {
    const trackId = params.id

    const isValidId = uuidValidate(trackId)
    if (!isValidId) {
      throw new HttpException('BAD_REQUEST', HttpStatus.BAD_REQUEST);
    }

    const trackForDeleting = await this.tracksService.getTrackById(trackId)
    if (!trackForDeleting) {
      throw new HttpException('NOT_FOUND', HttpStatus.NOT_FOUND);
    }

    const deletedTrack = await this.tracksService.deleteTrackById(trackId)

    response.json(deletedTrack)
  }
}
