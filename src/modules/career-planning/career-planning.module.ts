/**
 * SPDX-License-Identifier: UNLICENSED
 * Copyright: Proprietary
 */

import { Module } from '@nestjs/common';
import { CareerPlanningController } from './controllers/career-planning.controller';
import { ResumeAnalysisController } from './controllers/resume-analysis.controller';
import { PortfolioController } from './controllers/portfolio.controller';
import { CareerPlanningService } from './services/career-planning.service';
import { ResumeAnalysisService } from './services/resume-analysis.service';
import { PortfolioService } from './services/portfolio.service';
import { SkillAssessmentService } from './services/skill-assessment.service';
import { JobApplicationService } from './services/job-application.service';
import { CertificationRoadmapService } from './services/certification-roadmap.service';

@Module({
  controllers: [
    CareerPlanningController,
    ResumeAnalysisController,
    PortfolioController,
  ],
  providers: [
    CareerPlanningService,
    ResumeAnalysisService,
    PortfolioService,
    SkillAssessmentService,
    JobApplicationService,
    CertificationRoadmapService,
  ],
  exports: [
    CareerPlanningService,
    ResumeAnalysisService,
    PortfolioService,
    SkillAssessmentService,
    JobApplicationService,
    CertificationRoadmapService,
  ],
})
export class CareerPlanningModule {}