"use client"

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Plus, Minus, Wand2, Upload } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const ContentGenerator = () => {
  // Templates data
  const templates = {
    engagement: {
      subject: "Stay Connected with Your Health Journey",
      title: "Your Health Journey Matters",
      content: "We noticed you haven't visited recently and want to ensure you're getting the care you need...",
      cta: "Schedule a Check-up"
    },
    enrollment: {
      subject: "Enhance Your Healthcare Coverage",
      title: "Choose the Right Health Plan",
      content: "Open enrollment period is here. Explore our comprehensive healthcare plans...",
      cta: "Enroll Now"
    },
    newsletter: {
      subject: "Your Monthly Health Update",
      title: "Stay Informed About Your Health",
      content: "This month's wellness insights and healthcare updates...",
      cta: "Read More"
    }
  };

  // Smart cohorts data
  const cohorts = {
    all: { name: 'All Members', description: 'General audience' },
    diabetes: { name: 'Members with Diabetes', description: 'Diabetes management patients' },
    seniors: { name: 'Senior Members', description: 'Age 65+' },
    chronic: { name: 'Chronic Care', description: 'Ongoing treatment members' },
    newPatients: { name: 'New Members', description: 'First-time visitors' },
    preventive: { name: 'Preventive Care', description: 'Wellness and prevention focus' }
  };

  // States
  const [channel, setChannel] = useState('email');
  const [selectedTemplate, setSelectedTemplate] = useState('custom');
  const [characterLimit, setCharacterLimit] = useState({
    email: 2000,
    text: 160,
    push: 140,
    mail: 5000
  });
  const [selectedCohort, setSelectedCohort] = useState('diabetes');
  const [contentStructure, setContentStructure] = useState([
    { id: 'subject', label: 'Subject Line', enabled: true, content: '', required: true, placeholder: 'Draft message...' },
    { id: 'title', label: 'Title', enabled: true, content: '', required: false, placeholder: 'Draft message...' },
    { id: 'content', label: 'Main Content', enabled: true, content: '', required: true, placeholder: 'Draft message...' },
    { id: 'cta', label: 'Call to Action', enabled: true, content: '', required: false, placeholder: 'Draft message...' }
  ]);
  const [writingGuidelines, setWritingGuidelines] = useState([
    'Use clear, simple language',
    'Avoid medical jargon when possible',
    'Include disclaimer when necessary'
  ]);
  const [brandGuidelines, setBrandGuidelines] = useState([
    'Maintain compassionate tone',
    'Use approved brand colors',
    'Follow HIPAA compliance'
  ]);
  const [newGuideline, setNewGuideline] = useState('');

  // Handler functions
  const handleAddStructureItem = () => {
    const newId = `custom${contentStructure.length + 1}`;
    setContentStructure([
      ...contentStructure,
      { id: newId, label: 'Custom Section', enabled: true, content: '', required: false, placeholder: 'Draft message...' }
    ]);
  };

  const handleStructureChange = (id, field, value) => {
    setContentStructure(contentStructure.map(item => 
      item.id === id ? { ...item, [field]: value } : item
    ));
  };

  const handleGuidelineAdd = (type) => {
    if (!newGuideline.trim()) return;
    if (type === 'writing') {
      setWritingGuidelines([...writingGuidelines, newGuideline.trim()]);
    } else {
      setBrandGuidelines([...brandGuidelines, newGuideline.trim()]);
    }
    setNewGuideline('');
  };

  const handleGuidelineRemove = (type, index) => {
    if (type === 'writing') {
      setWritingGuidelines(writingGuidelines.filter((_, i) => i !== index));
    } else {
      setBrandGuidelines(brandGuidelines.filter((_, i) => i !== index));
    }
  };

  const handleGuidelineUpload = (type) => {
    // This would trigger file upload functionality
    console.log(`Upload ${type} guidelines document`);
  };

  const getCharacterCount = () => {
    return contentStructure
      .filter(item => item.enabled)
      .reduce((total, item) => total + item.content.length, 0);
  };

  const isOverLimit = () => {
    return getCharacterCount() > characterLimit[channel];
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Content Generator</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Target Cohort Selection */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Target Cohort</h3>
            <Select value={selectedCohort} onValueChange={setSelectedCohort}>
              <SelectTrigger>
                <SelectValue placeholder="Choose target cohort..." />
              </SelectTrigger>
              <SelectContent>
                {Object.entries(cohorts).map(([key, cohort]) => (
                  <SelectItem key={key} value={key}>
                    {cohort.name} - {cohort.description}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Rest of the component remains unchanged */}
          {/* Journey Selection */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Journey</h3>
            <Select value={selectedTemplate} onValueChange={setSelectedTemplate}>
              <SelectTrigger>
                <SelectValue placeholder="Choose a journey..." />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="custom">Custom Message</SelectItem>
                <SelectItem value="engagement">Patient Engagement</SelectItem>
                <SelectItem value="enrollment">Plan Enrollment</SelectItem>
                <SelectItem value="newsletter">Health Newsletter</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Channel Selection */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Channel</h3>
            <RadioGroup value={channel} onValueChange={setChannel} className="flex flex-wrap gap-4">
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="email" id="email" />
                <Label htmlFor="email">Email</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="text" id="text" />
                <Label htmlFor="text">Text Message</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="mail" id="mail" />
                <Label htmlFor="mail">Physical Mail</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="push" id="push" />
                <Label htmlFor="push">Push Notification</Label>
              </div>
            </RadioGroup>
          </div>

          {/* Content Structure */}
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-medium">Content Structure</h3>
              <Button 
                variant="outline" 
                size="sm"
                className="flex items-center"
                onClick={handleAddStructureItem}
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Section
              </Button>
            </div>

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
                    className="w-full"
                    rows={item.id === 'content' ? 6 : 2}
                  />
                )}
              </div>
            ))}

            {/* Character Limit */}
            <div className="flex items-center space-x-4 mt-4">
              <div className="flex items-center space-x-2">
                <Label htmlFor="charLimit">Character Limit:</Label>
                <Input
                  type="number"
                  id="charLimit"
                  value={characterLimit[channel]}
                  onChange={(e) => setCharacterLimit({
                    ...characterLimit,
                    [channel]: Number(e.target.value)
                  })}
                  className="w-24"
                />
              </div>
              <Alert variant={isOverLimit() ? "destructive" : "default"} className="ml-4">
                <AlertDescription>
                  {getCharacterCount()}/{characterLimit[channel]} characters
                  {isOverLimit() && " (Over limit!)"}
                </AlertDescription>
              </Alert>
            </div>
          </div>

          {/* Guidelines */}
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-medium">Guidelines</h3>
              <Button 
                variant="outline"
                size="sm" 
                className="flex items-center"
                onClick={() => handleGuidelineUpload('document')}
              >
                <Upload className="h-4 w-4 mr-2" />
                Upload Guidelines
              </Button>
            </div>
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
                    size="icon"
                    onClick={() => setContentStructure(contentStructure.filter(i => i.id !== item.id))}
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
                <Button 
                  variant="default"
                  size="sm"
                  className="flex items-center"
                  onClick={() => handleGuidelineAdd('writing')}
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add
                </Button>
                </div>
              </TabsContent>

              <TabsContent value="brand" className="space-y-4">
                {brandGuidelines.map((guideline, index) => (
                  <div key={index} className="flex items-center space-x-5">
                    <span className="flex-1">{guideline}</span>
                    <Button
                      variant="ghost"
                      size="icon"
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

          {/* Generate Content Button */}
          <div className="flex justify-end">
          <Button 
            variant="default"
            size="default"
            className="flex items-center"
          >
            <Wand2 className="h-4 w-4 mr-2" />
            Generate Content Options
          </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ContentGenerator;