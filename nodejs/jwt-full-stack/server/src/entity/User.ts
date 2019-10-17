import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from 'typeorm';
import { ObjectType, Field, Int } from 'type-graphql';

// ObjectType for resolver type
// Field expose fields to query
@ObjectType()
@Entity('user')
export class User extends BaseEntity {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column('text')
  email: string;

  @Column('text')
  password: string;
}
