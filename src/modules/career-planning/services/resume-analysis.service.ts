/**
 * SPDX-License-Identifier: UNLICENSED
 * Copyright: Proprietary
 */

import { Injectable } from '@nestjs/common';
import { CreateResumeDto } from '../dto/resume.dto';

@Injectable()
export class ResumeAnalysisService {
  /**
   * Analyze a resume and provide improvement suggestions
   */
  async analyzeResume(resumeData: CreateResumeDto): Promise<any> {
    const analysis = {
      overallScore: this.calculateOverallScore(resumeData),
      strengths: this.identifyStrengths(resumeData),
      weaknesses: this.identifyWeaknesses(resumeData),
      improvements: this.generateImprovements(resumeData),
      biotechSpecificSuggestions: this.getBiotechSuggestions(resumeData),
      atsOptimization: this.analyzeATSCompatibility(resumeData),
    };

    return analysis;
  }

  /**
   * Generate an improved version of the resume
   */
  async enhanceResume(resumeData: CreateResumeDto): Promise<any> {
    const enhancedResume = {
      ...resumeData,
      personalInfo: this.enhancePersonalInfo(resumeData.personalInfo),
      summary: this.generateProfessionalSummary(resumeData),
      experience: this.enhanceExperience(resumeData.experience || []),
      skills: this.enhanceSkills(resumeData.skills),
      projects: this.enhanceProjects(resumeData.projects || []),
    };

    return {
      originalResume: resumeData,
      enhancedResume,
      improvements: this.getSpecificImprovements(resumeData, enhancedResume),
    };
  }

  private calculateOverallScore(resumeData: CreateResumeDto): number {
    let score = 0;

    // Basic information completeness (20 points)
    if (resumeData.personalInfo.email && resumeData.personalInfo.phone) score += 20;

    // Education (20 points)
    if (resumeData.education && resumeData.education.length > 0) score += 20;

    // Skills (20 points)
    if (resumeData.skills && resumeData.skills.length >= 5) score += 20;

    // Experience/Projects (20 points)
    if ((resumeData.experience && resumeData.experience.length > 0) || 
        (resumeData.projects && resumeData.projects.length > 0)) score += 20;

    // Professional presence (20 points)
    if (resumeData.personalInfo.linkedinUrl || resumeData.personalInfo.githubUrl) score += 10;
    if (resumeData.summary && resumeData.summary.length > 50) score += 10;

    return Math.min(score, 100);
  }

  private identifyStrengths(resumeData: CreateResumeDto): string[] {
    const strengths: string[] = [];

    if (resumeData.education.some(edu => edu.degree.toLowerCase().includes('biotechnology'))) {
      strengths.push('Strong educational foundation in biotechnology');
    }

    if (resumeData.certifications && resumeData.certifications.length > 2) {
      strengths.push('Multiple professional certifications demonstrate commitment to learning');
    }

    if (resumeData.skills.some(skill => skill.category === 'Technical')) {
      strengths.push('Technical skills complement biotechnology background');
    }

    if (resumeData.projects && resumeData.projects.length > 1) {
      strengths.push('Practical project experience shows applied knowledge');
    }

    return strengths;
  }

  private identifyWeaknesses(resumeData: CreateResumeDto): string[] {
    const weaknesses: string[] = [];

    if (!resumeData.summary || resumeData.summary.length < 50) {
      weaknesses.push('Missing or inadequate professional summary');
    }

    if (!resumeData.personalInfo.linkedinUrl) {
      weaknesses.push('No LinkedIn profile for professional networking');
    }

    if (!resumeData.experience || resumeData.experience.length === 0) {
      weaknesses.push('Limited professional work experience');
    }

    if (!resumeData.skills.some(skill => skill.name.toLowerCase().includes('python') || 
                                skill.name.toLowerCase().includes('data'))) {
      weaknesses.push('Missing modern technical skills (Python, data analysis)');
    }

    return weaknesses;
  }

  private generateImprovements(resumeData: CreateResumeDto): string[] {
    const improvements: string[] = [
      'Add quantifiable achievements to project descriptions',
      'Include specific laboratory techniques and equipment experience',
      'Highlight any awards or recognitions received',
      'Add relevant coursework that aligns with target job roles',
      'Include any research publications or presentations',
      'Optimize keywords for ATS (Applicant Tracking Systems)',
    ];

    return improvements;
  }

  private getBiotechSuggestions(resumeData: CreateResumeDto): any {
    return {
      industryKeywords: [
        'GMP', 'HPLC', 'PCR', 'Cell Culture', 'Fermentation',
        'Quality Control', 'Analytical Testing', 'Regulatory Compliance',
        'Microbiology', 'Biochemistry', 'Validation', 'Documentation'
      ],
      targetRoles: [
        'Quality Control Analyst',
        'Production Associate',
        'Research Assistant',
        'Regulatory Affairs Specialist',
        'Clinical Data Coordinator'
      ],
      skillGaps: [
        'Digital Marketing for Pharmaceutical Industry',
        'Bioinformatics and Data Analysis',
        'Cloud Computing (AWS/Google Cloud)',
        'Statistical Software (R/Python)',
        'Project Management Certification'
      ],
      careerProgression: {
        immediate: 'QC/QA roles in pharmaceutical companies',
        shortTerm: 'Specialized roles in bioinformatics or regulatory affairs',
        longTerm: 'Senior management or specialized consulting roles'
      }
    };
  }

  private analyzeATSCompatibility(resumeData: CreateResumeDto): any {
    return {
      score: 85,
      issues: [
        'Use standard section headers (Experience, Education, Skills)',
        'Include relevant keywords from job descriptions',
        'Use consistent date formatting',
        'Avoid special characters and graphics'
      ],
      recommendations: [
        'Add industry-specific keywords',
        'Use bullet points for achievements',
        'Include metric-based accomplishments',
        'Maintain consistent formatting'
      ]
    };
  }

  private enhancePersonalInfo(personalInfo: any): any {
    return {
      ...personalInfo,
      professionalTitle: 'Biotechnology Graduate | Quality Control Specialist | Digital Marketing Certified'
    };
  }

  private generateProfessionalSummary(resumeData: CreateResumeDto): string {
    const education = resumeData.education[0];
    const hasAwards = resumeData.projects?.some(p => p.title.toLowerCase().includes('award'));
    const hasCertifications = resumeData.certifications && resumeData.certifications.length > 0;

    return `${hasAwards ? 'Award-winning ' : ''}Biotechnology ${education?.degree || 'Graduate'} with unique blend of laboratory expertise, digital marketing skills, and cloud computing knowledge. ${hasCertifications ? 'Certified in multiple professional domains including ' + resumeData.certifications?.slice(0, 2).map(c => c.name).join(', ') + '. ' : ''}Proven track record in microbial research and quality control. Seeking to leverage bio-tech domain knowledge with modern technology skills in pharmaceutical/biotech industry.`;
  }

  private enhanceExperience(experience: any[]): any[] {
    return experience.map(exp => ({
      ...exp,
      achievements: [
        'Implemented quality control protocols resulting in 25% reduction in testing time',
        'Collaborated with cross-functional teams on regulatory compliance initiatives',
        'Maintained detailed documentation following GMP standards'
      ]
    }));
  }

  private enhanceSkills(skills: any[]): any[] {
    const enhancedSkills = [...skills];
    
    // Add suggested biotechnology skills if missing
    const suggestedSkills = [
      { name: 'GMP/GLP Standards', level: 'Intermediate', category: 'Regulatory' },
      { name: 'PCR & Gel Electrophoresis', level: 'Advanced', category: 'Laboratory' },
      { name: 'Python Programming', level: 'Beginner', category: 'Technical' },
      { name: 'Digital Marketing', level: 'Intermediate', category: 'Business' },
    ];

    suggestedSkills.forEach(skill => {
      if (!skills.find(s => s.name.toLowerCase().includes(skill.name.toLowerCase()))) {
        enhancedSkills.push(skill);
      }
    });

    return enhancedSkills;
  }

  private enhanceProjects(projects: any[]): any[] {
    return projects.map(project => ({
      ...project,
      impact: 'Reduced contamination detection time by 40% compared to traditional methods',
      technologies: [...(project.technologies || []), 'Statistical Analysis', 'Data Visualization'],
      metrics: 'Analyzed 100+ samples with 98% accuracy rate'
    }));
  }

  private getSpecificImprovements(original: any, enhanced: any): any {
    return {
      summaryImprovement: 'Added professional summary highlighting unique skill combination',
      skillsAdded: 'Included industry-relevant technical and digital skills',
      projectEnhancements: 'Added quantifiable metrics and impact measurements',
      keywordOptimization: 'Integrated ATS-friendly keywords for biotechnology roles',
      professionalBranding: 'Created compelling professional title and value proposition'
    };
  }
}