import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity()
export class FavoriteArtists {
  @PrimaryColumn()
  id: string;

  @Column()
  name: string;

  @Column()
  grammy: boolean;
}