/**
 * SPDX-License-Identifier: UNLICENSED
 * Copyright: Proprietary
 */

import { Controller, Post, Body, Get, Query } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { CareerPlanningService } from '../services/career-planning.service';
import { CareerAssessmentDto, CareerRoadmapDto } from '../dto/career-planning.dto';

@ApiTags('Career Planning')
@Controller('career-planning')
export class CareerPlanningController {
  constructor(private readonly careerPlanningService: CareerPlanningService) {}

  @Post('roadmap')
  @ApiOperation({ 
    summary: 'Generate comprehensive career roadmap',
    description: 'Creates a detailed 18-month career transformation plan based on user assessment'
  })
  @ApiResponse({ 
    status: 201, 
    description: 'Career roadmap generated successfully',
    type: CareerRoadmapDto
  })
  async generateCareerRoadmap(@Body() assessment: CareerAssessmentDto): Promise<CareerRoadmapDto> {
    return this.careerPlanningService.generateCareerRoadmap(assessment);
  }

  @Post('immediate-action-plan')
  @ApiOperation({ 
    summary: 'Generate 30-day immediate action plan',
    description: 'Creates specific weekly tasks for the next 30 days to kickstart career transformation'
  })
  @ApiResponse({ 
    status: 201, 
    description: 'Immediate action plan generated successfully'
  })
  async generateImmediateActionPlan(@Body() assessment: CareerAssessmentDto): Promise<any> {
    return this.careerPlanningService.generateImmediateActionPlan(assessment);
  }

  @Get('career-options')
  @ApiOperation({ 
    summary: 'Get available career options for biotechnology graduates',
    description: 'Returns list of viable career paths with requirements and salary ranges'
  })
  @ApiResponse({ 
    status: 200, 
    description: 'Career options retrieved successfully'
  })
  async getCareerOptions(@Query('location') location?: string): Promise<any> {
    const careerOptions = [
      {
        title: 'Quality Control/Quality Assurance Analyst',
        description: 'Ensure pharmaceutical products meet quality standards',
        requiredSkills: ['GMP Knowledge', 'Laboratory Testing', 'Documentation', 'Analytical Instruments'],
        salaryRange: '₹2.5-4.5 LPA',
        growthPotential: 'High',
        demandLevel: 'Very High',
        entryLevel: true,
        companies: ['Sun Pharma', 'Zydus', 'Alembic', 'Dr. Reddy\'s']
      },
      {
        title: 'Bioinformatics Analyst',
        description: 'Analyze biological data using computational tools',
        requiredSkills: ['Python/R Programming', 'Statistics', 'Biology Background', 'Database Management'],
        salaryRange: '₹4-8 LPA',
        growthPotential: 'Very High',
        demandLevel: 'High',
        entryLevel: false,
        companies: ['Biocon', 'Strand Life Sciences', 'Genomics Startups']
      },
      {
        title: 'Medical Representative with Tech Edge',
        description: 'Promote pharmaceutical products using digital marketing skills',
        requiredSkills: ['Product Knowledge', 'Digital Marketing', 'Communication', 'CRM Systems'],
        salaryRange: '₹3-6 LPA',
        growthPotential: 'High',
        demandLevel: 'High',
        entryLevel: true,
        companies: ['Abbott', 'Roche', 'Novartis', 'Pfizer']
      },
      {
        title: 'Clinical Data Coordinator',
        description: 'Manage clinical trial data and ensure compliance',
        requiredSkills: ['CDISC Standards', 'SQL', 'Clinical Research', 'Regulatory Knowledge'],
        salaryRange: '₹3.5-7 LPA',
        growthPotential: 'Very High',
        demandLevel: 'Medium',
        entryLevel: false,
        companies: ['Quintiles', 'IQVIA', 'Parexel', 'Clinical Research Organizations']
      },
      {
        title: 'Production Associate',
        description: 'Support pharmaceutical manufacturing operations',
        requiredSkills: ['GMP Standards', 'Manufacturing Processes', 'Equipment Operation', 'Safety Protocols'],
        salaryRange: '₹2.2-4 LPA',
        growthPotential: 'Medium',
        demandLevel: 'High',
        entryLevel: true,
        companies: ['Cadila Healthcare', 'Torrent Pharma', 'Lupin']
      }
    ];

    return {
      careerOptions,
      recommendations: this.getLocationSpecificRecommendations(location),
      marketTrends: this.getCurrentMarketTrends()
    };
  }

  @Get('government-schemes')
  @ApiOperation({ 
    summary: 'Get available government schemes and apprenticeships',
    description: 'Returns current government schemes for skill development and employment'
  })
  @ApiResponse({ 
    status: 200, 
    description: 'Government schemes retrieved successfully'
  })
  async getGovernmentSchemes(@Query('location') location?: string): Promise<any> {
    return {
      napsApprenticeships: {
        name: 'National Apprenticeship Promotion Scheme (NAPS)',
        eligibility: 'Diploma/Graduate in relevant field',
        duration: '12 months',
        stipend: '₹8,000-15,000/month',
        benefits: ['Real work experience', 'Job conversion opportunity (45% success rate)', 'Certificate'],
        applicationProcess: 'Register on apprenticeshipindia.gov.in',
        targetSectors: ['Pharmaceutical', 'Chemical', 'Biotechnology'],
        currentOpenings: this.getCurrentNAPSOpenings(location)
      },
      stateSchemes: this.getStateSpecificSchemes(location),
      skillDevelopment: {
        pmkvy: {
          name: 'Pradhan Mantri Kaushal Vikas Yojana',
          courses: ['Healthcare Sector Skill Council', 'Life Sciences Skills', 'Quality Control'],
          cost: 'Free',
          certification: 'Government certified',
          duration: '3-6 months'
        }
      },
      recommendations: this.getSchemeRecommendations()
    };
  }

  private getLocationSpecificRecommendations(location?: string): any {
    if (!location) return [];

    const locationRecommendations = {
      'vadodara': [
        'Strong pharmaceutical cluster with Sun Pharma, Zydus, Alembic',
        'Focus on QC/QA roles as primary entry point',
        'Good opportunity for career growth within Gujarat'
      ],
      'ahmedabad': [
        'Growing biotech ecosystem',
        'Mix of pharma and emerging biotech companies',
        'Digital marketing skills particularly valuable'
      ],
      'bangalore': [
        'Major biotech hub with research opportunities',
        'Strong bioinformatics job market',
        'Higher competition but better growth prospects'
      ],
      'hyderabad': [
        'Genome Valley with biotech focus',
        'Clinical research opportunities',
        'Good for specialized bioinformatics roles'
      ]
    };

    return locationRecommendations[location.toLowerCase()] || [
      'Consider relocating to major pharma/biotech hubs',
      'Remote opportunities available for digital roles',
      'Government schemes available nationwide'
    ];
  }

  private getCurrentMarketTrends(): any {
    return {
      hotSkills: [
        'Bioinformatics and Computational Biology',
        'Digital Marketing for Pharma',
        'Cloud Computing in Life Sciences',
        'Regulatory Affairs and Compliance',
        'Data Analysis and Visualization'
      ],
      emergingRoles: [
        'Digital Health Analyst',
        'Biotech Product Manager',
        'Clinical Data Scientist',
        'Regulatory Technology Specialist'
      ],
      industryOutlook: {
        growth: '12-15% CAGR in Indian biotech sector',
        jobCreation: '17% increase in biotech jobs (2024-2025)',
        skills_gap: 'High demand for tech-enabled biological professionals',
        salary_trends: 'Average 20% increment for certified professionals'
      }
    };
  }

  private getCurrentNAPSOpenings(location?: string): any[] {
    // Mock data - in real implementation, this would fetch from API
    return [
      {
        company: 'Sun Pharmaceutical Industries',
        position: 'Quality Control Apprentice',
        location: 'Vadodara',
        duration: '12 months',
        stipend: '₹12,000/month',
        requirements: ['Diploma in relevant field', 'Basic laboratory knowledge'],
        applicationDeadline: '2025-09-15'
      },
      {
        company: 'Zydus Lifesciences',
        position: 'Production Apprentice',
        location: 'Ahmedabad',
        duration: '12 months',
        stipend: '₹10,000/month',
        requirements: ['Biotechnology/Chemistry background', 'GMP awareness'],
        applicationDeadline: '2025-09-30'
      }
    ];
  }

  private getStateSpecificSchemes(location?: string): any {
    const schemes = {
      'gujarat': {
        name: 'Gujarat MAY (Mukhyamantri Apprenticeship Yojana)',
        eligibility: 'Gujarat domicile, age 18-35',
        benefits: '₹7,000-12,000/month + skills training',
        sectors: ['Manufacturing', 'Healthcare', 'Chemicals'],
        applicationPortal: 'Gujarat Employment Portal'
      },
      'karnataka': {
        name: 'Karnataka Skill Development Scheme',
        eligibility: 'Karnataka resident',
        benefits: 'Free training + placement assistance',
        sectors: ['Biotechnology', 'IT', 'Healthcare'],
        applicationPortal: 'Karnataka Skill Development Portal'
      }
    };

    if (location) {
      const state = this.getStateFromLocation(location);
      return schemes[state] || null;
    }

    return schemes;
  }

  private getStateFromLocation(location: string): string {
    const locationStateMap: { [key: string]: string } = {
      'vadodara': 'gujarat',
      'ahmedabad': 'gujarat',
      'surat': 'gujarat',
      'bangalore': 'karnataka',
      'mysore': 'karnataka',
      'hyderabad': 'telangana',
      'mumbai': 'maharashtra',
      'pune': 'maharashtra'
    };

    return locationStateMap[location.toLowerCase()] || '';
  }

  private getSchemeRecommendations(): string[] {
    return [
      'Apply to NAPS immediately - no cost and high conversion rate',
      'Combine apprenticeship with skill development courses',
      'Use government schemes to gain industry experience',
      'Document all training and certifications for resume',
      'Network with other apprentices and mentors',
      'Prepare for conversion to permanent role'
    ];
  }
}