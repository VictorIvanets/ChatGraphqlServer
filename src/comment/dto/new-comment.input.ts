import { Field, InputType } from '@nestjs/graphql'
import { IsOptional, Length, MaxLength } from 'class-validator'

@InputType()
export class NewCommentInput {
	@Field()
	@MaxLength(255)
	user: string

	@Field({ nullable: true })
	@IsOptional()
	comment?: string
}
