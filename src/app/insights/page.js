"use client";

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Users, TrendingUp, Activity, Target, HeartPulse, Pill, Calendar, Phone, Mail, MessageSquare } from 'lucide-react';

// Mock data
const mockData = {
  memberGrowth: [
    { name: 'Jan', growth: 4000 },
    { name: 'Feb', growth: 3000 },
    { name: 'Mar', growth: 5000 },
    { name: 'Apr', growth: 4500 },
    { name: 'May', growth: 6000 },
    { name: 'Jun', growth: 5500 },
  ],
  ageDistribution: [
    { age: '65-70', value: 30 },
    { age: '71-75', value: 25 },
    { age: '76-80', value: 20 },
    { age: '81-85', value: 15 },
    { age: '86+', value: 10 },
  ],
  funnelMetrics: [
    { stage: "Total Diabetic Members", value: "12,500", percentage: "100%" },
    { stage: "Actively Managed", value: "9,800", percentage: "78%" },
    { stage: "Program Enrolled", value: "7,200", percentage: "58%" },
    { stage: "Consistently Engaged", value: "5,400", percentage: "43%" }
  ]
};

const MetricCard = ({ title, value, icon: Icon, trend }) => (
  <Card className="hover:shadow-lg transition-shadow">
    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
      <CardTitle className="text-sm font-medium">{title}</CardTitle>
      <Icon className="h-4 w-4 text-muted-foreground" />
    </CardHeader>
    <CardContent>
      <div className="text-2xl font-bold">{value}</div>
      {trend && <div className="text-sm text-muted-foreground mt-1">{trend}</div>}
    </CardContent>
  </Card>
);

const CohortDetailsDashboard = () => {
  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-4">Members with Diabetes</h1>
        <Card className="bg-blue-50">
          <CardContent className="pt-6">
            <h3 className="text-lg font-semibold mb-3">Cohort Definition</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <h4 className="font-medium mb-2">Clinical Profile:</h4>
                <ul className="list-disc pl-5 space-y-1">
                  <li>Diagnosed Type 1 or Type 2 diabetes</li>
                  <li>Currently on diabetes medication</li>
                  <li>Regular monitoring requirements</li>
                </ul>
              </div>
              <div>
                <h4 className="font-medium mb-2">Demographics:</h4>
                <ul className="list-disc pl-5 space-y-1">
                  <li>65+ Medicare-eligible members</li>
                  <li>70% urban, 30% rural distribution</li>
                  <li>60% female, 40% male</li>
                  <li>Primary English speakers (92%)</li>
                </ul>
              </div>
              <div>
                <h4 className="font-medium mb-2">Engagement Preferences:</h4>
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <Phone className="h-4 w-4 text-blue-600" />
                    <span>Mobile App (45% adoption)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Mail className="h-4 w-4 text-blue-600" />
                    <span>Email (35% preferred)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MessageSquare className="h-4 w-4 text-blue-600" />
                    <span>SMS (20% preferred)</span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 gap-6 mb-8">
        <Card>
          <CardHeader>
            <CardTitle>Member Engagement Funnel</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {mockData.funnelMetrics.map((metric, index) => (
                <div 
                  key={index} 
                  className={`p-4 rounded-lg ${
                    index === 0 ? 'bg-blue-100' : 
                    index === 1 ? 'bg-blue-200' : 
                    index === 2 ? 'bg-blue-300' : 
                    'bg-blue-400'
                  }`}
                >
                  <div className="text-sm font-medium mb-1">{metric.stage}</div>
                  <div className="text-2xl font-bold">{metric.value}</div>
                  <div className="text-sm font-medium mt-1 text-blue-800">
                    {metric.percentage} of total
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <Card>
          <CardHeader>
            <CardTitle>Member Growth</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={mockData.memberGrowth}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="growth" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Age Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={mockData.ageDistribution}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="age" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="value" fill="#82ca9d" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader className="border-b">
            <div className="flex items-center gap-2">
              <HeartPulse className="h-5 w-5 text-red-500" />
              <CardTitle>Health Metrics</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="space-y-4">
              <div className="border-l-4 border-red-500 pl-4">
                <div className="text-sm font-medium text-gray-500">Glycemic Control</div>
                <div className="mt-1">
                  <span className="text-xl font-bold">67%</span> members with HbA1c {'<'} 7%
                </div>
              </div>
              <div className="border-l-4 border-orange-500 pl-4">
                <div className="text-sm font-medium text-gray-500">Comorbidities</div>
                <div className="mt-1">
                  <span className="text-xl font-bold">45%</span> with hypertension
                </div>
              </div>
              <div className="border-l-4 border-green-500 pl-4">
                <div className="text-sm font-medium text-gray-500">Preventive Care</div>
                <div className="mt-1">
                  <span className="text-xl font-bold">82%</span> up-to-date on screenings
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader className="border-b">
            <div className="flex items-center gap-2">
              <Activity className="h-5 w-5 text-blue-500" />
              <CardTitle>Engagement Insights</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="space-y-4">
              <div className="border-l-4 border-blue-500 pl-4">
                <div className="text-sm font-medium text-gray-500">Digital Adoption</div>
                <div className="mt-1">
                  <span className="text-xl font-bold">72%</span> using glucose monitoring app
                </div>
              </div>
              <div className="border-l-4 border-purple-500 pl-4">
                <div className="text-sm font-medium text-gray-500">Appointment Adherence</div>
                <div className="mt-1">
                  <span className="text-xl font-bold">85%</span> keep scheduled visits
                </div>
              </div>
              <div className="border-l-4 border-indigo-500 pl-4">
                <div className="text-sm font-medium text-gray-500">Education Participation</div>
                <div className="mt-1">
                  <span className="text-xl font-bold">58%</span> completed diabetes education
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader className="border-b">
            <div className="flex items-center gap-2">
              <Target className="h-5 w-5 text-green-500" />
              <CardTitle>Financial Insights</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="space-y-4">
              <div className="border-l-4 border-green-500 pl-4">
                <div className="text-sm font-medium text-gray-500">Per Member Cost</div>
                <div className="mt-1">
                  <span className="text-xl font-bold">$12,500</span> annual average
                </div>
              </div>
              <div className="border-l-4 border-emerald-500 pl-4">
                <div className="text-sm font-medium text-gray-500">Medication Adherence</div>
                <div className="mt-1">
                  <span className="text-xl font-bold">$2,800</span> savings potential
                </div>
              </div>
              <div className="border-l-4 border-teal-500 pl-4">
                <div className="text-sm font-medium text-gray-500">Prevention Impact</div>
                <div className="mt-1">
                  <span className="text-xl font-bold">18%</span> reduction in ER visits
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="hover:shadow-lg transition-shadow">
        <CardHeader className="border-b">
          <div className="flex items-center gap-2">
            <Pill className="h-5 w-5 text-purple-500" />
            <CardTitle>Campaign Recommendations</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-purple-50 p-4 rounded-lg">
              <h4 className="font-semibold text-purple-700 mb-2">Digital Engagement Push</h4>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  <span>Launch: Next Month</span>
                </li>
                <li>• Mobile app onboarding campaign</li>
                <li>• Daily glucose logging reminders</li>
                <li>• Virtual coaching sessions</li>
                <li className="text-purple-700 font-medium mt-2">Expected Impact: +25% engagement</li>
              </ul>
            </div>
            
            <div className="bg-blue-50 p-4 rounded-lg">
              <h4 className="font-semibold text-blue-700 mb-2">Education Program</h4>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  <span>Launch: Q3 2024</span>
                </li>
                <li>• Nutrition workshop series</li>
                <li>• Peer support groups</li>
                <li>• Lifestyle modification classes</li>
                <li className="text-blue-700 font-medium mt-2">Expected Impact: -1.2 HbA1c</li>
              </ul>
            </div>
            
            <div className="bg-green-50 p-4 rounded-lg">
              <h4 className="font-semibold text-green-700 mb-2">Care Coordination</h4>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  <span>Launch: Immediate</span>
                </li>
                <li>• Medication adherence program</li>
                <li>• PCP appointment scheduling</li>
                <li>• Care gap closure outreach</li>
                <li className="text-green-700 font-medium mt-2">Expected Impact: -15% costs</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CohortDetailsDashboard;