/**
 * SPDX-License-Identifier: UNLICENSED
 * Copyright: Proprietary
 */

import { IsString, IsOptional, IsArray, IsNumber, IsEmail } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class PersonalInfoDto {
  @ApiProperty({ description: 'Full name of the candidate' })
  @IsString()
  fullName: string;

  @ApiProperty({ description: 'Email address' })
  @IsEmail()
  email: string;

  @ApiProperty({ description: 'Phone number' })
  @IsString()
  phone: string;

  @ApiProperty({ description: 'Current location (city, state)' })
  @IsString()
  location: string;

  @ApiPropertyOptional({ description: 'LinkedIn profile URL' })
  @IsOptional()
  @IsString()
  linkedinUrl?: string;

  @ApiPropertyOptional({ description: 'GitHub profile URL' })
  @IsOptional()
  @IsString()
  githubUrl?: string;
}

export class EducationDto {
  @ApiProperty({ description: 'Degree/diploma name' })
  @IsString()
  degree: string;

  @ApiProperty({ description: 'Institution name' })
  @IsString()
  institution: string;

  @ApiProperty({ description: 'Year of completion' })
  @IsNumber()
  year: number;

  @ApiPropertyOptional({ description: 'CGPA or percentage' })
  @IsOptional()
  @IsString()
  grade?: string;

  @ApiPropertyOptional({ description: 'Specialization or major' })
  @IsOptional()
  @IsString()
  specialization?: string;
}

export class ExperienceDto {
  @ApiProperty({ description: 'Job title or role' })
  @IsString()
  title: string;

  @ApiProperty({ description: 'Company or organization name' })
  @IsString()
  company: string;

  @ApiProperty({ description: 'Duration of employment' })
  @IsString()
  duration: string;

  @ApiPropertyOptional({ description: 'Key responsibilities and achievements' })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  responsibilities?: string[];
}

export class CertificationDto {
  @ApiProperty({ description: 'Certification name' })
  @IsString()
  name: string;

  @ApiProperty({ description: 'Issuing organization' })
  @IsString()
  issuer: string;

  @ApiProperty({ description: 'Year obtained' })
  @IsNumber()
  year: number;

  @ApiPropertyOptional({ description: 'Credential ID or URL' })
  @IsOptional()
  @IsString()
  credentialId?: string;
}

export class SkillDto {
  @ApiProperty({ description: 'Skill name' })
  @IsString()
  name: string;

  @ApiProperty({ description: 'Proficiency level (Beginner, Intermediate, Advanced, Expert)' })
  @IsString()
  level: string;

  @ApiPropertyOptional({ description: 'Skill category (Technical, Laboratory, Digital, etc.)' })
  @IsOptional()
  @IsString()
  category?: string;
}

export class ProjectDto {
  @ApiProperty({ description: 'Project title' })
  @IsString()
  title: string;

  @ApiProperty({ description: 'Project description' })
  @IsString()
  description: string;

  @ApiPropertyOptional({ description: 'Technologies or methods used' })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  technologies?: string[];

  @ApiPropertyOptional({ description: 'Year completed' })
  @IsOptional()
  @IsNumber()
  year?: number;

  @ApiPropertyOptional({ description: 'Project URL or repository link' })
  @IsOptional()
  @IsString()
  url?: string;
}

export class CreateResumeDto {
  @ApiProperty({ type: PersonalInfoDto })
  personalInfo: PersonalInfoDto;

  @ApiProperty({ type: [EducationDto] })
  @IsArray()
  education: EducationDto[];

  @ApiPropertyOptional({ type: [ExperienceDto] })
  @IsOptional()
  @IsArray()
  experience?: ExperienceDto[];

  @ApiPropertyOptional({ type: [CertificationDto] })
  @IsOptional()
  @IsArray()
  certifications?: CertificationDto[];

  @ApiProperty({ type: [SkillDto] })
  @IsArray()
  skills: SkillDto[];

  @ApiPropertyOptional({ type: [ProjectDto] })
  @IsOptional()
  @IsArray()
  projects?: ProjectDto[];

  @ApiPropertyOptional({ description: 'Professional summary' })
  @IsOptional()
  @IsString()
  summary?: string;
}