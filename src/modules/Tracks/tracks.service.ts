import db from "src/database/db";
import { Injectable } from "@nestjs/common";
import { CreateTrackDto, UpdateTrackDto } from "./dto";
import { v4 as uuidv4 } from "uuid"
import { TrackInterface } from "./tracksInterface";

@Injectable()
export class TracksService {
  getTracks() {
    return db.findMany("tracks")
  }

  getTrackById(trackId: string) {
    const track = db.findOne("tracks", "id", trackId)
    return track
  }

  createTrack(createTrackDto: CreateTrackDto) {
    const artistId = createTrackDto.artistId
    const albumId = createTrackDto.albumId
    const track = {
      id: uuidv4(),
      ...createTrackDto,
      artistId,
      albumId
    }

    db.insertOne("tracks", track)

    return track
  }

  updateTrack(updateTrackDto: UpdateTrackDto, trackId: string, track: TrackInterface) {
    const updatedTrack = {
      ...track,
      ...updateTrackDto
    }
    db.rewriteOne("tracks", updatedTrack, trackId)

    return updatedTrack
  }

  deleteTrackById(trackId) {
    const deletedUser = db.deleteOne("tracks", trackId)
    return deletedUser
  }
}