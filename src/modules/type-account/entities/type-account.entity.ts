import { AccountBank } from "src/modules/account/entities/account.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class TypeAccount{
    @PrimaryGeneratedColumn({type: 'int4'})
    id: number;

    @Column({type: 'varchar', nullable: false})
    typeAccount: string;

    
    @OneToMany(() => AccountBank, account => account.typeAccount)
    account: AccountBank[]
}
