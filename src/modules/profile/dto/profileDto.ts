import { ApiProperty } from '@nestjs/swagger';
import {
    IsString,
    IsOptional,
    IsEmail,
    IsNumber,
    Min,
    MaxLength,
} from 'class-validator';

export class ProfileDto {
    @ApiProperty({ description: 'Profile picture URL', example: 'http://example.com/profile.jpg', required: false })    
    @IsOptional()
    @IsString()
    profilePictureUrl?: string;

    @ApiProperty({ description: 'Full name of the user', example: 'John Doe' })
    @IsString()
    @MaxLength(100)
    fullName: string;

    @ApiProperty({ description: 'Email address of the user', example: 'john.doe@example.com' })
    @IsEmail()
    email: string;

    @ApiProperty({ description: 'Phone number of the user', example: '+1234567890', required: false })
    @IsOptional()
    @IsString()
    phoneNumber?: string;

    @ApiProperty({ description: 'Age of the user', example: 30, required: false })
    @IsOptional()
    @IsNumber()
    @Min(0)
    age?: number;

    @ApiProperty({ description: 'Bio of the user', example: 'Software Developer', required: false })
    @IsOptional()
    @IsString()
    @MaxLength(500)
    bio?: string;

    @ApiProperty({ description: 'Location of the user', example: 'New York, USA', required: false })
    @IsOptional()
    @IsString()
    location?: string;
    

}