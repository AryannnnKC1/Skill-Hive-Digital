import { useState, useEffect } from 'react';
import { Search, Plus, Filter, FileText, Video, Link as LinkIcon, Edit, Trash2 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card';
import { Input } from '../components/ui/Input';
import { Button } from '../components/ui/Button';
import { Modal } from '../components/ui/Modal';
import { fetchResources, createResource, deleteResource } from '../lib/api';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../components/ui/Table';

const getTypeIcon = (type: string) => {
  switch (type?.toLowerCase()) {
    case 'article': return <FileText className="h-4 w-4 text-blue-500" />;
    case 'video': return <Video className="h-4 w-4 text-purple-500" />;
    case 'course': return <LinkIcon className="h-4 w-4 text-green-500" />;
    case 'certification': return <LinkIcon className="h-4 w-4 text-orange-500" />;
    default: return <FileText className="h-4 w-4 text-gray-500" />;
  }
};

export function Resources() {
  const [resources, setResources] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [formData, setFormData] = useState({ 
    title: '', 
    description: 'A comprehensive resource for career development',
    type: 'Article', 
    provider: '', 
    url: 'https://example.com',
    difficulty: 'Beginner',
    careerFields: [],
    skills: []
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const loadData = () => {
    setLoading(true);
    setError('');
    fetchResources()
      .then(setResources)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleAddSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    
    try {
      await createResource(formData);
      setSuccess('Resource created successfully!');
      setIsAddOpen(false);
      setFormData({ 
        title: '', 
        description: 'A comprehensive resource for career development',
        type: 'Article', 
        provider: '', 
        url: 'https://example.com',
        difficulty: 'Beginner',
        careerFields: [],
        skills: []
      });
      loadData();
      setTimeout(() => setSuccess(''), 3000);
    } catch (err: any) {
      setError(err.message);
    }
  };

  const handleDelete = async (id: string, title: string) => {
    if (!confirm(`Are you sure you want to delete "${title}"?`)) return;
    setError('');
    
    try {
      await deleteResource(id);
      setSuccess('Resource deleted successfully!');
      loadData();
      setTimeout(() => setSuccess(''), 3000);
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Career Resources</h2>
          <p className="text-gray-500">Manage articles, videos, and learning materials.</p>
        </div>
        <Button className="gap-2" onClick={() => setIsAddOpen(true)}>
          <Plus className="h-4 w-4" />
          Add Resource
        </Button>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
          {error}
        </div>
      )}

      {success && (
        <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg">
          {success}
        </div>
      )}

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Resource Library ({resources.length})</CardTitle>
            <div className="flex items-center gap-2">
              <div className="relative w-64">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                <Input
                  type="search"
                  placeholder="Search resources..."
                  className="pl-8"
                />
              </div>
              <Button variant="outline" className="px-3">
                <Filter className="h-4 w-4 mr-2" />
                Filters
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {loading ? (
             <div className="text-center py-8 text-gray-500">Loading resources...</div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Resource Title</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Provider</TableHead>
                  <TableHead>Difficulty</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {resources.map((resource) => (
                  <TableRow key={resource._id}>
                    <TableCell className="font-medium">
                      <div className="flex items-center gap-2">
                        {getTypeIcon(resource.type)}
                        {resource.title}
                      </div>
                    </TableCell>
                    <TableCell>{resource.type}</TableCell>
                    <TableCell>{resource.provider || 'N/A'}</TableCell>
                    <TableCell>{resource.difficulty}</TableCell>
                    <TableCell>
                      <span className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ring-1 ring-inset ${
                        resource.isActive !== false ? 'bg-green-50 text-green-700 ring-green-600/20' : 'bg-gray-50 text-gray-700 ring-gray-600/20'
                      }`}>
                        {resource.isActive !== false ? 'Published' : 'Draft'}
                      </span>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0" title="Edit">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="h-8 w-8 p-0 text-red-600 hover:text-red-700 hover:bg-red-50" 
                          onClick={() => handleDelete(resource._id, resource.title)}
                          title="Delete"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
                {resources.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-4 text-gray-500">No resources found.</TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>

      <Modal isOpen={isAddOpen} onClose={() => setIsAddOpen(false)} title="Add New Resource">
        <form onSubmit={handleAddSubmit} className="space-y-4">
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-3 py-2 rounded text-sm">
              {error}
            </div>
          )}
          <div>
            <label className="block text-sm font-medium mb-1">Title</label>
            <Input 
              required 
              value={formData.title} 
              onChange={e => setFormData({...formData, title: e.target.value})} 
              placeholder="e.g. Resume Writing Guide" 
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Description</label>
            <textarea 
              required
              value={formData.description}
              onChange={e => setFormData({...formData, description: e.target.value})}
              className="flex w-full rounded-md border border-gray-200 bg-transparent px-3 py-2 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-teal-600 min-h-[80px]"
              placeholder="Describe the resource..."
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Type</label>
            <select 
              className="flex h-9 w-full rounded-md border border-gray-200 bg-transparent px-3 py-1 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-teal-600"
              value={formData.type}
              onChange={e => setFormData({...formData, type: e.target.value})}
            >
              <option>Article</option>
              <option>Video</option>
              <option>Course</option>
              <option>Certification</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Provider / Author</label>
            <Input 
              required 
              value={formData.provider} 
              onChange={e => setFormData({...formData, provider: e.target.value})} 
              placeholder="e.g. Coursera, John Doe" 
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">URL</label>
            <Input 
              required 
              type="url"
              value={formData.url} 
              onChange={e => setFormData({...formData, url: e.target.value})} 
              placeholder="https://example.com/resource" 
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Difficulty</label>
            <select 
              className="flex h-9 w-full rounded-md border border-gray-200 bg-transparent px-3 py-1 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-teal-600"
              value={formData.difficulty}
              onChange={e => setFormData({...formData, difficulty: e.target.value})}
            >
              <option>Beginner</option>
              <option>Intermediate</option>
              <option>Advanced</option>
            </select>
          </div>
          <div className="flex justify-end gap-2 mt-6">
            <Button type="button" variant="outline" onClick={() => setIsAddOpen(false)}>Cancel</Button>
            <Button type="submit">Publish Resource</Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
