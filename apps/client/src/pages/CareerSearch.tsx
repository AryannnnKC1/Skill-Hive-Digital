import { useState, useEffect, useCallback, useRef } from 'react';
import axios from 'axios';
import type { Career } from '../types';
import { useSavedCareers } from '../hooks/useSavedCareers';
import { SaveCareerButton } from '../components/SaveCareerButton';
import { API_BASE as API } from '../api';
import { Link } from 'react-router-dom';

interface Suggestion {
  _id: string;
  title: string;
  category: string;
}

interface Pagination {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export default function CareerSearch() {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('');
  const [sort, setSort] = useState('name_asc');
  const [careers, setCareers] = useState<Career[]>([]);
  const [pagination, setPagination] = useState<Pagination | null>(null);
  const [categories, setCategories] = useState<string[]>([]);
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const searchRef = useRef<HTMLDivElement>(null);

  const { isSaved, toggleSave, statusMessage, clearStatus } = useSavedCareers();

  useEffect(() => {
    axios
      .get<{ categories: string[] }>(`${API}/careers/categories`)
      .then(res => setCategories(res.data.categories))
      .catch(() => {});
  }, []);

  const fetchCareers = useCallback(
    async (
      searchPage: number,
      searchQuery: string,
      searchCategory: string,
      searchSort: string
    ) => {
      setLoading(true);
      try {
        const params: Record<string, string | number> = {
          q: searchQuery,
          page: searchPage,
          limit: 12,
        };
        if (searchCategory) params.category = searchCategory;

        const sortMap: Record<string, string> = {
          name_asc: 'name_asc',
          name_desc: 'name_desc',
          salary_high: 'salary_high',
          salary_low: 'salary_low',
          relevance: 'relevance',
        };
        params.sort = sortMap[searchSort] || 'name_asc';

        const res = await axios.get<{
          careers: Career[];
          pagination: Pagination;
        }>(`${API}/careers/search`, { params });
        setCareers(res.data.careers);
        setPagination(res.data.pagination);
      } catch {
        setCareers([]);
        setPagination(null);
      } finally {
        setLoading(false);
      }
    },
    []
  );

  useEffect(() => {
    fetchCareers(page, query, category, sort);
  }, [page, category, sort, fetchCareers]);

  const handleQueryChange = (value: string) => {
    setQuery(value);
    setPage(1);

    if (debounceRef.current) clearTimeout(debounceRef.current);

    if (value.trim().length >= 1) {
      debounceRef.current = setTimeout(async () => {
        try {
          const res = await axios.get<{ suggestions: Suggestion[] }>(
            `${API}/careers/suggestions`,
            { params: { q: value } }
          );
          setSuggestions(res.data.suggestions);
          setShowSuggestions(true);
        } catch {
          setSuggestions([]);
        }
      }, 250);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  };

  const selectSuggestion = (suggestion: Suggestion) => {
    setQuery(suggestion.title);
    setShowSuggestions(false);
    setCategory(suggestion.category);
  };

  const clearCategory = () => {
    setCategory('');
    setPage(1);
  };

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        setShowSuggestions(false);
      }
    }
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  return (
    <div className='min-h-screen bg-slate-50 text-slate-600 pb-12'>
      <div className='max-w-6xl mx-auto px-4 py-12'>
        <div className="mb-10 text-center">
          <h1 className='text-4xl md:text-5xl font-bold text-slate-900 mb-4'>
            Explore Careers
          </h1>
          <p className='text-lg text-slate-600 max-w-2xl mx-auto'>
            Search, filter, and discover career paths that match your interests
          </p>
        </div>

        <div ref={searchRef} className='relative mb-8 bg-white border border-slate-200 rounded-xl p-6 shadow-sm'>
          <div className='flex flex-col md:flex-row gap-4'>
            <div className='relative flex-1'>
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-slate-400">
                  <circle cx="11" cy="11" r="8"></circle>
                  <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                </svg>
              </div>
              <input
                type='text'
                placeholder='Search careers...'
                value={query}
                onChange={e => handleQueryChange(e.target.value)}
                className='w-full pl-10 pr-3 py-2.5 border border-slate-200 rounded-lg bg-white text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-600 transition-all'
                onFocus={() => {
                  if (suggestions.length > 0) setShowSuggestions(true);
                }}
              />
              {showSuggestions && suggestions.length > 0 && (
                <ul className='absolute z-20 top-full left-0 right-0 mt-2 bg-white border border-slate-200 rounded-lg shadow-md overflow-hidden'>
                  {suggestions.map(s => (
                    <li
                      key={s._id}
                      onClick={() => selectSuggestion(s)}
                      className='px-4 py-2.5 cursor-pointer hover:bg-slate-50 text-slate-900 flex justify-between items-center transition-colors'
                    >
                      <span className="font-medium">{s.title}</span>
                      <span className='text-xs font-medium text-slate-500 uppercase tracking-wider'>
                        {s.category}
                      </span>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            <select
              value={category}
              onChange={e => {
                setCategory(e.target.value);
                setPage(1);
              }}
              className='px-3 py-2.5 border border-slate-200 rounded-lg bg-white text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-600 appearance-none cursor-pointer min-w-[200px] transition-all'
            >
              <option value=''>All Categories</option>
              {categories.map(c => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>

            <select
              value={sort}
              onChange={e => {
                setSort(e.target.value);
                setPage(1);
              }}
              className='px-3 py-2.5 border border-slate-200 rounded-lg bg-white text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-600 appearance-none cursor-pointer min-w-[200px] transition-all'
            >
              <option value='name_asc'>Name A-Z</option>
              <option value='name_desc'>Name Z-A</option>
              <option value='salary_high'>Salary: High to Low</option>
              <option value='salary_low'>Salary: Low to High</option>
              <option value='relevance'>Relevance</option>
            </select>
          </div>
        </div>

        {statusMessage && (
          <div className='mb-6 flex items-center justify-between gap-3 rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 shadow-sm'>
            <span className="font-medium">{statusMessage}</span>
            <button
              onClick={clearStatus}
              className='text-slate-400 hover:text-slate-600 transition-colors'
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
          </div>
        )}

        {category && (
          <div className='flex items-center gap-3 mb-6'>
            <span className='text-sm text-slate-500 font-medium'>Active filter:</span>
            <span className='inline-flex items-center gap-1.5 bg-slate-900 text-white border border-slate-900 rounded-full px-4 py-1.5 text-sm font-medium'>
              {category}
              <button onClick={clearCategory} className='text-slate-300 hover:text-white transition-colors ml-1 focus:outline-none'>
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>
            </span>
          </div>
        )}

        {loading ? (
          <div className='text-center py-20 flex flex-col items-center justify-center'>
            <svg className="animate-spin h-8 w-8 text-slate-400 mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            <p className="text-slate-600 font-medium">Searching careers...</p>
          </div>
        ) : careers.length === 0 ? (
          <div className='text-center py-20 bg-white border border-slate-200 rounded-xl shadow-sm'>
            <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center mx-auto mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-slate-400 w-8 h-8">
                <circle cx="11" cy="11" r="8"></circle>
                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
              </svg>
            </div>
            <p className='text-slate-900 font-bold text-xl mb-2'>No careers found</p>
            <p className='text-slate-600'>
              Try adjusting your search or filter
            </p>
          </div>
        ) : (
          <>
            <p className='text-sm text-slate-500 font-medium mb-6 px-2'>
              {pagination?.total} career{pagination?.total !== 1 ? 's' : ''}{' '}
              found
            </p>
            <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
              {careers.map(career => (
                <div
                  key={career._id}
                  className='bg-white border border-slate-200 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow duration-200 flex flex-col h-full'
                >
                  <div className='flex items-start justify-between mb-4 gap-2'>
                    <div>
                      <p className="text-xs font-medium uppercase tracking-wider text-slate-500 mb-1">{career.category}</p>
                      <h3 className='text-lg font-bold text-slate-900'>
                        {career.title}
                      </h3>
                    </div>
                    <SaveCareerButton
                      career={career}
                      isSaved={isSaved(career._id)}
                      onToggle={toggleSave}
                    />
                  </div>

                  <p className='text-sm text-slate-600 mb-6 line-clamp-3 leading-relaxed flex-grow'>
                    {career.description}
                  </p>

                  <div className='flex flex-wrap gap-2 mb-6'>
                    {career.requiredSkills.slice(0, 3).map(skill => (
                      <span
                        key={skill}
                        className='text-xs font-medium px-3 py-1 rounded-full bg-slate-100 border border-slate-200 text-slate-600'
                      >
                        {skill}
                      </span>
                    ))}
                    {career.requiredSkills.length > 3 && (
                      <span className='text-xs font-medium px-3 py-1 rounded-full bg-slate-50 border border-slate-200 text-slate-400'>
                        +{career.requiredSkills.length - 3}
                      </span>
                    )}
                  </div>

                  <div className="mt-auto pt-4 border-t border-slate-100 flex items-center justify-between text-sm text-slate-600">
                    <div className="flex flex-col gap-1.5">
                      <div className="flex items-center gap-1.5">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-slate-400 w-4 h-4">
                          <line x1="12" y1="1" x2="12" y2="23"></line>
                          <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
                        </svg>
                        <span className="font-medium text-slate-900">{career.averageSalary}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-slate-400 w-4 h-4">
                          <polyline points="22 7 13.5 15.5 8.5 10.5 2 17"></polyline>
                          <polyline points="16 7 22 7 22 13"></polyline>
                        </svg>
                        <span className="text-slate-600">{career.growthOutlook}</span>
                      </div>
                    </div>
                    <Link to={`/careers/${career._id}`} className="font-medium text-blue-800 hover:text-blue-600 transition-colors">
                      View details
                    </Link>
                  </div>
                </div>
              ))}
            </div>

            {pagination && pagination.totalPages > 1 && (
              <div className='flex justify-center items-center gap-4 mt-12'>
                <button
                  onClick={() => setPage(p => Math.max(1, p - 1))}
                  disabled={page === 1}
                  className='px-4 py-2 bg-white border border-slate-200 rounded-lg text-sm font-medium text-slate-900 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-slate-50 transition-colors'
                >
                  Previous
                </button>
                <span className='text-sm font-medium text-slate-600'>
                  Page {pagination.page} of {pagination.totalPages}
                </span>
                <button
                  onClick={() =>
                    setPage(p => Math.min(pagination.totalPages, p + 1))
                  }
                  disabled={page === pagination.totalPages}
                  className='px-4 py-2 bg-white border border-slate-200 rounded-lg text-sm font-medium text-slate-900 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-slate-50 transition-colors'
                >
                  Next
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
