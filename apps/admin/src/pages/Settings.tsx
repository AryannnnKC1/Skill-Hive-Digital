import { Save } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card';
import { Input } from '../components/ui/Input';
import { Button } from '../components/ui/Button';

export function Settings() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Platform Settings</h2>
        <p className="text-gray-500">Manage your platform configuration and preferences.</p>
      </div>

      <div className="grid gap-6 md:grid-cols-4">
        <div className="md:col-span-1">
          <nav className="flex flex-col space-y-1">
            <a href="#" className="bg-gray-100 text-gray-900 px-3 py-2 rounded-md text-sm font-medium">General</a>
            <a href="#" className="text-gray-600 hover:bg-gray-50 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium">Security</a>
            <a href="#" className="text-gray-600 hover:bg-gray-50 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium">Team Members</a>
            <a href="#" className="text-gray-600 hover:bg-gray-50 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium">Email Preferences</a>
            <a href="#" className="text-gray-600 hover:bg-gray-50 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium">API Keys</a>
          </nav>
        </div>

        <div className="md:col-span-3 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Platform Information</CardTitle>
              <p className="text-sm text-gray-500">Update your platform name and contact details.</p>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-1">
                <label className="text-sm font-medium">Platform Name</label>
                <Input defaultValue="CareerCounselling Portal" />
              </div>
              <div className="space-y-1">
                <label className="text-sm font-medium">Support Email</label>
                <Input defaultValue="support@careercounsel.com" type="email" />
              </div>
              <div className="space-y-1">
                <label className="text-sm font-medium">Contact Phone</label>
                <Input defaultValue="+1 (555) 123-4567" type="tel" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Appearance</CardTitle>
              <p className="text-sm text-gray-500">Customize the look and feel of the user portal.</p>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-1">
                <label className="text-sm font-medium">Brand Color</label>
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-md bg-teal-600 border border-gray-200"></div>
                  <Input defaultValue="#0d9488" className="w-32" />
                </div>
              </div>
              <div className="space-y-1">
                <label className="text-sm font-medium">Logo URL</label>
                <Input defaultValue="https://careercounsel.com/logo.png" />
              </div>
            </CardContent>
          </Card>

          <div className="flex justify-end">
            <Button className="gap-2">
              <Save className="h-4 w-4" />
              Save Changes
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
