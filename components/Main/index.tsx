import Text from "ui/Text";

import settings from 'production.json';
import { Grid } from "ui/Column";
import Avatar from "components/Avatar";
import { styled } from "stitches.config";

const Container = styled('main', {
    padding: '$1 $4',

    '@bp1': {
        padding: '$2 $8',
    }
});

const Main = () => {
  return (
    <Container>
        <Grid 
            columns="2"
            css={{
                gridTemplateColumns: '100% 0%',
                '@bp1': {
                    gridTemplateColumns: '50% 30%',
                    columnGap: '15%',
                }
            }}
        >
            <div className="left-column">
                <div>
                    <Text 
                        as="h1" 
                        size="xlg"
                        css={{
                            '@bp1': {
                                fontSize: '42px'
                            }
                        }}
                    >
                        A little bit <br />
                        about me
                    </Text>

                    <Text size="md">
                        I&apos;m a front end developer, musicist, and curious. I&apos;m currently Creating little 
                        things to help digital content products make your dreams come true at 
                        <Text 
                            as="a" 
                            size="md" 
                            href={settings.work_company}
                            css={{
                                color: '#f04e23',
                                fontWeight: '$md'
                            }}
                        >
                            {' '} @Hotmart
                        </Text>
                    </Text>
                </div>

                <Grid columns="3">
                <div>
                    <Text as="strong" size="xs">Work Experience</Text> <br />
                    <Text size="xs">MetLife Seguros <br /> at may Ring 2020 - jul 2020</Text>
                    <Text size="xs">Codeby <br /> at Ring out 2020 - apr 2022</Text>
                    <Text size="xs">Hotmart <br /> at Ring may 2022 - current</Text>
                </div>

                <div>
                    <Text as="strong" size="xs">Dev Stack</Text> <br />
                    <Text size="xs">React JS</Text>
                    <Text size="xs">GraphQl</Text>
                    <Text size="xs">Typescript</Text>
                    <Text size="xs">SASS</Text>
                    <Text size="xs">Node</Text>
                </div>

                <div>
                    <Text as="strong" size="xs">Featured On</Text> <br />
                    <Text as="a" size="xs" href={settings.featuredOn.iguatemi}>Bosque Digital Iguatemi</Text> <br/>
                    <Text as="a" size="xs" href={settings.featuredOn.usaflex}>Usaflex</Text> <br/>
                    <Text as="a" size="xs" href={settings.featuredOn.bblend}>BBlend</Text> <br/>
                    <Text as="a" size="xs" href={settings.featuredOn.waaw}>Waaw</Text> <br/>
                </div>
                </Grid>
            </div>
            <div className="right-column">
                <Avatar />
            </div>
        </Grid>
    </Container>
  );
}

export default Main;