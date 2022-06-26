import Image from "next/image";
import { Suspense } from "react";
import { useQuery } from "react-query";
import { styled } from "stitches.config";
import { Slider, SliderItem } from "ui/Slider";
import Text from "ui/Text";

type Song = {
    track: {
        id: string
        name: string
        album: {
            images: { url: string }[]
        }
        preview_url: string
        artists: { name: string }[]
        
    }
}

const Container = styled('section', {
    padding: '$1 0 $1 $4',

    '@bp1': {
        padding: '$2 0 $2 $4',
    }
});

const SpotifyCard = styled('div', {
    minWidth: '250px',
    height: '250px',
    objectFit: 'cover',
    backgroundSize: '100%',
    marginRight: '20px',
    borderRadius: '12px',
    transition: 'all .2s',
    cursor: 'pointer',
    position: 'relative',


    '&:hover': {
        backgroundSize: '120%'
    },

    'strong, p': {
        position: 'absolute',
        bottom: 10,
        left: 10
    }
});

const Songs = () => {
 const { error, data } = useQuery<Song[]>('playlist', () =>
    fetch('https://raw.githubusercontent.com/brenogcota/brenogcota.github.io/master/src/config/recents.json').then(res =>
        res.json()
    )
  )

  if (error) return <></>

  return (
    <Suspense fallback="Loading">
        <Container>
            <Text as="h2" size="xlg" >Recently
                <Text 
                    as="span" 
                    size="xlg"
                    css={{
                        color: '$primary'
                    }}
                >
                    {' '} played songs
                </Text>
            </Text>
            <Slider>
                {
                    data?.map(recent => {
                        return (
                            <SliderItem key={recent.track.id} data-id={recent.track.id}>
                                <SpotifyCard
                                  css={{
                                    backgroundImage: `url(${recent.track.album.images[0].url})`
                                  }}
                                >
                                    <Text 
                                        as="strong" 
                                        size="md"
                                        css={{ color: '$primary' }}
                                    >
                                        {recent.track.name}
                                    </Text>
                                    <Text 
                                        as="p" 
                                        size="sm"
                                        css={{ color: '$white' }}
                                    >
                                        {recent.track.artists[0].name}
                                    </Text>
                                </SpotifyCard>
                            </SliderItem>
                        )
                    })

                }

            </Slider>
        </Container>
    </Suspense>
  );
}

export default Songs;