import db from "src/database/db";
import { Injectable } from "@nestjs/common";
import { v4 as uuidv4 } from "uuid"
import { FavoritesInterface } from './favoritesInterface'
import { TrackInterface } from "../Tracks/tracksInterface";

@Injectable()
export class FavoritesService {
  getFavs() {
    const favAlbums = db.findMany("favAlbums") || []
    const favArtists = db.findMany("favArtists") || []
    const favTracks = db.findMany("favTracks") || []

    const favorites = {
      artists: favArtists,
      albums: favAlbums,
      tracks: favTracks
    }

    return favorites
  }

  getItemById(itemId: string, type: string) {
    const findedItem = db.findOne(type, "id", itemId)
    if (!findedItem) {
      return null
    }

    return findedItem
  }

  addToFavs(item: TrackInterface, type: string): TrackInterface | null {
    const isItemAlreadyAdded = db.findOne(type, "id", item.id)
    if (isItemAlreadyAdded) {
      return null
    }

    db.insertOne(type, { ...item })
    return item
  }

  deleteFromFavs(itemId: string, collection: string) {
    const findedItem = db.findMany(collection).find(item => item.id === itemId)
    if (!findedItem) {
      return null
    }

    db.deleteOne(collection, itemId)
    console.log(findedItem)
    return findedItem
  }
}
