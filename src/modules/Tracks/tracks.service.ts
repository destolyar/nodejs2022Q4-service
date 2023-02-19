import { Injectable } from "@nestjs/common";
import { CreateTrackDto, UpdateTrackDto } from "./dto";
import { v4 as uuidv4 } from "uuid"
import { TrackInterface } from "./tracksInterface";
import { InjectRepository } from "@nestjs/typeorm";
import { Tracks } from "./tracks.entity";
import { Repository } from "typeorm";
import { FavoriteTracks } from "../Favorites/entity/favoriteTracks.entity";

@Injectable()
export class TracksService {
  @InjectRepository(Tracks) private tracksRepository: Repository<Tracks>
  @InjectRepository(FavoriteTracks) private favoriteTracksRepository: Repository<FavoriteTracks>

  async getTracks() {
    const tracks = await this.tracksRepository.find()
    return tracks
  }

  async getTrackById(trackId: string) {
    const track = await this.tracksRepository.findOneBy({ id: trackId })
    return track
  }

  async createTrack(createTrackDto: CreateTrackDto) {
    const trackForInsert = {
      id: uuidv4(),
      ...createTrackDto,
      artistId: createTrackDto.artistId,
      albumId: createTrackDto.albumId
    }

    await this.tracksRepository.insert(trackForInsert)
    return trackForInsert
  }

  async updateTrack(updateTrackDto: UpdateTrackDto, trackId: string, track: TrackInterface) {
    const updatedTrack = {
      ...track,
      ...updateTrackDto
    }

    await this.tracksRepository.update(trackId, updatedTrack)

    return updatedTrack
  }

  async deleteTrackById(trackId) {
    const deletedTrack = await this.tracksRepository.delete({ id: trackId })
    await this.favoriteTracksRepository.delete({ id: trackId })

    return deletedTrack
  }
}