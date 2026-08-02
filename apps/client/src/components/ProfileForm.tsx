import { useState, useEffect } from "react";
import type { Profile } from "../types/profile";

interface ProfileFormProps {
  onProfileChange: (profile: Profile) => void;
}

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

export default function ProfileForm({
  onProfileChange,
}: ProfileFormProps) {
  const [profile, setProfile] = useState<Profile>(emptyProfile);

  useEffect(() => {
    const savedProfile = localStorage.getItem("studentProfile");

    if (savedProfile) {
      const parsedProfile = JSON.parse(savedProfile);
      setProfile(parsedProfile);
      onProfileChange(parsedProfile);
    }
  }, [onProfileChange]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const updatedProfile = {
      ...profile,
      [e.target.name]: e.target.value,
    };

    setProfile(updatedProfile);
    onProfileChange(updatedProfile);
  };

  const handleSave = () => {
    if (!profile.fullName.trim()) {
      alert("Full Name is required.");
      return;
    }

    if (!profile.email.trim()) {
      alert("Email is required.");
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(profile.email)) {
      alert("Please enter a valid email.");
      return;
    }
    if (!/^\d{10}$/.test(profile.phone)) {
      alert("Phone number must contain exactly 10 digits.");
      return;
    }
    if (!profile.university.trim()) {
      alert("University is required.");
      return;
    }

    if (!profile.degree.trim()) {
      alert("Degree is required.");
      return;
    }

    if (!profile.careerGoal.trim()) {
      alert("Career Goal is required.");
      return;
    }

    localStorage.setItem(
      "studentProfile",
      JSON.stringify(profile)
    );

    alert("Profile saved successfully!");
  };

  const inputClasses = "block w-full border-0 ring-1 ring-inset ring-slate-200 rounded-lg py-2.5 px-3 bg-white text-slate-900 shadow-sm focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6 placeholder:text-slate-400";
  const labelClasses = "block text-sm font-medium text-slate-900 mb-1.5";
  const sectionClasses = "bg-white border border-slate-200 rounded-xl p-6 md:p-8 mb-6 shadow-sm";
  const headingClasses = "text-xl font-bold text-slate-900 mb-6 flex items-center gap-2 border-b border-slate-100 pb-4";

  return (
    <div className="w-full">

      {/* Personal Information */}
      <div className={sectionClasses}>
        <h3 className={headingClasses}>
          <svg className="w-5 h-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
          Personal Information
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="md:col-span-2">
            <label className={labelClasses}>Full Name</label>
            <input
              type="text"
              name="fullName"
              value={profile.fullName}
              onChange={handleChange}
              placeholder="Enter your full name"
              className={inputClasses}
            />
          </div>

          <div>
            <label className={labelClasses}>Email Address</label>
            <input
              type="email"
              name="email"
              value={profile.email}
              onChange={handleChange}
              placeholder="Enter your email"
              className={inputClasses}
            />
          </div>

          <div>
            <label className={labelClasses}>Phone Number</label>
            <input
              type="tel"
              name="phone"
              value={profile.phone}
              onChange={handleChange}
              placeholder="Enter your phone number"
              className={inputClasses}
            />
          </div>
        </div>
      </div>

      {/* Educational Background */}
      <div className={sectionClasses}>
        <h3 className={headingClasses}>
          <svg className="w-5 h-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 14l9-5-9-5-9 5 9 5z" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222" />
          </svg>
          Educational Background
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="md:col-span-2">
            <label className={labelClasses}>University</label>
            <input
              type="text"
              name="university"
              value={profile.university}
              onChange={handleChange}
              placeholder="Enter your university"
              className={inputClasses}
            />
          </div>

          <div>
            <label className={labelClasses}>Degree</label>
            <select
              name="degree"
              value={profile.degree}
              onChange={handleChange}
              className={inputClasses}
            >
              <option value="">Select Degree</option>
              <option value="Bachelor's">Bachelor's</option>
              <option value="Master's">Master's</option>
              <option value="PhD">PhD</option>
              <option value="Diploma">Diploma</option>
            </select>
          </div>

          <div>
            <label className={labelClasses}>Major</label>
            <input
              type="text"
              name="major"
              value={profile.major}
              onChange={handleChange}
              placeholder="Enter your major"
              className={inputClasses}
            />
          </div>

          <div className="md:col-span-2">
            <label className={labelClasses}>Graduation Year</label>
            <input
              type="text"
              name="graduationYear"
              value={profile.graduationYear}
              onChange={handleChange}
              placeholder="e.g. 2028"
              className={inputClasses}
            />
          </div>
        </div>
      </div>

      {/* Career Preferences */}
      <div className={sectionClasses}>
        <h3 className={headingClasses}>
          <svg className="w-5 h-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
          Career Preferences
        </h3>

        <div className="space-y-5">
          <div>
            <label className={labelClasses}>Skills</label>
            <textarea
              name="skills"
              value={profile.skills}
              onChange={handleChange}
              placeholder="List your technical and soft skills..."
              rows={4}
              className={`${inputClasses} resize-none`}
            />
          </div>

          <div>
            <label className={labelClasses}>Career Goal</label>
            <textarea
              name="careerGoal"
              value={profile.careerGoal}
              onChange={handleChange}
              placeholder="Describe your career goals..."
              rows={4}
              className={`${inputClasses} resize-none`}
            />
          </div>

          <div>
            <label className={labelClasses}>Preferred Industry</label>
            <input
              type="text"
              name="preferredIndustry"
              value={profile.preferredIndustry}
              onChange={handleChange}
              placeholder="Information Technology"
              className={inputClasses}
            />
          </div>
        </div>
      </div>

      <div className="flex justify-end mt-8">
        <button
          onClick={handleSave}
          className="flex items-center justify-center gap-2 px-8 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-medium rounded-lg transition-colors duration-200 shadow-sm w-full md:w-auto"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" />
          </svg>
          Save Profile
        </button>
      </div>

    </div>
  );
}