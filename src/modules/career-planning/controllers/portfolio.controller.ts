/**
 * SPDX-License-Identifier: UNLICENSED
 * Copyright: Proprietary
 */

import { Controller, Post, Body, Get, Query } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { PortfolioService } from '../services/portfolio.service';
import { CreatePortfolioDto, PortfolioResponseDto } from '../dto/portfolio.dto';

@ApiTags('Portfolio Management')
@Controller('portfolio')
export class PortfolioController {
  constructor(private readonly portfolioService: PortfolioService) {}

  @Post('create')
  @ApiOperation({ 
    summary: 'Create professional portfolio website',
    description: 'Generates a comprehensive portfolio website with SEO optimization and responsive design'
  })
  @ApiResponse({ 
    status: 201, 
    description: 'Portfolio created successfully',
    type: PortfolioResponseDto
  })
  async createPortfolio(@Body() portfolioData: CreatePortfolioDto): Promise<PortfolioResponseDto> {
    return this.portfolioService.createPortfolio(portfolioData);
  }

  @Post('linkedin-optimization')
  @ApiOperation({ 
    summary: 'Generate LinkedIn profile optimization suggestions',
    description: 'Creates optimized LinkedIn profile content for biotechnology professionals'
  })
  @ApiResponse({ 
    status: 201, 
    description: 'LinkedIn optimization suggestions generated successfully'
  })
  async optimizeLinkedInProfile(@Body() portfolioData: CreatePortfolioDto): Promise<any> {
    return this.portfolioService.optimizeLinkedInProfile(portfolioData);
  }

  @Post('github-portfolio')
  @ApiOperation({ 
    summary: 'Create GitHub portfolio structure',
    description: 'Generates GitHub repository structure and content for technical portfolio'
  })
  @ApiResponse({ 
    status: 201, 
    description: 'GitHub portfolio structure created successfully'
  })
  async createGitHubPortfolio(@Body() portfolioData: CreatePortfolioDto): Promise<any> {
    return this.portfolioService.createGitHubPortfolio(portfolioData);
  }

  @Get('templates')
  @ApiOperation({ 
    summary: 'Get portfolio templates and themes',
    description: 'Returns available portfolio templates categorized by profession and style'
  })
  @ApiResponse({ 
    status: 200, 
    description: 'Portfolio templates retrieved successfully'
  })
  async getPortfolioTemplates(@Query('profession') profession?: string): Promise<any> {
    return {
      templates: this.getTemplatesByProfession(profession),
      themes: this.getAvailableThemes(),
      customization: this.getCustomizationOptions(),
      examples: this.getPortfolioExamples()
    };
  }

  @Get('linkedin-guide')
  @ApiOperation({ 
    summary: 'Get comprehensive LinkedIn optimization guide',
    description: 'Provides detailed guide for optimizing LinkedIn profile for biotechnology careers'
  })
  @ApiResponse({ 
    status: 200, 
    description: 'LinkedIn guide retrieved successfully'
  })
  async getLinkedInGuide(@Query('careerLevel') careerLevel?: string): Promise<any> {
    return {
      profileOptimization: this.getLinkedInProfileOptimization(),
      contentStrategy: this.getLinkedInContentStrategy(),
      networkingTips: this.getLinkedInNetworkingTips(),
      jobSearchStrategy: this.getLinkedInJobSearchStrategy(),
      industrySpecific: this.getBiotechLinkedInTips(),
      examples: this.getLinkedInExamples(careerLevel)
    };
  }

  @Get('github-guide')
  @ApiOperation({ 
    summary: 'Get GitHub portfolio development guide',
    description: 'Provides comprehensive guide for creating technical portfolio on GitHub'
  })
  @ApiResponse({ 
    status: 200, 
    description: 'GitHub guide retrieved successfully'
  })
  async getGitHubGuide(@Query('skillLevel') skillLevel?: string): Promise<any> {
    return {
      repositoryStructure: this.getGitHubRepositoryStructure(),
      projectIdeas: this.getBiotechProjectIdeas(),
      documentation: this.getGitHubDocumentationTips(),
      showcase: this.getGitHubShowcaseTips(),
      collaboration: this.getGitHubCollaborationTips(),
      examples: this.getGitHubPortfolioExamples(skillLevel)
    };
  }

  private getTemplatesByProfession(profession?: string): any {
    const templates = {
      biotechnology: [
        {
          id: 'biotech_modern',
          name: 'Modern Biotechnology Professional',
          description: 'Clean, modern design emphasizing scientific achievements',
          features: ['Laboratory showcase', 'Research highlights', 'Certification display'],
          preview: 'Modern layout with scientific color scheme',
          bestFor: 'QC/QA professionals, Research associates'
        },
        {
          id: 'biotech_academic',
          name: 'Academic Research Portfolio',
          description: 'Academic-focused design for research professionals',
          features: ['Publication list', 'Research projects', 'Conference presentations'],
          preview: 'Traditional academic layout with publication emphasis',
          bestFor: 'PhD students, Research scientists, Academic professionals'
        },
        {
          id: 'biotech_industry',
          name: 'Industry Professional',
          description: 'Corporate design for industry professionals',
          features: ['Work experience focus', 'Skills matrix', 'Achievement metrics'],
          preview: 'Professional corporate design',
          bestFor: 'Industry professionals, Management roles'
        }
      ],
      bioinformatics: [
        {
          id: 'bioinf_technical',
          name: 'Technical Bioinformatics Portfolio',
          description: 'Code-focused design for bioinformatics professionals',
          features: ['Code snippets', 'Data visualizations', 'Algorithm showcases'],
          preview: 'Dark theme with code highlighting',
          bestFor: 'Bioinformatics analysts, Computational biologists'
        }
      ],
      fresher: [
        {
          id: 'fresh_minimal',
          name: 'Fresh Graduate Minimal',
          description: 'Clean, simple design perfect for new graduates',
          features: ['Education focus', 'Project highlights', 'Skill development'],
          preview: 'Minimalist design with education emphasis',
          bestFor: 'Recent graduates, Career starters'
        }
      ]
    };

    if (profession && templates[profession]) {
      return templates[profession];
    }

    return templates;
  }

  private getAvailableThemes(): any {
    return {
      colorSchemes: [
        {
          name: 'Biotech Modern',
          primary: '#2C5F41',
          secondary: '#4A90E2',
          accent: '#7ED321',
          description: 'Modern biotechnology colors'
        },
        {
          name: 'Scientific Classic',
          primary: '#1B365D',
          secondary: '#2E5984',
          accent: '#F39C12',
          description: 'Traditional scientific palette'
        },
        {
          name: 'Tech Minimal',
          primary: '#2D3748',
          secondary: '#4299E1',
          accent: '#48BB78',
          description: 'Clean technical design'
        }
      ],
      layouts: [
        {
          name: 'Single Page',
          description: 'All content on one scrollable page',
          bestFor: 'Simple portfolios, quick overview'
        },
        {
          name: 'Multi-section',
          description: 'Multiple pages with navigation',
          bestFor: 'Comprehensive portfolios, detailed showcase'
        }
      ],
      fonts: [
        { name: 'Inter', style: 'Modern Sans-serif', readability: 'Excellent' },
        { name: 'Merriweather', style: 'Academic Serif', readability: 'Very Good' },
        { name: 'Roboto', style: 'Technical Sans-serif', readability: 'Excellent' }
      ]
    };
  }

  private getCustomizationOptions(): any {
    return {
      sections: [
        { name: 'Hero/Banner', required: true, customizable: ['Background', 'Tagline', 'Call-to-action'] },
        { name: 'About', required: true, customizable: ['Content', 'Photo', 'Stats'] },
        { name: 'Skills', required: true, customizable: ['Categories', 'Visual style', 'Proficiency levels'] },
        { name: 'Projects', required: false, customizable: ['Layout', 'Filtering', 'Detail level'] },
        { name: 'Education', required: true, customizable: ['Timeline style', 'Details shown'] },
        { name: 'Certifications', required: false, customizable: ['Display style', 'Verification links'] },
        { name: 'Contact', required: true, customizable: ['Contact methods', 'Form inclusion'] }
      ],
      features: [
        { name: 'SEO Optimization', description: 'Search engine optimization for better visibility' },
        { name: 'Responsive Design', description: 'Mobile and tablet friendly layout' },
        { name: 'Fast Loading', description: 'Optimized for quick page load times' },
        { name: 'Analytics Integration', description: 'Google Analytics tracking setup' },
        { name: 'Social Media Integration', description: 'LinkedIn, GitHub, Twitter links' }
      ]
    };
  }

  private getPortfolioExamples(): any {
    return [
      {
        name: 'Priya Sharma - QC Analyst',
        url: 'https://portfolio.example.com/priya-sharma',
        profession: 'Quality Control Analyst',
        highlights: ['Clean laboratory theme', 'Certification showcase', 'Project metrics'],
        template: 'biotech_modern'
      },
      {
        name: 'Rahul Patel - Bioinformatics',
        url: 'https://portfolio.example.com/rahul-patel',
        profession: 'Bioinformatics Analyst',
        highlights: ['Code portfolio', 'Data visualizations', 'Research projects'],
        template: 'bioinf_technical'
      }
    ];
  }

  private getLinkedInProfileOptimization(): any {
    return {
      headline: {
        formula: 'Current Role | Key Skills | Value Proposition',
        examples: [
          'Biotechnology Graduate | AWS & Digital Marketing Certified | Laboratory Research Expert',
          'Quality Control Analyst | GMP Expert | Pharmaceutical Testing Specialist',
          'Bioinformatics Analyst | Python & R Developer | Genomics Data Specialist'
        ],
        tips: [
          'Include 2-3 key skills or certifications',
          'Show your unique value proposition',
          'Use industry keywords',
          'Keep under 120 characters'
        ]
      },
      about: {
        structure: [
          'Hook (achievement or unique value)',
          'Background and expertise',
          'Key skills and certifications',
          'Current goals or seeking statement',
          'Call to action or contact invitation'
        ],
        length: '3-4 short paragraphs or bullet points',
        tone: 'Professional but personable',
        keywords: 'Include 10-15 industry keywords naturally'
      },
      experience: {
        format: 'Action verb + what you did + result/impact',
        quantify: 'Include numbers, percentages, improvements',
        keywords: 'Use job description keywords',
        media: 'Add images, documents, or links when relevant'
      }
    };
  }

  private getLinkedInContentStrategy(): any {
    return {
      postingFrequency: '2-3 times per week',
      contentTypes: [
        {
          type: 'Learning Updates',
          frequency: 'Weekly',
          example: 'Completed AWS AI Solutions certification this week. Excited to apply cloud computing skills to biotechnology data analysis!'
        },
        {
          type: 'Industry Insights',
          frequency: 'Bi-weekly',
          example: 'The biotech industry is experiencing rapid digital transformation. Here\'s how AI is revolutionizing drug discovery...'
        },
        {
          type: 'Project Showcases',
          frequency: 'Monthly',
          example: 'Just completed a food safety project that reduced contamination detection time by 40%. Here\'s what I learned...'
        }
      ],
      engagement: [
        'Comment meaningfully on industry leaders\' posts',
        'Share relevant articles with your perspective',
        'Participate in industry group discussions',
        'Connect with professionals and send personalized messages'
      ]
    };
  }

  private getLinkedInNetworkingTips(): any {
    return {
      connectionStrategy: [
        'Connect with classmates and alumni',
        'Reach out to professionals in target companies',
        'Join industry groups and engage actively',
        'Attend virtual events and connect with speakers/attendees'
      ],
      messaging: [
        'Always personalize connection requests',
        'Reference common interests or mutual connections',
        'Offer value or ask thoughtful questions',
        'Follow up appropriately without being pushy'
      ],
      groups: [
        'Biotechnology Professionals India',
        'Pharmaceutical Industry Professionals',
        'Quality Assurance and Quality Control',
        'Bioinformatics and Computational Biology',
        'Parul University Alumni Network'
      ]
    };
  }

  private getLinkedInJobSearchStrategy(): any {
    return {
      profileKeywords: 'Optimize for roles you want, not just current position',
      jobAlerts: 'Set up alerts for specific roles and companies',
      easyApply: 'Use LinkedIn Easy Apply strategically',
      directOutreach: 'Message hiring managers and employees directly',
      companyFollowing: 'Follow target companies and engage with their content',
      openToWork: 'Use "Open to Work" feature with specific role preferences'
    };
  }

  private getBiotechLinkedInTips(): any {
    return {
      industrySpecific: [
        'Follow pharmaceutical and biotech company pages',
        'Engage with posts from industry leaders',
        'Share insights about laboratory techniques and innovations',
        'Comment on regulatory updates and industry news'
      ],
      keywords: [
        'Use both scientific terms and business language',
        'Include regulatory keywords (GMP, FDA, ICH)',
        'Mention specific techniques and equipment',
        'Add location-specific keywords'
      ],
      networking: [
        'Connect with quality managers and research directors',
        'Build relationships with recruiters in life sciences',
        'Engage with university research groups',
        'Participate in biotech startup discussions'
      ]
    };
  }

  private getLinkedInExamples(careerLevel?: string): any {
    const examples = {
      fresher: {
        headline: 'Biotechnology Graduate | AWS Certified | Seeking QC/QA Opportunities in Pharmaceutical Industry',
        about: `🧬 Recent Biotechnology graduate with hands-on laboratory experience and modern technical skills.

🏆 HIGHLIGHTS:
• Best Student Project Award for innovative food safety detection
• AWS AI Solutions and Google Digital Marketing certified
• Reduced microbial detection time by 40% through process optimization

💻 TECHNICAL SKILLS:
Laboratory: PCR, Cell Culture, Quality Control, GMP Standards
Digital: Python, AWS Cloud, Digital Marketing, Data Analysis

🎯 Seeking entry-level QC/QA or Research Associate positions where I can combine biological expertise with technology skills.

📍 Vadodara, Gujarat | Open to opportunities across India

Let's connect if you're in the pharmaceutical or biotech space! 🤝`
      },
      experienced: {
        headline: 'Senior QC Analyst | Pharmaceutical Quality Expert | GMP Specialist | Leading Digital Transformation',
        about: `🧬 Senior Quality Control professional with 5+ years driving pharmaceutical quality excellence and digital innovation.

🏆 ACHIEVEMENTS:
• Led quality improvement initiatives resulting in 30% reduction in testing cycles
• Implemented digital QC systems saving ₹50L annually
• Zero FDA observations in 3 consecutive audits
• Certified in Advanced Quality Management and Lean Six Sigma

💼 EXPERTISE:
Quality Systems: GMP/GLP, Method Validation, Regulatory Compliance
Leadership: Team Management, Training, Process Improvement
Technology: Laboratory Automation, Digital Systems, Data Analytics

🚀 Currently exploring opportunities in quality leadership roles and digital transformation projects.

Let's discuss how quality excellence drives pharmaceutical innovation! 💬`
      }
    };

    return examples[careerLevel || 'fresher'];
  }

  private getGitHubRepositoryStructure(): any {
    return {
      recommended: [
        {
          name: 'biotech-data-analysis',
          description: 'Collection of laboratory data analysis projects',
          structure: [
            'README.md',
            'requirements.txt',
            'src/',
            'data/',
            'notebooks/',
            'results/',
            'docs/'
          ]
        },
        {
          name: 'quality-control-automation',
          description: 'QC process automation scripts and tools',
          structure: [
            'README.md',
            'src/',
            'tests/',
            'config/',
            'docs/',
            'examples/'
          ]
        },
        {
          name: 'portfolio-website',
          description: 'Personal portfolio website code',
          structure: [
            'index.html',
            'styles.css',
            'script.js',
            'assets/',
            'README.md'
          ]
        }
      ],
      naming: [
        'Use descriptive, lowercase names with hyphens',
        'Avoid spaces and special characters',
        'Keep names concise but clear',
        'Use consistent naming patterns'
      ],
      organization: [
        'Group related projects',
        'Use clear folder structures',
        'Include comprehensive README files',
        'Add appropriate license files'
      ]
    };
  }

  private getBiotechProjectIdeas(): any {
    return {
      beginner: [
        {
          name: 'Laboratory Data Visualization',
          description: 'Create charts and graphs from laboratory test results',
          skills: ['Python', 'Matplotlib', 'Pandas'],
          impact: 'Shows data analysis capabilities'
        },
        {
          name: 'QC Report Generator',
          description: 'Automate quality control report generation',
          skills: ['Python', 'Excel automation', 'Templates'],
          impact: 'Demonstrates process improvement mindset'
        }
      ],
      intermediate: [
        {
          name: 'Biomarker Analysis Pipeline',
          description: 'Analyze biomarker data from clinical studies',
          skills: ['R/Python', 'Statistics', 'Data visualization'],
          impact: 'Shows bioinformatics capabilities'
        },
        {
          name: 'Laboratory Equipment Monitor',
          description: 'IoT-based monitoring of laboratory conditions',
          skills: ['Python', 'IoT', 'Database', 'Alerts'],
          impact: 'Demonstrates innovation and technical skills'
        }
      ],
      advanced: [
        {
          name: 'Drug Discovery ML Model',
          description: 'Machine learning model for drug target prediction',
          skills: ['Python', 'ML', 'Bioinformatics', 'Deep learning'],
          impact: 'Shows advanced technical capabilities'
        }
      ]
    };
  }

  private getGitHubDocumentationTips(): any {
    return {
      readme: [
        'Clear project description and goals',
        'Installation and usage instructions',
        'Examples and screenshots',
        'Technologies used',
        'Future improvements planned'
      ],
      code: [
        'Add meaningful comments',
        'Use descriptive variable names',
        'Follow Python/R style guidelines',
        'Include docstrings for functions'
      ],
      examples: [
        'Provide sample data and outputs',
        'Include step-by-step tutorials',
        'Show real-world applications',
        'Explain the scientific context'
      ]
    };
  }

  private getGitHubShowcaseTips(): any {
    return {
      profile: [
        'Use a professional profile picture',
        'Write a compelling bio with key skills',
        'Pin your best repositories',
        'Keep your activity graph green'
      ],
      repositories: [
        'Showcase 3-5 best projects prominently',
        'Use clear, descriptive repository names',
        'Add topics/tags for discoverability',
        'Include live demo links when possible'
      ],
      contributions: [
        'Contribute to open-source biotech projects',
        'Create useful tools for the community',
        'Document your learning journey',
        'Share code from your academic projects'
      ]
    };
  }

  private getGitHubCollaborationTips(): any {
    return {
      openSource: [
        'Look for "good first issue" labels',
        'Start with documentation improvements',
        'Fix bugs in bioinformatics tools',
        'Add features to existing projects'
      ],
      networking: [
        'Follow biotech developers and researchers',
        'Star and fork interesting repositories',
        'Comment thoughtfully on issues',
        'Share your work on social media'
      ],
      professionalUse: [
        'Use GitHub for version control in all projects',
        'Collaborate with classmates on assignments',
        'Create group projects with proper attribution',
        'Use GitHub Pages for project documentation'
      ]
    };
  }

  private getGitHubPortfolioExamples(skillLevel?: string): any {
    const examples = {
      beginner: {
        username: 'biotech-fresher',
        repositories: [
          'lab-data-analysis',
          'python-learning-projects',
          'biotech-portfolio-site'
        ],
        highlights: [
          'Clear documentation',
          'Learning progression visible',
          'Practical biotech applications'
        ]
      },
      intermediate: {
        username: 'bioinfo-analyst',
        repositories: [
          'genomics-analysis-pipeline',
          'drug-discovery-ml',
          'biomarker-visualization-tool'
        ],
        highlights: [
          'Complex bioinformatics projects',
          'Machine learning applications',
          'Professional code quality'
        ]
      }
    };

    return examples[skillLevel || 'beginner'];
  }
}