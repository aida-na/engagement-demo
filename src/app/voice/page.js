'use client';

import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Phone, Battery, Clock, Users, Brain, HeartPulse } from 'lucide-react';

const VoiceAIDashboard = () => {
  // Updated sample data with new campaigns
  const agentData = [
    {
      id: 1,
      name: 'Agent Emma',
      program: 'GLP1 Therapy Enrollment',
      status: 'Active',
      activeFrom: '2024-02-15',
      callsMade: 45000,
      totalCalls: 62500,
      avgCallLength: '4:45',
      optInRate: 72,
      handoffRate: 38,
      lastActive: '1 minute ago',
      cohorts: ['GLP1 Candidates']
    },
    {
      id: 2,
      name: 'Agent Sarah',
      program: 'Diabetes & Mental Health Program',
      status: 'Paused',
      activeFrom: '2024-01-20',
      callsMade: 28048,
      totalCalls: 165000,
      avgCallLength: '5:15',
      optInRate: 65,
      handoffRate: 42,
      lastActive: '2 hours ago',
      cohorts: ['Members with diabetes and mental health conditions']
    },
  ];

  const getStatusColor = (status) => {
    const colors = {
      'Active': 'bg-green-100 text-green-800',
      'Paused': 'bg-yellow-100 text-yellow-800',
      'Completed': 'bg-blue-100 text-blue-800'
    };
    return colors[status] || 'bg-gray-100 text-gray-800';
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const getProgramColor = (program) => {
    const colors = {
      'GLP1 Therapy Enrollment': 'text-emerald-600',
      'Mental Health Program': 'text-purple-600',
      'Hypertension Management': 'text-red-600'
    };
    return colors[program] || 'text-gray-600';
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-2">Voice AI Agents Dashboard</h1>
        <p className="text-gray-600">Real-time monitoring of outreach campaigns</p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <Card>
          <CardContent className="pt-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Total Active Agents</p>
                <p className="text-2xl font-bold">
                  {agentData.filter(agent => agent.status === 'Active').length}
                </p>
              </div>
              <Battery className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Total Members Reached</p>
                <p className="text-2xl font-bold">
                  {agentData.reduce((sum, agent) => sum + agent.callsMade, 0).toLocaleString()}
                </p>
              </div>
              <Phone className="h-8 w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Avg Opt-in Rate</p>
                <p className="text-2xl font-bold">
                  {(agentData.reduce((sum, agent) => sum + agent.optInRate, 0) / agentData.length).toFixed(1)}%
                </p>
              </div>
              <Users className="h-8 w-8 text-purple-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Agents Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {agentData.map(agent => (
          <Card key={agent.id} className="overflow-hidden">
            <CardContent className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="font-semibold text-lg">{agent.name}</h3>
                  <p className={`${getProgramColor(agent.program)} font-medium`}>{agent.program}</p>
                </div>
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(agent.status)}`}>
                  {agent.status}
                </span>
              </div>

              {/* Cohorts Section */}
              <div className="mb-4">
                <p className="text-sm text-gray-500 mb-2">Target Cohorts:</p>
                <div className="flex flex-wrap gap-2">
                  {agent.cohorts.map((cohort, index) => (
                    <span key={index} className="bg-blue-50 text-blue-700 px-2 py-1 rounded-md text-sm">
                      {cohort}
                    </span>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-500">Members Reached</p>
                  <p className="font-medium">
                    {agent.callsMade.toLocaleString()} / {agent.totalCalls.toLocaleString()}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Avg Call Length</p>
                  <p className="font-medium">{agent.avgCallLength}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Opt-in Rate</p>
                  <p className="font-medium">{agent.optInRate}%</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Handoff Rate</p>
                  <p className="font-medium">{agent.handoffRate}%</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Active From</p>
                  <p className="font-medium">{formatDate(agent.activeFrom)}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Last Active</p>
                  <div className="flex items-center gap-1">
                    <Clock className="h-4 w-4 text-gray-400" />
                    <p className="font-medium">{agent.lastActive}</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default VoiceAIDashboard;