import { Injectable } from "@nestjs/common";
import { CreateArtistDto, UpdateArtistDto } from "./dto";
import { v4 as uuidv4 } from "uuid"
import { ArtistInterface } from "./artiststInterface";
import { TrackInterface } from "../Tracks/tracksInterface";
import { InjectRepository } from "@nestjs/typeorm";
import { Artists } from "../../db/entities/artists.entity";
import { Repository, createQueryBuilder } from "typeorm";
import { FavoriteTracks } from "../../db/entities/favoriteTracks.entity";
import { FavoriteArtists } from "../../db/entities/favoriteArtists.entity";
import { Tracks } from "../../db/entities/tracks.entity";


@Injectable()
export class ArtistsService {
  @InjectRepository(Artists) private artistsRepository: Repository<Artists>
  @InjectRepository(Tracks) private tracksRepository: Repository<Tracks>
  @InjectRepository(FavoriteTracks) private favoriteTracksRepository: Repository<FavoriteTracks>
  @InjectRepository(FavoriteArtists) private favoriteArtistsRepository: Repository<FavoriteArtists>


  async getArtists() {
    const artists = await this.artistsRepository.find()
    return artists
  }

  async getArtistById(artistId: string) {
    const artist = await this.artistsRepository.findOneBy({ id: artistId })
    return artist
  }

  async createArtist(createArtistDto: CreateArtistDto) {
    const artistForInsert = {
      id: uuidv4(),
      ...createArtistDto,
    }

    await this.artistsRepository.insert(artistForInsert)
    return artistForInsert
  }

  async updateArtist(updateArtistDto: UpdateArtistDto, artistId: string, artist: ArtistInterface) {
    const updatedArtist = {
      ...artist,
      ...updateArtistDto
    }

    await this.artistsRepository.update(artistId, updatedArtist)
    return updatedArtist
  }

  async deleteArtistById(artistId) {
    const deletedArtist = await this.artistsRepository.delete({ id: artistId })
    
    await this.tracksRepository.createQueryBuilder().update(Tracks).set({ artistId: null }).where({ artistId: artistId }).execute()
    await this.favoriteTracksRepository.createQueryBuilder().update(FavoriteTracks).set({ artistId: null }).where({ artistId: artistId }).execute()
    await this.favoriteArtistsRepository.delete({ id: artistId })

    return deletedArtist
  }

}