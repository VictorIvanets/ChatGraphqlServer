import { Global, Module } from '@nestjs/common'
import { DateScalar } from 'src/common/scalars/date.scalar'
import { TypegooseModule } from 'nestjs-typegoose'
import { ConfigModule } from '@nestjs/config'
import { UserModel } from './user.model'
import { UserService } from './user.service'
import { UserResolver } from './user.resolver'
import { DateScalarUser } from './scalars/date.scalar'

@Global()
@Module({
	providers: [UserResolver, UserService, DateScalarUser],
	imports: [
		TypegooseModule.forFeature([
			{
				typegooseClass: UserModel,
				schemaOptions: {
					collection: 'userInOut',
				},
			},
		]),
		ConfigModule,
	],
	exports: [UserService],
})
export class UserInOutModule {}
