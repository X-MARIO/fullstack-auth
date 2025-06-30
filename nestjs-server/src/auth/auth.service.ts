import {
	ConflictException,
	Injectable,
	InternalServerErrorException
} from '@nestjs/common'
import { Request } from 'express'

import { RegisterDto } from '@/auth/dto'
import { UserService } from '@/user/user.service'

import { AuthMethod, User } from '../../generated/prisma'

@Injectable()
export class AuthService {
	public constructor(private readonly userService: UserService) {}

	public async register(req: Request, dto: RegisterDto) {
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

		// Прямой вызов обновленного метода
		const sessionData = await this.saveSession(req, newUser)
		return sessionData
	}
	public async login() {}

	public async logout() {}

	/**
	 * Сохраняет данные пользователя в сессии.
	 * @param req - Объект запроса Express
	 * @param user - Объект пользователя для сохранения
	 * @returns Промис, который разрешается с объектом пользователя
	 */
	public async saveSession(
		req: Request,
		user: User
	): Promise<{ user: User }> {
		req.session.userId = user.id

		// Оборачиваем callback-based save в промис для async/await
		await new Promise<void>((resolve, reject) => {
			req.session.save(err => {
				if (err) {
					console.error('Session save error:', err)
					return reject(
						new InternalServerErrorException(
							'Не удалось сохранить сессию. Проверьте, правильно ли настроены параметры сессии.'
						)
					)
				}
				resolve()
			})
		})

		return { user }
	}
}
