import { Injectable } from '@nestjs/common'
import { InjectModel } from 'nestjs-typegoose'
import { ModelType } from '@typegoose/typegoose/lib/types'
import { UserDto } from './user.dto'
import { UserInput } from './user.input'
import { UserModel } from './user.model'

@Injectable()
export class UserService {
	constructor(
		@InjectModel(UserModel)
		private readonly userModel: ModelType<UserModel>,
	) {}
	async userIn(data: string): Promise<UserModel> {
		const dto: UserDto = {
			userId: (Math.random() * 100000).toFixed(),
			chat: 'chat',
			user: data,
		}
		const newUser = new this.userModel(dto)
		console.log(newUser)
		return newUser.save()
	}

	async findAll(chat: string): Promise<UserModel[]> {
		const userAll = await this.userModel.find({ chat }).exec()
		if (!userAll) {
			throw new Error(`error get all comment`)
		}
		return userAll
	}
	async userOut(userId: string): Promise<boolean> {
		const del = await this.userModel.findOneAndDelete({ userId }).exec()
		if (!del) {
			throw new Error(`${userId} user not found`)
		} else {
			return true
		}
	}
}
