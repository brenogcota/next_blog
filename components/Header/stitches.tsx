import { keyframes, styled } from "@stitches/react";

const itemHover = keyframes({
    '0%': { borderWidth: '0' },
    '100%': { borderWidth: '2px' },
});

export const HeaderLayout = styled('header', {
    backgroundColor: '$background',
    padding: '$2 $8',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    boxShadow: '0 0 15px -5px #ddd',

    'nav': {
        display: 'flex',
        alignItems: 'center'
    },

    '.nav-item': {
        color: '$primary',
        fontWeight: '$lg',
        marginRight: '$4',
        cursor: 'pointer'
    },

    '.nav-item:hover': {
        borderBottom: '2px solid $primary',
        animation: `${itemHover} .2s`,
    }
});

export const Logo = styled('a', {
    color: '$primary',
    fontSize: '$xlg',
    fontWeight: '$lg',
    m: '20px 10px',
    cursor: 'pointer',

    'span': {
        color: '$gray200'
    }
});