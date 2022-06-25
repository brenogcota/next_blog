import { styled } from "@stitches/react";

export const HeaderLayout = styled('header', {
    backgroundColor: '$white',
    padding: '$2 $8',
});

export const Logo = styled('a', {
    color: '$primary',
    fontSize: '$xlg',
    fontWeight: '$lg',
    m: '20px 10px',
    cursor: 'pointer',

    'span': {
        color: '$gray500'
    }
});