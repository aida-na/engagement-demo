'use client';
import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { AlertCircle, Mail, Send, Sparkles, Wand2 } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';

const EmailMarketingDashboard = () => {
  const [emailContent, setEmailContent] = useState('');
  const [prompt, setPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);

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

  const handleGenerate = () => {
    setIsGenerating(true);
    // Simulate AI generation
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
          <h1 className="text-2xl font-bold">Healthcare Email Marketing Assistant</h1>
          <p className="text-gray-500">Create personalized healthcare plan communications</p>
        </div>
        <Button variant="outline" className="gap-2">
          <Mail className="w-4 h-4" />
          Preview Email
        </Button>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="md:col-span-1">
          <CardHeader>
            <CardTitle>Campaign Settings</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
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
              <label className="text-sm font-medium">Target Audience</label>
              <Input placeholder="e.g., Medicare members" />
            </div>
          </CardContent>
        </Card>

        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Email Content Generator</CardTitle>
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

            <Alert>
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>
                Content will be generated following HIPAA compliance guidelines
              </AlertDescription>
            </Alert>

            <div className="space-y-2">
              <label className="text-sm font-medium">Generated Email Content</label>
              <Textarea
                value={emailContent}
                onChange={(e) => setEmailContent(e.target.value)}
                className="h-64 font-mono"
                placeholder="Generated content will appear here..."
              />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default EmailMarketingDashboard;