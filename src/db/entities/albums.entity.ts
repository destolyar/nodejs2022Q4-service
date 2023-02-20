import { Entity, Column, PrimaryColumn, ManyToOne, OneToMany } from 'typeorm';
import { Artists } from './artists.entity';
import { Tracks } from './tracks.entity';


@Entity()
export class Albums {
  @PrimaryColumn()
  id: string;

  @Column()
  name: string;

  @Column()
  year: number;

  @Column({ nullable: true })
  artistId: string | null;

  @ManyToOne(() => Artists, (artist) => artist.id, {
    onDelete: 'SET NULL',
    nullable: true,
  })
  artist: Artists; // refers to Artist

  @OneToMany(() => Tracks, (track) => track.id, {
    onDelete: 'SET NULL',
    nullable: true,
  })
  track: Tracks;
}