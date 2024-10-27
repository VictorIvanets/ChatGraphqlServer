import { Directive, Field, ID, ObjectType } from '@nestjs/graphql'
import { TimeStamps, Base } from '@typegoose/typegoose/lib/defaultClasses'
import { prop } from '@typegoose/typegoose'

export interface Comment extends Base {}
@ObjectType({ description: 'comment' })
export class Comment extends TimeStamps {
	@prop({ unique: true })
	@Field({ nullable: false })
	comId: string
	@prop()
	@Field({ nullable: false })
	title: string
	@prop()
	@Field({ nullable: true })
	comment?: string
	@prop()
	@Field({ nullable: false })
	user: string
	@prop()
	@Field()
	createdAt: Date
}
