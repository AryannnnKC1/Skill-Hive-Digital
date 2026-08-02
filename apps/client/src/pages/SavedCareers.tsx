import { SavedCareersPage } from '../components/SavedCareersPage';
import { useSavedCareers } from '../hooks/useSavedCareers';

function SavedCareers() {
  const { savedCareers, loading, error, isSaved, toggleSave, remove } =
    useSavedCareers();

  return (
    <div className='min-h-screen bg-blue-50 font-sans'>
      <div className='max-w-5xl mx-auto px-4 py-8 md:py-12'>
        <SavedCareersPage
          entries={savedCareers}
          loading={loading}
          error={error}
          onRemove={remove}
          onToggleSave={toggleSave}
          isSaved={isSaved}
        />
      </div>
    </div>
  );
}

export default SavedCareers;
