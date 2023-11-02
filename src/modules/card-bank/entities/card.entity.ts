import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Card {
    @PrimaryGeneratedColumn({type: "int4"})
    id: number;

    @Column({type: "varchar", length: 50})
    cardNumber: string;

    @Column({type: "varchar", length: 50})
    cardType: string;

    @Column({type: 'timestamp' , nullable: false, default: () => 'CURRENT_TIMESTAMP'})
    expirationDate: Date;

    @Column({type: "varchar", length: 50})
    accountId: number;

}