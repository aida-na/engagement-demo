'use client';

import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Phone, Battery, Clock, Users } from 'lucide-react';

const VoiceAIDashboard = () => {
  // Updated sample data
  const agentData = [
    {
      id: 1,
      name: 'Agent Emma',
      program: 'Enrollment',
      status: 'Active',
      activeFrom: '2024-01-15',
      callsMade: 125,
      totalCalls: 150,
      avgCallLength: '4:32',
      optInRate: 68,
      handoffRate: 42,
      lastActive: '2 minutes ago',
      cohorts: [
        'Chronic Disease Management',
        'Members with Diabetes',
        'High-Risk Seniors'
      ]
    },
    {
      id: 2,
      name: 'Agent Sarah',
      program: 'Engagement',
      status: 'Active',
      activeFrom: '2024-02-01',
      callsMade: 98,
      totalCalls: 120,
      avgCallLength: '3:45',
      optInRate: 72,
      handoffRate: 38,
      lastActive: '5 minutes ago',
      cohorts: [
        'Members with Diabetes',
        'Medication Non-adherent'
      ]
    },
    {
      id: 3,
      name: 'Agent Michael',
      program: 'Retention',
      status: 'Paused',
      activeFrom: '2024-01-20',
      callsMade: 85,
      totalCalls: 100,
      avgCallLength: '5:15',
      optInRate: 75,
      handoffRate: 45,
      lastActive: '1 hour ago',
      cohorts: [
        'High-Risk Seniors',
        'Recent Hospital Discharge',
        'Care Gap Alert'
      ]
    },
    {
      id: 4,
      name: 'Agent David',
      program: 'Enrollment',
      status: 'Active',
      activeFrom: '2024-02-10',
      callsMade: 42,
      totalCalls: 80,
      avgCallLength: '4:15',
      optInRate: 70,
      handoffRate: 35,
      lastActive: '1 minute ago',
      cohorts: ['Preventive Care Due']
    }
  ];

  const getStatusColor = (status) => {
    return status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800';
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
      'Enrollment': 'text-blue-600',
      'Engagement': 'text-purple-600',
      'Retention': 'text-indigo-600'
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
                <p className="text-sm text-gray-500">Total Calls Made</p>
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
                  <p className="text-sm text-gray-500">Calls Progress</p>
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