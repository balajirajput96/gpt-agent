/**
 * SPDX-License-Identifier: UNLICENSED
 * Copyright: Proprietary
 */

import { Injectable } from '@nestjs/common';

@Injectable()
export class CertificationRoadmapService {
  /**
   * Generate certification roadmap based on career goals
   */
  async generateCertificationRoadmap(careerGoal: string, budget: number, timeframe: string): Promise<any> {
    const certifications = this.getCertificationsByGoal(careerGoal);
    const filteredCertifications = this.filterByBudget(certifications, budget);
    const roadmap = this.createRoadmap(filteredCertifications, timeframe);
    const roiAnalysis = this.calculateROI(filteredCertifications, careerGoal);

    return {
      roadmap,
      certifications: filteredCertifications,
      roiAnalysis,
      recommendations: this.generateRecommendations(careerGoal, budget),
      alternativeOptions: this.getAlternativeOptions(careerGoal, budget),
    };
  }

  private getCertificationsByGoal(careerGoal: string): any[] {
    const certificationDatabase = {
      'QA/QC': [
        {
          name: 'WHO GMP Basic Training',
          provider: 'CDSCO',
          cost: 0,
          duration: '2 weeks',
          priority: 'Critical',
          marketValue: 'High',
          description: 'Essential GMP knowledge for pharmaceutical QC roles',
          prerequisites: 'None',
          benefits: ['Industry standard requirement', 'Free government certification', 'Immediate job relevance']
        },
        {
          name: 'Quality Management Systems (ISO 9001)',
          provider: 'ASQ',
          cost: 15000,
          duration: '3 months',
          priority: 'High',
          marketValue: 'High',
          description: 'Comprehensive quality management certification',
          prerequisites: 'Basic quality knowledge',
          benefits: ['Global recognition', 'Management pathway', 'Salary increment potential']
        },
        {
          name: 'Analytical Method Validation',
          provider: 'Pharma training institutes',
          cost: 8000,
          duration: '1 month',
          priority: 'Medium',
          marketValue: 'Medium',
          description: 'Specialized training in analytical method validation',
          prerequisites: 'Laboratory experience',
          benefits: ['Technical specialization', 'Higher-level QC roles', 'Method development skills']
        }
      ],
      'Bioinformatics': [
        {
          name: 'Python for Everybody Specialization',
          provider: 'University of Michigan (Coursera)',
          cost: 3200,
          duration: '4 months',
          priority: 'Critical',
          marketValue: 'High',
          description: 'Essential programming skills for bioinformatics',
          prerequisites: 'None',
          benefits: ['Programming foundation', 'Data analysis skills', 'Career transition enabler']
        },
        {
          name: 'Bioinformatics Specialization',
          provider: 'UC San Diego (Coursera)',
          cost: 12000,
          duration: '6 months',
          priority: 'Critical',
          marketValue: 'Very High',
          description: 'Comprehensive bioinformatics training',
          prerequisites: 'Basic programming',
          benefits: ['Direct job relevance', 'Industry recognition', 'Project portfolio']
        },
        {
          name: 'AWS Cloud Practitioner',
          provider: 'Amazon Web Services',
          cost: 4000,
          duration: '2 months',
          priority: 'High',
          marketValue: 'High',
          description: 'Cloud computing fundamentals',
          prerequisites: 'Basic IT knowledge',
          benefits: ['Cloud skills', 'Modern infrastructure', 'Remote work opportunities']
        },
        {
          name: 'Machine Learning Specialization',
          provider: 'Stanford (Coursera)',
          cost: 15000,
          duration: '4 months',
          priority: 'Medium',
          marketValue: 'Very High',
          description: 'Advanced ML skills for bioinformatics',
          prerequisites: 'Programming and statistics',
          benefits: ['Advanced analytics', 'AI/ML expertise', 'Senior role preparation']
        }
      ],
      'Digital Marketing': [
        {
          name: 'Google Digital Marketing & E-commerce',
          provider: 'Google',
          cost: 2500,
          duration: '3 months',
          priority: 'Critical',
          marketValue: 'High',
          description: 'Comprehensive digital marketing certification',
          prerequisites: 'None',
          benefits: ['Google recognition', 'Practical skills', 'Portfolio projects']
        },
        {
          name: 'Facebook Social Media Marketing',
          provider: 'Facebook Blueprint',
          cost: 0,
          duration: '1 month',
          priority: 'High',
          marketValue: 'Medium',
          description: 'Social media marketing specialization',
          prerequisites: 'Basic marketing knowledge',
          benefits: ['Free certification', 'Platform expertise', 'Content marketing skills']
        },
        {
          name: 'HubSpot Content Marketing',
          provider: 'HubSpot Academy',
          cost: 0,
          duration: '2 weeks',
          priority: 'Medium',
          marketValue: 'Medium',
          description: 'Content marketing and inbound strategies',
          prerequisites: 'None',
          benefits: ['Free certification', 'Content strategy', 'Lead generation']
        }
      ],
      'General Professional': [
        {
          name: 'IBM Data Science Foundations',
          provider: 'IBM',
          cost: 0,
          duration: '6 weeks',
          priority: 'High',
          marketValue: 'Medium',
          description: 'Data science basics with IBM tools',
          prerequisites: 'None',
          benefits: ['Free IBM certification', 'Data skills', 'Brand recognition']
        },
        {
          name: 'Project Management Professional (PMP)',
          provider: 'PMI',
          cost: 25000,
          duration: '6 months',
          priority: 'Low',
          marketValue: 'High',
          description: 'Professional project management certification',
          prerequisites: 'Work experience',
          benefits: ['Management roles', 'Global recognition', 'Leadership pathway']
        }
      ]
    };

    const goalCertifications = certificationDatabase[careerGoal] || [];
    const generalCertifications = certificationDatabase['General Professional'] || [];
    
    return [...goalCertifications, ...generalCertifications];
  }

  private filterByBudget(certifications: any[], budget: number): any[] {
    // Always include free certifications
    const freeCertifications = certifications.filter(cert => cert.cost === 0);
    
    // Add paid certifications within budget, prioritized by value
    const paidCertifications = certifications
      .filter(cert => cert.cost > 0 && cert.cost <= budget)
      .sort((a, b) => this.calculateCertificationValue(b) - this.calculateCertificationValue(a));

    // Calculate remaining budget and select optimal combination
    let remainingBudget = budget;
    const selectedPaid = [];
    
    for (const cert of paidCertifications) {
      if (cert.cost <= remainingBudget) {
        selectedPaid.push(cert);
        remainingBudget -= cert.cost;
      }
    }

    return [...freeCertifications, ...selectedPaid];
  }

  private calculateCertificationValue(certification: any): number {
    const priorityWeights = { 'Critical': 100, 'High': 80, 'Medium': 60, 'Low': 40 };
    const marketValueWeights = { 'Very High': 100, 'High': 80, 'Medium': 60, 'Low': 40 };
    
    const priorityScore = priorityWeights[certification.priority] || 40;
    const marketScore = marketValueWeights[certification.marketValue] || 40;
    const costEfficiency = certification.cost > 0 ? (priorityScore + marketScore) / certification.cost * 1000 : 200;
    
    return priorityScore + marketScore + costEfficiency;
  }

  private createRoadmap(certifications: any[], timeframe: string): any {
    const sortedCerts = this.prioritizeCertifications(certifications);
    
    if (timeframe === '3_months') {
      return this.create3MonthRoadmap(sortedCerts);
    } else if (timeframe === '6_months') {
      return this.create6MonthRoadmap(sortedCerts);
    } else {
      return this.create12MonthRoadmap(sortedCerts);
    }
  }

  private prioritizeCertifications(certifications: any[]): any[] {
    return certifications.sort((a, b) => {
      // First by priority
      const priorityOrder = { 'Critical': 0, 'High': 1, 'Medium': 2, 'Low': 3 };
      const priorityDiff = priorityOrder[a.priority] - priorityOrder[b.priority];
      if (priorityDiff !== 0) return priorityDiff;
      
      // Then by cost (cheaper first for quicker wins)
      return a.cost - b.cost;
    });
  }

  private create3MonthRoadmap(certifications: any[]): any {
    return {
      month1: {
        certifications: certifications.filter(c => c.priority === 'Critical' && c.cost === 0).slice(0, 2),
        focus: 'Free critical certifications',
        goals: ['Build foundation', 'Immediate job relevance']
      },
      month2: {
        certifications: certifications.filter(c => c.priority === 'Critical' && c.cost > 0).slice(0, 1),
        focus: 'High-impact paid certification',
        goals: ['Specialized skills', 'Market differentiation']
      },
      month3: {
        certifications: certifications.filter(c => c.priority === 'High' && c.cost <= 5000).slice(0, 1),
        focus: 'Complementary skills',
        goals: ['Skill integration', 'Portfolio completion']
      }
    };
  }

  private create6MonthRoadmap(certifications: any[]): any {
    return {
      phase1: {
        months: '1-2',
        certifications: certifications.filter(c => c.priority === 'Critical').slice(0, 2),
        focus: 'Foundation building',
        goals: ['Essential skills', 'Job readiness']
      },
      phase2: {
        months: '3-4',
        certifications: certifications.filter(c => c.priority === 'High').slice(0, 2),
        focus: 'Specialization',
        goals: ['Advanced skills', 'Competitive advantage']
      },
      phase3: {
        months: '5-6',
        certifications: certifications.filter(c => c.priority === 'Medium').slice(0, 1),
        focus: 'Enhancement',
        goals: ['Skill breadth', 'Career growth preparation']
      }
    };
  }

  private create12MonthRoadmap(certifications: any[]): any {
    return {
      quarter1: {
        months: '1-3',
        certifications: certifications.filter(c => c.priority === 'Critical'),
        focus: 'Core competencies',
        goals: ['Job acquisition', 'Foundation skills']
      },
      quarter2: {
        months: '4-6',
        certifications: certifications.filter(c => c.priority === 'High'),
        focus: 'Specialization',
        goals: ['Expert knowledge', 'Career advancement']
      },
      quarter3: {
        months: '7-9',
        certifications: certifications.filter(c => c.priority === 'Medium'),
        focus: 'Diversification',
        goals: ['Skill breadth', 'Leadership preparation']
      },
      quarter4: {
        months: '10-12',
        certifications: certifications.filter(c => c.priority === 'Low' && c.marketValue === 'High'),
        focus: 'Leadership and management',
        goals: ['Management roles', 'Strategic thinking']
      }
    };
  }

  private calculateROI(certifications: any[], careerGoal: string): any {
    const totalCost = certifications.reduce((sum, cert) => sum + cert.cost, 0);
    const expectedSalaryIncrease = this.estimateSalaryIncrease(certifications, careerGoal);
    const timeToROI = totalCost / (expectedSalaryIncrease / 12); // months to break even

    return {
      totalInvestment: totalCost,
      expectedSalaryIncrease: expectedSalaryIncrease,
      annualROI: expectedSalaryIncrease,
      monthsToBreakeven: Math.ceil(timeToROI),
      lifetimeValue: expectedSalaryIncrease * 10, // 10-year projection
      riskAssessment: this.assessRisk(certifications, careerGoal)
    };
  }

  private estimateSalaryIncrease(certifications: any[], careerGoal: string): number {
    const baseSalaryIncrease = {
      'QA/QC': { base: 15000, perCertification: 5000 },
      'Bioinformatics': { base: 25000, perCertification: 8000 },
      'Digital Marketing': { base: 12000, perCertification: 4000 }
    };

    const goalData = baseSalaryIncrease[careerGoal] || baseSalaryIncrease['QA/QC'];
    const certificationBonus = certifications.length * goalData.perCertification;
    
    return goalData.base + certificationBonus;
  }

  private assessRisk(certifications: any[], careerGoal: string): any {
    return {
      level: 'Low',
      factors: [
        'Industry-recognized certifications',
        'Skills in high demand',
        'Multiple career path options',
        'Strong job market in target field'
      ],
      mitigation: [
        'Focus on practical application of skills',
        'Build portfolio alongside certifications',
        'Network with industry professionals',
        'Continuous learning and skill updates'
      ]
    };
  }

  private generateRecommendations(careerGoal: string, budget: number): any {
    return {
      immediate: this.getImmediateRecommendations(budget),
      strategic: this.getStrategicRecommendations(careerGoal),
      budgetOptimization: this.getBudgetOptimization(budget),
      timeline: this.getTimelineRecommendations()
    };
  }

  private getImmediateRecommendations(budget: number): string[] {
    const recommendations = [
      'Start with free certifications to build immediate credibility',
      'Focus on certifications that complement your existing biotechnology background',
      'Prioritize certifications with practical, hands-on components'
    ];

    if (budget < 5000) {
      recommendations.push('Maximize free resources and look for scholarship opportunities');
    } else if (budget < 15000) {
      recommendations.push('Invest in one high-impact paid certification');
    } else {
      recommendations.push('Plan a comprehensive certification journey over 6-12 months');
    }

    return recommendations;
  }

  private getStrategicRecommendations(careerGoal: string): string[] {
    const strategies = {
      'QA/QC': [
        'Combine regulatory knowledge with technical skills',
        'Focus on pharmaceutical industry standards',
        'Build expertise in analytical methods and instrumentation'
      ],
      'Bioinformatics': [
        'Strong programming foundation is essential',
        'Combine biological knowledge with computational skills',
        'Stay updated with latest genomics and data analysis tools'
      ],
      'Digital Marketing': [
        'Leverage scientific background for pharmaceutical marketing',
        'Focus on data-driven marketing approaches',
        'Build content creation and analytics skills'
      ]
    };

    return strategies[careerGoal] || strategies['QA/QC'];
  }

  private getBudgetOptimization(budget: number): any {
    return {
      freeOptions: [
        'WHO GMP training modules',
        'Facebook Blueprint certifications',
        'HubSpot Academy courses',
        'IBM free certifications',
        'YouTube educational content'
      ],
      budgetTiers: {
        'Under ₹5,000': ['Google Digital Marketing', 'Python basics', 'AWS Cloud Practitioner'],
        '₹5,000-15,000': ['Bioinformatics Specialization', 'Quality Management', 'Advanced programming'],
        'Above ₹15,000': ['Multiple specializations', 'Advanced certifications', 'Professional memberships']
      },
      financingOptions: [
        'EMI options for Coursera specializations',
        'Company-sponsored training programs',
        'Government skill development schemes',
        'Educational loans for professional courses'
      ]
    };
  }

  private getTimelineRecommendations(): any {
    return {
      parallel: 'Take free certifications alongside paid ones to maximize learning',
      sequential: 'Complete foundational courses before advanced specializations',
      maintenance: 'Plan for continuing education and skill updates',
      documentation: 'Maintain a learning portfolio and certification records'
    };
  }

  private getAlternativeOptions(careerGoal: string, budget: number): any {
    return {
      bootcamps: [
        {
          name: 'Bioinformatics Bootcamp',
          provider: 'BioTecNika',
          cost: 20000,
          duration: '3 months',
          intensive: true,
          placement: 'Placement assistance included'
        }
      ],
      universities: [
        {
          name: 'PG Diploma in Bioinformatics',
          provider: 'IGNOU',
          cost: 15000,
          duration: '1 year',
          credits: 'University credits',
          recognition: 'UGC recognized'
        }
      ],
      workshops: [
        {
          name: 'Hands-on Laboratory Training',
          provider: 'Local pharmaceutical companies',
          cost: 5000,
          duration: '1 month',
          practical: 'Real industry experience'
        }
      ],
      mentorship: [
        {
          name: 'Industry Mentorship Program',
          provider: 'Professional associations',
          cost: 2000,
          duration: '6 months',
          networking: 'Direct industry connections'
        }
      ]
    };
  }
}