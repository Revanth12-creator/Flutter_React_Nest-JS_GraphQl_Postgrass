import { ObjectType, Field, Int, Directive, ID } from '@nestjs/graphql';
import { Order } from 'src/order/entities/order.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
@Entity()
@ObjectType()
@Directive('@key(fields:"id")')
export class OrderDetail {
  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field()
  @Column({ default: 1, type: 'integer' })
  orderqty: number;

  @Field()
  @Column({ default: 0, type: 'decimal' })
  orderAmount: number;

  @Field()
  @Column({
    nullable: true,
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  orderShippingDate: Date;

  @Field()
  @Column({
    nullable: true,
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  orderDate: Date;

  @Field()
  @Column()
  orderId: string;

  @Field(() => Order)
  @ManyToOne((type) => Order, (order) => order.orderdetail, {
    nullable: true,
    onDelete: 'CASCADE',
  })
  order: Order;
}
