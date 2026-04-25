import React from 'react';
import type { PortfolioData } from '../types';
import { MinimalTheme } from './themes/MinimalTheme';
import { CreativeTheme } from './themes/CreativeTheme';
import { ProfessionalTheme } from './themes/ProfessionalTheme';

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
    default:
      return <MinimalTheme data={data} />;
  }
};
