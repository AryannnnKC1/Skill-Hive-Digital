import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useProfile } from '../hooks/useProfile';
import type { ProfileData } from '../api';

/* ── helpers ───────────────────────────────────────────────── */

function getInitials(name: string) {
  return name
    .split(' ')
    .map((w) => w[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
}

function calcCompletion(p: ProfileData) {
  const fields: (keyof ProfileData)[] = [
    'fullName',
    'email',
    'phone',
    'dateOfBirth',
    'gender',
    'bio',
    'educationLevel',
    'institution',
    'major',
    'graduationYear',
    'skills',
    'careerGoal',
    'preferredIndustry',
  ];
  const filled = fields.filter((k) => {
    const v = p[k];
    return typeof v === 'string' && v.trim() !== '';
  }).length;
  return Math.round((filled / fields.length) * 100);
}

/* ── skeleton ──────────────────────────────────────────────── */

function Skeleton() {
  const bar = 'h-10 rounded-lg bg-surface-inset animate-pulse';
  return (
    <main className='min-h-screen bg-surface-inset text-ink'>
      <div className='mx-auto max-w-5xl px-4 py-10 md:px-8'>
        <div className='h-8 w-48 rounded bg-surface-inset animate-pulse mb-2' />
        <div className='h-5 w-72 rounded bg-surface-inset animate-pulse mb-10' />

        <div className='grid grid-cols-1 lg:grid-cols-3 gap-8'>
          <div className='lg:col-span-2 space-y-6'>
            <div className='bg-surface-raised border border-border rounded-xl p-8 space-y-5'>
              <div className='h-6 w-40 rounded bg-surface-inset animate-pulse' />
              <div className={bar} />
              <div className='grid grid-cols-2 gap-5'>
                <div className={bar} />
                <div className={bar} />
              </div>
              <div className='grid grid-cols-2 gap-5'>
                <div className={bar} />
                <div className={bar} />
              </div>
            </div>
            <div className='bg-surface-raised border border-border rounded-xl p-8 space-y-5'>
              <div className='h-6 w-52 rounded bg-surface-inset animate-pulse' />
              <div className={bar} />
              <div className='grid grid-cols-2 gap-5'>
                <div className={bar} />
                <div className={bar} />
              </div>
            </div>
          </div>
          <div>
            <div className='bg-surface-raised border border-border rounded-xl p-8 space-y-4'>
              <div className='h-20 w-20 mx-auto rounded-full bg-surface-inset animate-pulse' />
              <div className='h-5 w-32 mx-auto rounded bg-surface-inset animate-pulse' />
              <div className='h-3 w-full rounded-full bg-surface-inset animate-pulse' />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

/* ── main component ────────────────────────────────────────── */

export default function Profile() {
  const {
    profile,
    setProfile,
    loading,
    saving,
    error,
    fieldErrors,
    success,
    save,
    clearMessages,
  } = useProfile();

  // Local validation errors (client-side)
  const [localErrors, setLocalErrors] = useState<Record<string, string>>({});

  // Auto-dismiss success banner after 4s
  useEffect(() => {
    if (!success) return;
    const t = setTimeout(clearMessages, 4000);
    return () => clearTimeout(t);
  }, [success, clearMessages]);

  /* ── field change ─────────────────────────────────────── */

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setProfile((prev) => ({ ...prev, [name]: value }));

    // Clear any prior error for this field
    setLocalErrors((prev) => {
      const next = { ...prev };
      delete next[name];
      return next;
    });
    clearMessages();
  };

  /* ── validate + save ──────────────────────────────────── */

  const handleSave = () => {
    const errs: Record<string, string> = {};

    const name = profile.fullName.trim();
    if (!name) {
      errs.fullName = 'Full name is required';
    } else if (!/^[A-Za-z\s]+$/.test(name)) {
      errs.fullName = 'Full name can only contain letters and spaces';
    }

    const phone = profile.phone.trim();
    if (phone !== '' && !/^\d{7,15}$/.test(phone)) {
      errs.phone = 'Phone number must be 7\u201315 digits';
    }

    if (Object.keys(errs).length > 0) {
      setLocalErrors(errs);
      return;
    }

    setLocalErrors({});

    // Strip read-only / internal fields before sending
    const { _id, userId, email, ...payload } = profile;
    save(payload);
  };

  /* ── merged errors (local + server) ───────────────────── */

  const mergedErrors = { ...localErrors, ...fieldErrors };

  if (loading) return <Skeleton />;

  const completion = calcCompletion(profile);
  const inputBase =
    'block w-full border-0 ring-1 ring-inset rounded-lg py-2.5 px-3 bg-surface text-ink shadow-sm focus:ring-2 focus:ring-inset focus:ring-accent sm:text-sm sm:leading-6 placeholder:text-ink-subtle';
  const inputOk = `${inputBase} ring-border`;
  const inputErr = `${inputBase} ring-red-500`;
  const labelCls = 'block text-sm font-medium text-ink mb-1.5';
  const sectionCls =
    'bg-surface-raised border border-border rounded-xl p-6 md:p-8 shadow-sm';
  const headingCls =
    'text-xl font-bold text-ink mb-6 flex items-center gap-2 border-b border-border pb-4';

  function fieldClass(name: string) {
    return mergedErrors[name] ? inputErr : inputOk;
  }

  function FieldError({ name }: { name: string }) {
    const msg = mergedErrors[name];
    if (!msg) return null;
    return <p className='mt-1 text-xs text-red-500'>{msg}</p>;
  }

  return (
    <main className='min-h-screen bg-surface-inset text-ink'>
      <div className='mx-auto max-w-5xl px-4 py-10 md:px-8'>
        {/* Back + title */}
        <Link
          to='/dashboard'
          className='inline-flex items-center gap-1 text-sm text-ink-muted hover:text-accent transition-colors mb-6'
        >
          <svg
            className='w-4 h-4'
            fill='none'
            viewBox='0 0 24 24'
            stroke='currentColor'
            strokeWidth={2}
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              d='M15 19l-7-7 7-7'
            />
          </svg>
          Back to Dashboard
        </Link>

        <div className='mb-10'>
          <h1 className='text-3xl md:text-4xl font-bold text-ink mb-2'>
            Student Profile
          </h1>
          <p className='text-ink-muted text-lg max-w-2xl'>
            Complete your profile to receive personalized career
            recommendations.
          </p>
        </div>

        {/* Banners */}
        {success && (
          <div className='mb-6 rounded-lg border border-green-300 bg-green-50 px-4 py-3 text-sm text-green-800 dark:border-green-700 dark:bg-green-900/30 dark:text-green-300'>
            {success}
          </div>
        )}
        {error && (
          <div className='mb-6 rounded-lg border border-red-300 bg-red-50 px-4 py-3 text-sm text-red-800 dark:border-red-700 dark:bg-red-900/30 dark:text-red-300'>
            {error}
          </div>
        )}

        <div className='grid grid-cols-1 lg:grid-cols-3 gap-8 items-start'>
          {/* ─── LEFT: form ──────────────────────────────── */}
          <div className='lg:col-span-2 space-y-6'>
            {/* Personal Information */}
            <div className={sectionCls}>
              <h3 className={headingCls}>
                <svg
                  className='w-5 h-5 text-accent'
                  fill='none'
                  viewBox='0 0 24 24'
                  stroke='currentColor'
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    d='M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z'
                  />
                </svg>
                Personal Information
              </h3>

              <div className='grid grid-cols-1 md:grid-cols-2 gap-5'>
                {/* Full Name */}
                <div className='md:col-span-2'>
                  <label className={labelCls}>Full Name</label>
                  <input
                    type='text'
                    name='fullName'
                    value={profile.fullName}
                    onChange={handleChange}
                    placeholder='Enter your full name'
                    className={fieldClass('fullName')}
                  />
                  <FieldError name='fullName' />
                </div>

                {/* Email (read-only) */}
                <div>
                  <label className={labelCls}>
                    Email Address{' '}
                    <span className='text-ink-subtle font-normal'>
                      (read-only)
                    </span>
                  </label>
                  <input
                    type='email'
                    name='email'
                    value={profile.email}
                    readOnly
                    className={`${inputOk} cursor-not-allowed opacity-60`}
                  />
                </div>

                {/* Phone */}
                <div>
                  <label className={labelCls}>Phone Number</label>
                  <input
                    type='tel'
                    name='phone'
                    value={profile.phone}
                    onChange={handleChange}
                    placeholder='e.g. 1234567890'
                    className={fieldClass('phone')}
                  />
                  <FieldError name='phone' />
                </div>

                {/* Date of Birth */}
                <div>
                  <label className={labelCls}>Date of Birth</label>
                  <input
                    type='date'
                    name='dateOfBirth'
                    value={profile.dateOfBirth}
                    onChange={handleChange}
                    className={fieldClass('dateOfBirth')}
                  />
                </div>

                {/* Gender */}
                <div>
                  <label className={labelCls}>Gender</label>
                  <select
                    name='gender'
                    value={profile.gender}
                    onChange={handleChange}
                    className={fieldClass('gender')}
                  >
                    <option value=''>Select</option>
                    <option value='Male'>Male</option>
                    <option value='Female'>Female</option>
                    <option value='Non-binary'>Non-binary</option>
                    <option value='Prefer not to say'>Prefer not to say</option>
                  </select>
                </div>

                {/* Avatar URL */}
                <div className='md:col-span-2'>
                  <label className={labelCls}>
                    Avatar URL{' '}
                    <span className='text-ink-subtle font-normal'>
                      (paste a photo link)
                    </span>
                  </label>
                  <input
                    type='url'
                    name='avatar'
                    value={profile.avatar}
                    onChange={handleChange}
                    placeholder='https://example.com/photo.jpg'
                    className={fieldClass('avatar')}
                  />
                </div>

                {/* Bio */}
                <div className='md:col-span-2'>
                  <label className={labelCls}>Bio</label>
                  <textarea
                    name='bio'
                    value={profile.bio}
                    onChange={handleChange}
                    placeholder='Tell us about yourself...'
                    rows={3}
                    maxLength={500}
                    className={`${fieldClass('bio')} resize-none`}
                  />
                  <p className='mt-1 text-xs text-ink-subtle text-right'>
                    {profile.bio.length}/500
                  </p>
                </div>
              </div>
            </div>

            {/* Educational Background */}
            <div className={sectionCls}>
              <h3 className={headingCls}>
                <svg
                  className='w-5 h-5 text-accent'
                  fill='none'
                  viewBox='0 0 24 24'
                  stroke='currentColor'
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    d='M12 14l9-5-9-5-9 5 9 5z'
                  />
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    d='M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222'
                  />
                </svg>
                Educational Background
              </h3>

              <div className='grid grid-cols-1 md:grid-cols-2 gap-5'>
                {/* Education Level */}
                <div>
                  <label className={labelCls}>Education Level</label>
                  <select
                    name='educationLevel'
                    value={profile.educationLevel}
                    onChange={handleChange}
                    className={fieldClass('educationLevel')}
                  >
                    <option value=''>Select Level</option>
                    <option value='High School'>High School</option>
                    <option value="Bachelor's">Bachelor's</option>
                    <option value="Master's">Master's</option>
                    <option value='PhD'>PhD</option>
                    <option value='Diploma'>Diploma</option>
                    <option value='Other'>Other</option>
                  </select>
                </div>

                {/* Institution */}
                <div>
                  <label className={labelCls}>Institution</label>
                  <input
                    type='text'
                    name='institution'
                    value={profile.institution}
                    onChange={handleChange}
                    placeholder='Enter your university / college'
                    className={fieldClass('institution')}
                  />
                </div>

                {/* Major */}
                <div>
                  <label className={labelCls}>Major</label>
                  <input
                    type='text'
                    name='major'
                    value={profile.major}
                    onChange={handleChange}
                    placeholder='Enter your major'
                    className={fieldClass('major')}
                  />
                </div>

                {/* Graduation Year */}
                <div>
                  <label className={labelCls}>Graduation Year</label>
                  <input
                    type='text'
                    name='graduationYear'
                    value={profile.graduationYear}
                    onChange={handleChange}
                    placeholder='e.g. 2028'
                    className={fieldClass('graduationYear')}
                  />
                </div>
              </div>
            </div>

            {/* Career Preferences */}
            <div className={sectionCls}>
              <h3 className={headingCls}>
                <svg
                  className='w-5 h-5 text-accent'
                  fill='none'
                  viewBox='0 0 24 24'
                  stroke='currentColor'
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    d='M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z'
                  />
                </svg>
                Career Preferences
              </h3>

              <div className='space-y-5'>
                <div>
                  <label className={labelCls}>Skills</label>
                  <textarea
                    name='skills'
                    value={profile.skills}
                    onChange={handleChange}
                    placeholder='List your technical and soft skills...'
                    rows={4}
                    className={`${fieldClass('skills')} resize-none`}
                  />
                </div>

                <div>
                  <label className={labelCls}>Career Goal</label>
                  <textarea
                    name='careerGoal'
                    value={profile.careerGoal}
                    onChange={handleChange}
                    placeholder='Describe your career goals...'
                    rows={4}
                    className={`${fieldClass('careerGoal')} resize-none`}
                  />
                </div>

                <div>
                  <label className={labelCls}>Preferred Industry</label>
                  <input
                    type='text'
                    name='preferredIndustry'
                    value={profile.preferredIndustry}
                    onChange={handleChange}
                    placeholder='Information Technology'
                    className={fieldClass('preferredIndustry')}
                  />
                </div>
              </div>
            </div>

            {/* Save button */}
            <div className='flex justify-end'>
              <button
                onClick={handleSave}
                disabled={saving}
                className='flex items-center justify-center gap-2 px-8 py-3 bg-cta hover:bg-cta-hover disabled:opacity-50 text-white font-medium rounded-lg transition-colors duration-200 shadow-sm w-full md:w-auto cursor-pointer'
              >
                {saving ? (
                  <>
                    <svg
                      className='h-5 w-5 animate-spin'
                      viewBox='0 0 24 24'
                      fill='none'
                    >
                      <circle
                        className='opacity-25'
                        cx='12'
                        cy='12'
                        r='10'
                        stroke='currentColor'
                        strokeWidth='4'
                      />
                      <path
                        className='opacity-75'
                        fill='currentColor'
                        d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z'
                      />
                    </svg>
                    Saving...
                  </>
                ) : (
                  <>
                    <svg
                      className='w-5 h-5'
                      fill='none'
                      viewBox='0 0 24 24'
                      stroke='currentColor'
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        d='M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4'
                      />
                    </svg>
                    Save Profile
                  </>
                )}
              </button>
            </div>
          </div>

          {/* ─── RIGHT: sidebar ──────────────────────────── */}
          <div className='space-y-6'>
            {/* Avatar card */}
            <div className={`${sectionCls} flex flex-col items-center`}>
              {profile.avatar ? (
                <img
                  src={profile.avatar}
                  alt={profile.fullName}
                  className='h-24 w-24 rounded-full object-cover border-2 border-border'
                />
              ) : (
                <div className='flex h-24 w-24 items-center justify-center rounded-full bg-surface-inset text-3xl font-bold text-ink-muted border-2 border-border'>
                  {getInitials(profile.fullName || '?')}
                </div>
              )}
              <h2 className='mt-4 text-lg font-bold text-ink'>
                {profile.fullName || 'Your Name'}
              </h2>
              <p className='text-sm text-ink-muted'>{profile.email}</p>
              {profile.institution && (
                <p className='text-sm text-ink-muted mt-1'>
                  {profile.institution}
                </p>
              )}
            </div>

            {/* Completion */}
            <div className={sectionCls}>
              <h3 className='text-lg font-bold text-ink mb-4 flex items-center gap-2'>
                <svg
                  className='w-5 h-5 text-accent'
                  fill='none'
                  viewBox='0 0 24 24'
                  stroke='currentColor'
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    d='M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z'
                  />
                </svg>
                Profile Completion
              </h3>

              <div className='w-full bg-surface-inset rounded-full h-2 mb-3 overflow-hidden'>
                <div
                  className='bg-cta h-2 rounded-full transition-all duration-500 ease-out'
                  style={{ width: `${completion}%` }}
                />
              </div>

              <p className='text-ink-muted text-sm font-medium'>
                <span className='font-bold text-ink'>{completion}%</span>{' '}
                Complete
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
