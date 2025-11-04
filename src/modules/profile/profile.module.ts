import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { Profile, ProfileSchema } from "./entity/profile.entity";
import { ProfileService } from "./profile.service";
import { ProfileController } from "./profile.controller";
@Module({
    imports: [MongooseModule.forFeature([{ name: Profile.name, schema: ProfileSchema }])],
    controllers: [ProfileController],
    providers: [ProfileService],
    exports: [ProfileService],
})  
export class ProfileModule {}