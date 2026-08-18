import { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import AuthHero from './AuthHero';
import api from '../../api';

const passwordPolicy = /^(?=.*[A-Z])(?=.*\d)(?=.*[@#$%^&+=!]).{8,}$/;

function RegisterForm() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [errors, setErrors] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    terms: '',
  });

  const [acceptTerms, setAcceptTerms] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [serverMessage, setServerMessage] = useState('');
  const [submitError, setSubmitError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));

    if (errors[name as keyof typeof errors]) {
      setErrors(prev => ({
        ...prev,
        [name]: '',
      }));
    }
  };

  const validate = () => {
    const newErrors = {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
      terms: '',
    };

    let valid = true;

    if (!formData.name.trim()) {
      newErrors.name = 'Full name is required';
      valid = false;
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
      valid = false;
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
      valid = false;
    }

    if (!passwordPolicy.test(formData.password)) {
      newErrors.password =
        'Password must be at least 8 chars, 1 uppercase, 1 number, 1 special char (@#$/etc.)';
      valid = false;
    }

    if (formData.confirmPassword !== formData.password) {
      newErrors.confirmPassword = 'Passwords do not match';
      valid = false;
    }

    if (!acceptTerms) {
      newErrors.terms = 'You must accept the terms and conditions';
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setServerMessage('');
    setSubmitError('');

    if (!validate()) {
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await api.post('/auth/register', {
        fullName: formData.name.trim(),
        email: formData.email.trim(),
        password: formData.password,
      });

      const token = response.data.token;
      if (token) {
        localStorage.setItem('token', token);
        api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      }

      setServerMessage(
        response.data.message || 'Account created successfully!'
      );

      setTimeout(() => {
        navigate('/dashboard', {
          state: { userName: response.data.user.name },
        });
      }, 800);
    } catch (error: unknown) {
      if (axios.isAxiosError(error) && error.response?.data?.message) {
        setSubmitError(error.response?.data.message);
      } else {
        setSubmitError('Registration failed. Please try again.');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className='min-h-screen flex bg-surface'>
      <section className='flex-1 flex flex-col justify-center px-4 py-12 sm:px-6 lg:flex-none lg:px-20 xl:px-24'>
        <div className='mx-auto w-full max-w-sm lg:w-96 bg-surface-raised border border-border shadow-sm p-8 rounded-2xl'>
          <div className='mb-8 flex flex-col items-center sm:items-start'>
            <img
              src='/logo.png'
              alt='Career Counselling Application Logo'
              className='h-10 w-auto object-contain mb-4'
            />
            <span className='text-sm font-semibold tracking-wide text-accent uppercase flex items-center gap-2'>
              SkillHive Digital
              <span className='h-1.5 w-1.5 rounded-full bg-accent' />
            </span>
          </div>

          <h1 className='text-3xl font-bold text-ink mb-2'>Create Account</h1>
          <p className='text-sm text-ink-muted mb-8'>
            Join us to start planning and navigating your professional pathways.
          </p>

          {submitError && (
            <div
              className='rounded-lg bg-red-500/10 p-4 mb-6 flex items-start gap-3 border border-red-500/20'
              role='alert'
            >
              <svg
                className='h-5 w-5 text-red-500 mt-0.5'
                fill='none'
                viewBox='0 0 24 24'
                strokeWidth='1.5'
                stroke='currentColor'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  d='M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z'
                />
              </svg>
              <span className='text-sm text-red-500 font-medium'>
                {submitError}
              </span>
            </div>
          )}

          {serverMessage && (
            <div
              className='rounded-lg bg-cta-surface p-4 mb-6 flex items-start gap-3 border border-cta/20'
              role='alert'
            >
              <svg
                className='h-5 w-5 text-cta mt-0.5'
                fill='none'
                viewBox='0 0 24 24'
                strokeWidth='1.5'
                stroke='currentColor'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  d='M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z'
                />
              </svg>
              <span className='text-sm text-cta font-medium'>
                {serverMessage}
              </span>
            </div>
          )}

          <form className='space-y-5' onSubmit={handleSubmit} noValidate>
            <div>
              <label
                className='block text-sm font-medium text-ink mb-1.5'
                htmlFor='register-name'
              >
                Full Name
              </label>
              <input
                type='text'
                id='register-name'
                name='name'
                placeholder='John Doe'
                className={`block w-full border-0 ring-1 ring-inset ${errors.name ? 'ring-red-500 focus:ring-red-500' : 'ring-border focus:ring-accent'} rounded-lg py-2.5 px-3 bg-surface text-ink shadow-sm focus:ring-2 sm:text-sm sm:leading-6 placeholder:text-ink-subtle`}
                value={formData.name}
                onChange={handleChange}
                disabled={isSubmitting}
                autoComplete='name'
                required
              />
              {errors.name && (
                <span className='text-xs text-red-500 mt-1.5 block'>
                  {errors.name}
                </span>
              )}
            </div>

            <div>
              <label
                className='block text-sm font-medium text-ink mb-1.5'
                htmlFor='register-email'
              >
                Email Address
              </label>
              <input
                type='email'
                id='register-email'
                name='email'
                placeholder='name@example.com'
                className={`block w-full border-0 ring-1 ring-inset ${errors.email ? 'ring-red-500 focus:ring-red-500' : 'ring-border focus:ring-accent'} rounded-lg py-2.5 px-3 bg-surface text-ink shadow-sm focus:ring-2 sm:text-sm sm:leading-6 placeholder:text-ink-subtle`}
                value={formData.email}
                onChange={handleChange}
                disabled={isSubmitting}
                autoComplete='email'
                required
              />
              {errors.email && (
                <span className='text-xs text-red-500 mt-1.5 block'>
                  {errors.email}
                </span>
              )}
            </div>

            <div>
              <label
                className='block text-sm font-medium text-ink mb-1.5'
                htmlFor='register-password'
              >
                Password
              </label>
              <div className='relative'>
                <input
                  type={showPassword ? 'text' : 'password'}
                  id='register-password'
                  name='password'
                  placeholder='Create password'
                  className={`block w-full border-0 ring-1 ring-inset ${errors.password ? 'ring-red-500 focus:ring-red-500' : 'ring-border focus:ring-accent'} rounded-lg py-2.5 px-3 pr-10 bg-surface text-ink shadow-sm focus:ring-2 sm:text-sm sm:leading-6 placeholder:text-ink-subtle`}
                  value={formData.password}
                  onChange={handleChange}
                  disabled={isSubmitting}
                  autoComplete='new-password'
                  required
                />
                <button
                  type='button'
                  className='absolute inset-y-0 right-0 flex items-center pr-3 text-ink-subtle hover:text-ink-muted focus:outline-none transition-colors duration-200 cursor-pointer'
                  onClick={() => setShowPassword(prev => !prev)}
                  disabled={isSubmitting}
                >
                  {showPassword ? (
                    <svg
                      className='h-5 w-5'
                      fill='none'
                      viewBox='0 0 24 24'
                      stroke='currentColor'
                      strokeWidth={1.5}
                    >
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        d='M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21'
                      />
                    </svg>
                  ) : (
                    <svg
                      className='h-5 w-5'
                      fill='none'
                      viewBox='0 0 24 24'
                      stroke='currentColor'
                      strokeWidth={1.5}
                    >
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        d='M15 12a3 3 0 11-6 0 3 3 0 016 0z'
                      />
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        d='M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z'
                      />
                    </svg>
                  )}
                </button>
              </div>
              {errors.password && (
                <span className='text-xs text-red-500 mt-1.5 block'>
                  {errors.password}
                </span>
              )}
            </div>

            <div>
              <label
                className='block text-sm font-medium text-ink mb-1.5'
                htmlFor='register-confirm-password'
              >
                Confirm Password
              </label>
              <div className='relative'>
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  id='register-confirm-password'
                  name='confirmPassword'
                  placeholder='Repeat password'
                  className={`block w-full border-0 ring-1 ring-inset ${errors.confirmPassword ? 'ring-red-500 focus:ring-red-500' : 'ring-border focus:ring-accent'} rounded-lg py-2.5 px-3 pr-10 bg-surface text-ink shadow-sm focus:ring-2 sm:text-sm sm:leading-6 placeholder:text-ink-subtle`}
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  disabled={isSubmitting}
                  autoComplete='new-password'
                  required
                />
                <button
                  type='button'
                  className='absolute inset-y-0 right-0 flex items-center pr-3 text-ink-subtle hover:text-ink-muted focus:outline-none transition-colors duration-200 cursor-pointer'
                  onClick={() => setShowConfirmPassword(prev => !prev)}
                  disabled={isSubmitting}
                >
                  {showConfirmPassword ? (
                    <svg
                      className='h-5 w-5'
                      fill='none'
                      viewBox='0 0 24 24'
                      stroke='currentColor'
                      strokeWidth={1.5}
                    >
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        d='M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21'
                      />
                    </svg>
                  ) : (
                    <svg
                      className='h-5 w-5'
                      fill='none'
                      viewBox='0 0 24 24'
                      stroke='currentColor'
                      strokeWidth={1.5}
                    >
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        d='M15 12a3 3 0 11-6 0 3 3 0 016 0z'
                      />
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        d='M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z'
                      />
                    </svg>
                  )}
                </button>
              </div>
              {errors.confirmPassword && (
                <span className='text-xs text-red-500 mt-1.5 block'>
                  {errors.confirmPassword}
                </span>
              )}
            </div>

            <div className='flex flex-col gap-1.5 mt-4'>
              <label
                className='flex items-start text-sm text-ink'
                htmlFor='register-terms'
              >
                <div className='flex h-6 items-center'>
                  <input
                    type='checkbox'
                    id='register-terms'
                    className='h-4 w-4 rounded border-border text-accent focus:ring-accent mt-0.5'
                    checked={acceptTerms}
                    onChange={e => {
                      setAcceptTerms(e.target.checked);
                      if (e.target.checked && errors.terms) {
                        setErrors(prev => ({ ...prev, terms: '' }));
                      }
                    }}
                    disabled={isSubmitting}
                  />
                </div>
                <div className='ml-2 text-sm leading-6 text-ink-muted'>
                  I agree to the{' '}
                  <a
                    href='#terms'
                    className='font-medium text-accent hover:text-accent-hover transition-colors duration-200'
                    onClick={e => e.preventDefault()}
                  >
                    Terms & Conditions
                  </a>{' '}
                  and{' '}
                  <a
                    href='#privacy'
                    className='font-medium text-accent hover:text-accent-hover transition-colors duration-200'
                    onClick={e => e.preventDefault()}
                  >
                    Privacy Policy
                  </a>
                </div>
              </label>
              {errors.terms && (
                <span className='text-xs text-red-500 block'>
                  {errors.terms}
                </span>
              )}
            </div>

            <button
              type='submit'
              className='flex w-full justify-center items-center rounded-lg bg-cta px-3 py-2.5 text-sm font-medium text-white shadow-sm hover:bg-cta-hover focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 transition-colors duration-200 disabled:opacity-70 disabled:cursor-not-allowed mt-6 cursor-pointer'
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <span className='flex items-center gap-2'>
                  <svg
                    className='animate-spin h-4 w-4 text-white'
                    xmlns='http://www.w3.org/2000/svg'
                    fill='none'
                    viewBox='0 0 24 24'
                  >
                    <circle
                      className='opacity-25'
                      cx='12'
                      cy='12'
                      r='10'
                      stroke='currentColor'
                      strokeWidth='4'
                    ></circle>
                    <path
                      className='opacity-75'
                      fill='currentColor'
                      d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'
                    ></path>
                  </svg>
                  Creating account...
                </span>
              ) : (
                'Register'
              )}
            </button>
          </form>

          <p className='mt-8 text-center text-sm text-ink-muted'>
            Already have an account?{' '}
            <Link
              to='/login'
              className='font-medium text-accent hover:text-accent-hover transition-colors duration-200'
            >
              Login
            </Link>
          </p>
        </div>
      </section>

      <AuthHero />
    </div>
  );
}

export default RegisterForm;
