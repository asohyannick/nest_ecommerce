import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { UserModule } from '../user/user.module';
import { JwtAuthGuard } from '../../common/guards/jwt-auth-guard';
import { RolesGuard } from '../../common/guards/role.guard';
@Module({
    imports: [
        JwtModule.register({
            secret: process.env.JWT_SECRET_KEY,
            signOptions: { expiresIn: '15m' },
        }),
        UserModule,
    ],
    providers: [JwtAuthGuard, RolesGuard],
    exports: [JwtAuthGuard, RolesGuard, JwtModule],
})
export class AuthModule { }
