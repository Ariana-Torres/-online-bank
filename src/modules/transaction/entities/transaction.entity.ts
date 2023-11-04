import { AccountBank } from "src/modules/account/entities/account.entity";
import { User } from "src/modules/auth/entities/user.entity";
import { Beneficiary } from "src/modules/beneficiary/entities/beneficiary.entity";
import { Column, Entity, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Transaction {
    @PrimaryGeneratedColumn({type: 'int4'})
    id: number;
    
    @Column({type: 'timestamp' , nullable: false, default: () => 'CURRENT_TIMESTAMP'})
    date: Date;

    @Column({type: 'varchar', nullable: false})
    type: string;

    @Column({type: 'numeric', nullable: false, default: 0})
    amount: number;

    @ManyToOne(()=> AccountBank, account=> account.transaction)
    account: AccountBank;

    @ManyToMany(()=> Beneficiary, beneficiary=> beneficiary.account)
    beneficiary: Beneficiary[];

    @ManyToOne(()=>User, user=> user.transaction)
    propietary: User;
}