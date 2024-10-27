import { Field, InputType } from '@nestjs/graphql'
import { IsOptional, Length, MaxLength } from 'class-validator'

@InputType()
export class UserInput {
	@Field()
	@MaxLength(255)
	user: string
}
