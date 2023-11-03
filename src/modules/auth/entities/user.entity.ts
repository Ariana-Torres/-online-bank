import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { UsersImages } from './usersImages.entity';
import { AccountBank } from 'src/modules/account/entities/account.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn({ type: 'int4' })
  id: number;

  @Column({ type: 'varchar', length: 100, nullable: false })
  name: string;

  @Column({ type: 'varchar', nullable: false })
  password: string;

  @Column({ type: 'varchar', nullable: false })
  email: string;

  @Column({ type: 'varchar', nullable: false })
  sexo: string;

  @Column({ type: 'boolean', default: true })
  active: boolean;

  @Column({ type: 'text', array: true, default: ['user'] })
  roles: string[];

  @OneToMany(() => UsersImages, (userImage) => userImage.user, {
    cascade: true,
  })
  images?: UsersImages[];

  @OneToMany(() => AccountBank, books => books.users)
  account: AccountBank[]
}
