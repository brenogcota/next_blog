import { createStitches } from '@stitches/react';
import * as utils from 'stitches-utils';

export const { styled, getCssText, createTheme } = createStitches({
    theme: {
      colors: {
        dark600: '#333',
        dark500: '#666',
        gray200: '#ddd',
        gray600: '#ccc',
        background: 'rgb(255,255,255)',
        primary: 'hsl(230deg, 100%, 67%)'
      },
      space: {
        1: '5px',
        2: '10px',
        3: '15px',
        4: '20px',
        8: '62px'
      },
      fontSizes: {
        sx: '12px',
        sm: '14px',
        default: '16px',
        md: '20px',
        lg: '24px',
        xlg: '32px',
      },
      fonts: {
        untitled: 'Untitled Sans, apple-system, sans-serif',
        mono: 'Söhne Mono, menlo, monospace',
      },
      fontWeights: {
        xs: 400,
        sm: 500,
        md: 600,
        lg: 700
      },
      lineHeights: {},
      letterSpacings: {},
      sizes: {},
      borderWidths: {
        xs: '4px',
        sm: '8px',
        md: '12px',
      },
      borderStyles: {},
      radii: {},
      shadows: {},
      zIndices: {},
      transitions: {},
    },
    utils
});

export const darkTheme = createTheme('dark', {
  colors: {
    dark600: '#f6f6f6',
    dark500: '#eee',
    gray200: '#ddd',
    gray600: '#f3f3f3',
    background: 'rgb(0,0,0)',
    primary: 'hsl(230deg, 100%, 67%)'
  }
});