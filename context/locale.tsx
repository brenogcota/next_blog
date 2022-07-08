import { useRouter } from "next/router";
import { createContext, useContext } from "react";
import ptBr from "../locales/pt-BR.json";
import enUS from "../locales/en-US.json";
import { hasOwnDeepProperty } from "utils/object";

type Props = {
  children: React.ReactNode;
};

type ContextProps = {
  [key: string]: string;
};

const LocaleContext = createContext<ContextProps>({} as ContextProps);

export const LocaleProvider = ({ children }: Props) => {
  const { locale } = useRouter();

  const defaultLocale = locale === "pt-BR" ? ptBr : enUS;

  const proxyLocale = new Proxy(defaultLocale, {
    get: function (obj: ContextProps, prop: string) {
      return hasOwnDeepProperty(obj, prop) ? obj[prop] : `t.${prop}`;
    },
  });

  return (
    <LocaleContext.Provider value={proxyLocale}>
      {children}
    </LocaleContext.Provider>
  );
};

export const useLocale = () => useContext(LocaleContext);
