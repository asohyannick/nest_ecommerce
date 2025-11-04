import { Profile } from "./entity/profile.entity";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Injectable, NotFoundException } from "@nestjs/common";
@Injectable()
export class ProfileService {
    constructor(@InjectModel(Profile.name) private readonly profileModel: Model<Profile>) { }

    async createProfile(profileData: Partial<Profile>): Promise<Profile> {
        const newProfile = new this.profileModel(profileData);
        return newProfile.save();
    }

    async getProfileById(id: string): Promise<Profile | null> {
        const profile = await this.profileModel.findById(id).exec();
        if (!profile)  throw new NotFoundException("Profile not found");
        return profile;
    }
    
    async fetchAllUserProfiles(): Promise<Profile[]> {
        return this.profileModel.find().exec();         
    }
    async updateProfile(id: string, profileData: Partial<Profile>): Promise<Profile | null> {
        const updatedProfile = await this.profileModel.findByIdAndUpdate(id, profileData, { new: true, runValidators: true }).exec();
        if (!updatedProfile) throw new NotFoundException("Profile not found");
        return updatedProfile;
    }

    async deleteProfile(id: string): Promise<Profile | null> {
        const profile = await this.profileModel.findByIdAndDelete(id).exec();
        if(!profile) throw new NotFoundException("Profile not found");
        return profile;
    }
}
