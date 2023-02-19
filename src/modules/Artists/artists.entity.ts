import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity()
export class Artists {
  @PrimaryColumn()
  id: string;

  @Column()
  name: string;

  @Column()
  grammy: boolean;
}