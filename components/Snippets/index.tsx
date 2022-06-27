import { Slider, SliderItem } from "ui/Slider";

import ColorPicker from 'pages/snippets/color-picker.mdx'
import CssHandles from 'pages/snippets/css-handles.mdx'
import Utils from 'pages/snippets/utils.mdx'
import Text from "ui/Text";
import { styled } from "stitches.config";

const snippets = [ColorPicker, CssHandles, Utils];

const Container = styled('section', {
  padding: '$1 0 $1 $4',

  '@bp1': {
      padding: '$2 0 $2 $4',
  }
});

const Snippets = () => {
  return (
    <Container>
      <Text as="h2" size="xlg" >My code
          <Text 
              as="a" 
              size="xlg"
              id="snippets"
              css={{
                  color: '$primary'
              }}
          >
              {' '} Snippets
          </Text>
      </Text>
      <Text as="a" size="sm" href="https://gist.github.com/brenogcota">
        See all snippets
        <Text 
              as="span" 
              size="sm"
              css={{
                  color: '$primary',
                  fontWeight: '$lg'
              }}
          >
              {' '} here
          </Text>
      </Text>

      <Slider>
        {
          snippets?.map((Snippet, index) => {
            return (
              <SliderItem key={Snippet.toString() + index}>
                <Snippet />
              </SliderItem>
            );
          })
        }
      </Slider>
    </Container>
  );
}

export default Snippets;