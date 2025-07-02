import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'

import { EmailConfirmationModule } from '@/auth/email-confirmation/email-confirmation.module'
import { ProviderModule } from '@/auth/provider/provider.module'
import { IS_DEV_ENV } from '@/libs/common/utils'
import { MailModule } from '@/libs/mail/mail.module'

import { AuthModule } from './auth/auth.module'
import { PrismaModule } from './prisma/prisma.module'
import { UserModule } from './user/user.module'

@Module({
	imports: [
		ConfigModule.forRoot({
			ignoreEnvFile: !IS_DEV_ENV,
			isGlobal: true
		}),
		PrismaModule,
		UserModule,
		AuthModule,
		ProviderModule,
		MailModule,
		EmailConfirmationModule
	],
	controllers: [],
	providers: []
})
export class AppModule {}
