"use client"
import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Plus, Minus, Wand2, Users, Route, Sparkles, AlertCircle, CheckCircle2 } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';

const CampaignDashboard = () => {
  const [step, setStep] = useState(1);
  const [campaignData, setCampaignData] = useState({
    type: 'new',
    goal: '',
    journey: '',
    selectedCohorts: [],
    channels: [],
    content: ''
  });

  // Add missing state variables
  const [contentStructure, setContentStructure] = useState([
    { id: 1, label: 'Subject Line', content: '', enabled: true, required: true, placeholder: 'Enter subject line...' },
    { id: 2, label: 'Body Content', content: '', enabled: true, required: true, placeholder: 'Enter main content...' }
  ]);
  const [writingGuidelines, setWritingGuidelines] = useState([
    'Use clear, concise language',
    'Maintain professional tone'
  ]);
  const [brandGuidelines, setBrandGuidelines] = useState([
    'Include company logo',
    'Use approved color scheme'
  ]);
  const [newGuideline, setNewGuideline] = useState('');
  const [selectedChannels, setSelectedChannels] = useState([]);
  const [previewMode, setPreviewMode] = useState(false);

  // Add missing cohort options
  const cohortOptions = [
    {
      id: 1,
      name: "High-Risk Patients",
      description: "Patients with multiple chronic conditions or recent hospitalizations",
      size: 2456,
      engagement: "Medium",
      success_rate: "76%",
      tags: ["Priority", "High Impact"],
      aiRecommended: true
    },
    {
      id: 2,
      name: "Medication Non-Adherent",
      description: "Patients who have missed medication refills in the last 3 months",
      size: 1823,
      engagement: "Low",
      success_rate: "82%",
      tags: ["Urgent", "Care Gap"],
      aiRecommended: true
    },
    {
      id: 3,
      name: "Preventive Care Due",
      description: "Patients overdue for routine screenings or vaccinations",
      size: 3254,
      engagement: "High",
      success_rate: "68%",
      tags: ["Preventive", "Routine"],
      aiRecommended: false
    },
    {
      id: 4,
      name: "Recent Discharge",
      description: "Patients discharged from hospital in the last 30 days",
      size: 892,
      engagement: "High",
      success_rate: "91%",
      tags: ["Follow-up", "Critical"],
      aiRecommended: true
    }
  ];

  // Add missing handler functions
  const handleStructureChange = (id, field, value) => {
    setContentStructure(prev =>
      prev.map(item =>
        item.id === id ? { ...item, [field]: value } : item
      )
    );
  };

  const handleAddStructureItem = () => {
    const newId = Math.max(...contentStructure.map(item => item.id)) + 1;
    setContentStructure(prev => [
      ...prev,
      {
        id: newId,
        label: 'New Section',
        content: '',
        enabled: true,
        required: false,
        placeholder: 'Enter content...'
      }
    ]);
  };

  const handleGuidelineAdd = (type) => {
    if (!newGuideline.trim()) return;
    if (type === 'writing') {
      setWritingGuidelines(prev => [...prev, newGuideline]);
    } else {
      setBrandGuidelines(prev => [...prev, newGuideline]);
    }
    setNewGuideline('');
  };

  const handleGuidelineRemove = (type, index) => {
    if (type === 'writing') {
      setWritingGuidelines(prev => prev.filter((_, i) => i !== index));
    } else {
      setBrandGuidelines(prev => prev.filter((_, i) => i !== index));
    }
  };

  // Keep existing campaign goals and journey data...
  const campaignGoals = [
    {
      id: 'enroll',
      title: 'Plan Enrollment',
      description: 'Drive enrollment in new healthcare plans or programs'
    },
    {
      id: 'engage',
      title: 'Program Engagement',
      description: 'Increase participation in health initiatives and campaigns'
    },
    {
      id: 'retain',
      title: 'Member Retention',
      description: 'Maintain and strengthen existing member relationships'
    },
    {
      id: 'educate',
      title: 'Health Education',
      description: 'Promote health literacy and preventive care awareness'
    }
  ];

  const existingJourneys = [
    {
      id: 'onboarding-2024',
      name: 'Member Onboarding 2024',
      description: 'Active welcome series for new enrollees',
      activeMembers: 2430,
      status: 'active',
      lastModified: '2024-03-15'
    },
    {
      id: 'wellness-q1',
      name: 'Annual Enrollment period',
      description: 'Quarterly wellness engagement campaign',
      activeMembers: 75030,
      status: 'active',
      lastModified: '2024-02-28'
    },
    {
      id: 'diabetes-care',
      name: 'Diabetes Management',
      description: 'Ongoing support for diabetes care',
      activeMembers: 1256,
      status: 'active',
      lastModified: '2024-03-10'
    },
    {
      id: 'annual-wellness',
      name: 'Annual Wellness Visit',
      description: 'Preventive care appointment reminders',
      activeMembers: 5632,
      status: 'active',
      lastModified: '2024-01-15'
    }
  ];

  const channelOptions = [
    {
      id: 'email',
      name: 'Email',
      description: 'Best for detailed information and educational content',
      metrics: { openRate: '24%', responseRate: '12%' },
      cost: 'Low',
      recommendedTime: 'Morning (9-11 AM)'
    },
    {
      id: 'sms',
      name: 'SMS',
      description: 'Ideal for urgent reminders and quick updates',
      metrics: { openRate: '98%', responseRate: '45%' },
      cost: 'Medium',
      recommendedTime: 'Any time (8 AM-8 PM)'
    },
    {
      id: 'voice',
      name: 'Voice AI Call',
      description: 'Perfect for complex communications requiring interaction',
      metrics: { answerRate: '65%', completionRate: '58%' },
      cost: 'High',
      recommendedTime: 'Afternoon (2-5 PM)'
    },
    {
      id: 'mail',
      name: 'Physical Mail',
      description: 'Best for formal communications and detailed documents',
      metrics: { deliveryRate: '99%', responseRate: '15%' },
      cost: 'High',
      recommendedTime: 'N/A'
    }
  ];
  
  const toggleChannel = (channelId) => {
    setSelectedChannels(prev => 
      prev.includes(channelId)
        ? prev.filter(id => id !== channelId)
        : [...prev, channelId]
    );
  };

  const toggleCohort = (cohortId) => {
    setCampaignData(prev => ({
      ...prev,
      selectedCohorts: prev.selectedCohorts.includes(cohortId)
        ? prev.selectedCohorts.filter(id => id !== cohortId)
        : [...prev.selectedCohorts, cohortId]
    }));
  };

  const handleNext = () => {
    if (step === steps.length) {
      console.log('Export to Marketing Cloud:', campaignData);
    } else {
      setStep(prev => Math.min(prev + 1, steps.length));
    }
  };

  const steps = [
    { number: 1, title: 'Campaign Type' },
    { number: 2, title: 'Cohort Selection' },
    { number: 3, title: 'Channels' },
    { number: 4, title: 'Content' }
  ];

  const renderStepContent = () => {
    switch (step) {
      case 1:
        return (
          <div className="space-y-6">
                  <Tabs defaultValue="new" className="w-full" onValueChange={(value) => setCampaignData(prev => ({ ...prev, type: value }))}>
                    <TabsList className="grid w-full grid-cols-2 mb-6">
                     <TabsTrigger value="existing">SFMC Journey</TabsTrigger>
                      <TabsTrigger value="new">New Campaign</TabsTrigger>
                    </TabsList>
                    
                    <TabsContent value="new">
                      <div className="space-y-4 pt-2">
                        <Label className="text-lg font-semibold">Campaign Goal</Label>
                        <div className="grid grid-cols-2 gap-4">
                          {campaignGoals.map((goal) => (
                            <div 
                              key={goal.id}
                              className={`p-4 border rounded-lg hover:border-blue-500 cursor-pointer
                                ${campaignData.goal === goal.id ? 'border-blue-500 bg-blue-50' : ''}`}
                              onClick={() => setCampaignData(prev => ({ ...prev, goal: goal.id }))}
                            >
                              <div className="font-medium mb-2">{goal.title}</div>
                              <p className="text-sm text-gray-500">{goal.description}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    </TabsContent>
                    
                    <TabsContent value="existing">
                      <div className="space-y-4 pt-2">
                        <div className="flex items-center gap-2 mb-4">
                          <Route className="w-5 h-5 text-blue-600" />
                          <Label className="text-lg font-semibold">Select Existing Journey</Label>
                        </div>
                        <Alert className="bg-blue-50 border-blue-200">
                          <Sparkles className="w-4 h-4 text-blue-500" />
                          <AlertDescription>
                            Connect your campaign to an active journey to enhance existing member communications
                          </AlertDescription>
                        </Alert>
                        <div className="grid grid-cols-2 gap-4">
                          {existingJourneys.map((journey) => (
                            <div
                              key={journey.id}
                              className={`p-4 border rounded-lg hover:border-blue-500 cursor-pointer
                                ${campaignData.journey === journey.id ? 'border-blue-500 bg-blue-50' : ''}`}
                              onClick={() => setCampaignData(prev => ({ ...prev, journey: journey.id }))}
                            >
                              <div className="font-medium mb-2">{journey.name}</div>
                              <p className="text-sm text-gray-500 mb-2">{journey.description}</p>
                              <div className="flex justify-between text-sm">
                                <span className="text-blue-600">Active Members: {journey.activeMembers.toLocaleString()}</span>
                                <span className="text-gray-500">Modified: {new Date(journey.lastModified).toLocaleDateString()}</span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </TabsContent>
                  </Tabs>
                  </div>
        );
      case 2:
        return (
          <div className="space-y-6">
            <div className="flex items-center gap-2 mb-4">
              <Users className="w-5 h-5 text-blue-600" />
              <h2 className="text-lg font-semibold">Select Target Cohorts</h2>
            </div>
            <Alert className="bg-blue-50 border-blue-200">
              <Sparkles className="w-4 h-4 text-blue-500" />
              <AlertDescription>
                Based on your selected goal, we've highlighted recommended cohorts.
              </AlertDescription>
            </Alert>
            <div className="grid grid-cols-2 gap-4">
              {cohortOptions.map((cohort) => (
                <div
                  key={cohort.id}
                  className={`relative p-4 border rounded-lg cursor-pointer
                    ${campaignData.selectedCohorts.includes(cohort.id) ? 'border-blue-500 bg-blue-50' : ''}`}
                  onClick={() => toggleCohort(cohort.id)}
                >
                  {cohort.aiRecommended && (
                    <Sparkles className="absolute top-2 right-2 w-4 h-4 text-blue-500" />
                  )}
                  <div className="mb-2">
                    <h3 className="font-medium">{cohort.name}</h3>
                    <p className="text-sm text-gray-600">{cohort.description}</p>
                  </div>
                  <div className="flex gap-2 text-sm">
                    <span>Size: {cohort.size}</span>
                    <span>Success Rate: {cohort.success_rate}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case 3:
        return (
         <div className="space-y-6">
              <div className="flex justify-between items-center">
                <Label className="text-lg font-semibold">Communication Channels</Label>
                <span className="text-sm text-gray-500">
                  Selected: {selectedChannels.length}
                </span>
              </div>
              <div className="grid grid-cols-2 gap-4">
                {channelOptions.map((channel) => (
                  <div
                    key={channel.id}
                    className={`p-4 border rounded-lg cursor-pointer
                      ${selectedChannels.includes(channel.id) ? 'border-blue-500 bg-blue-50' : ''}`}
                    onClick={() => toggleChannel(channel.id)}
                  >
                    <h3 className="font-medium">{channel.name}</h3>
                    <p className="text-sm text-gray-600 mt-1">{channel.description}</p>
                    <div className="mt-2 text-sm text-gray-500">
                      Best Time: {channel.recommendedTime}
                    </div>
                  </div>
                ))}
              </div>
            </div>
        );
      case 4:
        return (
          <div className="space-y-6">
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Content Structure</h3>
            <div className="space-y-4">
              {contentStructure.map((item) => (
                <div key={item.id} className="space-y-2 border-l-2 border-gray-200 pl-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <input 
                        type="checkbox" 
                        checked={item.enabled}
                        onChange={(e) => handleStructureChange(item.id, 'enabled', e.target.checked)}
                        className="h-4 w-4"
                        disabled={item.required}
                      />
                      <Input
                        value={item.label}
                        onChange={(e) => handleStructureChange(item.id, 'label', e.target.value)}
                        className="w-48"
                      />
                    </div>
                    {!item.required && (
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => setContentStructure(contentStructure.filter(i => i.id !== item.id))}
                      >
                        <Minus className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                  {item.enabled && (
                    <Textarea
                      value={item.content}
                      onChange={(e) => handleStructureChange(item.id, 'content', e.target.value)}
                      placeholder={item.placeholder}
                      className="w-full h-32"
                    />
                  )}
                </div>
              ))}
              <Button variant="outline" onClick={handleAddStructureItem} className="mt-4">
                <Plus className="h-4 w-4 mr-2" />
                Add Section
              </Button>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-medium">Guidelines</h3>
            <Tabs defaultValue="writing">
              <TabsList>
                <TabsTrigger value="writing">Writing Guidelines</TabsTrigger>
                <TabsTrigger value="brand">Brand Guidelines</TabsTrigger>
              </TabsList>
              
              <TabsContent value="writing" className="space-y-4">
                {writingGuidelines.map((guideline, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <span className="flex-1">{guideline}</span>
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => handleGuidelineRemove('writing', index)}
                    >
                      <Minus className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
                <div className="flex space-x-2">
                  <Input
                    value={newGuideline}
                    onChange={(e) => setNewGuideline(e.target.value)}
                    placeholder="Add new writing guideline"
                    className="flex-1"
                  />
                  <Button onClick={() => handleGuidelineAdd('writing')}>
                    <Plus className="h-4 w-4 mr-2" />
                    Add
                  </Button>
                </div>
              </TabsContent>
              
              <TabsContent value="brand" className="space-y-4">
                {brandGuidelines.map((guideline, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <span className="flex-1">{guideline}</span>
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => handleGuidelineRemove('brand', index)}
                    >
                      <Minus className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
                <div className="flex space-x-2">
                  <Input
                    value={newGuideline}
                    onChange={(e) => setNewGuideline(e.target.value)}
                    placeholder="Add new brand guideline"
                    className="flex-1"
                  />
                  <Button onClick={() => handleGuidelineAdd('brand')}>
                    <Plus className="h-4 w-4 mr-2" />
                    Add
                  </Button>
                </div>
              </TabsContent>
            </Tabs>
          </div>

          <div className="flex justify-end">
            <Button className="w-full sm:w-auto">
              <Wand2 className="h-4 w-4 mr-2" />
              Generate Content
            </Button>
          </div>
        </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-5xl mx-auto">
        <div className="mb-8 flex justify-between items-center">
          <div className="flex gap-4">
            {steps.map((s) => (
              <div
                key={s.number}
                className={`flex items-center gap-2 cursor-pointer ${step >= s.number ? 'text-blue-600' : 'text-gray-400'}`}
                onClick={() => setStep(s.number)}
              >
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step >= s.number ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}>
                  {step > s.number ? <CheckCircle2 className="w-5 h-5" /> : s.number}
                </div>
                <span>{s.title}</span>
              </div>
            ))}
          </div>
        </div>

        <Card className="w-full">
          <CardHeader>
            <CardTitle>Create AI Campaign</CardTitle>
          </CardHeader>
          <CardContent>
            {renderStepContent()}
            <div className="flex justify-between mt-8">
              <Button
                variant="default"
                onClick={() => setStep(prev => Math.max(prev - 1, 1))}
                disabled={step === 1}
              >
                Previous
              </Button>
              <Button 
              variant="default"
              onClick={handleNext} >
                {step === steps.length ? 'Export to Marketing Cloud' : 'Next'}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CampaignDashboard;