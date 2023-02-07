import db from "src/database/db";
import { Injectable } from "@nestjs/common";
import { CreateAlbumDto, UpdateAlbumDto } from "./dto";
import { v4 as uuidv4 } from "uuid"
import { AlbumInterface } from "./albumsInterface";
import { TrackInterface } from "../Tracks/tracksInterface";

@Injectable()
export class AlbumsService {
  getAlbums() {
    return db.findMany("albums")
  }

  getAlbumById(albumId: string) {
    const albums = db.findOne("albums", "id", albumId)
    return albums
  }

  createAlbum(createAlbumDto: CreateAlbumDto) {
    const album = {
      id: uuidv4(),
      ...createAlbumDto,
      artistId: createAlbumDto.artistId,
    }

    db.insertOne("albums", album)

    return { ...album }
  }

  updateAlbum(updateAlbumDto: UpdateAlbumDto, albumId: string, album: AlbumInterface) {
    const updatedAlbum = {
      ...album,
      ...updateAlbumDto
    }

    db.rewriteOne("albums", updatedAlbum, albumId)

    return { ...updatedAlbum }
  }

  deleteAlbumById(albumId) {
    db.deleteOne("albums", albumId)
    const album = db.findOne("albums", "id", albumId)

    const tracks: TrackInterface[] = db.findMany("tracks").filter((track: TrackInterface) => track.albumId === albumId)
    tracks.forEach(track => track.albumId = null)

    const favoriteTracks = db.findMany("favTracks").filter((track: TrackInterface) => track.albumId === albumId)
    favoriteTracks.forEach(track => track.albumId = null)

    const favoriteAlbums: AlbumInterface[] = db.findMany("favAlbums").filter((album: AlbumInterface) => album.id === albumId)
    favoriteAlbums.forEach(album => db.deleteOne("favAlbums", album.id))

    return album
  }
}