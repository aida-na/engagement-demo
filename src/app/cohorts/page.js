"use client"
import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  HeartPulse, Brain, Baby, Keyboard, Calendar, 
  Workflow, Syringe, Trees, BadgeAlert, Heart,
  Activity, Building2, PersonStanding, ArrowUpDown,
  UserPlus, Download, Share, FileDown, Plus,
  UsersRound, ArrowRightCircle, CheckCircle2
} from 'lucide-react';

const MetricSummaryCard = ({ category }) => {
  const summaries = {
    engagement: {
      title: "Total Population",
      mainMetric: "250,000",
      currentLabel: "Currently Engaged",
      currentValue: "85,400",
      potentialLabel: "Potential Engagement",
      potentialValue: "142,500",
      opportunityLabel: "Engagement Opportunity",
      opportunityValue: "+57,100"
    },
    retention: {
      title: "Total Members",
      mainMetric: "250,000",
      currentLabel: "Retained Members",
      currentValue: "198,750",
      potentialLabel: "At-Risk Members",
      potentialValue: "51,250",
      opportunityLabel: "Retention Opportunity",
      opportunityValue: "+38,450"
    },
    enrollment: {
      title: "Total Population",
      mainMetric: "250,000",
      currentLabel: "Currently Enrolled",
      currentValue: "7,370",
      potentialLabel: "Potential Enrollment",
      potentialValue: "32,600",
      opportunityLabel: "Growth Opportunity",
      opportunityValue: "+25,230"
    }
  };

  const data = summaries[category];

  return (
    <div className="grid grid-cols-4 gap-6 mb-8">
      <Card className="p-4">
        <h3 className="text-sm font-medium text-gray-500">{data.title}</h3>
        <p className="text-3xl font-bold mt-1">{data.mainMetric}</p>
      </Card>
      <Card className="p-4">
        <h3 className="text-sm font-medium text-gray-500">{data.currentLabel}</h3>
        <p className="text-3xl font-bold mt-1">{data.currentValue}</p>
      </Card>
      <Card className="p-4">
        <h3 className="text-sm font-medium text-gray-500">{data.potentialLabel}</h3>
        <p className="text-3xl font-bold mt-1">{data.potentialValue}</p>
      </Card>
      <Card className="p-4">
        <h3 className="text-sm font-medium text-gray-500">{data.opportunityLabel}</h3>
        <p className="text-3xl font-bold text-emerald-600 mt-1">{data.opportunityValue}</p>
      </Card>
    </div>
  );
};

const CategoryButton = ({ active, children, onClick }) => (
  <button
    onClick={onClick}
    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors
      ${active 
        ? 'bg-blue-100 text-blue-700' 
        : 'text-gray-600 hover:bg-gray-100'
      }`}
  >
    {children}
  </button>
);

const CohortCard = ({  cohort, category, onSelect, selected }) => {
  let metricValue = 0;
  let metricLabel = '';
  let improvement = 0;

  switch (category) {
    case 'engagement':
      metricValue = parseInt(cohort.metrics.engagement.value.replace(',', ''));
      metricLabel = 'Engaged Members';
      improvement = Math.round(metricValue * 1.15);
      break;
    case 'retention':
      metricValue = cohort.metrics.retention.value;
      metricLabel = 'Retention Rate';
      improvement = parseFloat(cohort.metrics.retention.value) * 1.1;
      break;
    case 'enrollment':
      metricValue = cohort.metrics.growth.value;
      metricLabel = 'Growth Rate';
      improvement = parseFloat(cohort.metrics.growth.value) * 1.2;
      break;
  }

  const impact = improvement - (typeof metricValue === 'string' ? 
    parseInt(metricValue.replace(',', '')) : 
    metricValue);

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
                    <span className="font-medium">{cohort.name}</span>
                    <span className="text-sm text-gray-500">{cohort.description}</span>
                  </div>
                </div>
              </div>
              <div className="text-sm text-gray-500">
                {cohort.size.toLocaleString()} members
                <span className="text-gray-400 ml-1">
                  ({((cohort.size / cohort.totalPopulation) * 100).toFixed(1)}%)
                </span>
              </div>
            </div>
          
          <div className="flex justify-between items-center border-t pt-4">
            <div className="flex flex-col">
              <div className="text-sm text-gray-500">{metricLabel}</div>
              <div className="text-2xl font-bold">
                {typeof metricValue === 'string' ? metricValue : metricValue.toFixed(1)}
                {category !== 'engagement' ? '%' : ''}
              </div>
            </div>
            <div className="flex flex-col items-end">
              <div className="text-sm text-gray-500">Predicted with personalization</div>
              <div className="text-2xl font-bold text-emerald-600">
                {improvement.toFixed(1)}{category !== 'engagement' ? '%' : ''}
              </div>
            </div>
            <div className="flex flex-col items-end border-l pl-6">
              <div className="text-sm text-gray-500">Impact</div>
              <div className="text-2xl font-bold text-blue-600">
                {impact > 0 ? '+' : ''}{impact.toFixed(1)}{category !== 'engagement' ? '%' : ''}
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
    const [category, setCategory] = useState('engagement');
    const [sortBy, setSortBy] = useState('impact');
    const [selectedCohorts, setSelectedCohorts] = useState(new Set());
    const toggleCohort = (cohortId) => {
      const newSelected = new Set(selectedCohorts);
      if (newSelected.has(cohortId)) {
        newSelected.delete(cohortId);
      } else {
        newSelected.add(cohortId);
      }
      setSelectedCohorts(newSelected);
    };

    const categories = [
      { id: 'engagement', label: 'Engagement Metrics' },
      { id: 'retention', label: 'Retention Metrics' },
      { id: 'enrollment', label: 'Enrollment Metrics' }
    ];
  
    const cohorts = [
      {
        id: 1,
        name: "Chronic Care Management",
        description: "Members with multiple chronic conditions requiring coordinated care",
        icon: <HeartPulse className="mr-2" size={20} />,
        size: 45000,
        totalPopulation: 250000,
        metrics: {
          engagement: { value: "15,750", suffix: "", color: "text-blue-600" },
          growth: { value: "8.3", suffix: "%", color: "text-green-600" },
          retention: { value: "82.5", suffix: "%", color: "text-purple-600" }
        }
      },
      {
        id: 2,
        name: "Behavioral Health",
        description: "Members accessing mental health and substance use disorder services",
        icon: <Brain className="mr-2" size={20} />,
        size: 32000,
        totalPopulation: 250000,
        metrics: {
          engagement: { value: "12,800", suffix: "", color: "text-blue-600" },
          growth: { value: "12.5", suffix: "%", color: "text-green-600" },
          retention: { value: "78.9", suffix: "%", color: "text-purple-600" }
        }
      },
      {
        id: 3,
        name: "Maternity Program",
        description: "Expectant mothers enrolled in prenatal care management",
        icon: <Baby className="mr-2" size={20} />,
        size: 18000,
        totalPopulation: 250000,
        metrics: {
          engagement: { value: "9,900", suffix: "", color: "text-blue-600" },
          growth: { value: "15.2", suffix: "%", color: "text-green-600" },
          retention: { value: "85.4", suffix: "%", color: "text-purple-600" }
        }
      },
      {
        id: 4,
        name: "Telehealth Users",
        description: "Members actively using virtual care services",
        icon: <Keyboard className="mr-2" size={20} />,
        size: 55000,
        totalPopulation: 250000,
        metrics: {
          engagement: { value: "22,000", suffix: "", color: "text-blue-600" },
          growth: { value: "18.7", suffix: "%", color: "text-green-600" },
          retention: { value: "76.2", suffix: "%", color: "text-purple-600" }
        }
      },
      {
        id: 5,
        name: "Preventive Screening Due",
        description: "Members overdue for recommended preventive services",
        icon: <Calendar className="mr-2" size={20} />,
        size: 28000,
        totalPopulation: 250000,
        metrics: {
          engagement: { value: "8,400", suffix: "", color: "text-blue-600" },
          growth: { value: "9.8", suffix: "%", color: "text-green-600" },
          retention: { value: "71.5", suffix: "%", color: "text-purple-600" }
        }
      },
      {
        id: 6,
        name: "Complex Case Management",
        description: "High-risk members requiring intensive care coordination",
        icon: <Workflow className="mr-2" size={20} />,
        size: 12000,
        totalPopulation: 250000,
        metrics: {
          engagement: { value: "7,200", suffix: "", color: "text-blue-600" },
          growth: { value: "6.5", suffix: "%", color: "text-green-600" },
          retention: { value: "88.3", suffix: "%", color: "text-purple-600" }
        }
      },
      {
        id: 7,
        name: "Specialty Medication",
        description: "Members on high-cost specialty medications",
        icon: <Syringe className="mr-2" size={20} />,
        size: 15000,
        totalPopulation: 250000,
        metrics: {
          engagement: { value: "9,750", suffix: "", color: "text-blue-600" },
          growth: { value: "11.2", suffix: "%", color: "text-green-600" },
          retention: { value: "84.7", suffix: "%", color: "text-purple-600" }
        }
      },
      {
        id: 8,
        name: "Wellness Program",
        description: "Members participating in preventive wellness initiatives",
        icon: <Trees className="mr-2" size={20} />,
        size: 65000,
        totalPopulation: 250000,
        metrics: {
          engagement: { value: "19,500", suffix: "", color: "text-blue-600" },
          growth: { value: "14.3", suffix: "%", color: "text-green-600" },
          retention: { value: "72.8", suffix: "%", color: "text-purple-600" }
        }
      },
      {
        id: 9,
        name: "Care Gaps",
        description: "Members with identified gaps in recommended care",
        icon: <BadgeAlert className="mr-2" size={20} />,
        size: 22000,
        totalPopulation: 250000,
        metrics: {
          engagement: { value: "6,600", suffix: "", color: "text-blue-600" },
          growth: { value: "8.9", suffix: "%", color: "text-green-600" },
          retention: { value: "68.5", suffix: "%", color: "text-purple-600" }
        }
      },
      {
        id: 10,
        name: "Medicare Advantage",
        description: "Senior members enrolled in Medicare Advantage plans",
        icon: <Heart className="mr-2" size={20} />,
        size: 35000,
        totalPopulation: 250000,
        metrics: {
          engagement: { value: "24,500", suffix: "", color: "text-blue-600" },
          growth: { value: "7.8", suffix: "%", color: "text-green-600" },
          retention: { value: "87√", suffix: "%", color: "text-purple-600" }
        }
      },
      {
        id: 11,
        name: "Remote Monitoring",
        description: "Members using remote patient monitoring devices",
        icon: <Activity className="mr-2" size={20} />,
        size: 25000,
        totalPopulation: 250000,
        metrics: {
          engagement: { value: "16,250", suffix: "", color: "text-blue-600" },
          growth: { value: "16.5", suffix: "%", color: "text-green-600" },
          retention: { value: "83.4", suffix: "%", color: "text-purple-600" }
        }
      },
      {
        id: 12,
        name: "Employer Groups",
        description: "Members from employer-sponsored health plans",
        icon: <Building2 className="mr-2" size={20} />,
        size: 85000,
        totalPopulation: 250000,
        metrics: {
          engagement: { value: "42,500", suffix: "", color: "text-blue-600" },
          growth: { value: "10.2", suffix: "%", color: "text-green-600" },
          retention: { value: "86.7", suffix: "%", color: "text-purple-600" }
        }
      },
      {
        id: 13,
        name: "Physical Therapy",
        description: "Members receiving physical therapy services",
        icon: <PersonStanding className="mr-2" size={20} />,
        size: 19000,
        totalPopulation: 250000,
        metrics: {
          engagement: { value: "11,400", suffix: "", color: "text-blue-600" },
          growth: { value: "13.8", suffix: "%", color: "text-green-600" },
          retention: { value: "79.3", suffix: "%", color: "text-purple-600" }
        }
      }
    ];
  
    const calculateImpact = (cohort) => {
      let current, predicted;
      switch (category) {
        case 'engagement':
          current = parseInt(cohort.metrics.engagement.value.replace(',', ''));
          predicted = current * 1.15;
          break;
        case 'retention':
          current = parseFloat(cohort.metrics.retention.value);
          predicted = current * 1.1;
          break;
        case 'enrollment':
          current = parseFloat(cohort.metrics.growth.value);
          predicted = current * 1.2;
          break;
      }
      return predicted - current;
    };
  
    const sortedCohorts = [...cohorts].sort((a, b) => {
      if (sortBy === 'impact') {
        return calculateImpact(b) - calculateImpact(a);
      }
      return b.size - a.size;
    });
  
    return (
      <div className="p-6 max-w-6xl mx-auto">
        <div className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-2xl font-bold">Smart Cohorts Dashboard</h1>
            <Button variant="default" size="sm" className="flex items-center">
              <Plus className="mr-2 h-4 w-4" />
              Create New Cohort
            </Button>
          </div>
          
          <div className="flex justify-between items-center mb-6">
            <div className="flex space-x-4">
              {categories.map(cat => (
                <CategoryButton
                  key={cat.id}
                  active={category === cat.id}
                  onClick={() => setCategory(cat.id)}
                >
                  {cat.label}
                </CategoryButton>
              ))}
            </div>
            <button
              onClick={() => setSortBy(sortBy === 'impact' ? 'size' : 'impact')}
              className="flex items-center space-x-2 text-sm text-gray-600 hover:text-gray-900"
            >
              <ArrowUpDown size={16} />
              <span>Sort by {sortBy === 'impact' ? 'Size' : 'Impact'}</span>
            </button>
          </div>
        </div>
  
        <MetricSummaryCard category={category} />
        
        <ActionBar selectedCount={selectedCohorts.size} />
        
        <div className="space-y-2">
          {sortedCohorts.map(cohort => (
            <CohortCard 
              key={cohort.id} 
              cohort={cohort}
              category={category}
              selected={selectedCohorts.has(cohort.id)}
              onSelect={toggleCohort}
            />
          ))}
        </div>
      </div>
    );
  };
  
  export default Dashboard;