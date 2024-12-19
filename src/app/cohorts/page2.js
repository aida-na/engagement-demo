"use client"
import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  ChevronDown, ChevronUp, Brain, Pill, 
  Calendar, Hospital, Activity, Users, UserCog, UserMinus, 
  Clock, Stethoscope, UserPlus, Wallet
} from 'lucide-react';
import { useRouter } from 'next/navigation';

const CompactCohortCard = ({ cohort, expanded, onToggle }) => {
  const router = useRouter();
  const handleClick = () => {
    if (cohort.id === 13) {
      router.push('/insights');
    } else {
      onToggle();
    }
  };
  return (
    <Card className="mb-2">
      <div 
        className={`p-4 cursor-pointer hover:bg-gray-50 ${cohort.id === 13 ? 'hover:bg-blue-50' : ''}`}
        onClick={handleClick}
      >
      <div 
        className="p-4 cursor-pointer hover:bg-gray-50" 
        onClick={onToggle}
      >
        
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4 flex-1">
            <div className="flex items-center">
              {cohort.icon}
              <span className="font-medium">{cohort.name}</span>
            </div>
            <div className="text-sm text-gray-500">
              {cohort.size.toLocaleString()} members
            </div>
          </div>
          <div className="flex items-center space-x-6 flex-1 justify-end">
            <div className="text-sm">
              <span className="text-gray-500">Success: </span>
              <span className={`font-medium ${cohort.predictedSuccess >= 70 ? 'text-emerald-600' : cohort.predictedSuccess >= 50 ? 'text-blue-600' : 'text-orange-600'}`}>
                {cohort.predictedSuccess}%
              </span>
            </div>
            <div className="text-sm text-gray-500 w-24">
              {((cohort.size / cohort.totalPopulation) * 100).toFixed(1)}% of total
            </div>
            {expanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
          </div>
        </div>
      </div>
      </div>
      
      {expanded && (
        <CardContent className="border-t">
          <div className="space-y-6 pt-4">
            <div>
              <h3 className="text-sm font-medium text-gray-500 mb-3">Core Metrics</h3>
              <div className="grid grid-cols-3 gap-4">
                {Object.entries(cohort.metrics).map(([key, value]) => (
                  <div key={key} className="border rounded p-3 bg-gray-50">
                    <div className="text-sm text-gray-500">{value.label}</div>
                    <div className={`text-xl font-bold ${value.color}`}>
                      {value.value}{value.suffix}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      )}
    </Card>
  );
};

const Dashboard = () => {
  const [expandedId, setExpandedId] = useState(null);

  const cohorts = [
    {
      id: 1,
      name: "Recent Discharge",
      icon: <Hospital className="mr-2" size={20} />,
      size: 15000,
      totalPopulation: 250000,
      predictedSuccess: 78,
      metrics: {
        engagement: { label: "Engaged Users", value: "2,850", suffix: "", color: "text-blue-600" },
        growth: { label: "Growth Rate", value: "12.3", suffix: "%", color: "text-green-600" },
        retention: { label: "Retention Rate", value: "85.5", suffix: "%", color: "text-purple-600" }
      }
    },
    {
      id: 2,
      name: "High-Cost Members",
      icon: <Wallet className="mr-2" size={20} />,
      size: 8000,
      totalPopulation: 250000,
      predictedSuccess: 72,
      metrics: {
        engagement: { label: "Engaged Users", value: "5,120", suffix: "", color: "text-blue-600" },
        growth: { label: "Growth Rate", value: "8.2", suffix: "%", color: "text-green-600" },
        retention: { label: "Retention Rate", value: "78.9", suffix: "%", color: "text-purple-600" }
      }
    },
    {
      id: 13,
      name: "Members with Diabetes",
      icon: <Activity className="mr-2" size={20} />,
      size: 28500,
      totalPopulation: 250000,
      predictedSuccess: 64,
      metrics: {
        engagement: { label: "Engaged Users", value: "19,665", suffix: "", color: "text-blue-600" },
        growth: { label: "Growth Rate", value: "8.7", suffix: "%", color: "text-green-600" },
        retention: { label: "Retention Rate", value: "79.2", suffix: "%", color: "text-purple-600" }
      }
    },
    {
      id: 3,
      name: "Care Plan Participants",
      icon: <UserCog className="mr-2" size={20} />,
      size: 35000,
      totalPopulation: 250000,
      predictedSuccess: 68,
      metrics: {
        engagement: { label: "Engaged Users", value: "24,500", suffix: "", color: "text-blue-600" },
        growth: { label: "Growth Rate", value: "15.8", suffix: "%", color: "text-green-600" },
        retention: { label: "Retention Rate", value: "82.3", suffix: "%", color: "text-purple-600" }
      }
    },
    {
      id: 4,
      name: "Digital Health Users",
      icon: <Brain className="mr-2" size={20} />,
      size: 42000,
      totalPopulation: 250000,
      predictedSuccess: 65,
      metrics: {
        engagement: { label: "Engaged Users", value: "31,500", suffix: "", color: "text-blue-600" },
        growth: { label: "Growth Rate", value: "18.2", suffix: "%", color: "text-green-600" },
        retention: { label: "Retention Rate", value: "75.4", suffix: "%", color: "text-purple-600" }
      }
    },
    {
      id: 5,
      name: "Chronic Disease Management",
      icon: <Stethoscope className="mr-2" size={20} />,
      size: 32000,
      totalPopulation: 250000,
      predictedSuccess: 62,
      metrics: {
        engagement: { label: "Engaged Users", value: "18,880", suffix: "", color: "text-blue-600" },
        growth: { label: "Growth Rate", value: "9.5", suffix: "%", color: "text-green-600" },
        retention: { label: "Retention Rate", value: "71.2", suffix: "%", color: "text-purple-600" }
      }
    },
    {
      id: 6,
      name: "Medication Non-Adherent",
      icon: <Pill className="mr-2" size={20} />,
      size: 18000,
      totalPopulation: 250000,
      predictedSuccess: 58,
      metrics: {
        engagement: { label: "Engaged Users", value: "9,360", suffix: "", color: "text-blue-600" },
        growth: { label: "Growth Rate", value: "11.2", suffix: "%", color: "text-green-600" },
        retention: { label: "Retention Rate", value: "68.5", suffix: "%", color: "text-purple-600" }
      }
    },
    {
      id: 7,
      name: "High-Risk Members",
      icon: <Activity className="mr-2" size={20} />,
      size: 25000,
      totalPopulation: 250000,
      predictedSuccess: 55,
      metrics: {
        engagement: { label: "Engaged Users", value: "11,250", suffix: "", color: "text-blue-600" },
        growth: { label: "Growth Rate", value: "7.8", suffix: "%", color: "text-green-600" },
        retention: { label: "Retention Rate", value: "65.3", suffix: "%", color: "text-purple-600" }
      }
    },
    {
      id: 8,
      name: "Wellness Program",
      icon: <Hospital className="mr-2" size={20} />,
      size: 45000,
      totalPopulation: 250000,
      predictedSuccess: 52,
      metrics: {
        engagement: { label: "Engaged Users", value: "28,350", suffix: "", color: "text-blue-600" },
        growth: { label: "Growth Rate", value: "14.5", suffix: "%", color: "text-green-600" },
        retention: { label: "Retention Rate", value: "72.8", suffix: "%", color: "text-purple-600" }
      }
    },
    {
      id: 9,
      name: "New Members",
      icon: <Users className="mr-2" size={20} />,
      size: 28000,
      totalPopulation: 250000,
      predictedSuccess: 48,
      metrics: {
        engagement: { label: "Engaged Users", value: "12,320", suffix: "", color: "text-blue-600" },
        growth: { label: "Growth Rate", value: "22.5", suffix: "%", color: "text-green-600" },
        retention: { label: "Retention Rate", value: "58.9", suffix: "%", color: "text-purple-600" }
      }
    },
    {
      id: 10,
      name: "First-Time Members",
      icon: <UserPlus className="mr-2" size={20} />,
      size: 22000,
      totalPopulation: 250000,
      predictedSuccess: 45,
      metrics: {
        engagement: { label: "Engaged Users", value: "8,580", suffix: "", color: "text-blue-600" },
        growth: { label: "Growth Rate", value: "25.3", suffix: "%", color: "text-green-600" },
        retention: { label: "Retention Rate", value: "52.4", suffix: "%", color: "text-purple-600" }
      }
    },
    {
      id: 11,
      name: "Preventive Care Due",
      icon: <Calendar className="mr-2" size={20} />,
      size: 30000,
      totalPopulation: 250000,
      predictedSuccess: 42,
      metrics: {
        engagement: { label: "Engaged Users", value: "10,800", suffix: "", color: "text-blue-600" },
        growth: { label: "Growth Rate", value: "13.2", suffix: "%", color: "text-green-600" },
        retention: { label: "Retention Rate", value: "55.7", suffix: "%", color: "text-purple-600" }
      }
    },
    {
      id: 12,
      name: "Churning Risk",
      icon: <UserMinus className="mr-2" size={20} />,
      size: 12000,
      totalPopulation: 250000,
      predictedSuccess: 35,
      metrics: {
        engagement: { label: "Engaged Users", value: "3,240", suffix: "", color: "text-blue-600" },
        growth: { label: "Growth Rate", value: "4.5", suffix: "%", color: "text-green-600" },
        retention: { label: "Retention Rate", value: "45.8", suffix: "%", color: "text-purple-600" }
      }
    }
  ].sort((a, b) => b.predictedSuccess - a.predictedSuccess);

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold">Smart Cohorts Dashboard</h1>
          <p className="text-sm text-gray-500">Monitoring {cohorts.length} active cohorts</p>
        </div>
      </div>
      
      <div className="space-y-2 mb-6">
        {cohorts.map(cohort => (
          <CompactCohortCard 
            key={cohort.id} 
            cohort={cohort} 
            expanded={expandedId === cohort.id}
            onToggle={() => setExpandedId(expandedId === cohort.id ? null : cohort.id)}
          />
        ))}
      </div>

      <div className="border-t pt-6">
        <div className="grid grid-cols-4 gap-4">
          <Button className="w-full" variant="default">
            Create Campaign
          </Button>
          <Button className="w-full" variant="default">
            Generate Content
          </Button>
          <Button className="w-full" variant="default">
            Export to Marketing Cloud
          </Button>
          <Button className="w-full" variant="default">
            Create Voice Agent
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;