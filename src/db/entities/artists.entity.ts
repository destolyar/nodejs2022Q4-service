import { Entity, Column, PrimaryColumn, OneToMany } from 'typeorm';
import { Albums } from './albums.entity';
import { Tracks } from './tracks.entity';

@Entity()
export class Artists {
  @PrimaryColumn()
  id: string;

  @Column()
  name: string;

  @Column()
  grammy: boolean;

  @OneToMany(() => Albums, (album) => album.id, {
    onDelete: 'SET NULL',
    nullable: true,
  })
  albums: Albums[];

  @OneToMany(() => Tracks, (track) => track.id, {
    onDelete: 'SET NULL',
    nullable: true,
  })
  tracks: Tracks[];
}