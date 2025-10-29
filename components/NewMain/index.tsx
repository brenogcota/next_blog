import Text from "ui/Text";

import { Grid } from "ui/Column";
import { styled } from "stitches.config";
import { useLocale } from "context/locale";

const Container = styled('main', {
    padding: '$1 $4',

    '@bp1': {
        padding: '$2 $8',
    }
});

const Main = () => {
  const t = useLocale();

  return (
    <Container>
        <Grid 
            columns="2"
            css={{
                gridTemplateColumns: '90% 0%',
                '@bp1': {
                    gridTemplateColumns: '50% 30%',
                    columnGap: '15%',
                }
            }}
        >
           <Text as="h1" size="xlg">Working on it, <Text as="span" size="xlg" css={{ color: "$primary" }}>new version coming soon.</Text></Text>
        </Grid>
    </Container>
  );
}

export default Main;