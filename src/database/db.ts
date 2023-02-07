import { AlbumInterface } from "src/modules/Albums/albumsInterface";
import { ArtistInterface } from "src/modules/Artists/artiststInterface";
import { FavoritesInterface } from "src/modules/Favorites/favoritesInterface";
import { TrackInterface } from "src/modules/Tracks/tracksInterface";
import { UserInterface } from "src/modules/Users/usersInterface";

export class db {
  db: {
    albums: AlbumInterface[];
    artists: ArtistInterface[];
    favTracks: TrackInterface[];
    favArtists: ArtistInterface[];
    favAlbums: AlbumInterface[];
    tracks: TrackInterface[];
    users: UserInterface[];
  }

  constructor() {
    this.db = {
      albums: [{
        id: "some id",
        artistId: null,
        name: "some name",
        year: 2023
      }],
      artists: [{
        grammy: null,
        id: "some id",
        name: "Some name"
      }],
      favAlbums: [],
      favArtists: [],
      favTracks: [],
      tracks: [{
        albumId: null,
        artistId: null,
        duration: 2,
        id: "some id",
        name: "some name"
      }],
      users: [{
        createdAt: 23,
        id: "some wring id",
        login: "Super login",
        password: "Super password",
        updatedAt: 123,
        version: 2
      }]
    }
  }

  findOne(collection: string, key: string, value: string | number) {
    const findedInfo = this.db[collection].find(item => item[key] === value)
    if (!findedInfo) {
      return null
    }

    return findedInfo
  }

  findMany(collection: string) {
    const findedInfo = this.db[collection]
    if (!findedInfo.length) {
      return null
    }

    return findedInfo
  }

  insertOne(collection: string, value) {
    this.db[collection] = [...this.db[collection], value]
  }

  rewriteOne(collection: string, newItem: any, editedItemId: string) {
    const findedElementIndex = this.db[collection].findIndex(item => item.id === editedItemId)
    this.db[collection][findedElementIndex] = newItem

    return newItem
  }

  deleteOne(collection: string, itemId: string) {
    const rebuildedCollection = this.db[collection].filter(item => item.id !== itemId)
    this.db[collection] = rebuildedCollection
  }
}

export default new db