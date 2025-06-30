import {ConflictException, Injectable, InternalServerErrorException} from '@nestjs/common'
import {Request} from 'express'

import {RegisterDto} from '@/auth/dto'
import {UserService} from '@/user/user.service'

import {AuthMethod, User} from '../../generated/prisma'

@Injectable()
export class AuthService {
	public constructor(private readonly userService: UserService) {}

	public async register(req: Request, dto: RegisterDto) {
		console.log('>> dto', dto);
		const isExists = await this.userService.findBEmail(dto.email)

		if (isExists) {
			throw new ConflictException(
				'Регистрация не удалась. Пользователь с таким email уже существует. Пожалуйста, используйте другой email или войдите в систему.'
			)
		}

		const newUser = await this.userService.create(
			dto.email,
			dto.password,
			dto.name,
			'',
			AuthMethod.CREDENTIALS,
			false
		)

		return newUser;
	}
	public async login() {}

	public async logout() {}

	public async saveSession(req: Request, user: User) {
		console.log('>> user', user);
		return new Promise((resolve, reject) => {
			console.log('>> user', user);
			req.session.userId = user.id

			req.session.save(err => {
				if (err) {
					return reject(
						new InternalServerErrorException(
							'Не удалось сохранить сессию. Проверьте, правильно ли настроены параметры сессии.'
						)
					)
				}

				resolve({
					user
				})
			})
		})
	}
}
