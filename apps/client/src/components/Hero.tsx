import React, { lazy, Suspense } from 'react';
import { Link } from 'react-router-dom';
import type { GlobeMarker } from '@/components/ui/3d-globe';

const Globe3D = lazy(() =>
  import('@/components/ui/3d-globe').then(mod => ({ default: mod.Globe3D }))
);

const careerHubMarkers: GlobeMarker[] = [
  {
    lat: 40.7128,
    lng: -74.006,
    src: 'https://assets.aceternity.com/avatars/1.webp',
    label: 'New York',
  },
  {
    lat: 51.5074,
    lng: -0.1278,
    src: 'https://assets.aceternity.com/avatars/2.webp',
    label: 'London',
  },
  {
    lat: 35.6762,
    lng: 139.6503,
    src: 'https://assets.aceternity.com/avatars/3.webp',
    label: 'Tokyo',
  },
  {
    lat: -33.8688,
    lng: 151.2093,
    src: 'https://assets.aceternity.com/avatars/4.webp',
    label: 'Sydney',
  },
  {
    lat: 48.8566,
    lng: 2.3522,
    src: 'https://assets.aceternity.com/avatars/5.webp',
    label: 'Paris',
  },
  {
    lat: 28.6139,
    lng: 77.209,
    src: 'https://assets.aceternity.com/avatars/6.webp',
    label: 'New Delhi',
  },
  {
    lat: 1.3521,
    lng: 103.8198,
    src: 'https://assets.aceternity.com/avatars/12.webp',
    label: 'Singapore',
  },
  {
    lat: 37.5665,
    lng: 126.978,
    src: 'https://assets.aceternity.com/avatars/13.webp',
    label: 'Seoul',
  },
];

const Hero: React.FC = () => {
  return (
    <section className='relative min-h-[90vh] flex flex-col items-center justify-center px-6 pt-16 pb-12 overflow-hidden'>
      <div className='pointer-events-none absolute inset-0 -z-10'>
        <div className='absolute top-1/3 left-1/2 -translate-x-1/2 h-112 w-[28rem] rounded-full bg-accent/10 blur-3xl' />
        <div className='absolute bottom-1/4 left-1/2 -translate-x-1/2 h-72 w-72 rounded-full bg-cta/10 blur-3xl' />
      </div>

      <div className='relative z-10 mx-auto flex w-full max-w-4xl flex-col items-center text-center gap-8'>
        <div className='inline-flex items-center gap-2 rounded-full border border-accent-border bg-accent-surface px-4 py-1.5 text-xs font-medium text-accent'>
          <span className='relative flex h-2 w-2'>
            <span className='absolute inline-flex h-full w-full animate-ping rounded-full bg-accent-light opacity-75' />
            <span className='relative inline-flex h-2 w-2 rounded-full bg-accent' />
          </span>
        </div>

        <h1 className='text-5xl sm:text-6xl lg:text-7xl font-display tracking-tight text-ink leading-[1.1]'>
          Find clarity in <br className='hidden sm:block' />
          <span className='text-transparent bg-clip-text bg-linear-to-r from-accent to-cta'>
            your career path.
          </span>
        </h1>

        <div className='relative mx-auto w-full max-w-2xl'>
          <div className='pointer-events-none absolute inset-0 rounded-3xl bg-linear-to-br from-accent/5 via-transparent to-cta/5' />
          <div className='relative rounded-3xl border border-border/40 bg-surface/80 p-2 shadow-card backdrop-blur-sm'>
            <Suspense
              fallback={
                <div className='flex h-[280px] sm:h-[360px] items-center justify-center'>
                  <span className='text-sm text-ink-subtle'>
                    Loading globe...
                  </span>
                </div>
              }
            >
              <Globe3D
                className='h-100 sm:h-90'
                markers={careerHubMarkers}
                config={{
                  showAtmosphere: false,
                  atmosphereColor: '#14b8a6',
                  atmosphereIntensity: 8,
                  atmosphereBlur: 2,
                  bumpScale: 3,
                  autoRotateSpeed: 0.75,
                  wireframeColor: '#60a5fa',
                  ambientIntensity: 1.4,
                  pointLightIntensity: 3,
                  hemisphereIntensity: 0.85,
                  roughness: 0.35,
                }}
              />
            </Suspense>
          </div>
        </div>

        <div className='flex flex-col sm:flex-row items-center gap-4 w-full justify-center'>
          <Link
            to='/register'
            className='group relative inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full font-medium text-sm text-white bg-accent hover:bg-accent-hover transition-all duration-300 hover:scale-[1.02] shadow-md shadow-accent/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-light'
          >
            <span>Take the Free Assessment</span>
            <svg
              width='16'
              height='16'
              viewBox='0 0 24 24'
              fill='none'
              stroke='currentColor'
              strokeWidth='2'
              strokeLinecap='round'
              strokeLinejoin='round'
              className='transition-transform duration-200 group-hover:translate-x-1'
            >
              <path d='M5 12h14' />
              <path d='m12 5 7 7-7 7' />
            </svg>
          </Link>

          <Link
            to='/careers'
            className='inline-flex items-center gap-1.5 px-8 py-3.5 rounded-full font-medium text-sm text-ink bg-surface glass hover:bg-surface-inset border border-border transition-all duration-300'
          >
            Explore Career Paths
          </Link>
        </div>

        <div className='flex flex-wrap items-center justify-center gap-4 text-xs font-medium text-ink-subtle'>
          <span className='flex items-center gap-1.5'>
            <span className='relative flex h-2 w-2'>
              <span className='animate-ping absolute inline-flex h-full w-full rounded-full bg-cta opacity-75' />
              <span className='relative inline-flex rounded-full h-2 w-2 bg-cta' />
            </span>
            Free to start
          </span>
          <span className='w-1 h-1 rounded-full bg-border-strong' />
          <span>No credit card required</span>
          <span className='w-1 h-1 rounded-full bg-border-strong' />
          <span>5-minute assessment</span>
        </div>
      </div>
    </section>
  );
};

export default Hero;
