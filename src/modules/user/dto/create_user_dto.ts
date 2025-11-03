import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsEmail,
  MinLength,
  MaxLength,
  IsOptional,
  IsBoolean,
  Matches,
  IsNumber,
  IsEnum,
} from 'class-validator';
import { UserRole } from '../../../common/enum/roles.enum';
export class CreateUserDto {
  @ApiProperty({
    example: 'John',
    description: 'First name of the user',
  })
  @IsString({ message: 'First name must be a string' })
  @MinLength(2, { message: 'First name must be at least 2 characters long' })
  @MaxLength(50, { message: 'First name must not exceed 50 characters' })
  firstName: string;

  @ApiProperty({
    example: 'Doe',
    description: 'Last name of the user',
  })
  @IsString({ message: 'Last name must be a string' })
  @MinLength(2, { message: 'Last name must be at least 2 characters long' })
  @MaxLength(50, { message: 'Last name must not exceed 50 characters' })
  lastName: string;

  @ApiProperty({
    example: 'john.doe@gmail.com',
    description: 'User email address',
  })
  @IsEmail({}, { message: 'Invalid email format' })
  email: string;

  @ApiProperty({
    example: 'StrongP@ssword123',
    description:
      'User password (must include uppercase, lowercase, number, and special character)',
  })
  @IsString({ message: 'Password must be a string' })
  @MinLength(8, { message: 'Password must be at least 8 characters long' })
  @Matches(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*#?&])/, {
    message:
      'Password must contain uppercase, lowercase, number, and special character',
  })
  password: string;

  @ApiProperty({ required: false, enum: UserRole, example: UserRole.CUSTOMER })
  @IsOptional()
  @IsEnum(UserRole)
  role?: UserRole;

  @ApiProperty({
    required: false,
    example: false,
    description: 'Whether the user account is blocked',
  })
  @IsOptional()
  @IsBoolean({ message: 'isAccountBlocked must be a boolean' })
  isAccountBlocked?: boolean;
  @IsString({
    message: "Failed login attempts must be a number"
  })
  @IsOptional()
  @IsNumber({}, {
    message: 'failedLoginAttempts must be a number'
  })
  failedLoginAttempts?: number;
}

export class LoginUserDto {
  @ApiProperty({
    example: 'john.doe@gmail.com',
    description: 'User email address',
  })
  @IsEmail({}, { message: 'Invalid email format' })
  email: string;

  @ApiProperty({
    example: 'StrongP@ssword123',
    description: 'User password',
  })
  @IsString({ message: 'Password must be a string' })
  @MinLength(8, { message: 'Password must be at least 8 characters long' })
  password: string;
}

export class ForgotPasswordDto {
  @ApiProperty({
    example: 'john.doe@gmail.com',
    description: 'Email address for password reset',
  })
  @IsEmail({}, { message: 'Invalid email format' })
  email: string;
}

export class ResetPasswordDto {
  @ApiProperty({
    example: 'john.doe@gmail.com',
    description: 'User email address',
  })
  @IsEmail({}, { message: 'Invalid email format' })
  email: string;

  @ApiProperty({
    example: '123456',
    description: 'Password reset code sent to user email',
  })
  @IsString({ message: 'Reset code must be a string' })
  @MinLength(4, { message: 'Reset code must be at least 4 characters' })
  @MaxLength(10, { message: 'Reset code must not exceed 10 characters' })
  code: string;

  @ApiProperty({
    example: 'NewStrongP@ssword123',
    description:
      'New password (must include uppercase, lowercase, number, and special character)',
  })
  @IsString({ message: 'New password must be a string' })
  @MinLength(8, { message: 'Password must be at least 8 characters long' })
  @Matches(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*#?&])/, {
    message:
      'Password must contain uppercase, lowercase, number, and special character',
  })
  newPassword: string;
}
