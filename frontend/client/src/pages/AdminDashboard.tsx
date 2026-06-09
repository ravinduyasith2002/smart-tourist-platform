/**
 * SmartTouristPlatform - Admin Dashboard Page
 */

import { Users, Calendar, DollarSign, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { StatCard } from '@/components/shared/StatCard';
import { Badge } from '@/components/ui/badge';

export default function AdminDashboard() {
  const pendingApprovals = [
    {
      id: '1',
      name: 'Sarah Johnson',
      role: 'Guide',
      certification: 'Professional Tour Guide',
      status: 'pending',
    },
    {
      id: '2',
      name: 'Mike Chen',
      role: 'Guide',
      certification: 'Adventure Guide',
      status: 'pending',
    },
    {
      id: '3',
      name: 'Emma Wilson',
      role: 'Hotel',
      certification: 'Business License',
      status: 'pending',
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary/10 to-secondary/10 border-b border-border py-8">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold text-foreground mb-2">Admin Dashboard</h1>
          <p className="text-muted-foreground">System overview and management</p>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <StatCard
            icon={Users}
            label="Total Users"
            value="1,234"
            trend={{ value: 8, isPositive: true }}
            color="primary"
          />
          <StatCard
            icon={Calendar}
            label="Total Bookings"
            value="3,456"
            trend={{ value: 12, isPositive: true }}
            color="secondary"
          />
          <StatCard
            icon={DollarSign}
            label="Total Revenue"
            value="$125,450"
            trend={{ value: 15, isPositive: true }}
            color="green"
          />
          <StatCard
            icon={AlertCircle}
            label="Pending Approvals"
            value="12"
            color="red"
          />
        </div>

        {/* Pending Approvals */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-foreground mb-6">Pending Guide & Hotel Approvals</h2>
          <div className="space-y-4">
            {pendingApprovals.map((approval) => (
              <div key={approval.id} className="bg-card border border-border rounded-lg p-6">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="font-semibold text-foreground">{approval.name}</h3>
                      <Badge className="bg-yellow-100 text-yellow-800">
                        {approval.role}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {approval.certification}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" className="text-destructive hover:bg-destructive/10">
                      Reject
                    </Button>
                    <Button className="bg-primary hover:bg-primary/90 text-white">
                      Approve
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* System Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {/* User Statistics */}
          <div className="bg-card border border-border rounded-lg p-6">
            <h3 className="font-semibold text-foreground mb-4">User Distribution</h3>
            <div className="space-y-3">
              {[
                { label: 'Tourists', value: 650, color: 'bg-primary' },
                { label: 'Guides', value: 320, color: 'bg-secondary' },
                { label: 'Hotels', value: 264, color: 'bg-green-600' },
              ].map((item, idx) => (
                <div key={idx}>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm text-muted-foreground">{item.label}</span>
                    <span className="font-medium text-foreground">{item.value}</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div className={`${item.color} h-2 rounded-full`} style={{ width: `${(item.value / 650) * 100}%` }}></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* System Health */}
          <div className="bg-card border border-border rounded-lg p-6">
            <h3 className="font-semibold text-foreground mb-4">System Health</h3>
            <div className="space-y-3">
              {[
                { label: 'Server Uptime', value: '99.9%', status: 'healthy' },
                { label: 'API Response Time', value: '145ms', status: 'healthy' },
                { label: 'Database Status', value: 'Optimal', status: 'healthy' },
              ].map((item, idx) => (
                <div key={idx} className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">{item.label}</span>
                  <Badge className={item.status === 'healthy' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}>
                    {item.value}
                  </Badge>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div>
          <h2 className="text-2xl font-bold text-foreground mb-6">Recent Activity</h2>
          <div className="space-y-2">
            {[
              'New user registration: Alex Johnson',
              'Guide booking completed: Sarah & John',
              'Hotel review submitted: 5 stars',
              'Payment processed: $450',
              'New guide application: Mike Chen',
            ].map((activity, idx) => (
              <div key={idx} className="flex items-center gap-3 p-3 bg-card border border-border rounded-lg">
                <div className="w-2 h-2 bg-primary rounded-full"></div>
                <p className="text-sm text-foreground">{activity}</p>
                <span className="text-xs text-muted-foreground ml-auto">Just now</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
