import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { fetchResources } from '../api'
import type { Resource } from '../types'

function Resources() {
  const [resources, setResources] = useState<Resource[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const [search, setSearch] = useState('')
  const [type, setType] = useState('')
  const [difficulty, setDifficulty] = useState('')
  const [careerField, setCareerField] = useState('')

  useEffect(() => {
    const loadResources = async () => {
      try {
        setLoading(true)
        setError(null)

        const data = await fetchResources({
          search: search || undefined,
          type: type || undefined,
          difficulty: difficulty || undefined,
          careerField: careerField || undefined,
        })

        setResources(data)
      } catch (err) {
        console.error(err)
        setError('Unable to load resources.')
      } finally {
        setLoading(false)
      }
    }

    loadResources()
  }, [search, type, difficulty, careerField])

  return (
    <main className="min-h-screen bg-gradient-dashboard text-text-primary">
      <div className="mx-auto max-w-7xl px-4 py-8 md:px-8 lg:py-12">

        {/* Header */}
        <div className="mb-8">
          <Link
            to="/"
            className="text-sm font-medium text-accent hover:text-accent-hover"
          >
            ← Back
          </Link>

          <h1 className="mt-4 text-3xl font-bold display-heading">
            Career Resources
          </h1>

          <p className="mt-2 max-w-2xl text-text-secondary">
            Explore courses, articles, videos, and certifications to build
            the skills needed for your career.
          </p>
        </div>

        {/* Filters */}
        <section className="mb-8 glass-card rounded-[20px] p-6">
          <div className="grid gap-4 md:grid-cols-4">

            {/* Search */}
            <input
              type="text"
              placeholder="Search resources..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="glass-input rounded-lg text-sm"
            />

            {/* Type */}
            <select
              value={type}
              onChange={(e) => setType(e.target.value)}
              className="glass-input rounded-lg text-sm"
            >
              <option value="">All Types</option>
              <option value="Course">Course</option>
              <option value="Article">Article</option>
              <option value="Video">Video</option>
              <option value="Certification">Certification</option>
            </select>

            {/* Difficulty */}
            <select
              value={difficulty}
              onChange={(e) => setDifficulty(e.target.value)}
              className="glass-input rounded-lg text-sm"
            >
              <option value="">All Levels</option>
              <option value="Beginner">Beginner</option>
              <option value="Intermediate">Intermediate</option>
              <option value="Advanced">Advanced</option>
            </select>

            {/* Career Field */}
            <input
              type="text"
              placeholder="Career field..."
              value={careerField}
              onChange={(e) => setCareerField(e.target.value)}
              className="glass-input rounded-lg text-sm"
            />

          </div>
        </section>

        {/* Loading */}
        {loading && (
          <div className="glass-card rounded-[20px] p-8 text-center">
            <p className="text-text-secondary">
              Loading resources...
            </p>
          </div>
        )}

        {/* Error */}
        {!loading && error && (
          <div className="glass-card rounded-[20px] p-8 text-center">
            <p className="text-red-500">
              {error}
            </p>
          </div>
        )}

        {/* Empty */}
        {!loading && !error && resources.length === 0 && (
          <div className="glass-card rounded-[20px] p-8 text-center">
            <p className="font-medium text-text-primary">
              No resources found.
            </p>
            <p className="mt-2 text-sm text-text-secondary">
              Try changing your search or filters.
            </p>
          </div>
        )}

        {/* Resources */}
        {!loading && !error && resources.length > 0 && (
          <section className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {resources.map((resource) => (
              <article
                key={resource._id}
                className="flex flex-col glass-card rounded-[20px] p-6"
              >
                <div className="mb-4 flex items-center justify-between gap-3">
                  <span className="rounded-full bg-green-alpha-08 px-3 py-1 text-xs font-medium text-text-secondary">
                    {resource.type}
                  </span>

                  <span className="text-xs font-medium text-text-secondary">
                    {resource.difficulty}
                  </span>
                </div>

                <h2 className="text-lg font-bold text-text-primary">
                  {resource.title}
                </h2>

                <p className="mt-2 text-sm text-text-secondary line-clamp-3">
                  {resource.description}
                </p>

                <p className="mt-4 text-xs font-medium text-text-tertiary">
                  Provider: {resource.provider}
                </p>

                {/* Skills */}
                {resource.skills.length > 0 && (
                  <div className="mt-4 flex flex-wrap gap-2">
                    {resource.skills.slice(0, 4).map((skill) => (
                      <span
                        key={skill}
                        className="rounded-md border border-green-alpha-18 bg-green-alpha-08 px-2 py-1 text-xs text-text-secondary"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                )}

                <div className="mt-auto pt-6">
                  <Link
                    to={`/resources/${resource._id}`}
                    className="inline-flex w-full items-center justify-center btn-primary px-4 py-2 text-sm font-medium text-white rounded-lg"
                  >
                    View Resource
                  </Link>
                </div>
              </article>
            ))}
          </section>
        )}

      </div>
    </main>
  )
}

export default Resources