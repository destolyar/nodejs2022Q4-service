import { Injectable } from "@nestjs/common";
import { CreateAlbumDto, UpdateAlbumDto } from "./dto";
import { v4 as uuidv4 } from "uuid"
import { AlbumInterface } from "./albumsInterface";
import { TrackInterface } from "../Tracks/tracksInterface";
import { Albums } from "../../db/entities/albums.entity";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { Tracks } from "../../db/entities/tracks.entity";
import { FavoriteTracks } from "../../db/entities/favoriteTracks.entity";
import { FavoriteAlbums } from "../../db/entities/favoriteAlbums.entity";


@Injectable()
export class AlbumsService {
  @InjectRepository(Albums) private albumsRepository: Repository<Albums>
  @InjectRepository(Tracks) private tracksRepository: Repository<Tracks>
  @InjectRepository(FavoriteTracks) private favoriteTracksRepository: Repository<FavoriteTracks>
  @InjectRepository(FavoriteAlbums) private favoriteAlbumsRepository: Repository<FavoriteAlbums>

  async getAlbums() {
    const albums = await this.albumsRepository.find()
    return albums
  }

  async getAlbumById(albumId: string) {
    const album = await this.albumsRepository.findOneBy({ id: albumId })
    return album
  }

  async createAlbum(createAlbumDto: CreateAlbumDto) {
    const albumForInsert = {
      id: uuidv4(),
      ...createAlbumDto,
      artistId: createAlbumDto.artistId,
    }

    await this.albumsRepository.insert(albumForInsert)

    return albumForInsert
  }

  async updateAlbum(updateAlbumDto: UpdateAlbumDto, albumId: string, album: AlbumInterface) {
    const updatedAlbum = {
      ...album,
      ...updateAlbumDto
    }

    await this.albumsRepository.update(albumId, updatedAlbum)

    return updatedAlbum
  }

  async deleteAlbumById(albumId) {
    const deletedAlbum = await this.albumsRepository.delete({ id: albumId })

    await this.tracksRepository.createQueryBuilder().update(Tracks).set({ albumId: null }).where({ albumId: albumId }).execute()
    await this.favoriteTracksRepository.createQueryBuilder().update(FavoriteTracks).set({ albumId: null }).where({ albumId: albumId }).execute()
    await this.favoriteAlbumsRepository.delete({ id: albumId })

    return deletedAlbum
  }
}