/**
 * SPDX-License-Identifier: UNLICENSED
 * Copyright: Proprietary
 */

import { Injectable } from '@nestjs/common';
import { CareerAssessmentDto, CareerRoadmapDto, CareerGoal, TimeFrame } from '../dto/career-planning.dto';

@Injectable()
export class CareerPlanningService {
  /**
   * Generate comprehensive career roadmap based on assessment
   */
  async generateCareerRoadmap(assessment: CareerAssessmentDto): Promise<CareerRoadmapDto> {
    const roadmap = {
      roadmapTitle: this.generateRoadmapTitle(assessment),
      targetCareer: this.getTargetCareerDescription(assessment.careerGoal),
      timeline: this.getTimelineDescription(assessment.timeFrame),
      phases: this.generatePhases(assessment),
      certifications: this.recommendCertifications(assessment),
      skillDevelopment: this.generateSkillDevelopmentPlan(assessment),
      jobStrategy: this.generateJobStrategy(assessment),
      financialProjection: this.generateFinancialProjection(assessment),
    };

    return roadmap;
  }

  /**
   * Generate immediate action plan for next 30 days
   */
  async generateImmediateActionPlan(assessment: CareerAssessmentDto): Promise<any> {
    return {
      week1: {
        title: 'Foundation Building',
        tasks: [
          'Update resume with professional summary',
          'Optimize LinkedIn profile',
          'Register on NAPS apprenticeship portal',
          'Apply to 5 target companies',
          'Create GitHub account'
        ]
      },
      week2: {
        title: 'Active Networking',
        tasks: [
          'Connect with 20 industry professionals on LinkedIn',
          'Join biotechnology WhatsApp groups',
          'Attend 2 virtual industry webinars',
          'Start Python basics course',
          'Apply to 5 more companies'
        ]
      },
      week3: {
        title: 'Skill Development',
        tasks: [
          'Complete Google Digital Marketing foundations',
          'Begin AWS AI solutions course',
          'Create portfolio website structure',
          'Practice interview questions',
          'Network with Parul University alumni'
        ]
      },
      week4: {
        title: 'Application & Preparation',
        tasks: [
          'Submit applications to government schemes',
          'Prepare for upcoming interviews',
          'Complete first portfolio project',
          'Begin freelance scientific writing',
          'Plan next month strategy'
        ]
      }
    };
  }

  private generateRoadmapTitle(assessment: CareerAssessmentDto): string {
    const goalMap = {
      [CareerGoal.QA_QC]: 'Quality Control Specialist',
      [CareerGoal.BIOINFORMATICS]: 'Bioinformatics Analyst',
      [CareerGoal.RESEARCH]: 'Research Scientist',
      [CareerGoal.PRODUCTION]: 'Production Specialist',
      [CareerGoal.CLINICAL_DATA]: 'Clinical Data Coordinator',
      [CareerGoal.REGULATORY_AFFAIRS]: 'Regulatory Affairs Specialist',
      [CareerGoal.MEDICAL_REPRESENTATIVE]: 'Medical Representative',
      [CareerGoal.BIOTECH_STARTUP]: 'Biotech Entrepreneur',
    };

    return `${assessment.educationLevel} to ${goalMap[assessment.careerGoal]} - ${assessment.timeFrame.replace('_', ' ')} Transformation Plan`;
  }

  private getTargetCareerDescription(goal: CareerGoal): string {
    const descriptions = {
      [CareerGoal.QA_QC]: 'Quality Control/Quality Assurance roles in pharmaceutical and biotechnology companies',
      [CareerGoal.BIOINFORMATICS]: 'Bioinformatics Analyst with expertise in data analysis and computational biology',
      [CareerGoal.RESEARCH]: 'Research Scientist in biotechnology R&D with focus on innovation',
      [CareerGoal.PRODUCTION]: 'Production roles in pharmaceutical manufacturing and bioprocessing',
      [CareerGoal.CLINICAL_DATA]: 'Clinical Data Coordinator managing clinical trial data and compliance',
      [CareerGoal.REGULATORY_AFFAIRS]: 'Regulatory Affairs Specialist ensuring compliance with healthcare regulations',
      [CareerGoal.MEDICAL_REPRESENTATIVE]: 'Medical Representative with technical expertise and digital marketing skills',
      [CareerGoal.BIOTECH_STARTUP]: 'Biotech entrepreneur leveraging domain knowledge and modern technology',
    };

    return descriptions[goal];
  }

  private getTimelineDescription(timeFrame: TimeFrame): string {
    const timelines = {
      [TimeFrame.THREE_MONTHS]: '3-month intensive career transition plan',
      [TimeFrame.SIX_MONTHS]: '6-month structured career development program',
      [TimeFrame.ONE_YEAR]: '12-month comprehensive career transformation',
      [TimeFrame.EIGHTEEN_MONTHS]: '18-month strategic career advancement to senior roles',
    };

    return timelines[timeFrame];
  }

  private generatePhases(assessment: CareerAssessmentDto): any[] {
    if (assessment.timeFrame === TimeFrame.EIGHTEEN_MONTHS) {
      return [
        {
          phase: 'Foundation & Job Acquisition (0-3 months)',
          duration: '3 months',
          objectives: [
            'Secure entry-level position or apprenticeship',
            'Build professional online presence',
            'Develop basic technical skills'
          ],
          milestones: [
            'Resume optimization completed',
            'LinkedIn profile with 100+ connections',
            'First job/apprenticeship secured',
            'Basic Python/digital marketing skills acquired'
          ],
          recommendedActions: [
            'Apply to NAPS apprenticeship program',
            'Target Sun Pharma, Zydus, Alembic for QC roles',
            'Complete Google Digital Marketing certification',
            'Start AWS AI Solutions course'
          ]
        },
        {
          phase: 'Skill Development & Experience (4-8 months)',
          duration: '5 months',
          objectives: [
            'Gain practical work experience',
            'Develop specialized technical skills',
            'Build professional portfolio'
          ],
          milestones: [
            'Completed 6 months work experience',
            'Advanced certification completed',
            'GitHub portfolio with 3+ projects',
            'Professional network of 200+ connections'
          ],
          recommendedActions: [
            'Complete UC-SD Bioinformatics Specialization',
            'Develop cloud computing skills (GCP/AWS)',
            'Create laboratory automation projects',
            'Start freelance scientific writing'
          ]
        },
        {
          phase: 'Specialization & Career Advancement (9-18 months)',
          duration: '10 months',
          objectives: [
            'Transition to specialized role',
            'Achieve salary growth of 100%+',
            'Establish industry expertise'
          ],
          milestones: [
            'Promoted or transitioned to specialist role',
            'Salary increased to ₹4-6 LPA range',
            'Industry recognition or published work',
            'Mentoring junior professionals'
          ],
          recommendedActions: [
            'Target bioinformatics analyst positions',
            'Pursue advanced certifications in specialized area',
            'Speak at industry conferences or webinars',
            'Consider further education (MSc/MBA) if needed'
          ]
        }
      ];
    }

    // Return shorter phases for other timeframes
    return this.generateShorterPhases(assessment);
  }

  private generateShorterPhases(assessment: CareerAssessmentDto): any[] {
    // Simplified phases for shorter timeframes
    return [
      {
        phase: 'Immediate Action (0-1 month)',
        duration: '1 month',
        objectives: ['Secure first opportunity', 'Build foundation'],
        milestones: ['Resume updated', 'Applications submitted'],
        recommendedActions: ['Apply to government schemes', 'Network actively']
      },
      {
        phase: 'Skill Building & Transition (2-6 months)',
        duration: '5 months',
        objectives: ['Gain experience', 'Develop skills'],
        milestones: ['Job secured', 'Skills certified'],
        recommendedActions: ['Complete key certifications', 'Build portfolio']
      }
    ];
  }

  private recommendCertifications(assessment: CareerAssessmentDto): any[] {
    const baseCertifications = [
      {
        name: 'Python for Everybody (Coursera)',
        provider: 'University of Michigan',
        cost: 3200,
        duration: '4 weeks',
        priority: 'High' as const,
        expectedROI: 'Essential for bioinformatics transition'
      },
      {
        name: 'Google Digital Marketing & E-commerce',
        provider: 'Google Career Certificates',
        cost: 2500,
        duration: '3 months',
        priority: 'High' as const,
        expectedROI: 'Valuable for pharmaceutical marketing roles'
      },
      {
        name: 'AWS AI Solutions',
        provider: 'Amazon Web Services',
        cost: 4000,
        duration: '2 months',
        priority: 'Medium' as const,
        expectedROI: 'Opens cloud computing opportunities'
      }
    ];

    // Add goal-specific certifications
    if (assessment.careerGoal === CareerGoal.BIOINFORMATICS) {
      baseCertifications.push({
        name: 'Bioinformatics Specialization',
        provider: 'UC San Diego (Coursera)',
        cost: 12000,
        duration: '6 months',
        priority: 'High' as const,
        expectedROI: 'Direct pathway to bioinformatics roles'
      });
    }

    return baseCertifications;
  }

  private generateSkillDevelopmentPlan(assessment: CareerAssessmentDto): any {
    return {
      technicalSkills: [
        'Python Programming for Data Analysis',
        'Statistical Software (R/SPSS)',
        'Cloud Computing (AWS/Google Cloud)',
        'Database Management (SQL)',
        'Bioinformatics Tools (BLAST, NCBI)'
      ],
      softSkills: [
        'Communication and Presentation',
        'Project Management',
        'Problem-solving and Critical Thinking',
        'Team Collaboration',
        'Time Management'
      ],
      laboratorySkills: [
        'GMP/GLP Documentation',
        'Advanced PCR Techniques',
        'Cell Culture and Fermentation',
        'Analytical Method Validation',
        'Quality Control Testing'
      ],
      digitalSkills: [
        'Digital Marketing and SEO',
        'Social Media Management',
        'Content Creation and Writing',
        'Data Visualization',
        'Web Development Basics'
      ]
    };
  }

  private generateJobStrategy(assessment: CareerAssessmentDto): any {
    const locationBasedCompanies = assessment.currentLocation.toLowerCase().includes('vadodara') || 
                                  assessment.currentLocation.toLowerCase().includes('gujarat') ? [
      'Sun Pharmaceutical Industries',
      'Zydus Lifesciences',
      'Alembic Pharmaceuticals',
      'Cadila Healthcare',
      'Torrent Pharmaceuticals'
    ] : [
      'Biocon',
      'Dr. Reddy\'s Laboratories',
      'Cipla',
      'Lupin',
      'Glenmark Pharmaceuticals'
    ];

    return {
      targetCompanies: locationBasedCompanies,
      applicationChannels: [
        'Company career portals',
        'LinkedIn job applications',
        'NAPS apprenticeship program',
        'Walk-in interviews',
        'Employee referrals',
        'Recruitment agencies'
      ],
      networkingStrategy: [
        'LinkedIn professional networking',
        'Alumni associations (Parul University)',
        'Industry webinars and conferences',
        'Professional associations (IBSA, DBT)',
        'Local biotechnology meetups'
      ],
      expectedSalaryRange: this.getSalaryRange(assessment.careerGoal, assessment.timeFrame)
    };
  }

  private getSalaryRange(goal: CareerGoal, timeFrame: TimeFrame): string {
    const baseSalary = {
      [CareerGoal.QA_QC]: { entry: 18000, experienced: 35000 },
      [CareerGoal.BIOINFORMATICS]: { entry: 25000, experienced: 60000 },
      [CareerGoal.RESEARCH]: { entry: 20000, experienced: 45000 },
      [CareerGoal.PRODUCTION]: { entry: 22000, experienced: 40000 },
      [CareerGoal.CLINICAL_DATA]: { entry: 28000, experienced: 55000 },
      [CareerGoal.REGULATORY_AFFAIRS]: { entry: 30000, experienced: 65000 },
      [CareerGoal.MEDICAL_REPRESENTATIVE]: { entry: 25000, experienced: 50000 },
      [CareerGoal.BIOTECH_STARTUP]: { entry: 15000, experienced: 80000 },
    };

    const range = baseSalary[goal];
    if (timeFrame === TimeFrame.EIGHTEEN_MONTHS) {
      return `Entry: ₹${range.entry}/month → Target: ₹${range.experienced}/month`;
    }
    return `₹${range.entry}-${Math.round(range.entry * 1.5)}/month`;
  }

  private generateFinancialProjection(assessment: CareerAssessmentDto): any {
    return {
      currentPhase: { income: 0, expenses: 8000 },
      phase1: { income: 15000, expenses: 10000 },
      phase2: { income: 28000, expenses: 12000 },
      phase3: { income: 47000, expenses: 15000 },
      totalROI: 'Investment of ₹25,000 in certifications yields 100%+ ROI within 18 months'
    };
  }
}