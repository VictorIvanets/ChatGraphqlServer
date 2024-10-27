import { IsArray, IsDate, IsNumber, IsObject, IsString } from 'class-validator'

export class CommentDto {
	@IsNumber()
	comId: string
	@IsString()
	comment?: string
	@IsString()
	title: string
	@IsString()
	user: string
}
