import { PrimaryGeneratedColumn, Entity, Column, OneToMany } from 'typeorm';
import { ObjectType, Field, Int, Directive, ID } from '@nestjs/graphql';
import { User } from './user.entity';
import { Address } from './address.entity';
import { Post } from './post.entity';
import { OrderDetail } from 'src/order-details/entities/order-detail.entity';
@Entity()
@ObjectType()
@Directive('@key(fields: "id")')
export class Order {
  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field()
  @Column({ type: 'decimal', precision: 10 })
  orderamount: number;

  @Field()
  @Column({
    nullable: true,
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  orderdate: Date;

  @Field()
  @Column({
    nullable: true,
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  shippingdate: string;

  @Field()
  @Column({ default: 'pending' })
  orderstatus: string;

  @Field()
  @Column({ type: 'integer' })
  orderqty: number;

  @Field()
  @Column()
  userId: string;

  @Field()
  @Column()
  addressId: string;

  @Field(() => [Address])
  address: Address[];

  @Field()
  @Column()
  postId: string;

  @Field(() => User)
  user: User;

  @Field(() => [Post])
  post: Post[];

  @Field(() => [OrderDetail])
  @OneToMany((type) => OrderDetail, (orderdetail) => orderdetail.order, {
    nullable: true,
    eager: true,
    cascade: true,
  })
  orderdetail: OrderDetail[];
}
