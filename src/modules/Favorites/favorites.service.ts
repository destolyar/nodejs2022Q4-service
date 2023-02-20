import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { FavoriteAlbums } from "../../db/entities/favoriteAlbums.entity";
import { FavoriteArtists } from "../../db/entities/favoriteArtists.entity";
import { FavoriteTracks } from "../../db/entities/favoriteTracks.entity";
import { TrackInterface } from "../Tracks/tracksInterface";
import { Tracks } from "../../db/entities/tracks.entity";
import { Albums } from "../../db/entities/albums.entity";
import { Artists } from "../../db/entities/artists.entity";
import { AlbumInterface } from "../Albums/albumsInterface";
import { ArtistInterface } from "../Artists/artiststInterface";

@Injectable()
export class FavoritesService {
  @InjectRepository(FavoriteAlbums) private favoriteAlbumsRepository: Repository<FavoriteAlbums>
  @InjectRepository(FavoriteArtists) private favoriteArtistsRepository: Repository<FavoriteArtists>
  @InjectRepository(FavoriteTracks) private favoriteTracksRepository: Repository<FavoriteTracks>

  @InjectRepository(Albums) private albumsRepository: Repository<Albums>
  @InjectRepository(Artists) private artistsRepository: Repository<Artists>
  @InjectRepository(Tracks) private tracksRepository: Repository<Tracks>

  async getFavs() {
    const favoriteArtists = await this.favoriteArtistsRepository.find()
    const favoriteAlbums = await this.favoriteAlbumsRepository.find()
    const favoriteTracks = await this.favoriteTracksRepository.find()

    const favorites = {
      artists: favoriteArtists,
      albums: favoriteAlbums,
      tracks: favoriteTracks
    }

    return favorites
  }

  async getTrackById(trackId: string) {
    const track = await this.tracksRepository.findOneBy({ id: trackId })
    return track
  }

  async addFavoriteTrack(track: TrackInterface) {
    const addedTrack = await this.favoriteTracksRepository.insert(track)
    return addedTrack
  }

  async deleteFavoriteTrack(trackId: string) {
    const deletedTrack = await this.favoriteTracksRepository.delete({ id: trackId })
    return deletedTrack
  }

  async getAlbumById(albumId: string) {
    const album = await this.albumsRepository.findOneBy({ id: albumId })
    return album
  }

  async addFavoriteAlbum(album: AlbumInterface) {
    const addedAlbum = await this.favoriteAlbumsRepository.insert(album)
    return addedAlbum
  }

  async deleteFavoriteAlbum(albumId: string) {
    const deletedAlbum = await this.favoriteAlbumsRepository.delete({ id: albumId })
    return deletedAlbum
  }

  async getArtistById(artistId: string) {
    const artits = await this.artistsRepository.findOneBy({ id: artistId })
    return artits
  }

  async addFavoriteArtist(artist: ArtistInterface) {
    const addedArtist = await this.favoriteArtistsRepository.insert(artist)
    return addedArtist
  }

  async deleteFavoriteArtist(artistId: string) {
    const deletedArtitst = await this.favoriteArtistsRepository.delete({ id: artistId })
    return deletedArtitst
  }
}
