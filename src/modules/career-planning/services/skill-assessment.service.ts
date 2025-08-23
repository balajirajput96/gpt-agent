/**
 * SPDX-License-Identifier: UNLICENSED
 * Copyright: Proprietary
 */

import { Injectable } from '@nestjs/common';

@Injectable()
export class SkillAssessmentService {
  /**
   * Assess current skills and identify gaps
   */
  async assessSkills(currentSkills: string[], targetRole: string): Promise<any> {
    const roleRequirements = this.getRoleRequirements(targetRole);
    const skillGaps = this.identifySkillGaps(currentSkills, roleRequirements);
    const recommendations = this.generateSkillRecommendations(skillGaps, targetRole);

    return {
      currentSkillsAnalysis: this.analyzeCurrentSkills(currentSkills),
      roleRequirements,
      skillGaps,
      recommendations,
      learningPath: this.generateLearningPath(skillGaps, targetRole),
    };
  }

  private getRoleRequirements(targetRole: string): any {
    const requirements = {
      'QA/QC Analyst': {
        essential: ['GMP Knowledge', 'Laboratory Testing', 'Documentation', 'Quality Systems'],
        preferred: ['HPLC', 'Method Validation', 'Statistical Analysis', 'Regulatory Knowledge'],
        technical: ['Analytical Instruments', 'Data Analysis', 'Computer Skills'],
        soft: ['Attention to Detail', 'Communication', 'Problem Solving']
      },
      'Bioinformatics Analyst': {
        essential: ['Python/R Programming', 'Statistics', 'Biology Background', 'Database Management'],
        preferred: ['NGS Analysis', 'Machine Learning', 'Linux/Unix', 'Version Control'],
        technical: ['AWS/Cloud Computing', 'SQL', 'Data Visualization', 'Scientific Computing'],
        soft: ['Critical Thinking', 'Research Skills', 'Communication', 'Continuous Learning']
      },
      'Research Associate': {
        essential: ['Laboratory Techniques', 'Experimental Design', 'Data Analysis', 'Scientific Writing'],
        preferred: ['Cell Culture', 'Molecular Biology', 'Microscopy', 'Literature Review'],
        technical: ['Laboratory Equipment', 'Software Tools', 'Documentation Systems'],
        soft: ['Curiosity', 'Persistence', 'Collaboration', 'Time Management']
      },
      'Medical Representative': {
        essential: ['Product Knowledge', 'Sales Skills', 'Communication', 'Customer Relationship'],
        preferred: ['Digital Marketing', 'CRM Systems', 'Market Analysis', 'Presentation Skills'],
        technical: ['Digital Tools', 'Data Analysis', 'Social Media', 'Content Creation'],
        soft: ['Persuasion', 'Networking', 'Adaptability', 'Goal Orientation']
      }
    };

    return requirements[targetRole] || requirements['QA/QC Analyst'];
  }

  private identifySkillGaps(currentSkills: string[], requirements: any): any {
    const allRequiredSkills = [
      ...requirements.essential,
      ...requirements.preferred,
      ...requirements.technical,
      ...requirements.soft
    ];

    const gaps = {
      critical: [] as string[],
      important: [] as string[],
      beneficial: [] as string[]
    };

    requirements.essential.forEach(skill => {
      if (!this.hasSkill(currentSkills, skill)) {
        gaps.critical.push(skill);
      }
    });

    requirements.preferred.forEach(skill => {
      if (!this.hasSkill(currentSkills, skill)) {
        gaps.important.push(skill);
      }
    });

    requirements.technical.forEach(skill => {
      if (!this.hasSkill(currentSkills, skill)) {
        gaps.beneficial.push(skill);
      }
    });

    return gaps;
  }

  private hasSkill(currentSkills: string[], targetSkill: string): boolean {
    return currentSkills.some(skill => 
      skill.toLowerCase().includes(targetSkill.toLowerCase()) ||
      targetSkill.toLowerCase().includes(skill.toLowerCase())
    );
  }

  private analyzeCurrentSkills(currentSkills: string[]): any {
    const categorized = {
      laboratory: [] as string[],
      technical: [] as string[],
      digital: [] as string[],
      soft: [] as string[],
      other: [] as string[]
    };

    const labKeywords = ['lab', 'pcr', 'culture', 'microscopy', 'analysis', 'testing', 'fermentation'];
    const techKeywords = ['python', 'programming', 'sql', 'aws', 'cloud', 'data', 'software'];
    const digitalKeywords = ['marketing', 'seo', 'social', 'analytics', 'content', 'digital'];
    const softKeywords = ['communication', 'leadership', 'management', 'problem', 'teamwork'];

    currentSkills.forEach(skill => {
      const skillLower = skill.toLowerCase();
      if (labKeywords.some(keyword => skillLower.includes(keyword))) {
        categorized.laboratory.push(skill);
      } else if (techKeywords.some(keyword => skillLower.includes(keyword))) {
        categorized.technical.push(skill);
      } else if (digitalKeywords.some(keyword => skillLower.includes(keyword))) {
        categorized.digital.push(skill);
      } else if (softKeywords.some(keyword => skillLower.includes(keyword))) {
        categorized.soft.push(skill);
      } else {
        categorized.other.push(skill);
      }
    });

    return {
      categorized,
      strengths: this.identifyStrengths(categorized),
      uniqueValue: this.identifyUniqueValue(categorized)
    };
  }

  private identifyStrengths(categorized: any): string[] {
    const strengths = [];

    if (categorized.laboratory.length >= 3) {
      strengths.push('Strong laboratory foundation');
    }
    if (categorized.technical.length >= 2) {
      strengths.push('Technical programming skills');
    }
    if (categorized.digital.length >= 2) {
      strengths.push('Digital marketing capabilities');
    }
    if (categorized.soft.length >= 3) {
      strengths.push('Well-developed soft skills');
    }

    return strengths;
  }

  private identifyUniqueValue(categorized: any): string {
    if (categorized.laboratory.length > 0 && categorized.technical.length > 0) {
      return 'Rare combination of laboratory expertise and technical programming skills';
    }
    if (categorized.laboratory.length > 0 && categorized.digital.length > 0) {
      return 'Unique blend of scientific knowledge and digital marketing skills';
    }
    return 'Multidisciplinary skill set with strong adaptability';
  }

  private generateSkillRecommendations(skillGaps: any, targetRole: string): any {
    return {
      immediate: this.getImmediateRecommendations(skillGaps.critical),
      shortTerm: this.getShortTermRecommendations(skillGaps.important),
      longTerm: this.getLongTermRecommendations(skillGaps.beneficial),
      certifications: this.recommendCertifications(targetRole),
    };
  }

  private getImmediateRecommendations(criticalGaps: string[]): any[] {
    return criticalGaps.map(gap => ({
      skill: gap,
      action: this.getSkillAction(gap),
      timeframe: '1-4 weeks',
      resources: this.getSkillResources(gap),
      priority: 'High'
    }));
  }

  private getShortTermRecommendations(importantGaps: string[]): any[] {
    return importantGaps.map(gap => ({
      skill: gap,
      action: this.getSkillAction(gap),
      timeframe: '1-3 months',
      resources: this.getSkillResources(gap),
      priority: 'Medium'
    }));
  }

  private getLongTermRecommendations(beneficialGaps: string[]): any[] {
    return beneficialGaps.map(gap => ({
      skill: gap,
      action: this.getSkillAction(gap),
      timeframe: '3-6 months',
      resources: this.getSkillResources(gap),
      priority: 'Low'
    }));
  }

  private getSkillAction(skill: string): string {
    const actions = {
      'GMP Knowledge': 'Complete WHO GMP training modules and CDSCO guidelines',
      'HPLC': 'Take instrument-specific training course',
      'Python Programming': 'Complete Python for Everybody Coursera specialization',
      'Statistical Analysis': 'Learn R or Python statistics libraries',
      'AWS': 'Complete AWS Cloud Practitioner certification',
      'Digital Marketing': 'Complete Google Digital Marketing certificate',
      'Communication': 'Join Toastmasters or take presentation skills workshop',
      'Laboratory Testing': 'Gain hands-on experience through internships or projects'
    };

    return actions[skill] || `Complete online course or certification in ${skill}`;
  }

  private getSkillResources(skill: string): string[] {
    const resources = {
      'GMP Knowledge': ['WHO GMP guidelines', 'CDSCO online modules', 'Pharmaceutical training institutes'],
      'HPLC': ['Waters training center', 'Agilent university', 'Local instrument vendor training'],
      'Python Programming': ['Coursera Python for Everybody', 'Python.org tutorial', 'Codecademy Python'],
      'Digital Marketing': ['Google Digital Marketing course', 'HubSpot Academy', 'Facebook Blueprint'],
      'AWS': ['AWS Training', 'A Cloud Guru', 'Linux Academy'],
      'Communication': ['Toastmasters International', 'Coursera communication courses', 'Local workshops']
    };

    return resources[skill] || ['Online courses', 'Professional workshops', 'Industry certifications'];
  }

  private recommendCertifications(targetRole: string): any[] {
    const certifications = {
      'QA/QC Analyst': [
        { name: 'WHO GMP Certification', provider: 'CDSCO', cost: 0, priority: 'High' },
        { name: 'Quality Management Systems', provider: 'ASQ', cost: 15000, priority: 'Medium' }
      ],
      'Bioinformatics Analyst': [
        { name: 'Python for Data Science', provider: 'IBM', cost: 5000, priority: 'High' },
        { name: 'Bioinformatics Specialization', provider: 'UC San Diego', cost: 12000, priority: 'High' }
      ],
      'Medical Representative': [
        { name: 'Digital Marketing Certificate', provider: 'Google', cost: 3000, priority: 'High' },
        { name: 'Sales Professional Certification', provider: 'Salesforce', cost: 8000, priority: 'Medium' }
      ]
    };

    return certifications[targetRole] || certifications['QA/QC Analyst'];
  }

  private generateLearningPath(skillGaps: any, targetRole: string): any {
    return {
      phase1: {
        duration: '0-3 months',
        focus: 'Critical Skills',
        skills: skillGaps.critical.slice(0, 3),
        goal: 'Become job-ready for entry-level positions'
      },
      phase2: {
        duration: '3-6 months',
        focus: 'Important Skills',
        skills: skillGaps.important.slice(0, 3),
        goal: 'Enhance competitiveness and specialization'
      },
      phase3: {
        duration: '6-12 months',
        focus: 'Advanced Skills',
        skills: skillGaps.beneficial.slice(0, 3),
        goal: 'Achieve senior-level capabilities'
      }
    };
  }
}