"use client";

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, TrendingUp, Activity, Target, Map, BarChart, Heart, TrendingDown } from 'lucide-react';

const TabButton = ({ active, onClick, children }) => (
  <button
    onClick={onClick}
    className={`px-4 py-2 font-medium rounded-t-lg transition-colors ${
      active 
        ? "bg-white border-b-2 border-orange-500 text-orange-600" 
        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
    }`}
  >
    {children}
  </button>
);

const PrediabetesReport = () => {
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2">Prediabetes Risk Members Report</h1>
        <p className="text-gray-500 mb-6">Generated on February 20, 2025 • Reporting period: Q4 2024</p>
      </div>

      <div className="flex space-x-1 mb-6 border-b">
        <TabButton 
          active={activeTab === 'overview'} 
          onClick={() => setActiveTab('overview')}
        >
          Overview
        </TabButton>
        <TabButton 
          active={activeTab === 'demographics'} 
          onClick={() => setActiveTab('demographics')}
        >
          Demographics
        </TabButton>
        <TabButton 
          active={activeTab === 'engagement'} 
          onClick={() => setActiveTab('engagement')}
        >
          Member Engagement
        </TabButton>
        <TabButton 
          active={activeTab === 'health'} 
          onClick={() => setActiveTab('health')}
        >
          Health Insights
        </TabButton>
        <TabButton 
          active={activeTab === 'recommendations'} 
          onClick={() => setActiveTab('recommendations')}
        >
          Recommendations
        </TabButton>
      </div>

      {/* Overview Tab */}
      {activeTab === 'overview' && (
        <div>
          <Card className="bg-orange-50 mb-8">
            <CardContent className="pt-6">
              <h3 className="text-lg font-semibold mb-3">Cohort Definition</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <h4 className="font-medium mb-2">Clinical Profile:</h4>
                  <ul className="list-disc pl-5 space-y-1">
                    <li>Elevated blood glucose levels</li>
                    <li>A1C between 5.7% and 6.4%</li>
                    <li>Fasting glucose 100-125 mg/dL</li>
                    <li>No current diabetes diagnosis</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-medium mb-2">Demographics:</h4>
                  <ul className="list-disc pl-5 space-y-1">
                    <li>Middle-aged to older individuals with higher prevalence</li>
                    <li>Regional variations affecting access to care</li>
                    <li>Socioeconomic barriers influencing health outcomes</li>
                    <li>Life stage impacts on health management abilities</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          <h2 className="text-2xl font-semibold mb-4">Member Funnel</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
            <Card className="bg-orange-100">
              <CardContent className="p-4">
                <div className="text-sm font-medium mb-1">Total Cohort Size</div>
                <div className="text-2xl font-bold">450,000</div>
                <div className="text-sm font-medium mt-1 text-gray-700">22.5% of members</div>
              </CardContent>
            </Card>
            <Card className="bg-orange-200">
              <CardContent className="p-4">
                <div className="text-sm font-medium mb-1">Current Enrollment</div>
                <div className="text-2xl font-bold">18,900</div>
                <div className="text-sm font-medium mt-1 text-gray-700">4.2% of cohort</div>
              </CardContent>
            </Card>
            <Card className="bg-orange-300">
              <CardContent className="p-4">
                <div className="text-sm font-medium mb-1">Potential New Enrollment</div>
                <div className="text-2xl font-bold">+52,088</div>
                <div className="text-sm font-medium mt-1 text-gray-700">Growth opportunity</div>
              </CardContent>
            </Card>
            <Card className="bg-green-300">
            <CardContent className="p-4">
                <div className="text-sm font-medium mb-1">Potential with Personalization</div>
                <div className="text-2xl font-bold">71,100</div>
                <div className="text-sm font-medium mt-1 text-gray-700">15.8% of cohort</div>
              </CardContent>
            </Card>
          </div>
        </div>
      )}

      {/* Demographics Tab */}
      {activeTab === 'demographics' && (
        <div>
          <h2 className="text-2xl font-semibold mb-4">Demographic Analysis</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <Card>
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Users className="h-5 w-5 text-orange-500" />
                  <CardTitle>Age Distribution</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">45-50 years</span>
                    <div className="w-2/3 h-5 bg-gray-100 rounded-full overflow-hidden">
                      <div className="bg-orange-500 h-full rounded-full" style={{ width: '25%' }}></div>
                    </div>
                    <span className="text-sm font-medium">25%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">51-55 years</span>
                    <div className="w-2/3 h-5 bg-gray-100 rounded-full overflow-hidden">
                      <div className="bg-orange-500 h-full rounded-full" style={{ width: '30%' }}></div>
                    </div>
                    <span className="text-sm font-medium">30%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">56-60 years</span>
                    <div className="w-2/3 h-5 bg-gray-100 rounded-full overflow-hidden">
                      <div className="bg-orange-500 h-full rounded-full" style={{ width: '28%' }}></div>
                    </div>
                    <span className="text-sm font-medium">28%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">61-65 years</span>
                    <div className="w-2/3 h-5 bg-gray-100 rounded-full overflow-hidden">
                      <div className="bg-orange-500 h-full rounded-full" style={{ width: '17%' }}></div>
                    </div>
                    <span className="text-sm font-medium">17%</span>
                  </div>
                </div>
                <div className="mt-4 text-sm text-gray-600">
                  <p>Middle-aged adults (51-55) represent the largest segment of the prediabetes risk population, indicating a key target demographic for intervention programs.</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Map className="h-5 w-5 text-orange-500" />
                  <CardTitle>Geographic Insights</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="border-b pb-2">
                    <h4 className="font-medium mb-1">Top 5 States by Prevalence</h4>
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div>1. Mississippi (14.2%)</div>
                      <div>2. West Virginia (13.8%)</div>
                      <div>3. Alabama (13.5%)</div>
                      <div>4. Louisiana (13.2%)</div>
                      <div>5. Oklahoma (12.7%)</div>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-medium mb-1">Regional Distribution</h4>
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div>South: 38%</div>
                      <div>Midwest: 26%</div>
                      <div>Northeast: 20%</div>
                      <div>West: 16%</div>
                    </div>
                  </div>
                </div>
                <div className="mt-4 text-sm text-gray-600">
                  <p>Southern states show significantly higher prevalence of prediabetes risk, correlating with known regional health disparities and access to preventative care.</p>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <BarChart className="h-5 w-5 text-orange-500" />
                <CardTitle>Member Profiles</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">Mid-life Adults</span>
                  <div className="w-2/3 h-5 bg-gray-100 rounded-full overflow-hidden">
                    <div className="bg-orange-500 h-full rounded-full" style={{ width: '45%' }}></div>
                  </div>
                  <span className="text-sm font-medium">45%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">Young Adults</span>
                  <div className="w-2/3 h-5 bg-gray-100 rounded-full overflow-hidden">
                    <div className="bg-orange-500 h-full rounded-full" style={{ width: '30%' }}></div>
                  </div>
                  <span className="text-sm font-medium">30%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">Older Adults</span>
                  <div className="w-2/3 h-5 bg-gray-100 rounded-full overflow-hidden">
                    <div className="bg-orange-500 h-full rounded-full" style={{ width: '20%' }}></div>
                  </div>
                  <span className="text-sm font-medium">20%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">Students</span>
                  <div className="w-2/3 h-5 bg-gray-100 rounded-full overflow-hidden">
                    <div className="bg-orange-500 h-full rounded-full" style={{ width: '5%' }}></div>
                  </div>
                  <span className="text-sm font-medium">5%</span>
                </div>
              </div>
              <div className="mt-4 text-sm text-gray-600">
                <p>Mid-life adults (ages 40-60) represent the largest demographic segment, with unique challenges around work-life balance affecting health management.</p>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Member Engagement Tab */}
      {activeTab === 'engagement' && (
        <div>
          <h2 className="text-2xl font-semibold mb-4">Member Insights & Engagement</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <Card>
              <CardHeader>
                <div className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-orange-500" />
                  <CardTitle>Acquisition Channels</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between border-b pb-2">
                    <span className="font-medium">Meta Platforms</span>
                    <span className="text-orange-500 font-medium">42%</span>
                  </div>
                  <div className="flex justify-between border-b pb-2">
                    <span className="font-medium">TikTok</span>
                    <span className="text-orange-500 font-medium">28%</span>
                  </div>
                  <div className="flex justify-between border-b pb-2">
                    <span className="font-medium">Google Search</span>
                    <span className="text-orange-500 font-medium">18%</span>
                  </div>
                  <div className="flex justify-between border-b pb-2">
                    <span className="font-medium">Direct Referrals</span>
                    <span className="text-orange-500 font-medium">12%</span>
                  </div>
                </div>
                <div className="mt-4 text-sm text-gray-600">
                  <p>Social media platforms represent 70% of member acquisitions, with Meta providing the highest conversion rates, particularly among adults aged 45-60.</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Activity className="h-5 w-5 text-orange-500" />
                  <CardTitle>Engagement Data</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between border-b pb-2">
                    <span className="font-medium">Nutrition Plans</span>
                    <span className="text-orange-500 font-medium">420 clicks/day</span>
                  </div>
                  <div className="flex justify-between border-b pb-2">
                    <span className="font-medium">Weight Management</span>
                    <span className="text-orange-500 font-medium">350 clicks/day</span>
                  </div>
                  <div className="flex justify-between border-b pb-2">
                    <span className="font-medium">Success Stories</span>
                    <span className="text-orange-500 font-medium">310 clicks/day</span>
                  </div>
                  <div className="flex justify-between border-b pb-2">
                    <span className="font-medium">Exercise Videos</span>
                    <span className="text-orange-500 font-medium">280 clicks/day</span>
                  </div>
                </div>
                <div className="mt-4 text-sm text-gray-600">
                  <p>Diet-related content generates the highest engagement, suggesting that nutrition-focused interventions may be most effective for this cohort.</p>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <Map className="h-5 w-5 text-orange-500" />
                <CardTitle>SDOH Factors (Community Level)</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex justify-between border-b pb-2">
                  <span className="font-medium">Economic Barriers</span>
                  <span className="text-orange-500 font-medium">40%</span>
                </div>
                <div className="flex justify-between border-b pb-2">
                  <span className="font-medium">Food Deserts</span>
                  <span className="text-orange-500 font-medium">35%</span>
                </div>
                <div className="flex justify-between border-b pb-2">
                  <span className="font-medium">Limited Healthcare Access</span>
                  <span className="text-orange-500 font-medium">30%</span>
                </div>
                <div className="flex justify-between border-b pb-2">
                  <span className="font-medium">Low Walkability</span>
                  <span className="text-orange-500 font-medium">25%</span>
                </div>
                <div className="flex justify-between border-b pb-2">
                  <span className="font-medium">Educational Gaps</span>
                  <span className="text-orange-500 font-medium">20%</span>
                </div>
              </div>
              <div className="mt-4 text-sm text-gray-600">
                <p>Economic factors and food access issues are the most prominent SDOH concerns, suggesting a need for affordability solutions and nutritional assistance programs.</p>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Health Insights Tab */}
      {activeTab === 'health' && (
        <div>
          <h2 className="text-2xl font-semibold mb-4">Health Data & Self-Reported Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card>
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Heart className="h-5 w-5 text-orange-500" />
                  <CardTitle>Motivations</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between border-b pb-2">
                    <span className="font-medium">Weight Loss</span>
                    <span className="text-orange-500 font-medium">65%</span>
                  </div>
                  <div className="flex justify-between border-b pb-2">
                    <span className="font-medium">Energy Levels</span>
                    <span className="text-orange-500 font-medium">48%</span>
                  </div>
                  <div className="flex justify-between border-b pb-2">
                    <span className="font-medium">Family History</span>
                    <span className="text-orange-500 font-medium">42%</span>
                  </div>
                  <div className="flex justify-between border-b pb-2">
                    <span className="font-medium">Doctor Recommendation</span>
                    <span className="text-orange-500 font-medium">38%</span>
                  </div>
                </div>
                <div className="mt-4 text-sm text-gray-600">
                  <p>Weight management concerns are the primary motivator, followed by desire for improved daily energy levels.</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="flex items-center gap-2">
                  <TrendingDown className="h-5 w-5 text-orange-500" />
                  <CardTitle>Symptoms</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between border-b pb-2">
                    <span className="font-medium">Fatigue</span>
                    <span className="text-orange-500 font-medium">58%</span>
                  </div>
                  <div className="flex justify-between border-b pb-2">
                    <span className="font-medium">Increased Thirst</span>
                    <span className="text-orange-500 font-medium">45%</span>
                  </div>
                  <div className="flex justify-between border-b pb-2">
                    <span className="font-medium">Frequent Urination</span>
                    <span className="text-orange-500 font-medium">40%</span>
                  </div>
                  <div className="flex justify-between border-b pb-2">
                    <span className="font-medium">Blurred Vision</span>
                    <span className="text-orange-500 font-medium">25%</span>
                  </div>
                </div>
                <div className="mt-4 text-sm text-gray-600">
                  <p>Fatigue is the most commonly reported symptom, suggesting a need for energy management strategies in intervention programs.</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Target className="h-5 w-5 text-orange-500" />
                  <CardTitle>Condition Subtypes</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between border-b pb-2">
                    <span className="font-medium">Insulin Resistant</span>
                    <span className="text-orange-500 font-medium">45%</span>
                  </div>
                  <div className="flex justify-between border-b pb-2">
                    <span className="font-medium">Metabolic Syndrome</span>
                    <span className="text-orange-500 font-medium">30%</span>
                  </div>
                  <div className="flex justify-between border-b pb-2">
                    <span className="font-medium">Gestational History</span>
                    <span className="text-orange-500 font-medium">15%</span>
                  </div>
                  <div className="flex justify-between border-b pb-2">
                    <span className="font-medium">Other</span>
                    <span className="text-orange-500 font-medium">10%</span>
                  </div>
                </div>
                <div className="mt-4 text-sm text-gray-600">
                  <p>Insulin resistance is predominant, indicating potential for targeted medication strategies alongside lifestyle interventions.</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      )}

      {/* Recommendations Tab */}
      {activeTab === 'recommendations' && (
        <div>
          <Card className="bg-orange-50 mb-8">
            <CardHeader>
              <CardTitle>Key Findings & Recommendations</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium mb-2">Key Findings:</h4>
                  <ul className="list-disc pl-5 space-y-2">
                    <li>Current program enrollment (4.2%) significantly underserves the prediabetes risk population</li>
                    <li>Weight management and nutrition are primary concerns and motivators</li>
                    <li>Social media channels, particularly Meta platforms, are most effective for member acquisition</li>
                    <li>Mid-life adults represent the largest demographic with potential for intervention</li>
                    <li>Economic barriers and food access issues present significant obstacles to health management</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-medium mb-2">Recommendations:</h4>
                  <ul className="list-disc pl-5 space-y-2">
                    <li>Develop personalized outreach targeting the 45-60 age demographic through Meta platforms</li>
                    <li>Create nutrition-focused content emphasizing affordable, accessible meal planning</li>
                    <li>Design programs that address fatigue management alongside diabetes prevention</li>
                    <li>Expand virtual care options to overcome healthcare access limitations</li>
                    <li>Partner with community organizations in southern states to address regional disparities</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

export default PrediabetesReport;
