import { Slider, SliderItem } from "ui/Slider";

import ColorPicker from 'pages/snippets/color-picker.mdx'
import CssHandles from 'pages/snippets/css-handles.mdx'
import Utils from 'pages/snippets/utils.mdx'
import Text from "ui/Text";
import { styled } from "stitches.config";
import { useLocale } from "context/locale";

const snippets = [ColorPicker, CssHandles, Utils];

const Container = styled('section', {
  padding: '$1 0 $1 $4',

  '@bp1': {
      padding: '$2 0 $2 $8',
  }
});

const Snippets = () => {
  const t = useLocale();

  return (
    <Container>
      <Text as="h2" size="xlg" >{t.my_code}
          <Text 
              as="a" 
              size="xlg"
              id="snippets"
              css={{
                  color: '$primary'
              }}
          >
              {' '} {t.snippets}
          </Text>
      </Text>
      <Text as="a" size="sm" href="https://gist.github.com/brenogcota">
        {t.all_snippets}
        <Text 
              as="span" 
              size="sm"
              css={{
                  color: '$primary',
                  fontWeight: '$lg'
              }}
          >
              {' '} {t.here}
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