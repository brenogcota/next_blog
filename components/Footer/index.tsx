import Playing from "components/Playing";
import { styled } from "stitches.config";
import { Grid } from "ui/Column";
import Text from "ui/Text";

import settings from 'production.json';
import Spacer from "ui/Spacer";

const Container = styled('footer', {
    padding: '$1 $4',

    '@bp1': {
        padding: '$2 $8',
    },

    '.footer-links': {
        maxWidth: '175px'
    }
});

const Footer = () => {
  return (
    <Container>
        <Playing />
        <Spacer size="sm" />
        <div className="footer-links">
            <Grid columns="2">
                <div>
                    <Spacer size="sm" />
                    <Text as="a" href="/" size="sm">Home</Text> <br />
                    <Spacer size="sm" />
                    <Text as="a" href="/blog" size="sm">Blog</Text>
                </div>
                <div>
                    <Spacer size="sm" />
                    <Text as="a" size="sm" href={settings.links.github} target="_blank" rel="noreferrer">Github</Text> <br/>
                    <Spacer size="sm" />
                    <Text as="a" size="sm" href={settings.links.linkedin} target="_blank" rel="noreferrer">LinkedIn</Text> <br/>
                    <Spacer size="sm" />
                    <Text as="a" size="sm" href={settings.links.instagram} target="_blank" rel="noreferrer">Instagram</Text>
                </div>
            </Grid>
        </div>
        <Spacer size="lg" />
    </Container>
  );
}

export default Footer;