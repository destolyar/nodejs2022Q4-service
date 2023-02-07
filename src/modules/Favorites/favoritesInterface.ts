import { AlbumInterface } from "../Albums/albumsInterface";
import { ArtistInterface } from "../Artists/artiststInterface";
import { TrackInterface } from "../Tracks/tracksInterface";

export interface FavoritesInterface {
  artists: ArtistInterface[]; // favorite artists ids
  albums: AlbumInterface[]; // favorite albums ids
  tracks: TrackInterface[]; // favorite tracks ids
}