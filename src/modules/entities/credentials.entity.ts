import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class CredentialsEntity {
  @PrimaryColumn()
  user_id: number;

  @Column()
  token: string;
}
