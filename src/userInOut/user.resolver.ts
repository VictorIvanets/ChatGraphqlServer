import { NotFoundException } from '@nestjs/common'
import { Args, Mutation, Query, Resolver, Subscription } from '@nestjs/graphql'
import { PubSub } from 'graphql-subscriptions'
import { UserModel } from './user.model'
import { UserInput } from './user.input'
import { UserService } from './user.service'

const pubSub = new PubSub()

@Resolver(() => UserModel)
export class UserResolver {
	constructor(private readonly userService: UserService) {}

	@Mutation(() => UserModel)
	async userIn(@Args('newUser') newUser: string): Promise<UserModel> {
		const userIn = await this.userService.userIn(newUser)
		const userAll = await this.userService.findAll('chat')
		pubSub.publish('userChek', { userChek: userAll })
		return userIn
	}

	@Mutation(() => Boolean)
	async userOut(@Args('userId') userId: string): Promise<boolean> {
		const userOut = await this.userService.userOut(userId)
		const userAll = await this.userService.findAll('chat')
		pubSub.publish('userChek', { userChek: userAll })
		return userOut
	}

	@Subscription(() => [UserModel])
	userChek(): AsyncIterator<unknown, any, any> {
		return pubSub.asyncIterator('userChek')
	}
}
