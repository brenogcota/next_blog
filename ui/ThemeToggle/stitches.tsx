import { styled } from 'stitches.config';
import * as SwitchPrimitive from '@radix-ui/react-switch';
import { keyframes } from '@stitches/react';

export const Switch = styled(SwitchPrimitive.Root, {
  all: 'unset',
  width: 42,
  height: 25,
  backgroundColor: '$gray600',
  borderRadius: '9999px',
  position: 'relative',
  boxShadow: `0 2px 10px $gray200`,
  WebkitTapHighlightColor: 'rgba(0, 0, 0, 0)',
  cursor: 'pointer',
  '&:focus': { boxShadow: `0 0 0 2px black` },
  '&[data-state="checked"]': { backgroundColor: '$dark600' },
});

const toggleCheck = keyframes({
  '0%': { left: 3 },
  '100%': { right: 3, left: 'unset' },
});

const toggleUnCheck = keyframes({
  '0%': { right: 3 },
  '100%': { left: 3, right: 'unset' },
});

export const Thumb = styled(SwitchPrimitive.Thumb, {
  height: 18,
  width: 18,
  borderRadius: '100%',
  backgroundColor: '$dark600',
  position: 'absolute',
  top: 3,
  '&[data-state="unchecked"]': {
    animation: `${toggleUnCheck} .4s ease-in forwards`
  },
  '&[data-state="checked"]': { 
    backgroundColor: 'hsl(50, 100%, 77%)',
    animation: `${toggleCheck} .4s ease-out forwards`
  },
});
