/**
 * SPDX-License-Identifier: UNLICENSED
 * Copyright: Proprietary
 */

import { IsString, IsOptional, IsArray, IsNumber, IsEnum } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export enum CareerGoal {
  QA_QC = 'qa_qc',
  RESEARCH = 'research',
  PRODUCTION = 'production',
  BIOINFORMATICS = 'bioinformatics',
  CLINICAL_DATA = 'clinical_data',
  REGULATORY_AFFAIRS = 'regulatory_affairs',
  MEDICAL_REPRESENTATIVE = 'medical_representative',
  BIOTECH_STARTUP = 'biotech_startup',
}

export enum TimeFrame {
  THREE_MONTHS = '3_months',
  SIX_MONTHS = '6_months',
  ONE_YEAR = '1_year',
  EIGHTEEN_MONTHS = '18_months',
}

export class CareerAssessmentDto {
  @ApiProperty({ enum: CareerGoal, description: 'Desired career goal' })
  @IsEnum(CareerGoal)
  careerGoal: CareerGoal;

  @ApiProperty({ enum: TimeFrame, description: 'Desired timeframe for career transition' })
  @IsEnum(TimeFrame)
  timeFrame: TimeFrame;

  @ApiProperty({ description: 'Current location' })
  @IsString()
  currentLocation: string;

  @ApiPropertyOptional({ description: 'Preferred work locations' })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  preferredLocations?: string[];

  @ApiProperty({ description: 'Current education level (Diploma, BSc, MSc, etc.)' })
  @IsString()
  educationLevel: string;

  @ApiProperty({ description: 'Field of study (Biotechnology, Biochemistry, etc.)' })
  @IsString()
  fieldOfStudy: string;

  @ApiPropertyOptional({ description: 'Years of relevant experience' })
  @IsOptional()
  @IsNumber()
  yearsOfExperience?: number;

  @ApiPropertyOptional({ description: 'Current skills and competencies' })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  currentSkills?: string[];

  @ApiPropertyOptional({ description: 'Available budget for training/certifications (in INR)' })
  @IsOptional()
  @IsNumber()
  budget?: number;

  @ApiPropertyOptional({ description: 'Preferred salary range (minimum in INR)' })
  @IsOptional()
  @IsNumber()
  expectedSalary?: number;

  @ApiPropertyOptional({ description: 'Additional preferences or constraints' })
  @IsOptional()
  @IsString()
  additionalInfo?: string;
}

export class CareerRoadmapDto {
  @ApiProperty({ description: 'Career roadmap title' })
  roadmapTitle: string;

  @ApiProperty({ description: 'Target career goal' })
  targetCareer: string;

  @ApiProperty({ description: 'Estimated timeline' })
  timeline: string;

  @ApiProperty({ description: 'Phase-wise plan with milestones' })
  phases: {
    phase: string;
    duration: string;
    objectives: string[];
    milestones: string[];
    recommendedActions: string[];
  }[];

  @ApiProperty({ description: 'Recommended certifications and courses' })
  certifications: {
    name: string;
    provider: string;
    cost: number;
    duration: string;
    priority: 'High' | 'Medium' | 'Low';
    expectedROI: string;
  }[];

  @ApiProperty({ description: 'Skill development plan' })
  skillDevelopment: {
    technicalSkills: string[];
    softSkills: string[];
    laboratorySkills: string[];
    digitalSkills: string[];
  };

  @ApiProperty({ description: 'Job application strategy' })
  jobStrategy: {
    targetCompanies: string[];
    applicationChannels: string[];
    networkingStrategy: string[];
    expectedSalaryRange: string;
  };

  @ApiProperty({ description: 'Financial projections' })
  financialProjection: {
    currentPhase: { income: number; expenses: number; };
    phase1: { income: number; expenses: number; };
    phase2: { income: number; expenses: number; };
    phase3: { income: number; expenses: number; };
    totalROI: string;
  };
}