'use client';

import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Phone, Battery, Users, Monitor, Headset, Layers } from 'lucide-react';

const VoiceDashboard = () => {
  const programData = {
    humanPrograms: [
      {
        id: 1,
        name: 'Diabetes Program Enrollment 2025',
        status: 'Active',
        startDate: '2024-01-19',
        endDate: '2025-12-31',
        targetCohorts: ['Unmanaged A1C', 'Prediabetes Risk'],
        description: 'Diabetes management and enrollment program with personalized outreach',
        channel: 'voice',
        engagementRate: 67,
        membersReached: 60102,
        totalMembers: 75000,
        agents: [
          {
            id: 2,
            name: 'Care Team',
            type: 'Human',
            status: 'Active',
            answerRate: 15,
            avgCallLength: '1:15',
            optInRate: 67,
            handoffRate: 42
          }
        ]
      }
    ],
    aiPrograms: [
      {
        id: 2,
        name: 'Diabetes Risk Management',
        status: 'Paused',
        startDate: '2024-12-14',
        endDate: '2025-12-31',
        targetCohorts: ['Digital Engagement', 'Mental Health Comorbidity'],
        description: 'AI-powered outreach for diabetes risk management and prevention',
        channel: 'voice',
        engagementRate: 45,
        membersReached: 15025,
        totalMembers: 18000,
        agents: [
          {
            id: 1,
            name: 'Diabetes AI Assistant',
            type: 'AI',
            status: 'Paused',
            answerRate: 13,
            avgCallLength: '1:45',
            optInRate: 45,
            handoffRate: 38
          }
        ]
      }
    ]
  };

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

  const totalMembersReached = [...programData.humanPrograms, ...programData.aiPrograms]
    .reduce((sum, program) => sum + program.membersReached, 0);

  const avgEngagementRate = [...programData.aiPrograms, ...programData.humanPrograms]
    .reduce((sum, program) => sum + program.engagementRate, 0) / 
    ([...programData.aiPrograms, ...programData.humanPrograms].length);

  const ProgramSection = ({ title, programs, icon: Icon, accentColor }) => (
    <div className="mb-8">
      <div className="flex items-center gap-2 mb-4">
        <Icon className={`h-6 w-6 ${accentColor}`} />
        <h2 className="text-xl font-bold">{title}</h2>
      </div>
      <div className="space-y-6">
        {programs.map(program => (
          <Card key={program.id} className={`border-l-4 ${accentColor.includes('blue') ? 'border-l-green-500' : 'border-l-gray-500'}`}>
            <CardContent className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="font-semibold text-lg">
                    <a href="/voice-campaigns" className="hover:text-blue-600 hover:underline">
                      {program.name}
                    </a>
                  </h3>
                  <p className="text-sm text-gray-500">{program.description}</p>
                </div>
                <div className="flex items-center gap-2">
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(program.status)}`}>
                    {program.status}
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                <div>
                  <p className="text-sm text-gray-500">Active From</p>
                  <p className="font-medium">{formatDate(program.startDate)}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Members Reached</p>
                  <p className="font-medium">{program.membersReached.toLocaleString()} / {program.totalMembers.toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Answer Rate</p>
                  <p className="font-medium">{program.agents[0].answerRate}%</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Opt-in Rate</p>
                  <p className="font-medium">{program.agents[0].optInRate}%</p>
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
                <div>
                  <p className="text-sm text-gray-500">Avg Call Length</p>
                  <p className="font-medium">{program.agents[0].avgCallLength}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Handoff Rate</p>
                  <p className="font-medium">{program.agents[0].handoffRate}%</p>
                </div>
              </div>

              <div>
                <p className="text-sm text-gray-500 mb-2">Target Cohorts</p>
                <div className="flex flex-wrap gap-2">
                  {program.targetCohorts.map((cohort, index) => (
                    <span key={index} className="bg-blue-50 text-blue-700 px-2 py-1 rounded-md text-sm">
                      {cohort}
                    </span>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-2">Voice Campaigns Dashboard</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <Card>
          <CardContent className="pt-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Active Programs</p>
                <p className="text-2xl font-bold">{programData.aiPrograms.length + programData.humanPrograms.length}</p>
              </div>
              <Layers className="h-8 w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Total Members Reached</p>
                <p className="text-2xl font-bold">{totalMembersReached.toLocaleString()}</p>
              </div>
              <Users className="h-8 w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Avg Engagement Rate</p>
                <p className="text-2xl font-bold">{avgEngagementRate.toFixed(1)}%</p>
              </div>
              <Phone className="h-8 w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      <ProgramSection 
        title="Call Campaigns" 
        programs={programData.humanPrograms} 
        icon={Headset}
        accentColor="text-gray-500"
      />

      <ProgramSection 
        title="Voice AI Campaigns" 
        programs={programData.aiPrograms} 
        icon={Monitor}
        accentColor="text-gray-500"
      />
    </div>
  );
};

export default VoiceDashboard;