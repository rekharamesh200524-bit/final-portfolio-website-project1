import React from 'react';
import type { PortfolioData } from '../types';
import { MinimalTheme } from './themes/MinimalTheme';
import { CreativeTheme } from './themes/CreativeTheme';
import { ProfessionalTheme } from './themes/ProfessionalTheme';
import { ModernSidebarTheme } from './themes/ModernSidebarTheme';
import { BentoTheme } from './themes/BentoTheme';

interface PreviewProps {
  data: PortfolioData;
}

export const Preview: React.FC<PreviewProps> = ({ data }) => {
  switch (data.theme) {
    case 'minimal':
      return <MinimalTheme data={data} />;
    case 'creative':
      return <CreativeTheme data={data} />;
    case 'professional':
      return <ProfessionalTheme data={data} />;
    case 'modern-sidebar':
      return <ModernSidebarTheme data={data} />;
    case 'bento':
      return <BentoTheme data={data} />;
    default:
      return <MinimalTheme data={data} />;
  }
};
