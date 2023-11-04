import { AccountBank } from "src/modules/account/entities/account.entity";
import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Beneficiary {
    @PrimaryGeneratedColumn({type: "int4"})
    id: number;

    @Column({type: "varchar", length: 50})
    name: string;
    
    @ManyToMany(() => AccountBank, account => account.beneficiaries)
    @JoinTable()
    account: AccountBank[]
}