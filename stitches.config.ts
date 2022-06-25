import { createStitches } from '@stitches/react';
import * as utils from 'stitches-utils';

export const { styled, getCssText } = createStitches({
    theme: {
      colors: {
        gray500: 'hsl(206,10%,76%)',
        blue500: 'hsl(206,100%,50%)',
        purple500: 'hsl(252,78%,60%)',
        green500: 'hsl(148,60%,60%)',
        red500: 'hsl(352,100%,62%)',
        white: 'rgb(255,255,255)',
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