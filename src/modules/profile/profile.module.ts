import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { Profile, ProfileSchema } from "./entity/profile.entity";
import { ProfileService } from "./profile.service";
import { ProfileController } from "./profile.controller";
import { AuthModule } from "../auth/auth.module";
import { UserModule } from "../user/user.module";
@Module({
    imports: [MongooseModule.forFeature([{ name: Profile.name, schema: ProfileSchema }]), 
    AuthModule,
    UserModule
],
    controllers: [ProfileController],
    providers: [ProfileService],
    exports: [ProfileService],
})  
export class ProfileModule {}