import { User } from "src/modules/auth/entities/user.entity";
import { Beneficiary } from "src/modules/beneficiary/entities/beneficiary.entity";
import { Card } from "src/modules/card-bank/entities/card.entity";
import { Transaction } from "src/modules/transaction/entities/transaction.entity";
import { TypeAccount } from "src/modules/type-account/entities/type-account.entity";
import { Column, Entity, JoinColumn, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class AccountBank {
    @PrimaryGeneratedColumn({type: 'int4'})
    id: number;

    @Column({type: 'numeric', nullable: false, default: 0})
    accountNumber: number;

    @Column({type: 'numeric', nullable: false, default: 0})
    balance: number;

    @ManyToOne(()=> User, user=> user.account)
    users: User;

    @Column({type: 'timestamp', nullable: false, default: () => 'CURRENT_TIMESTAMP'})
    dateCreated: Date;

    @ManyToOne(()=>TypeAccount, typeAccount=> typeAccount.account)
    typeAccount: TypeAccount;

    @Column({type: 'timestamp', nullable: false, default: () => 'CURRENT_TIMESTAMP'})
    expirationDate: Date;

    @OneToMany(()=> Card, card=> card.account,{
        cascade: true,
      })
      cards?: Card[];
    
    @Column({type: 'boolean', nullable: false, default: true})
    active: boolean;

    @ManyToMany(()=> Beneficiary, beneficiary=> beneficiary.account)
    beneficiaries: Beneficiary[]

    @OneToMany(()=> Transaction, transaction=> transaction.account)
    transaction: Transaction[];

}