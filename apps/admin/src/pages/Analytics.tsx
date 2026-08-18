import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Legend
} from 'recharts';
import { Download, Calendar as CalendarIcon } from 'lucide-react';

const activityData = [
  { name: 'Mon', active: 4000, new: 240 },
  { name: 'Tue', active: 3000, new: 139 },
  { name: 'Wed', active: 2000, new: 980 },
  { name: 'Thu', active: 2780, new: 390 },
  { name: 'Fri', active: 1890, new: 480 },
  { name: 'Sat', active: 2390, new: 380 },
  { name: 'Sun', active: 3490, new: 430 },
];

const categoryData = [
  { name: 'Technology', value: 400 },
  { name: 'Healthcare', value: 300 },
  { name: 'Business', value: 300 },
  { name: 'Arts', value: 200 },
  { name: 'Science', value: 150 },
];

const COLORS = ['#0d9488', '#3b82f6', '#f59e0b', '#8b5cf6', '#ec4899'];

export function Analytics() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Analytics & Reporting</h2>
          <p className="text-gray-500">Comprehensive view of platform usage and user trends.</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" className="gap-2">
            <CalendarIcon className="h-4 w-4" />
            Last 30 Days
          </Button>
          <Button className="gap-2">
            <Download className="h-4 w-4" />
            Export Report
          </Button>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Weekly User Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={activityData}
                  margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="name" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                  <YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                  <RechartsTooltip cursor={{ fill: 'transparent' }} />
                  <Legend />
                  <Bar dataKey="active" name="Active Users" fill="#0d9488" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="new" name="New Signups" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Top Career Interests</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={categoryData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    fill="#8884d8"
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {categoryData.map((_entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <RechartsTooltip />
                  <Legend verticalAlign="bottom" height={36}/>
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Assessment Completion Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-center py-6">
              <div className="relative w-32 h-32">
                <svg className="w-full h-full transform -rotate-90">
                  <circle cx="64" cy="64" r="60" stroke="currentColor" strokeWidth="8" fill="transparent" className="text-gray-100" />
                  <circle cx="64" cy="64" r="60" stroke="currentColor" strokeWidth="8" fill="transparent" strokeDasharray={2 * Math.PI * 60} strokeDashoffset={2 * Math.PI * 60 * (1 - 0.78)} className="text-teal-600" />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center flex-col">
                  <span className="text-2xl font-bold text-gray-900">78%</span>
                </div>
              </div>
            </div>
            <p className="text-center text-sm text-gray-500 mt-2">Of users complete the core assessment within 3 days of signup.</p>
          </CardContent>
        </Card>
        
        <Card className="col-span-2">
          <CardHeader>
            <CardTitle>Top Saved Careers</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { name: 'Software Engineer', count: 1245, trend: '+12%' },
                { name: 'Data Scientist', count: 980, trend: '+8%' },
                { name: 'Registered Nurse', count: 856, trend: '+15%' },
                { name: 'Financial Analyst', count: 742, trend: '-2%' },
                { name: 'Marketing Manager', count: 620, trend: '+5%' },
              ].map((career, i) => (
                <div key={i} className="flex items-center justify-between">
                  <div className="flex items-center">
                    <span className="w-6 text-gray-400 font-medium">{i + 1}.</span>
                    <span className="font-medium">{career.name}</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="text-sm font-medium">{career.count} saves</span>
                    <span className={`text-xs ${career.trend.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>
                      {career.trend}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
