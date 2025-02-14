'use client';
import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { 
  User, AlertCircle, Clock, Stethoscope, Building2, 
  Calendar, Store, FileText, Heart, DollarSign,
  MessageCircle, CheckCircle2, Star, AlertTriangle,
  FileSpreadsheet
} from 'lucide-react';

const MedicareAdvantagePreCallSummary = () => {
  const [isClaimsExpanded, setIsClaimsExpanded] = useState(false);
  // Mock data - would come from various Medicare Advantage Plan systems
  const memberData = {
    basic: {
      name: "Sarah Johnson",
      preferredName: "Sarah",
      memberID: "MEM-2024-045",
      age: 67,
      location: "Los Angeles, CA",
      planName: "Medicare Advantage Classic (HMO)",
      planEffectiveDate: "2024-07-01",
      pcpRequired: true,
      communicationPreferences: {
        language: "English",
        bestTimeToCall: "Mornings",
        previousCallDuration: "Average 8 minutes"
      }
    },
    personalInsights: {
      relationshipStatus: "Lives with spouse, Bob",
      lifestyle: ["Interested in healthy cooking", "Has home exercise equipment"],
      interests: ["Preventive care", "Wellness programs"]
    },
    healthData: {
      primaryProvider: "Dr. Michelle Crespo",
      facility: "Dignity Health - Downtown Los Angeles",
      lastVisit: "2024-01-10",
      upcomingVisit: "2025-02-15",
      riskFactors: ["Elevated A1C (5.8%)", "Family history of diabetes", "BMI > 25"],
      preventiveServices: [
        {
          type: "Lab",
          description: "Annual wellness labs due",
          priority: "high"
        },
        {
          type: "Screening",
          description: "Blood pressure check recommended",
          priority: "medium"
        }
      ],
      vaccinations: {
        due: ["Flu shot", "Pneumonia", "Shingles dose 2"],
        completed: ["COVID-19 primary series", "Tdap"]
      }
    },
    prescriptions: {
      currentMedications: [
        {
          name: "Metformin",
          dosage: "500mg",
          frequency: "Twice daily",
          pharmacy: "Out-of-network pharmacy",
          lastFill: "2025-01-15",
          nextFill: "2025-02-15",
          savings: "Potential savings of $45/month at in-network pharmacy"
        },
        {
          name: "Lisinopril",
          dosage: "10mg",
          frequency: "Once daily",
          pharmacy: "Out-of-network pharmacy",
          lastFill: "2025-01-10",
          nextFill: "2025-02-10",
          savings: "Potential savings of $15/month at in-network pharmacy"
        }
      ],
      pharmacyPreference: "Currently using out-of-network pharmacy",
      yearToDateSpend: 850.75
    },
    claims: {
      pending: [
        {
          serviceDate: "2025-01-15",
          provider: "Quest Diagnostics",
          type: "Laboratory",
          status: "Processing",
          expectedResolution: "2025-03-01"
        }
      ],
      recent: [
        {
          serviceDate: "2025-01-10",
          provider: "Dr. Crespo",
          type: "Office Visit",
          status: "Paid",
          memberResponsibility: "$0"
        }
      ]
    },
    grievances: {
      active: [
        {
          dateFiled: "2025-01-20",
          type: "Coverage Determination",
          status: "Under Review",
          description: "Prior authorization request for specialist visit",
          expectedResolution: "2025-02-03"
        }
      ],
      resolved: [
        {
          dateResolved: "2025-01-15",
          type: "Billing",
          outcome: "Resolved in member's favor",
          description: "Incorrect copay charged for preventive visit"
        }
      ]
    },
    actionItems: [
      {
        priority: "Immediate",
        type: "wellness",
        title: "Diabetes Program Enrollment",
        description: "Member eligible for free diabetes program with proven results",
        category: "preventive",
        talkingPoints: [
          "I noticed from your recent health assessment that you may benefit from our diabetes program that helps to prevent the risk",
          "This is a completely free benefit that includes personalized coaching",
          "Many members have successfully prevented diabetes through this program",
          "Would you like to learn more about how it works?"
        ]
      },
      {
        priority: "Immediate",
        type: "pharmacy",
        title: "Switch to In-Network Pharmacy",
        description: "Potential monthly savings of $60 on current prescriptions",
        category: "cost_savings",
        talkingPoints: [
          "I notice you're getting prescriptions from an out-of-network pharmacy",
          "We can help you transfer to an in-network pharmacy",
          "This could save you approximately $60 per month",
          "Would you like help finding a convenient location?"
        ]
      },
      {
        priority: "High",
        type: "vaccinations",
        title: "Schedule Recommended Vaccinations",
        description: "Due for Flu, Pneumonia, and Shingles vaccines",
        category: "preventive",
        talkingPoints: [
          "You're due for several important vaccinations",
          "These are fully covered under your plan",
          "We can arrange transportation to get these at your preferred location",
          "Would you like to schedule these today?"
        ]
      }
    ],
    recommendedPrograms: [
      {
        name: "Diabetes Prevention Program",
        reason: "Matches prediabetes risk profile",
        benefit: "Free coaching, resources, and support",
        priority: "high"
      },
      {
        name: "Nutrition Counseling",
        reason: "Complements prevention program",
        benefit: "Six free sessions with registered dietitian",
        priority: "high"
      },
      {
        name: "Fitness Program",
        reason: "Supports overall health goals",
        benefit: "Free gym membership or home fitness kit",
        priority: "high"
      }
    ]
  };

  return (
    <div className="max-w-6xl p-6 space-y-6">
      {/* Header with Member Overview */}
      <div className="flex items-start justify-between bg-white p-4 rounded-lg shadow">
        <div>
          <h1 className="text-2xl font-bold flex items-center gap-2">
            <User className="h-6 w-6" />
            {memberData.basic.name}
            <Badge variant="secondary" className="ml-2">"Prediabetes Risk Members" cohort</Badge>
          </h1>
          <div className="mt-1 space-y-1">
            <p className="text-gray-600">Member ID: {memberData.basic.memberID}</p>
            <p className="text-gray-600">{memberData.basic.age} years • {memberData.basic.location}</p>
            <p className="text-gray-600">Plan: {memberData.basic.planName}</p>
          </div>
        </div>
        <div className="text-right">
          <Badge className="mb-2">Plan Effective: {memberData.basic.planEffectiveDate}</Badge>
        </div>
      </div>

      {/* Quick Reference Guide */}
      <Card className="bg-blue-50 border-blue-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MessageCircle className="h-5 w-5" />
            Personalization Guide
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h3 className="font-semibold mb-2">Conversation Starters</h3>
              <ul className="space-y-2 text-sm">
                <li>• Prefer to be called: "{memberData.basic.preferredName}"</li>
                <li>• Lives with: {memberData.personalInsights.relationshipStatus}</li>
                <li>• Interests: {memberData.personalInsights.interests.join(", ")}</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Communication Notes</h3>
              <ul className="space-y-2 text-sm">
                <li>• Language: {memberData.basic.communicationPreferences.language}</li>
                <li>• Best time: {memberData.basic.communicationPreferences.bestTimeToCall}</li>
                <li>• Call duration: {memberData.basic.communicationPreferences.previousCallDuration}</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Grievances and Claims Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Claims Status Card */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileSpreadsheet className="h-5 w-5" />
              Claims Status
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h3 className="font-semibold mb-2">Pending Claims</h3>
              {memberData.claims.pending.map((claim, idx) => (
                <div key={idx} className="border-l-4 border-yellow-500 pl-4 py-2 mb-2">
                  <div className="flex justify-between">
                    <h4 className="font-semibold">{claim.provider}</h4>
                    <Badge variant="outline">{claim.status}</Badge>
                  </div>
                  <p className="text-sm text-gray-600">Service Date: {claim.serviceDate}</p>
                  <p className="text-sm text-gray-600">Type: {claim.type}</p>
                  <p className="text-sm text-gray-600">Expected Resolution: {claim.expectedResolution}</p>
                </div>
              ))}
            </div>
            <div>
              <h3 className="font-semibold mb-2">Recent Claims</h3>
              {memberData.claims.recent.map((claim, idx) => (
                <div key={idx} className="border-l-4 border-green-500 pl-4 py-2 mb-2">
                  <div className="flex justify-between">
                    <h4 className="font-semibold">{claim.provider}</h4>
                    <Badge variant="outline">{claim.status}</Badge>
                  </div>
                  <p className="text-sm text-gray-600">Service Date: {claim.serviceDate}</p>
                  <p className="text-sm text-gray-600">Type: {claim.type}</p>
                  <p className="text-sm text-gray-600">Member Responsibility: {claim.memberResponsibility}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

                {/* CTM/Grievances Card */}
                <Card className="border-yellow-200">
          <CardHeader className="bg-yellow-50">
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5" />
              Active Grievances/CTM Cases
            </CardTitle>
          </CardHeader>
          <CardContent>
            {memberData.grievances.active.length > 0 ? (
              memberData.grievances.active.map((grievance, idx) => (
                <div key={idx} className="border-l-4 border-yellow-500 pl-4 py-2 mb-2">
                  <h4 className="font-semibold">{grievance.type}</h4>
                  <p className="text-sm text-gray-600">{grievance.description}</p>
                  <p className="text-sm text-gray-600">Expected Resolution: {grievance.expectedResolution}</p>
                </div>
              ))
            ) : (
              <p className="text-sm text-gray-600">No active grievances or CTM cases</p>
            )}
          </CardContent>
        </Card>

      </div>

      {/* Priority Actions Needed */}
      <Card className="border-blue-200">
        <CardHeader className="bg-blue-50">
          <CardTitle className="flex items-center gap-2 text-blue-700">
            <AlertCircle className="h-5 w-5" />
            Priority Actions Needed
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {memberData.actionItems
            .sort((a, b) => (a.priority === 'Immediate' ? -1 : 1))
            .map((action, idx) => (
              <div key={idx} className="border-l-4 border-blue-500 pl-4 py-3">
                <div className="flex items-center gap-2 mb-2">
                  <h3 className="font-semibold">{action.title}</h3>
                  <Badge variant={action.priority === 'Immediate' ? 'default' : 'secondary'}>
                    {action.priority}
                  </Badge>
                </div>
                <p className="text-sm text-gray-600 mb-2">{action.description}</p>
                <div className="bg-gray-50 p-3 rounded-md">
                  <h4 className="font-semibold text-sm mb-2">Suggested Talking Points:</h4>
                  <ul className="space-y-1 text-sm">
                    {action.talkingPoints.map((point, i) => (
                      <li key={i}>• {point}</li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Health Information */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Building2 className="h-5 w-5" />
              Health Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h3 className="font-semibold mb-2">Primary Care</h3>
              <p>{memberData.healthData.primaryProvider}</p>
              <p className="text-sm text-gray-600">{memberData.healthData.facility}</p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Risk Factors</h3>
              <div className="flex gap-2 flex-wrap">
                {memberData.healthData.riskFactors.map((factor, idx) => (
                  <Badge key={idx} variant="secondary">{factor}</Badge>
                ))}
              </div>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Vaccinations Due</h3>
              <div className="flex gap-2 flex-wrap">
                {memberData.healthData.vaccinations.due.map((vaccine, idx) => (
                  <Badge key={idx} variant="outline">{vaccine}</Badge>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Prescription Information */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Stethoscope className="h-5 w-5" />
              Current Prescriptions
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <div className="flex justify-between items-center mb-2">
                <h3 className="font-semibold">Medications</h3>
                <Badge variant="outline" className="flex items-center gap-1">
                  <DollarSign className="h-4 w-4" />
                  YTD: ${memberData.prescriptions.yearToDateSpend}
                </Badge>
              </div>
              {memberData.prescriptions.currentMedications.map((med, idx) => (
                <div key={idx} className="border-l-4 border-blue-500 pl-4 py-2 mb-2">
                  <div className="flex justify-between">
                    <h4 className="font-semibold">{med.name} {med.dosage}</h4>
                    <Badge variant="destructive">Out of Network</Badge>
                  </div>
                  <p className="text-sm text-gray-600">Frequency: {med.frequency}</p>
                  <p className="text-sm text-gray-600">Last Fill: {med.lastFill}</p>
                  <p className="text-sm text-gray-600">Next Fill: {med.nextFill}</p>
                  <p className="text-sm font-medium text-green-600">{med.savings}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>



        {/* Recommended Programs */}
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Heart className="h-5 w-5" />
              Recommended Programs
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {memberData.recommendedPrograms.map((program, idx) => (
                <div key={idx} className="border rounded-lg p-4">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-semibold">{program.name}</h3>
                    <Badge variant={program.priority === 'high' ? 'default' : 'secondary'}>
                      {program.priority}
                    </Badge>
                  </div>
                  <p className="text-sm text-gray-600 mb-2">{program.reason}</p>
                  <p className="text-sm font-medium">Benefit: {program.benefit}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default MedicareAdvantagePreCallSummary;