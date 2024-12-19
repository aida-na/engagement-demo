'use client';

import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Users, TrendingUp, Activity, UserMinus, Database, Cloud, ChevronDown, ArrowDown, ArrowUp } from 'lucide-react';

const HomePage = () => {
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good Morning';
    if (hour < 17) return 'Good Afternoon';
    return 'Good Evening';
  };

  // Population metrics data
  const metrics = {
    totalPopulation: 340532,
    predictedEnrollment: 382650,
    engagement: 76.4,
    retention: 92.3
  };

  // Cohort data
  const cohorts = [
    {
      name: 'Care Gaps',
      description: 'Members with identified gaps in recommended care',
      engagementRate: 68.5,
      engagementChange: -2.3,
      retentionRate: 72.8,
      retentionChange: -4.2,
      timeframe: 'Last 30 days',
      membersCount: 1243
    },
    {
      name: 'Wellness Program',
      description: 'Members participating in preventive wellness initiatives',
      engagementRate: 75.2,
      engagementChange: -4.1,
      retentionRate: 78.4,
      retentionChange: -2.8,
      timeframe: 'Last 30 days',
      membersCount: 2156
    }
  ];

  // Connection statuses
  const connections = {
    snowflake: 'Connected',
    GCP: 'Connected',
    databricks: 'Processing'
  };

  const exportStatus = {
    status: 'Active',
    lastSync: '10 minutes ago',
    pendingRecords: 234
  };

  return (
    <div className="p-6 max-w-6xl mx-auto space-y-6">
      {/* Greeting */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">{getGreeting()}, Anmol</h1>
        <span className="text-sm text-gray-500">
          {new Date().toLocaleDateString('en-US', { 
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
          })}
        </span>
      </div>

      {/* Main Metrics */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center space-x-4">
              <Users className="w-8 h-8 text-blue-500" />
              <div>
                <p className="text-sm font-medium text-gray-500">Total Population</p>
                <h3 className="text-2xl font-bold">{metrics.totalPopulation.toLocaleString()}</h3>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center space-x-4">
              <TrendingUp className="w-8 h-8 text-green-500" />
              <div>
                <p className="text-sm font-medium text-gray-500">Predicted Next Season</p>
                <h3 className="text-2xl font-bold">{metrics.predictedEnrollment.toLocaleString()}</h3>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center space-x-4">
              <Activity className="w-8 h-8 text-purple-500" />
              <div>
                <p className="text-sm font-medium text-gray-500">Engagement</p>
                <h3 className="text-2xl font-bold">{metrics.engagement}%</h3>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center space-x-4">
              <Users className="w-8 h-8 text-indigo-500" />
              <div>
                <p className="text-sm font-medium text-gray-500">Retention</p>
                <h3 className="text-2xl font-bold">{metrics.retention}%</h3>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Cohorts Section */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-2">
              <Activity className="w-6 h-6 text-blue-500" />
              <h2 className="text-xl font-semibold">Churn Risk</h2>
            </div>
            <div className="text-sm text-gray-500">
              Updated {new Date().toLocaleTimeString()}
            </div>
          </div>
          <div className="space-y-6">
            {cohorts.map((cohort) => (
              <div key={cohort.name} className="p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                <div className="grid md:grid-cols-2 gap-4">
                  {/* Left column - Cohort info */}
                  <div>
                    <h3 className="font-medium text-lg text-gray-900">{cohort.name}</h3>
                    <p className="text-sm text-gray-600 mt-1">{cohort.description}</p>
                    <div className="mt-2 text-sm text-gray-500">
                      {cohort.membersCount.toLocaleString()} members
                    </div>
                  </div>
                  
                  {/* Right column - Metrics */}
                  <div className="grid grid-cols-2 gap-4">
                    {/* Retention Rate */}
                    <div className="bg-white p-3 rounded-lg">
                      <div className="text-sm text-gray-600 mb-1">Retention Rate</div>
                      <div className="flex items-center">
                        <span className="text-xl font-bold">{cohort.retentionRate}%</span>
                        <span className={`ml-2 flex items-center text-sm ${
                          cohort.retentionChange < 0 ? 'text-red-500' : 'text-green-500'
                        }`}>
                          {cohort.retentionChange < 0 ? (
                            <ArrowDown className="w-4 h-4 mr-1" />
                          ) : (
                            <ArrowUp className="w-4 h-4 mr-1" />
                          )}
                          {Math.abs(cohort.retentionChange)}%
                        </span>
                      </div>
                    </div>
                    
                    {/* Engagement Rate */}
                    <div className="bg-white p-3 rounded-lg">
                      <div className="text-sm text-gray-600 mb-1">Engagement Rate</div>
                      <div className="flex items-center">
                        <span className="text-xl font-bold text-purple-600">{cohort.engagementRate}%</span>
                        <span className={`ml-2 flex items-center text-sm ${
                          cohort.engagementChange > 0 ? 'text-green-500' : 'text-red-500'
                        }`}>
                          {cohort.engagementChange > 0 ? (
                            <ArrowUp className="w-4 h-4 mr-1" />
                          ) : (
                            <ArrowDown className="w-4 h-4 mr-1" />
                          )}
                          {Math.abs(cohort.engagementChange)}%
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* System Status Section */}
      <div className="grid gap-4 md:grid-cols-2">
        {/* Data Warehouse Connections */}
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2 mb-4">
              <Database className="w-6 h-6 text-blue-500" />
              <h2 className="text-xl font-semibold">Data Warehouse Status</h2>
            </div>
            <div className="space-y-3">
              {Object.entries(connections).map(([platform, status]) => (
                <div key={platform} className="flex justify-between items-center">
                  <span className="capitalize">{platform}</span>
                  <span className={`px-2 py-1 rounded-full text-xs ${
                    status === 'Connected' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {status}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Marketing Cloud Export */}
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2 mb-4">
              <Cloud className="w-6 h-6 text-blue-500" />
              <h2 className="text-xl font-semibold">SFMC Export Status</h2>
            </div>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span>Status</span>
                <span className="px-2 py-1 rounded-full text-xs bg-green-100 text-green-800">
                  {exportStatus.status}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span>Last Sync</span>
                <span className="text-gray-600">{exportStatus.lastSync}</span>
              </div>
              <div className="flex justify-between items-center">
                <span>Pending Records</span>
                <span className="text-gray-600">{exportStatus.pendingRecords}</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default HomePage;