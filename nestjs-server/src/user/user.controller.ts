import { Controller, Get, HttpCode, HttpStatus, Param } from '@nestjs/common'



import { Authorization, Authorized } from '@/auth/decorators';



import { UserService } from './user.service';





@Controller('users')
export class UserController {
	constructor(private readonly userService: UserService) {}

	@Authorization()
	@Get('profile')
	@HttpCode(HttpStatus.OK)
	public async findProfile(@Authorized('id') userId: string) {
		return this.userService.findById(userId)
	}

	@Authorization()
	@Get('by-id/:id')
	@HttpCode(HttpStatus.OK)
	public async findById(@Param('id') userId: string) {
		return this.userService.findById(userId)
	}
}
