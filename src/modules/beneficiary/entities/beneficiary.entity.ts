import { AccountBank } from "src/modules/account/entities/account.entity";
import { Column, Entity, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Transaction } from "src/modules/transaction/entities/transaction.entity";

@Entity()
export class Beneficiary {
    @PrimaryGeneratedColumn({type: "int4"})
    id: number;

    @Column({type: "varchar", length: 50})
    name: string;
    
    @ManyToMany(() => AccountBank, account => account.beneficiaries)
    @JoinTable()
    account: AccountBank[]

    @OneToMany(() => Transaction, transaction => transaction.beneficiary)
    transaction: Transaction[];

}