/**
 * SPDX-License-Identifier: UNLICENSED
 * Copyright: Proprietary
 */

import { IsString, IsOptional, IsArray, IsEnum } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export enum PortfolioType {
  PROFESSIONAL = 'professional',
  ACADEMIC = 'academic',
  TECHNICAL = 'technical',
  COMPREHENSIVE = 'comprehensive',
}

export enum PortfolioTheme {
  BIOTECH_MODERN = 'biotech_modern',
  SCIENTIFIC_CLASSIC = 'scientific_classic',
  TECH_MINIMAL = 'tech_minimal',
  CORPORATE_ELEGANT = 'corporate_elegant',
}

export class PortfolioConfigDto {
  @ApiProperty({ enum: PortfolioType, description: 'Type of portfolio to generate' })
  @IsEnum(PortfolioType)
  portfolioType: PortfolioType;

  @ApiProperty({ enum: PortfolioTheme, description: 'Visual theme for the portfolio' })
  @IsEnum(PortfolioTheme)
  theme: PortfolioTheme;

  @ApiProperty({ description: 'Portfolio title' })
  @IsString()
  title: string;

  @ApiPropertyOptional({ description: 'Professional tagline' })
  @IsOptional()
  @IsString()
  tagline?: string;

  @ApiPropertyOptional({ description: 'About section content' })
  @IsOptional()
  @IsString()
  about?: string;

  @ApiPropertyOptional({ description: 'Sections to include in portfolio' })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  sections?: string[];

  @ApiPropertyOptional({ description: 'Custom color scheme (hex codes)' })
  @IsOptional()
  customColors?: {
    primary: string;
    secondary: string;
    accent: string;
  };
}

export class PortfolioProjectDto {
  @ApiProperty({ description: 'Project title' })
  @IsString()
  title: string;

  @ApiProperty({ description: 'Project description' })
  @IsString()
  description: string;

  @ApiPropertyOptional({ description: 'Technologies used' })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  technologies?: string[];

  @ApiPropertyOptional({ description: 'Project images/screenshots' })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  images?: string[];

  @ApiPropertyOptional({ description: 'Project URL' })
  @IsOptional()
  @IsString()
  url?: string;

  @ApiPropertyOptional({ description: 'GitHub repository URL' })
  @IsOptional()
  @IsString()
  githubUrl?: string;

  @ApiPropertyOptional({ description: 'Key achievements or outcomes' })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  achievements?: string[];
}

export class CreatePortfolioDto {
  @ApiProperty({ type: PortfolioConfigDto })
  config: PortfolioConfigDto;

  @ApiPropertyOptional({ type: [PortfolioProjectDto] })
  @IsOptional()
  @IsArray()
  projects?: PortfolioProjectDto[];

  @ApiPropertyOptional({ description: 'Professional achievements to highlight' })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  achievements?: string[];

  @ApiPropertyOptional({ description: 'Blog posts or publications' })
  @IsOptional()
  @IsArray()
  publications?: {
    title: string;
    description: string;
    url?: string;
    date: string;
  }[];

  @ApiPropertyOptional({ description: 'Contact information' })
  @IsOptional()
  contact?: {
    email: string;
    phone?: string;
    location?: string;
    social?: {
      linkedin?: string;
      github?: string;
      twitter?: string;
    };
  };
}

export class PortfolioResponseDto {
  @ApiProperty({ description: 'Generated portfolio ID' })
  portfolioId: string;

  @ApiProperty({ description: 'Portfolio website URL' })
  websiteUrl: string;

  @ApiProperty({ description: 'Generated portfolio content structure' })
  content: {
    html: string;
    css: string;
    assets: string[];
  };

  @ApiProperty({ description: 'SEO optimizations applied' })
  seoOptimizations: {
    title: string;
    description: string;
    keywords: string[];
    structuredData: any;
  };

  @ApiProperty({ description: 'Portfolio performance metrics' })
  metrics: {
    loadTime: string;
    accessibility: string;
    seoScore: string;
    mobileCompatibility: string;
  };
}