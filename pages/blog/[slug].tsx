import dynamic from 'next/dynamic';
import { useRouter } from 'next/router'
import { styled } from 'stitches.config';

const Container = styled('main', {
    padding: '$1 $4',

    '@bp1': {
        padding: '$2 $8',
        maxWidth: 'max(60vw, 920px)',
        margin: 'auto',
        paddingTop: '5vh'
    }
});

const Background = styled('div', {
    backgroundImage:  'url(https://source.unsplash.com/random/?oriental,city,sky,developer,galaxy)',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    width: '100%',
    height: '230px',
    position: 'relative'
});

const Title = styled('h1', {
    textTransform: 'capitalize'
})

const Slug = () => {
  const { query: { slug } } = useRouter()
  const { locale } = useRouter()

  const slugPath = (slug as string)
  const parsedSlug = slugPath?.replaceAll('-', ' ')

  const Snippet = dynamic(() => {
        return import(`pages/posts/${locale}/${slugPath}.mdx`)
    }, { ssr: false }
  )

  return (
    <>
        <Background />
        <Container>

            <Title>{parsedSlug}</Title>

            <Snippet />
        </Container>
    </>
  );
}

export default Slug;