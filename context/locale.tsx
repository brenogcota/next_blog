import { useRouter } from "next/router";
import { createContext, useContext } from "react";
import ptBr from '../locales/pt-BR.json';
import enUS from '../locales/en-US.json';

type Props = {
    children: React.ReactNode
}

type ContextProps = {
    [key: string]: string
}

const LocaleContext = createContext<ContextProps>({} as ContextProps);

export const LocaleProvider = ({ children }: Props) => {
    const { locale, locales } = useRouter();
    
    const defaultLocale = locale === 'pt-BR' ? ptBr : enUS;

    return (
        <LocaleContext.Provider value={defaultLocale}>
            {children}
        </LocaleContext.Provider>
    );
}

export const useLocale = () => useContext(LocaleContext);