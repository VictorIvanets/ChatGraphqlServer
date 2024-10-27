import { Directive, Field, ID, ObjectType } from '@nestjs/graphql'
import { TimeStamps, Base } from '@typegoose/typegoose/lib/defaultClasses'
import { prop } from '@typegoose/typegoose'

export interface UserModel extends Base {}
@ObjectType({ description: 'userInOut' })
export class UserModel extends TimeStamps {
	@prop()
	@Field((type) => ID)
	userId: string
	@prop()
	@Field({ nullable: false })
	chat: string
	@prop()
	@Field({ nullable: false })
	user: string
}
