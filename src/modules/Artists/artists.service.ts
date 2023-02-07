import db from "src/database/db";
import { Injectable } from "@nestjs/common";
import { CreateArtistDto, UpdateArtistDto } from "./dto";
import { v4 as uuidv4 } from "uuid"
import { ArtistInterface } from "./artiststInterface";
import { TrackInterface } from "../Tracks/tracksInterface";


@Injectable()
export class ArtistsService {
  getArtists() {
    return db.findMany("artists")
  }

  getArtistById(artistId: string) {
    const artists = db.findOne("artists", "id", artistId)
    return artists
  }

  createArtist(createArtistDto: CreateArtistDto) {
    const artist = {
      id: uuidv4(),
      ...createArtistDto,
    }

    db.insertOne("artists", artist)

    return { ...artist }
  }

  updateArtist(updateArtistDto: UpdateArtistDto, artistId: string, artist: ArtistInterface) {
    const updatedArtist = {
      ...artist,
      ...updateArtistDto
    }

    db.rewriteOne("artists", updatedArtist, artistId)

    return { ...updatedArtist }
  }

  deleteArtistById(artistId) {
    const deletedArtist = db.deleteOne("artists", artistId)

    const tracks = db.findMany("tracks").filter((track: TrackInterface) => track.artistId === artistId)
    tracks.forEach(track => track.artistId = null)

    const favoriteTracks = db.findMany("favTracks").filter((track: TrackInterface) => track.artistId === artistId)
    favoriteTracks.forEach(track => track.artistId = null)

    const favoriteArtists: ArtistInterface[] = db.findMany("favArtists").filter((artist: ArtistInterface) => artist.id === artistId)
    favoriteArtists.forEach(artist => db.deleteOne("favArtists", artist.id))

    return deletedArtist
  }

}