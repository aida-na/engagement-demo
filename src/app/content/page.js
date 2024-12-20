'use client';
import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { AlertCircle, Mail, Send, Sparkles, Wand2, Plus, Upload, Minus } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const EmailMarketingDashboard = () => {
  const [emailContent, setEmailContent] = useState('');
  const [prompt, setPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [channel, setChannel] = useState('email');
  const [selectedTemplate, setSelectedTemplate] = useState('custom');
  const [selectedCohort, setSelectedCohort] = useState('all');
  const [characterLimit, setCharacterLimit] = useState({
    email: 2000,
    text: 160,
    push: 140,
    mail: 5000
  });
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

  // Configuration options
  const campaignTypes = [
    { id: 'open-enrollment', name: 'Open Enrollment' },
    { id: 'wellness-program', name: 'Wellness Program' },
    { id: 'plan-updates', name: 'Plan Updates' },
    { id: 'preventive-care', name: 'Preventive Care' },
  ];

  const toneOptions = [
    { id: 'professional', name: 'Professional' },
    { id: 'friendly', name: 'Friendly' },
    { id: 'informative', name: 'Informative' },
    { id: 'urgent', name: 'Urgent' },
  ];

  const cohorts = {
    all: { name: 'All Members', description: 'General audience' },
    diabetes: { name: 'Members with Diabetes', description: 'Diabetes management patients' },
    seniors: { name: 'Senior Members', description: 'Age 65+' },
    chronic: { name: 'Chronic Care', description: 'Ongoing treatment members' },
    newPatients: { name: 'New Members', description: 'First-time visitors' },
    preventive: { name: 'Preventive Care', description: 'Wellness and prevention focus' }
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

  const handleGenerate = () => {
    setIsGenerating(true);
    setTimeout(() => {
      setEmailContent(`Dear [Member Name],

We hope this email finds you well. We're excited to share some important updates about your healthcare plan that will help you make the most of your benefits.

[Generated content would appear here based on the selected campaign type and tone]

Best regards,
Your Healthcare Team`);
      setIsGenerating(false);
    }, 1500);
  };

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      <header className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold">Healthcare Content Generator</h1>
          <p className="text-gray-500">Create personalized healthcare plan communications</p>
        </div>
        <Button variant="outline" className="gap-2">
          <Mail className="w-4 h-4" />
          Preview Message
        </Button>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-1 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Campaign Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Target Cohort</label>
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

              <div className="space-y-2">
                <label className="text-sm font-medium">Campaign Type</label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select campaign type" />
                  </SelectTrigger>
                  <SelectContent>
                    {campaignTypes.map((type) => (
                      <SelectItem key={type.id} value={type.id}>
                        {type.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Tone</label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select tone" />
                  </SelectTrigger>
                  <SelectContent>
                    {toneOptions.map((tone) => (
                      <SelectItem key={tone.id} value={tone.id}>
                        {tone.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Channel</label>
                <RadioGroup value={channel} onValueChange={setChannel} className="flex flex-col space-y-2">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="email" id="email" />
                    <Label htmlFor="email">Email</Label>
                    <Input 
                      type="number" 
                      value={characterLimit.email}
                      onChange={(e) => setCharacterLimit({...characterLimit, email: parseInt(e.target.value)})}
                      className="w-24 ml-auto"
                    />
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="text" id="text" />
                    <Label htmlFor="text">Text Message</Label>
                    <Input 
                      type="number" 
                      value={characterLimit.text}
                      onChange={(e) => setCharacterLimit({...characterLimit, text: parseInt(e.target.value)})}
                      className="w-24 ml-auto"
                    />
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="mail" id="mail" />
                    <Label htmlFor="mail">Physical Mail</Label>
                    <Input 
                      type="number" 
                      value={characterLimit.mail}
                      onChange={(e) => setCharacterLimit({...characterLimit, mail: parseInt(e.target.value)})}
                      className="w-24 ml-auto"
                    />
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="push" id="push" />
                    <Label htmlFor="push">Push Notification</Label>
                    <Input 
                      type="number" 
                      value={characterLimit.push}
                      onChange={(e) => setCharacterLimit({...characterLimit, push: parseInt(e.target.value)})}
                      className="w-24 ml-auto"
                    />
                  </div>
                </RadioGroup>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0">
              <CardTitle>Guidelines</CardTitle>
              <Button 
                variant="outline"
                size="sm" 
                className="flex items-center"
              >
                <Upload className="h-4 w-4 mr-2" />
                Upload
              </Button>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="writing">
                <TabsList className="w-full">
                  <TabsTrigger value="writing" className="flex-1">Writing</TabsTrigger>
                  <TabsTrigger value="brand" className="flex-1">Brand</TabsTrigger>
                </TabsList>

                <TabsContent value="writing" className="space-y-4">
                  {writingGuidelines.map((guideline, index) => (
                    <div key={index} className="flex items-center justify-between text-sm">
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
                      placeholder="Add guideline"
                      className="flex-1 text-sm"
                    />
                    <Button 
                      onClick={() => handleGuidelineAdd('writing')}
                      size="sm"
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                </TabsContent>

                <TabsContent value="brand" className="space-y-4">
                  {brandGuidelines.map((guideline, index) => (
                    <div key={index} className="flex items-center justify-between text-sm">
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
                      placeholder="Add guideline"
                      className="flex-1 text-sm"
                    />
                    <Button 
                      onClick={() => handleGuidelineAdd('brand')}
                      size="sm"
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>

        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Content Generator</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Content Prompt</label>
              <Textarea
                placeholder="Describe what you want to communicate to your members..."
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                className="h-24"
              />
            </div>

            <div className="flex gap-2">
              <Button 
                onClick={handleGenerate} 
                disabled={isGenerating}
                className="gap-2"
              >
                {isGenerating ? (
                  <>
                    <Sparkles className="w-4 h-4 animate-spin" />
                    Generating...
                  </>
                ) : (
                  <>
                    <Wand2 className="w-4 h-4" />
                    Generate Content
                  </>
                )}
              </Button>
              <Button variant="outline" className="gap-2">
                <Send className="w-4 h-4" />
                Save Template
              </Button>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Generated Content</label>
              <Textarea
                value={emailContent}
                onChange={(e) => setEmailContent(e.target.value)}
                className="h-64 font-mono"
                placeholder="Generated content will appear here..."
              />
              <div className="text-sm text-gray-500 text-right">
                {emailContent.length} / {characterLimit[channel]} characters
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default EmailMarketingDashboard;