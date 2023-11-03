import { type } from "os";
import { AccountBank } from "src/modules/account/entities/account.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Card {
    @PrimaryGeneratedColumn({type: "int4"})
    id: number;

    @Column({type: "varchar", length: 50})
    cardNumber: string;

    @Column({type: "varchar", length: 50})
    cardType: string;

    @Column({type: 'varchar' , length: 50})
    expirationDate: string;

    @ManyToOne(() => AccountBank, account => account.cards,{
        onDelete: 'CASCADE',
    })
    account: AccountBank;

}