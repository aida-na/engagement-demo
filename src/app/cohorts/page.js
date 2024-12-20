"use client"
import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Activity, AlertCircle, Apple, HeartPulse, 
  Building2, Brain, MapPin, Users, Bike, 
  Wrench, Download, Share, FileDown, Plus,
  ArrowUpDown
} from 'lucide-react';

const MetricSummaryCard = () => {
  const metrics = {
    eligiblePopulation: 2003405,
    enrolledPopulation: 100170,
    growthPotential: 400681,
    enrollmentPotential: 20,
  };

  return (
    <div className="grid grid-cols-5 gap-6 mb-8">
      <Card className="p-4">
        <h3 className="text-sm font-medium text-gray-500">Total Eligible Population</h3>
        <p className="text-3xl font-bold mt-1">{metrics.eligiblePopulation.toLocaleString()}</p>
      </Card>
      <Card className="p-4">
        <h3 className="text-sm font-medium text-gray-500">Total Enrolled</h3>
        <p className="text-3xl font-bold mt-1">{metrics.enrolledPopulation.toLocaleString()}</p>
      </Card>
      <Card className="p-4">
        <h3 className="text-sm font-medium text-gray-500">Current Enrollment Rate</h3>
        <p className="text-3xl font-bold mt-1">{(metrics.enrolledPopulation / metrics.eligiblePopulation * 100).toFixed(1)}%</p>
      </Card>
      <Card className="p-4">
        <h3 className="text-sm font-medium text-gray-500">Potential Enrollment Rate</h3>
        <p className="text-3xl font-bold text-emerald-600 mt-1">+{metrics.enrollmentPotential}%</p>
      </Card>
      <Card className="p-4">
        <h3 className="text-sm font-medium text-gray-500">Potential Enrollment</h3>
        <p className="text-3xl font-bold text-emerald-600 mt-1">+{metrics.growthPotential.toLocaleString()}</p>
      </Card>
    </div>
  );
};

const CohortCard = ({ cohort, onSelect, selected }) => {
  const currentEnrolled = Math.round(cohort.size * (cohort.enrollmentRate / 100));
  const predictedTotal = currentEnrolled + cohort.enrollmentPotential;
  const predictedRate = (predictedTotal / cohort.size * 100).toFixed(1);

  return (
    <Card className="mb-2 hover:shadow-md transition-shadow">
      <div className="p-4">
        <div className="flex flex-col space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <input
                type="checkbox"
                checked={selected}
                onChange={() => onSelect(cohort.id)}
                className="h-4 w-4 rounded border-gray-300"
              />
              <div className="flex items-center">
                {cohort.icon}
                <div className="flex flex-col">
                {cohort.name === "Prediabetes Risk" ? (
            <a href="/insights" className="font-medium hover:text-blue-600 hover:underline">{cohort.name}</a>
            ) : (
            <span className="font-medium">{cohort.name}</span>
             )}
                  <span className="text-sm text-gray-500">{cohort.description}</span>
                </div>
              </div>
            </div>
            <div className="text-sm text-gray-500">
              {cohort.size.toLocaleString()} members
              <span className="text-gray-400 ml-1">
                ({((cohort.size / 2000000) * 100).toFixed(1)}%)
              </span>
            </div>
          </div>
        
          <div className="flex justify-between items-center border-t pt-4">
            <div className="flex flex-col">
              <div className="text-sm text-gray-500">Current Enrollment Rate</div>
              <div className="text-2xl font-bold">
                {cohort.enrollmentRate.toFixed(1)}%
              </div>
            </div>
            <div className="flex flex-col items-end">
              <div className="text-sm text-gray-500">Potential Enrollement Rate with Personalization</div>
              <div className="text-2xl font-bold text-emerald-600">
                {predictedRate}%
              </div>
            </div>
            <div className="flex flex-col items-end border-l pl-6">
              <div className="text-sm text-gray-500">Potential Enrollment</div>
              <div className="text-2xl font-bold text-emerald-600">
                +{cohort.enrollmentPotential.toLocaleString()}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};

const ActionBar = ({ selectedCount }) => (
  <div className="sticky top-0 z-10 bg-white border-b mb-6 py-3">
    <div className="flex justify-between items-center">
      <div className="flex items-center space-x-2">
        {selectedCount > 0 && (
          <span className="text-sm text-gray-600">
            {selectedCount} cohort{selectedCount !== 1 ? 's' : ''} selected
          </span>
        )}
      </div>
      <div className="flex space-x-3">
        <Button variant="outline" size="sm" className="flex items-center">
          <Share className="mr-2 h-4 w-4" />
          Connect to Journey
        </Button>
        <Button variant="outline" size="sm" className="flex items-center">
          <FileDown className="mr-2 h-4 w-4" />
          Export Selected
        </Button>
        <Button variant="outline" size="sm" className="flex items-center">
          <Download className="mr-2 h-4 w-4" />
          Download Report
        </Button>
      </div>
    </div>
  </div>
);

const Dashboard = () => {
  const [selectedCohorts, setSelectedCohorts] = useState(new Set());
  const [sortBy, setSortBy] = useState('impact');

  const toggleCohort = (cohortId) => {
    const newSelected = new Set(selectedCohorts);
    if (newSelected.has(cohortId)) {
      newSelected.delete(cohortId);
    } else {
      newSelected.add(cohortId);
    }
    setSelectedCohorts(newSelected);
  };

  const cohorts = [
    {
      id: 1,
      name: "Prediabetes Risk",
      description: "Members with elevated blood glucose levels not yet diagnosed with diabetes",
      icon: <AlertCircle className="mr-2" size={20} />,
      size: 450000,
      enrollmentRate: 4.2,
      enrollmentPotential: 52088
    },
    {
      id: 2,
      name: "Unmanaged A1C",
      description: "Diagnosed members with A1C > 8.0% in past 6 months",
      icon: <Activity className="mr-2" size={20} />,
      size: 180000,
      enrollmentRate: 6.5,
      enrollmentPotential: 64109
    },
    {
      id: 3,
      name: "Rural Markets",
      description: "Members in rural areas with limited access to in-person care",
      icon: <MapPin className="mr-2" size={20} />,
      size: 320000,
      enrollmentRate: 3.8,
      enrollmentPotential: 48082
    },
    {
      id: 4,
      name: "SDOH Challenges",
      description: "Members with food access or mobility barriers",
      icon: <Users className="mr-2" size={20} />,
      size: 280000,
      enrollmentRate: 3.5,
      enrollmentPotential: 44075
    },
    {
      id: 5,
      name: "Lifestyle Change Ready",
      description: "Members showing indicators of readiness for lifestyle modification",
      icon: <Bike className="mr-2" size={20} />,
      size: 220000,
      enrollmentRate: 5.8,
      enrollmentPotential: 36062
    },
    {
      id: 6,
      name: "GLP1 Candidates",
      description: "Members who previously expressed interest in the GLP1 therapy",
      icon: <Wrench className="mr-2" size={20} />,
      size: 150000,
      enrollmentRate: 5.2,
      enrollmentPotential: 32055
    },
    {
      id: 7,
      name: "Mental Health Comorbidity",
      description: "Members with both diabetes and mental health conditions",
      icon: <Brain className="mr-2" size={20} />,
      size: 165000,
      enrollmentRate: 4.5,
      enrollmentPotential: 28048
    },
    {
      id: 8,
      name: "Hypertension Comorbidity",
      description: "Members managing both diabetes and hypertension",
      icon: <HeartPulse className="mr-2" size={20} />,
      size: 290000,
      enrollmentRate: 5.5,
      enrollmentPotential: 40068
    },
    {
      id: 9,
      name: "Digital Engagement",
      description: "Members actively using health apps and digital tools",
      icon: <Apple className="mr-2" size={20} />,
      size: 195000,
      enrollmentRate: 6.2,
      enrollmentPotential: 28048
    },
    {
      id: 10,
      name: "Employer Programs",
      description: "Members in companies with wellness initiatives",
      icon: <Building2 className="mr-2" size={20} />,
      size: 255000,
      enrollmentRate: 5.4,
      enrollmentPotential: 28046
    }
  ];

  const sortedCohorts = [...cohorts].sort((a, b) => {
    if (sortBy === 'impact') {
      return b.growthPotential - a.growthPotential;
    }
    return b.size - a.size;
  });

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="mb-8">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold">Diabetes Program Enrollment Dashboard</h1>
        </div>
        
        <div className="flex justify-end items-center mb-6">
          <button
            onClick={() => setSortBy(sortBy === 'impact' ? 'size' : 'impact')}
            className="flex items-center space-x-2 text-sm text-gray-600 hover:text-gray-900"
          >
            <ArrowUpDown size={16} />
            <span>Sort by {sortBy === 'impact' ? 'Size' : 'Impact'}</span>
          </button>
        </div>
      </div>

      <MetricSummaryCard />
      
      <ActionBar selectedCount={selectedCohorts.size} />
      
      <div className="space-y-2">
        {sortedCohorts.map(cohort => (
          <CohortCard 
            key={cohort.id}
            cohort={cohort}
            selected={selectedCohorts.has(cohort.id)}
            onSelect={toggleCohort}
          />
        ))}
      </div>
    </div>
  );
};

export default Dashboard;