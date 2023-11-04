import { AccountBank } from "src/modules/account/entities/account.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

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

    @Column({type: 'varchar', nullable: false})
    originaccount: string;

    @Column({type: 'varchar', nullable: false})
    destinationaccount: string;//se pude relacionar con la tabla de cuentas o usuarios

    @ManyToOne(()=> AccountBank, account=> account.transaction)
    account: AccountBank;
}