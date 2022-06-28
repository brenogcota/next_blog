import Text from "ui/Text";

import settings from 'production.json';
import { Grid } from "ui/Column";
import Avatar from "components/Avatar";
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
                gridTemplateColumns: '100% 0%',
                '@bp1': {
                    gridTemplateColumns: '50% 30%',
                    columnGap: '15%',
                }
            }}
        >
            <div id="me" className="left-column">
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
                       {t.title}
                    </Text>

                    <Text size="md">
                        {t.about}
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

                    <Text size="md">
                        {t.about_2}
                        <Text 
                            as="a" 
                            size="md" 
                            href={settings.github}
                            css={{
                                color: '$primary',
                                fontWeight: '$md'
                            }}
                        >
                            {' '} {t.here}.
                        </Text>
                    </Text>
                </div>

                <Grid columns="3">
                <div>
                    <Text as="strong" size="md">{t.experience}</Text> <br />
                    <Text size="sm">Freelancer <br />may 2020 - jul 2020</Text>
                    <Text size="sm">Codeby <br />out 2020 - apr 2022</Text>
                    <Text size="sm">Hotmart <br />may 2022 - current</Text>
                </div>

                <div>
                    <Text as="strong" size="md">Dev Stack</Text> <br />
                    <Text size="sm">React JS</Text>
                    <Text size="sm">GraphQl</Text>
                    <Text size="sm">Typescript</Text>
                    <Text size="sm">Node</Text>
                </div>

                <div>
                    <Text as="strong" size="md">Links</Text> <br />
                    <Text as="a" size="sm" href={settings.links.github}>Github</Text> <br/>
                    <Text as="a" size="sm" href={settings.links.linkedin}>LinkedIn</Text> <br/>
                    <Text as="a" size="sm" href={settings.links.instagram}>Instagram</Text>
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