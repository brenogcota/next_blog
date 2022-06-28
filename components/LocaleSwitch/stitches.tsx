import { styled } from '@stitches/react';

export const Dropdown = styled('div', {
    position: 'relative',
    
})

export const DropdownContent = styled('div', {
    position: 'absolute',
    top: 45,
    left: '-10px',
    display: 'none',
    background: '$background',
    padding: '0 $2',
    minWidth: '90px',
    borderRadius: '4px',
    boxShadow: '0 0 15px -5px #ddd',

    '&[data-isopen="true"]': {
        display: 'block'
    }
})

export const DropdownSelected = styled('div', {
    position: 'relative',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: '$4',
    cursor: 'pointer',

    '&, p': {
        color: '$primary',
        fontWeight: '$md'
    },

    'p': {
        marginRight: '$1',
    }
})