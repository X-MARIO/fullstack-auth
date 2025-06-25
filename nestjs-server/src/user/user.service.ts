import { Injectable, NotFoundException } from '@nestjs/common'
import { hash } from 'argon2'

import { PrismaService } from '@/prisma/prisma.service'

import { $Enums } from '../../generated/prisma'

import AuthMethod = $Enums.AuthMethod

@Injectable()
export class UserService {
	public constructor(private readonly prismaService: PrismaService) {}

	public async findById(id: string) {
		const user = await this.prismaService.user.findUnique({
			where: {
				id
			},
			include: {
				accounts: true
			}
		})

		if (!user)
			throw new NotFoundException(
				'Пользователь не наёден. Пожалуйста, проверьте введёные данные.'
			)

		return user
	}

	public async findBEmail(email: string) {
		const user = await this.prismaService.user.findUnique({
			where: {
				email
			},
			include: {
				accounts: true
			}
		})

		return user
	}

	public async create(
		email: string,
		password: string,
		displayName: string,
		picture: string,
		method: AuthMethod,
		isVerified: boolean
	) {
		const user = await this.prismaService.user.create({
			data: {
				email,
				password: password ? await hash(password) : '',
				displayName,
				picture,
				method,
				isVerified
			},
			include: {
				accounts: true
			}
		})

		return user
	}
}
