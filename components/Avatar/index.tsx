import { keyframes, styled } from "@stitches/react";
import Image from "next/image";

import settings from 'production.json';

const animation = keyframes({
    '0%': {
        transform: 'scale(1)'
    },
    '100%': {
        transform: 'scale(1.025)'
    }
});

const start = keyframes({
    '0%': {
        opacity: 0
    },
    '100%': {
        opacity: 1
    }
});

const Container = styled('div', {
    position: 'relative',

    '&:hover': {
        animation: `${animation} .2s ease-in forwards`,
        cursor: 'pointer'
    },
});

const Rotate = styled('div', {
    position: 'absolute',
    transform: 'rotate(0deg)',
    top: 60,
    left: 0,
    
    'img': {
        borderRadius: '12px'
    }
});

const Avatar = () => {
  return (
    <Container>

        <Rotate
            css={{ 
                transform: 'rotate(-20deg)', 
                top: 90,
                animation: `${start} .8s forwards`,
            }}
        >
            <Image 
                src="/profile-b.jpeg"
                alt="Picture of the author"
                width={250}
                height={250}
            />
        </Rotate>

        <Rotate
            css={{ 
                transform: 'rotate(15deg)', 
                top: 120,
                animation: `${start} 1.4s forwards`,
            }}
        >
            <Image 
                src="/profile-a.jpeg"
                alt="Picture of the author"
                width={250}
                height={250}
            />
        </Rotate>

        <Rotate
            css={{
                animation: `${start} 2s forwards`,
            }}
        >        
            <Image 
                src={settings.avatar}
                alt="Picture of the author"
                width={250}
                height={250}
            />
        </Rotate>
    </Container>
  );
}

export default Avatar;