import { ConfigService } from '@nestjs/config'
import { TypegooseModuleOptions } from 'nestjs-typegoose'

export const getMongoConfig = async (): Promise<TypegooseModuleOptions> => {
	return {
		uri: getMongoString,
	}
}

const getMongoString =
	'mongodb+srv://imperiazt:MCq87RDUGnLSH7ZM@cluster0.fiqphth.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'
