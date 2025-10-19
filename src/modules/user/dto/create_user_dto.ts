import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({ example: 'John', description: 'First name of the user' })
  firstName: string;

  @ApiProperty({ example: 'Doe', description: 'Last name of the user' })
  lastName: string;

  @ApiProperty({ example: 'john.doe@gmail.com', description: 'User email' })
  email: string;

  @ApiProperty({ example: 'StrongP@ssword123', description: 'User password' })
  password: string;

  @ApiProperty({ required: false, example: false, description: 'Whether the user account is blocked' })
  isAccountBlocked: boolean;
}

export class LoginUserDto {
  @ApiProperty({ example: 'john.doe@gmail.com', description: 'User email' })
  email: string;

  @ApiProperty({ example: 'StrongP@ssword123', description: 'User password' })
  password: string;
}

export class ForgotPasswordDto {
  @ApiProperty({ example: 'john.doe@gmail.com', description: 'User email' })
  email: string;
}

export class ResetPasswordDto {
  @ApiProperty({ example: 'john.doe@gmail.com', description: 'User email' })
  email: string;

  @ApiProperty({ example: '123456', description: 'Password reset code' })
  code: string;

  @ApiProperty({ example: 'NewStrongP@ssword123', description: 'New password' })
  newPassword: string;
}
