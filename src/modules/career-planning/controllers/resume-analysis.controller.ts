/**
 * SPDX-License-Identifier: UNLICENSED
 * Copyright: Proprietary
 */

import { Controller, Post, Body, Get, Query } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { ResumeAnalysisService } from '../services/resume-analysis.service';
import { CreateResumeDto } from '../dto/resume.dto';

@ApiTags('Resume Analysis')
@Controller('resume-analysis')
export class ResumeAnalysisController {
  constructor(private readonly resumeAnalysisService: ResumeAnalysisService) {}

  @Post('analyze')
  @ApiOperation({ 
    summary: 'Analyze resume and provide improvement suggestions',
    description: 'Comprehensive analysis of resume with specific improvements for biotechnology careers'
  })
  @ApiResponse({ 
    status: 201, 
    description: 'Resume analysis completed successfully'
  })
  async analyzeResume(@Body() resumeData: CreateResumeDto): Promise<any> {
    return this.resumeAnalysisService.analyzeResume(resumeData);
  }

  @Post('enhance')
  @ApiOperation({ 
    summary: 'Generate enhanced version of resume',
    description: 'Creates improved resume with biotechnology-specific optimizations and ATS compatibility'
  })
  @ApiResponse({ 
    status: 201, 
    description: 'Resume enhancement completed successfully'
  })
  async enhanceResume(@Body() resumeData: CreateResumeDto): Promise<any> {
    return this.resumeAnalysisService.enhanceResume(resumeData);
  }

  @Get('templates')
  @ApiOperation({ 
    summary: 'Get resume templates for biotechnology careers',
    description: 'Returns various resume templates optimized for different biotechnology career paths'
  })
  @ApiResponse({ 
    status: 200, 
    description: 'Resume templates retrieved successfully'
  })
  async getResumeTemplates(@Query('careerGoal') careerGoal?: string): Promise<any> {
    return {
      templates: this.getTemplatesByCareerGoal(careerGoal),
      guidelines: this.getResumeGuidelines(),
      commonMistakes: this.getCommonMistakes(),
      industryKeywords: this.getIndustryKeywords(careerGoal)
    };
  }

  @Get('ats-optimization')
  @ApiOperation({ 
    summary: 'Get ATS optimization guidelines',
    description: 'Provides guidelines for optimizing resume for Applicant Tracking Systems'
  })
  @ApiResponse({ 
    status: 200, 
    description: 'ATS optimization guidelines retrieved successfully'
  })
  async getATSOptimization(@Query('targetRole') targetRole?: string): Promise<any> {
    return {
      atsRequirements: this.getATSRequirements(),
      keywordOptimization: this.getKeywordOptimization(targetRole),
      formattingGuidelines: this.getFormattingGuidelines(),
      testingTools: this.getATSTestingTools()
    };
  }

  private getTemplatesByCareerGoal(careerGoal?: string): any {
    const templates = {
      'fresher_biotech': {
        name: 'Biotechnology Graduate Template',
        description: 'Perfect for fresh graduates with limited work experience',
        sections: [
          'Professional Summary',
          'Education',
          'Academic Projects', 
          'Technical Skills',
          'Certifications',
          'Achievements & Awards',
          'Laboratory Experience',
          'Contact Information'
        ],
        keyFeatures: [
          'Emphasizes education and projects',
          'Highlights laboratory skills',
          'Showcases certifications prominently',
          'ATS-friendly format'
        ],
        sampleContent: {
          summary: 'Award-winning Biotechnology Graduate with unique blend of laboratory expertise, digital marketing skills, and cloud computing knowledge. Proven track record in microbial research with Best Student Project Award. Certified in AWS AI Solutions, IBM Software Engineering, and Google Digital Marketing.',
          skills: [
            'Laboratory Techniques: PCR, Gel Electrophoresis, Cell Culture, Fermentation',
            'Quality Systems: GMP/GLP Standards, Documentation, Analytical Testing',
            'Technical Skills: Python Programming, AWS Cloud Services, SQL Database',
            'Digital Skills: Google Digital Marketing, SEO, Content Creation'
          ]
        }
      },
      'experienced_biotech': {
        name: 'Experienced Biotechnology Professional',
        description: 'For professionals with 2+ years of industry experience',
        sections: [
          'Professional Summary',
          'Core Competencies',
          'Professional Experience',
          'Key Achievements',
          'Technical Skills',
          'Education',
          'Certifications'
        ],
        keyFeatures: [
          'Experience-focused layout',
          'Quantified achievements',
          'Leadership examples',
          'Career progression narrative'
        ]
      },
      'career_changer': {
        name: 'Career Transition Template',
        description: 'For professionals transitioning to biotechnology from other fields',
        sections: [
          'Professional Summary',
          'Transferable Skills',
          'Relevant Experience',
          'Education & Training',
          'Projects & Certifications',
          'Technical Skills'
        ],
        keyFeatures: [
          'Highlights transferable skills',
          'Emphasizes relevant training',
          'Shows learning commitment',
          'Bridges experience gaps'
        ]
      }
    };

    if (careerGoal) {
      return templates[careerGoal] || templates['fresher_biotech'];
    }

    return templates;
  }

  private getResumeGuidelines(): any {
    return {
      length: {
        freshers: '1-2 pages maximum',
        experienced: '2-3 pages for 5+ years experience',
        senior: '3-4 pages for leadership roles'
      },
      format: {
        font: 'Arial, Calibri, or Times New Roman',
        fontSize: '10-12 points for content, 14-16 for headers',
        margins: '0.5-1 inch on all sides',
        spacing: 'Single or 1.15 line spacing'
      },
      content: {
        summary: '3-4 lines highlighting unique value proposition',
        bullets: '3-5 bullet points per role/project',
        quantification: 'Include numbers, percentages, and metrics',
        keywords: 'Use industry-specific terminology'
      },
      structure: {
        order: 'Most important information first',
        consistency: 'Consistent formatting throughout',
        whitespace: 'Adequate white space for readability',
        sections: 'Clear section headers and organization'
      }
    };
  }

  private getCommonMistakes(): any {
    return {
      content: [
        'Generic objective statements instead of targeted summaries',
        'Listing job duties instead of achievements',
        'Including irrelevant personal information',
        'Using outdated or incorrect contact information',
        'Spelling and grammatical errors'
      ],
      formatting: [
        'Using tables, graphics, or unusual fonts',
        'Inconsistent date formats',
        'Too much or too little white space',
        'Headers and footers that confuse ATS',
        'Saving in incompatible file formats'
      ],
      ats: [
        'Using keywords stuffing without context',
        'Complex formatting that ATS cannot parse',
        'Images or graphics in place of text',
        'Non-standard section headers',
        'Abbreviations without full forms'
      ],
      industry: [
        'Not highlighting laboratory experience',
        'Missing regulatory knowledge (GMP/GLP)',
        'Failing to show technical skills progression',
        'Not mentioning relevant software/equipment',
        'Overlooking project outcomes and impact'
      ]
    };
  }

  private getIndustryKeywords(careerGoal?: string): any {
    const keywordsByRole = {
      'qa_qc': [
        'Quality Control', 'Quality Assurance', 'GMP', 'GLP', 'Analytical Testing',
        'Method Validation', 'HPLC', 'UV-Vis Spectroscopy', 'Documentation',
        'Regulatory Compliance', 'ISO Standards', 'Pharmaceutical Testing',
        'Out-of-Specification', 'Stability Testing', 'Batch Release'
      ],
      'bioinformatics': [
        'Bioinformatics', 'Computational Biology', 'NGS Analysis', 'Python',
        'R Programming', 'Statistical Analysis', 'Database Management',
        'BLAST', 'Genomics', 'Proteomics', 'Machine Learning', 'Data Mining',
        'Sequence Analysis', 'Phylogenetics', 'Biostatistics'
      ],
      'research': [
        'Research and Development', 'Experimental Design', 'Data Analysis',
        'Laboratory Techniques', 'Cell Culture', 'Molecular Biology',
        'Microbiology', 'Biochemistry', 'Scientific Writing', 'Publications',
        'Grant Writing', 'Protocol Development', 'Literature Review'
      ],
      'production': [
        'Manufacturing', 'Production Operations', 'Process Optimization',
        'Batch Processing', 'Equipment Operation', 'Safety Protocols',
        'Lean Manufacturing', 'Six Sigma', 'Process Validation',
        'Scale-up', 'Troubleshooting', 'Standard Operating Procedures'
      ],
      'medical_rep': [
        'Medical Representative', 'Pharmaceutical Sales', 'Product Knowledge',
        'Customer Relationship Management', 'Digital Marketing', 'CRM Systems',
        'Market Analysis', 'Presentation Skills', 'Territory Management',
        'Sales Targets', 'Client Acquisition', 'Product Training'
      ]
    };

    const generalBiotechKeywords = [
      'Biotechnology', 'Life Sciences', 'Healthcare', 'Pharmaceutical',
      'FDA Regulations', 'Clinical Trials', 'Good Practices', 'Validation',
      'Risk Assessment', 'Problem Solving', 'Team Collaboration',
      'Project Management', 'Continuous Improvement', 'Innovation'
    ];

    if (careerGoal && keywordsByRole[careerGoal]) {
      return {
        roleSpecific: keywordsByRole[careerGoal],
        general: generalBiotechKeywords,
        combined: [...keywordsByRole[careerGoal], ...generalBiotechKeywords]
      };
    }

    return {
      allRoles: keywordsByRole,
      general: generalBiotechKeywords,
      usage: 'Select keywords relevant to your target role and integrate naturally into resume content'
    };
  }

  private getATSRequirements(): any {
    return {
      fileFormat: {
        preferred: ['.docx', '.pdf'],
        avoid: ['.pages', '.rtf', '.txt'],
        recommendation: 'Submit both .docx and .pdf versions if possible'
      },
      formatting: {
        fonts: 'Standard fonts only (Arial, Calibri, Times New Roman)',
        headers: 'Use standard section headers (Experience, Education, Skills)',
        bullets: 'Use simple bullet points (• or -)',
        tables: 'Avoid tables and text boxes',
        graphics: 'No images, logos, or graphics'
      },
      content: {
        keywords: 'Include exact keywords from job description',
        spelling: 'Use both full forms and abbreviations (e.g., Quality Assurance (QA))',
        dates: 'Use consistent date format (MM/YYYY)',
        contact: 'Include phone number and email in header',
        location: 'Include city and state'
      },
      structure: {
        order: 'Contact → Summary → Experience → Education → Skills',
        sections: 'Clearly labeled sections with standard names',
        length: 'Keep within 2-3 pages for optimal parsing',
        whitespace: 'Adequate spacing between sections'
      }
    };
  }

  private getKeywordOptimization(targetRole?: string): any {
    return {
      strategy: [
        'Mirror job description language exactly',
        'Use keywords in context, not as lists',
        'Include both technical and soft skills',
        'Incorporate industry-specific terminology',
        'Use action verbs that ATS recognizes'
      ],
      placement: [
        'Professional summary (most important)',
        'Skills section (grouped by category)',
        'Experience descriptions (natural integration)',
        'Project descriptions (technical keywords)',
        'Education section (relevant coursework)'
      ],
      density: {
        target: '2-3% keyword density',
        warning: 'Avoid keyword stuffing (>5% density)',
        natural: 'Keywords should read naturally in context'
      },
      testing: [
        'Use jobscan.co or similar ATS testing tools',
        'Compare your resume against job descriptions',
        'Check for keyword gaps and optimize',
        'Test with different file formats'
      ]
    };
  }

  private getFormattingGuidelines(): any {
    return {
      doList: [
        'Use standard fonts (Arial, Calibri, Times New Roman)',
        'Keep font size between 10-12 points',
        'Use consistent formatting throughout',
        'Left-align all text',
        'Use simple bullet points',
        'Include adequate white space',
        'Use standard section headers',
        'Save in .docx or .pdf format'
      ],
      dontList: [
        'Don\'t use headers or footers',
        'Don\'t use tables or text boxes',
        'Don\'t include images or graphics',
        'Don\'t use unusual fonts or colors',
        'Don\'t use multiple columns',
        'Don\'t abbreviate without context',
        'Don\'t use special characters',
        'Don\'t submit in .pages or .rtf format'
      ],
      sectionHeaders: [
        'Contact Information',
        'Professional Summary',
        'Work Experience or Professional Experience',
        'Education',
        'Skills or Technical Skills',
        'Certifications',
        'Projects (if applicable)',
        'Awards and Achievements (if applicable)'
      ]
    };
  }

  private getATSTestingTools(): any {
    return {
      free: [
        {
          name: 'Jobscan',
          url: 'jobscan.co',
          features: ['ATS compatibility check', 'Keyword optimization', 'Match rate analysis'],
          limitation: 'Limited free scans per month'
        },
        {
          name: 'Resume Worded',
          url: 'resumeworded.com',
          features: ['ATS score', 'Content suggestions', 'Format analysis'],
          limitation: 'Basic features only in free version'
        }
      ],
      manual: [
        'Copy resume text into plain text editor to check formatting',
        'Submit resume to yourself via ATS-enabled job board',
        'Ask HR professionals to review ATS compatibility',
        'Test with different file formats and compare results'
      ],
      checklist: [
        'Resume parses correctly in ATS preview',
        'All sections and content are visible',
        'Contact information is captured accurately',
        'Skills and keywords are properly identified',
        'Dates and formatting are consistent',
        'No content is missing or corrupted'
      ]
    };
  }
}