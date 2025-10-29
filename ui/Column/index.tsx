import { styled } from "stitches.config";

const Stitch = styled('div', {
    columnCount: 1,
    variants: {
        columns: {
            2: {
                columnCount: 2,
            },
            3: {
                columnCount: 3,
            },
            4: {
                columnCount: 4,
            },
        }
    }
});

const GridStitch = styled('div', {
    display: 'grid',
    gap: '16px',
    variants: {
        columns: {
            2: {
                gridTemplateColumns: 'repeat(2, 1fr)',
            },
            3: {
                gridTemplateColumns: 'repeat(3, 1fr)',
            },
            4: {
                gridTemplateColumns: 'repeat(4, 1fr)',
            },
        }
    }
});

type Props = { 
    children: React.ReactNode,
    columns: string
} & React.ComponentProps<typeof Stitch | typeof GridStitch>

const Column = ({ children, ...rest }: Props) => {
  return (
    <Stitch {...rest}>
        {children}
    </Stitch>
  );
}

export const Grid = ({ children, ...rest }: Props) => {
    return (
      <GridStitch {...rest}>
          {children}
      </GridStitch>
    );
  }

export default Column;