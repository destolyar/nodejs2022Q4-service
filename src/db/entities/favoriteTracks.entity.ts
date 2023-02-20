import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity()
export class FavoriteTracks {
  @PrimaryColumn()
  id: string;

  @Column()
  name: string;

  @Column({ nullable: true })
  artistId: string | null;

  @Column({ nullable: true })
  albumId: string | null;

  @Column()
  duration: number;
}