import db from "src/database/db";
import { Injectable } from "@nestjs/common";
import { CreateAlbumDto, UpdateAlbumDto } from "./dto";
import { v4 as uuidv4 } from "uuid"
import { AlbumInterface } from "./albumsInterface";

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
      artistId: createAlbumDto.artistId && null,
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
    const deletedAlbum = db.deleteOne("albums", albumId)
    return deletedAlbum
  }
}