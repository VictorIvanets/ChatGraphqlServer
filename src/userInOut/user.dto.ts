import { IsArray, IsDate, IsNumber, IsObject, IsString } from 'class-validator'

export class UserDto {
	@IsString()
	userId: string
	@IsString()
	chat: string
	@IsString()
	user: string
}
