import { useState } from "react";
import ProfileForm from "../components/ProfileForm";
import ProfileProgress from "../components/ProfileProgress";
import { calculateCompletion } from "../utils/profileCompletion";
import type { Profile } from "../types/profile";

const emptyProfile: Profile = {
  fullName: "",
  email: "",
  phone: "",
  university: "",
  degree: "",
  major: "",
  graduationYear: "",
  skills: "",
  careerGoal: "",
  preferredIndustry: "",
};

export default function Profile() {
  const [profile, setProfile] = useState<Profile>(emptyProfile);

  return (
    <div className="min-h-screen bg-gradient-dashboard text-text-primary">
      <div className="max-w-6xl mx-auto px-4 py-12 md:py-16">
        <div className="mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-text-primary mb-3 display-heading">
            Student Profile
          </h1>
          <p className="text-text-secondary text-lg max-w-2xl">
            Complete your profile to receive personalized career recommendations.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          <div className="lg:col-span-2">
            <ProfileForm onProfileChange={setProfile} />
          </div>
          <div className="lg:col-span-1">
            <div className="sticky top-8">
              <ProfileProgress completion={calculateCompletion(profile)} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}