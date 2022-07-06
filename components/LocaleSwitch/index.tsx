
import Link from 'next/link'
import { ChevronDownIcon, ChevronUpIcon } from '@radix-ui/react-icons';
import { Dropdown, DropdownContent, DropdownSelected } from './stitches';
import { useRouter } from 'next/router';
import Text from 'ui/Text';
import { useState } from 'react';

const labels = {
    'pt-BR': 'PT',
    'en-US': 'EN'
}

type Locale = 'pt-BR' | 'en-US'

const LocaleSwitch = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { locales, locale } = useRouter()

  const toggleOpen = () => setIsOpen(!isOpen);

  const returnLabel = (label: undefined | string) => labels[label as Locale]
  const makePath = (label: string) =>
                    locale && location.pathname.includes(locale) ? (location.pathname + location.search).replace(locale, label) : label

  return (
   <>
       <Dropdown>
            <DropdownSelected onClick={toggleOpen}>
                <Text
                    size="sm"
                >
                    {returnLabel(locale)}
                </Text>
                { isOpen ? <ChevronUpIcon /> : <ChevronDownIcon /> }
            </DropdownSelected>
            
            <DropdownContent data-isopen={isOpen}>
            {
                    locales?.map((label: string, index) => {
                        const fullPath = makePath(label)

                        return (
                            <Text 
                                key={`${label}--${index}`}
                                size="sm"
                                onClick={toggleOpen}
                            >
                                <Link href={`/${fullPath}`} locale={false}>
                                {returnLabel(label)}
                                </Link>
                            </Text>
                        )
                    })
            }
            </DropdownContent>
            
        </Dropdown>
   </>
  );
}

export default LocaleSwitch;