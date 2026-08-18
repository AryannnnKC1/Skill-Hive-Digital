import { useCallback, useEffect, useState } from 'react';
import {
  fetchProfile,
  updateProfile as updateProfileApi,
  type ProfileData,
} from '../api';

const emptyProfile: ProfileData = {
  fullName: '',
  email: '',
  phone: '',
  dateOfBirth: '',
  gender: '',
  avatar: '',
  bio: '',
  educationLevel: '',
  institution: '',
  major: '',
  graduationYear: '',
  skills: '',
  careerGoal: '',
  preferredIndustry: '',
};

export function useProfile() {
  const [profile, setProfile] = useState<ProfileData>(emptyProfile);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [success, setSuccess] = useState<string | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const data = await fetchProfile();
      setProfile(data);
    } catch (err: any) {
      const msg =
        err?.response?.data?.message ??
        (err instanceof Error ? err.message : 'Failed to load profile');
      setError(msg);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void load();
  }, [load]);

  const save = useCallback(
    async (data: Partial<ProfileData>) => {
      setSaving(true);
      setError(null);
      setFieldErrors({});
      setSuccess(null);

      try {
        const updated = await updateProfileApi(data);
        setProfile(updated);
        setSuccess('Profile updated successfully');
      } catch (err: any) {
        if (err?.response?.data?.errors) {
          setFieldErrors(err.response.data.errors);
        }
        const msg =
          err?.response?.data?.message ??
          (err instanceof Error ? err.message : 'Failed to save profile');
        setError(msg);
      } finally {
        setSaving(false);
      }
    },
    []
  );

  const clearMessages = useCallback(() => {
    setError(null);
    setSuccess(null);
    setFieldErrors({});
  }, []);

  return {
    profile,
    setProfile,
    loading,
    saving,
    error,
    fieldErrors,
    success,
    save,
    reload: load,
    clearMessages,
  };
}
