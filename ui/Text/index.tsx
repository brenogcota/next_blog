import { styled } from "stitches.config";

const Stitch = styled('p', {
    color: '$text',
    variants: {
        size: {
            xs: {
                fontSize: '$xs'
            },
            sm: {
                fontSize: '$sm'
            },
            default: {
                fontSize: '$default'
            },
            md: {
                fontSize: '$md'
            },
            lg: {
                fontSize: '$lg'
            },
            xlg: {
                fontSize: '$xlg'
            }
        }
    }
});

type Props = { 
    children: React.ReactNode,
    as?: React.ElementType,
    size: string,
    href?: string
} & React.ComponentProps<typeof Stitch>

const Text = ({ children, ...rest }: Props) => {

  return (
    <Stitch
        {...rest}
    >
        {children}
    </Stitch>
  );
}

export default Text;