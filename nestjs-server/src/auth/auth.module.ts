import { Module } from '@nestjs/common'

import { UserService } from '@/user/user.service'

import { AuthController } from './auth.controller'
import { AuthService } from './auth.service'

@Module({
	controllers: [AuthController],
	providers: [AuthService, UserService],
	exports: [AuthService]
})
export class AuthModule {}
