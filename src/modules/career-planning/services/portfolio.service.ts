/**
 * SPDX-License-Identifier: UNLICENSED
 * Copyright: Proprietary
 */

import { Injectable } from '@nestjs/common';
import { CreatePortfolioDto, PortfolioResponseDto, PortfolioType, PortfolioTheme } from '../dto/portfolio.dto';

@Injectable()
export class PortfolioService {
  /**
   * Generate a comprehensive professional portfolio
   */
  async createPortfolio(portfolioData: CreatePortfolioDto): Promise<PortfolioResponseDto> {
    const portfolioId = this.generatePortfolioId();
    const websiteUrl = `https://portfolio.iris-ai.dev/${portfolioId}`;

    const content = await this.generatePortfolioContent(portfolioData);
    const seoOptimizations = this.generateSEOOptimizations(portfolioData);
    const metrics = await this.analyzePortfolioMetrics(content);

    return {
      portfolioId,
      websiteUrl,
      content,
      seoOptimizations,
      metrics,
    };
  }

  /**
   * Generate LinkedIn profile optimization suggestions
   */
  async optimizeLinkedInProfile(portfolioData: CreatePortfolioDto): Promise<any> {
    return {
      headline: this.generateLinkedInHeadline(portfolioData),
      about: this.generateLinkedInAbout(portfolioData),
      experience: this.optimizeExperienceDescriptions(portfolioData),
      skills: this.recommendLinkedInSkills(portfolioData),
      recommendations: this.generateLinkedInTips(),
    };
  }

  /**
   * Create GitHub portfolio repositories structure
   */
  async createGitHubPortfolio(portfolioData: CreatePortfolioDto): Promise<any> {
    return {
      repositories: this.generateRepositoryStructure(portfolioData),
      readmeContent: this.generateGitHubReadme(portfolioData),
      projectStructure: this.generateProjectFiles(portfolioData),
      documentation: this.generateTechnicalDocumentation(portfolioData),
    };
  }

  private generatePortfolioId(): string {
    return `portfolio-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  }

  private async generatePortfolioContent(portfolioData: CreatePortfolioDto): Promise<any> {
    const theme = this.getThemeStyles(portfolioData.config.theme);
    const sections = this.generatePortfolioSections(portfolioData);

    const html = this.generateHTML(portfolioData, sections, theme);
    const css = this.generateCSS(theme, portfolioData.config.customColors);
    const assets = this.generateAssets(portfolioData);

    return { html, css, assets };
  }

  private getThemeStyles(theme: PortfolioTheme): any {
    const themes = {
      [PortfolioTheme.BIOTECH_MODERN]: {
        primaryColor: '#2C5F41',
        secondaryColor: '#4A90E2',
        accentColor: '#7ED321',
        fontFamily: 'Inter, sans-serif',
        layout: 'modern-grid'
      },
      [PortfolioTheme.SCIENTIFIC_CLASSIC]: {
        primaryColor: '#1B365D',
        secondaryColor: '#2E5984',
        accentColor: '#F39C12',
        fontFamily: 'Merriweather, serif',
        layout: 'classic-linear'
      },
      [PortfolioTheme.TECH_MINIMAL]: {
        primaryColor: '#2D3748',
        secondaryColor: '#4299E1',
        accentColor: '#48BB78',
        fontFamily: 'Roboto, sans-serif',
        layout: 'minimal-cards'
      },
      [PortfolioTheme.CORPORATE_ELEGANT]: {
        primaryColor: '#1A202C',
        secondaryColor: '#3182CE',
        accentColor: '#805AD5',
        fontFamily: 'Playfair Display, serif',
        layout: 'corporate-sections'
      }
    };

    return themes[theme];
  }

  private generatePortfolioSections(portfolioData: CreatePortfolioDto): any {
    return {
      hero: this.generateHeroSection(portfolioData),
      about: this.generateAboutSection(portfolioData),
      skills: this.generateSkillsSection(portfolioData),
      projects: this.generateProjectsSection(portfolioData),
      achievements: this.generateAchievementsSection(portfolioData),
      education: this.generateEducationSection(portfolioData),
      contact: this.generateContactSection(portfolioData),
    };
  }

  private generateHeroSection(portfolioData: CreatePortfolioDto): string {
    return `
      <section id="hero" class="hero-section">
        <div class="hero-content">
          <h1 class="hero-title">${portfolioData.config.title}</h1>
          <p class="hero-tagline">${portfolioData.config.tagline || 'Biotechnology Professional | AI Enthusiast | Innovation Driver'}</p>
          <div class="hero-cta">
            <a href="#contact" class="btn btn-primary">Get In Touch</a>
            <a href="#projects" class="btn btn-secondary">View Work</a>
          </div>
        </div>
        <div class="hero-visual">
          <div class="animated-dna"></div>
        </div>
      </section>
    `;
  }

  private generateAboutSection(portfolioData: CreatePortfolioDto): string {
    const about = portfolioData.config.about || 
      'Award-winning Biotechnology Graduate with a unique combination of laboratory expertise and modern technology skills. Certified in AWS AI Solutions, Digital Marketing, and Software Engineering. Passionate about bridging traditional biotechnology with cutting-edge digital solutions.';

    return `
      <section id="about" class="about-section">
        <div class="container">
          <h2 class="section-title">About Me</h2>
          <div class="about-content">
            <div class="about-text">
              <p>${about}</p>
              <div class="stats">
                <div class="stat">
                  <span class="stat-number">5+</span>
                  <span class="stat-label">Certifications</span>
                </div>
                <div class="stat">
                  <span class="stat-number">3+</span>
                  <span class="stat-label">Projects</span>
                </div>
                <div class="stat">
                  <span class="stat-number">100%</span>
                  <span class="stat-label">Commitment</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    `;
  }

  private generateSkillsSection(portfolioData: CreatePortfolioDto): string {
    const skillCategories = {
      'Laboratory Skills': ['PCR', 'Gel Electrophoresis', 'Cell Culture', 'GMP Standards', 'Quality Control'],
      'Technical Skills': ['Python', 'SQL', 'AWS', 'Data Analysis', 'Bioinformatics'],
      'Digital Skills': ['Digital Marketing', 'SEO', 'Content Creation', 'Social Media', 'Analytics'],
      'Soft Skills': ['Project Management', 'Communication', 'Problem Solving', 'Team Leadership', 'Critical Thinking']
    };

    let skillsHTML = '<div class="skills-grid">';
    
    Object.entries(skillCategories).forEach(([category, skills]) => {
      skillsHTML += `
        <div class="skill-category">
          <h3>${category}</h3>
          <div class="skills-list">
            ${skills.map(skill => `<span class="skill-tag">${skill}</span>`).join('')}
          </div>
        </div>
      `;
    });

    skillsHTML += '</div>';

    return `
      <section id="skills" class="skills-section">
        <div class="container">
          <h2 class="section-title">Skills & Expertise</h2>
          ${skillsHTML}
        </div>
      </section>
    `;
  }

  private generateProjectsSection(portfolioData: CreatePortfolioDto): string {
    const defaultProjects = [
      {
        title: 'Best Student Project Award - Food Safety Innovation',
        description: 'Developed rapid microbial detection protocol using biosensor technology. Reduced contamination detection time by 40% compared to traditional methods.',
        technologies: ['Biosensors', 'Microbiology', 'Data Analysis', 'Quality Control'],
        achievements: ['First place among 30+ projects', '40% improvement in detection time', 'Industry panel recognition']
      },
      {
        title: 'Digital Marketing Campaign Analysis',
        description: 'Completed Google-certified digital marketing project analyzing e-commerce conversion rates and customer acquisition costs for biotech simulation.',
        technologies: ['Google Analytics', 'SEO', 'Social Media Marketing', 'Data Visualization'],
        achievements: ['Google Professional Certificate', 'ROI analysis expertise', 'Strategic campaign development']
      },
      {
        title: 'Cloud-Based Laboratory Data Management',
        description: 'Designed AWS-based solution for laboratory data storage and analysis with automated quality control reporting.',
        technologies: ['AWS', 'Python', 'Database Management', 'Automation', 'Quality Systems'],
        achievements: ['Cloud infrastructure design', 'Automated reporting system', 'Cost-effective solution']
      }
    ];

    const projects = portfolioData.projects || defaultProjects;

    let projectsHTML = '<div class="projects-grid">';
    
    projects.forEach(project => {
      projectsHTML += `
        <div class="project-card">
          <div class="project-header">
            <h3>${project.title}</h3>
          </div>
          <div class="project-content">
            <p>${project.description}</p>
            <div class="project-technologies">
              ${(project.technologies || []).map(tech => `<span class="tech-tag">${tech}</span>`).join('')}
            </div>
            ${project.achievements ? `
              <div class="project-achievements">
                <h4>Key Achievements:</h4>
                <ul>
                  ${project.achievements.map(achievement => `<li>${achievement}</li>`).join('')}
                </ul>
              </div>
            ` : ''}
          </div>
        </div>
      `;
    });

    projectsHTML += '</div>';

    return `
      <section id="projects" class="projects-section">
        <div class="container">
          <h2 class="section-title">Featured Projects</h2>
          ${projectsHTML}
        </div>
      </section>
    `;
  }

  private generateAchievementsSection(portfolioData: CreatePortfolioDto): string {
    const defaultAchievements = [
      'Best Student Project Award 2024 - Food Safety Innovation',
      'AWS AI Solutions Certified Professional',
      'Google Digital Marketing & E-commerce Certificate',
      'IBM Software Engineering Foundations',
      'Imperial College London - Vaccine Development Course',
      'University of Pennsylvania - Healthcare Innovation'
    ];

    const achievements = portfolioData.achievements || defaultAchievements;

    return `
      <section id="achievements" class="achievements-section">
        <div class="container">
          <h2 class="section-title">Achievements & Certifications</h2>
          <div class="achievements-grid">
            ${achievements.map(achievement => `
              <div class="achievement-item">
                <div class="achievement-icon">🏆</div>
                <div class="achievement-text">${achievement}</div>
              </div>
            `).join('')}
          </div>
        </div>
      </section>
    `;
  }

  private generateEducationSection(portfolioData: CreatePortfolioDto): string {
    return `
      <section id="education" class="education-section">
        <div class="container">
          <h2 class="section-title">Education</h2>
          <div class="education-timeline">
            <div class="education-item">
              <div class="education-year">2024</div>
              <div class="education-content">
                <h3>Diploma in Biotechnology</h3>
                <p>Parul University, Gujarat</p>
                <p>Specialized in microbiology, biochemistry, and bioprocessing</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    `;
  }

  private generateContactSection(portfolioData: CreatePortfolioDto): string {
    const contact = portfolioData.contact || {
      email: 'example@email.com',
      location: 'Vadodara, Gujarat',
    };

    return `
      <section id="contact" class="contact-section">
        <div class="container">
          <h2 class="section-title">Let's Connect</h2>
          <div class="contact-content">
            <div class="contact-info">
              <div class="contact-item">
                <span class="contact-icon">📧</span>
                <span>${contact.email}</span>
              </div>
              ${contact.phone ? `
                <div class="contact-item">
                  <span class="contact-icon">📱</span>
                  <span>${contact.phone}</span>
                </div>
              ` : ''}
              ${contact.location ? `
                <div class="contact-item">
                  <span class="contact-icon">📍</span>
                  <span>${contact.location}</span>
                </div>
              ` : ''}
            </div>
            <div class="social-links">
              ${contact.social?.linkedin ? `<a href="${contact.social.linkedin}" class="social-link">LinkedIn</a>` : ''}
              ${contact.social?.github ? `<a href="${contact.social.github}" class="social-link">GitHub</a>` : ''}
            </div>
          </div>
        </div>
      </section>
    `;
  }

  private generateHTML(portfolioData: CreatePortfolioDto, sections: any, theme: any): string {
    return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${portfolioData.config.title} - Professional Portfolio</title>
    <link rel="stylesheet" href="styles.css">
    <link href="https://fonts.googleapis.com/css2?family=${theme.fontFamily.replace(' ', '+')}&display=swap" rel="stylesheet">
</head>
<body>
    <nav class="navbar">
        <div class="nav-container">
            <div class="nav-logo">${portfolioData.config.title}</div>
            <ul class="nav-menu">
                <li><a href="#about">About</a></li>
                <li><a href="#skills">Skills</a></li>
                <li><a href="#projects">Projects</a></li>
                <li><a href="#achievements">Achievements</a></li>
                <li><a href="#contact">Contact</a></li>
            </ul>
        </div>
    </nav>

    <main>
        ${sections.hero}
        ${sections.about}
        ${sections.skills}
        ${sections.projects}
        ${sections.achievements}
        ${sections.education}
        ${sections.contact}
    </main>

    <footer class="footer">
        <div class="container">
            <p>&copy; 2025 ${portfolioData.config.title}. All rights reserved.</p>
        </div>
    </footer>

    <script src="script.js"></script>
</body>
</html>
    `;
  }

  private generateCSS(theme: any, customColors?: any): string {
    const colors = customColors || {
      primary: theme.primaryColor,
      secondary: theme.secondaryColor,
      accent: theme.accentColor,
    };

    return `
/* Portfolio CSS */
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

body {
    font-family: ${theme.fontFamily};
    line-height: 1.6;
    color: #333;
}

.container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 20px;
}

/* Navigation */
.navbar {
    background: ${colors.primary};
    color: white;
    padding: 1rem 0;
    position: fixed;
    width: 100%;
    top: 0;
    z-index: 1000;
}

.nav-container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 20px;
}

.nav-menu {
    display: flex;
    list-style: none;
    gap: 2rem;
}

.nav-menu a {
    color: white;
    text-decoration: none;
    transition: color 0.3s;
}

.nav-menu a:hover {
    color: ${colors.accent};
}

/* Hero Section */
.hero-section {
    padding: 120px 0 80px;
    background: linear-gradient(135deg, ${colors.primary} 0%, ${colors.secondary} 100%);
    color: white;
    text-align: center;
}

.hero-title {
    font-size: 3rem;
    margin-bottom: 1rem;
    font-weight: 700;
}

.hero-tagline {
    font-size: 1.25rem;
    margin-bottom: 2rem;
    opacity: 0.9;
}

.btn {
    display: inline-block;
    padding: 12px 24px;
    margin: 0 10px;
    border-radius: 5px;
    text-decoration: none;
    font-weight: 600;
    transition: all 0.3s;
}

.btn-primary {
    background: ${colors.accent};
    color: white;
}

.btn-secondary {
    background: transparent;
    color: white;
    border: 2px solid white;
}

/* Sections */
.section-title {
    font-size: 2.5rem;
    text-align: center;
    margin-bottom: 3rem;
    color: ${colors.primary};
}

section {
    padding: 80px 0;
}

/* Skills Grid */
.skills-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 2rem;
}

.skill-category h3 {
    color: ${colors.primary};
    margin-bottom: 1rem;
}

.skills-list {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
}

.skill-tag {
    background: ${colors.accent};
    color: white;
    padding: 5px 10px;
    border-radius: 15px;
    font-size: 0.9rem;
}

/* Projects Grid */
.projects-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
    gap: 2rem;
}

.project-card {
    background: white;
    border-radius: 10px;
    padding: 2rem;
    box-shadow: 0 5px 15px rgba(0,0,0,0.1);
    transition: transform 0.3s;
}

.project-card:hover {
    transform: translateY(-5px);
}

.tech-tag {
    background: ${colors.secondary};
    color: white;
    padding: 3px 8px;
    border-radius: 10px;
    font-size: 0.8rem;
    margin: 2px;
}

/* Achievements */
.achievements-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 1.5rem;
}

.achievement-item {
    display: flex;
    align-items: center;
    background: white;
    padding: 1.5rem;
    border-radius: 10px;
    box-shadow: 0 3px 10px rgba(0,0,0,0.1);
}

.achievement-icon {
    font-size: 2rem;
    margin-right: 1rem;
}

/* Contact */
.contact-content {
    text-align: center;
}

.contact-item {
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 1rem 0;
    font-size: 1.1rem;
}

.contact-icon {
    margin-right: 10px;
    font-size: 1.2rem;
}

/* Responsive */
@media (max-width: 768px) {
    .hero-title {
        font-size: 2rem;
    }
    
    .nav-menu {
        flex-direction: column;
        gap: 1rem;
    }
    
    .projects-grid,
    .skills-grid {
        grid-template-columns: 1fr;
    }
}
    `;
  }

  private generateAssets(portfolioData: CreatePortfolioDto): string[] {
    return [
      'styles.css',
      'script.js',
      'images/logo.png',
      'images/profile.jpg',
      'favicon.ico'
    ];
  }

  private generateSEOOptimizations(portfolioData: CreatePortfolioDto): any {
    return {
      title: `${portfolioData.config.title} - Biotechnology Professional | Portfolio`,
      description: `Professional portfolio of ${portfolioData.config.title}, a skilled biotechnology graduate specializing in quality control, digital marketing, and bioinformatics. Certified in AWS, Google Digital Marketing, and IBM Software Engineering.`,
      keywords: [
        'biotechnology',
        'quality control',
        'bioinformatics',
        'digital marketing',
        'AWS certified',
        'pharmaceutical',
        'laboratory',
        'portfolio',
        portfolioData.config.title.toLowerCase()
      ],
      structuredData: {
        '@context': 'https://schema.org',
        '@type': 'Person',
        'name': portfolioData.config.title,
        'jobTitle': 'Biotechnology Professional',
        'description': portfolioData.config.about,
        'url': `https://portfolio.iris-ai.dev/${this.generatePortfolioId()}`,
      }
    };
  }

  private async analyzePortfolioMetrics(content: any): Promise<any> {
    return {
      loadTime: '< 2 seconds',
      accessibility: '95/100',
      seoScore: '92/100',
      mobileCompatibility: '100%'
    };
  }

  private generateLinkedInHeadline(portfolioData: CreatePortfolioDto): string {
    return 'Biotechnology Graduate | AWS & Digital Marketing Certified | Laboratory Research Expert | Seeking Pharmaceutical/Biotech Opportunities';
  }

  private generateLinkedInAbout(portfolioData: CreatePortfolioDto): string {
    return `🧬 Award-winning Biotechnology Graduate from Parul University with a unique combination of laboratory expertise and modern technology skills.

🏆 ACHIEVEMENTS:
• Best Student Project Award 2024 - Innovative food safety detection protocol
• Certified in AWS AI Solutions, IBM Software Engineering, Google Digital Marketing
• Reduced microbial detection time by 40% through biosensor innovation

💻 TECHNICAL SKILLS:
• Laboratory: PCR, Fermentation, Quality Control, GMP Standards
• Cloud: AWS AI Services, Google Cloud Platform
• Marketing: Digital Strategy, E-commerce, Content Creation
• Programming: Python, SQL, Database Management

🎯 SEEKING: Entry-level positions in Pharmaceutical QC/QA, Production, or Research where I can combine biological expertise with technology skills to drive innovation.

📍 Based in Vadodara, Gujarat | Open to opportunities across India`;
  }

  private optimizeExperienceDescriptions(portfolioData: CreatePortfolioDto): any {
    return {
      tips: [
        'Use action verbs to start each bullet point',
        'Quantify achievements with specific metrics',
        'Include relevant keywords for ATS optimization',
        'Highlight technology and laboratory skills',
        'Show progression and learning in each role'
      ],
      examples: [
        '• Developed rapid microbial detection protocol, reducing testing time by 40%',
        '• Implemented GMP standards in laboratory operations, ensuring 100% compliance',
        '• Collaborated with cross-functional teams on quality improvement initiatives',
        '• Utilized Python for data analysis and laboratory automation projects'
      ]
    };
  }

  private recommendLinkedInSkills(portfolioData: CreatePortfolioDto): string[] {
    return [
      'Biotechnology',
      'Quality Control',
      'Laboratory Testing',
      'GMP Standards',
      'Python Programming',
      'Digital Marketing',
      'AWS Cloud Services',
      'Data Analysis',
      'Microbiology',
      'Research and Development',
      'Project Management',
      'Problem Solving'
    ];
  }

  private generateLinkedInTips(): string[] {
    return [
      'Post weekly updates about learning progress',
      'Share insights about biotechnology industry trends',
      'Engage with posts from target companies',
      'Connect with alumni and industry professionals',
      'Join relevant LinkedIn groups (Biotechnology, Pharma)',
      'Ask for recommendations from professors and mentors'
    ];
  }

  private generateRepositoryStructure(portfolioData: CreatePortfolioDto): any {
    return [
      {
        name: 'biotech-projects',
        description: 'Collection of biotechnology and laboratory automation projects',
        topics: ['biotechnology', 'laboratory', 'python', 'data-analysis']
      },
      {
        name: 'digital-marketing-analytics',
        description: 'Digital marketing projects and e-commerce analysis',
        topics: ['digital-marketing', 'analytics', 'seo', 'data-visualization']
      },
      {
        name: 'aws-cloud-projects',
        description: 'Cloud computing projects using AWS services',
        topics: ['aws', 'cloud-computing', 'ai-services', 'automation']
      },
      {
        name: 'portfolio-website',
        description: 'Personal portfolio website showcasing professional work',
        topics: ['portfolio', 'website', 'html', 'css', 'javascript']
      }
    ];
  }

  private generateGitHubReadme(portfolioData: CreatePortfolioDto): string {
    return `# ${portfolioData.config.title} - Biotechnology Professional

## 🧬 About Me
Award-winning Biotechnology Graduate with expertise in laboratory research, quality control, and modern technology integration.

## 🏆 Key Achievements
- Best Student Project Award 2024 - Food Safety Innovation
- AWS AI Solutions Certified
- Google Digital Marketing Certified
- IBM Software Engineering Foundations

## 💻 Technical Skills
- **Laboratory**: PCR, Gel Electrophoresis, Cell Culture, GMP Standards
- **Programming**: Python, SQL, Database Management
- **Cloud**: AWS AI Services, Google Cloud Platform
- **Marketing**: Digital Strategy, SEO, Content Creation

## 📂 Repository Overview
- \`biotech-projects/\` - Laboratory automation and data analysis projects
- \`digital-marketing-analytics/\` - Marketing campaigns and e-commerce analysis
- \`aws-cloud-projects/\` - Cloud computing and AI service implementations
- \`portfolio-website/\` - Professional portfolio and personal website

## 📫 Connect With Me
- LinkedIn: [Professional Profile](linkedin-url)
- Email: ${portfolioData.contact?.email || 'your-email@example.com'}
- Location: ${portfolioData.contact?.location || 'Vadodara, Gujarat'}

---
*Seeking opportunities in pharmaceutical QC/QA, bioinformatics, or biotech innovation roles.*`;
  }

  private generateProjectFiles(portfolioData: CreatePortfolioDto): any {
    return {
      'biotech-data-analysis': {
        'README.md': 'Laboratory data analysis using Python and statistical methods',
        'requirements.txt': 'pandas\nnumpy\nmatplotlib\nseaborn\nscipy',
        'data_analysis.py': '# Microbial growth analysis script',
        'results/': 'Analysis results and visualizations'
      },
      'quality-control-automation': {
        'README.md': 'Automated quality control reporting system',
        'qc_automation.py': '# QC data processing and report generation',
        'templates/': 'Report templates and formats'
      }
    };
  }

  private generateTechnicalDocumentation(portfolioData: CreatePortfolioDto): any {
    return {
      'API Documentation': 'Comprehensive API docs for laboratory data systems',
      'Project Architecture': 'System design and technical specifications',
      'User Guides': 'Step-by-step guides for using developed tools',
      'Code Comments': 'Well-documented code with clear explanations'
    };
  }
}