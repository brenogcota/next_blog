import { styled } from "@stitches/react";

const Scroll = styled('div', {
    display: 'flex',
    padding: '$4',
    'overflow-x': 'scroll',
    'scroll-snap-type': 'x mandatory'
});

const ScrollItem = styled('div', {
    'scroll-snap-align': 'start'
});

type Props = { 
    children: React.ReactNode,
} & React.ComponentProps<typeof Scroll | typeof ScrollItem>

export const Slider = ({ children }: Props) => {

  return (
    <Scroll>
     {children}
    </Scroll>
  );
}

export const SliderItem = ({ children }: Props) => {

    return (
      <ScrollItem>
       {children}
      </ScrollItem>
    );
}