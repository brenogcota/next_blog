import { styled } from "stitches.config";

export const Posts = styled('ul', {
    padding: 0,
})

export const Post = styled('li', {
    borderBottom: '1px solid $primary',
    paddingBottom: '$2',
    paddingLeft: 0,
    listStyle: 'none',
    fontWeight: '$lg',
    cursor: 'pointer'
})

export const Tag = styled('span', {
    '& + &:before': {
        marginLeft: '0.5em',
        marginRight: '0.5em',
        content: '.',
        position: 'relative',
        top: '-4px',
        color: '$primary'
    },
    variants: {
        variant: {
            'primary': {
                color: '$primary'
            }
        }
    }
})