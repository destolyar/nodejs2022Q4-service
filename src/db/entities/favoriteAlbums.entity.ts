import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity()
export class FavoriteAlbums {
  @PrimaryColumn()
  id: string;

  @Column()
  name: string;

  @Column()
  year: number;

  @Column({ nullable: true })
  artistId: string | null;
}