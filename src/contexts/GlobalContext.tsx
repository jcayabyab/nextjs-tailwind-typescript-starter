import { createContext, useContext } from 'react';

export interface IUser {
  username: string;
  oneLink: string;
  links: { label: string; link: string }[];
  likes: Set<string>;
  firstName: string;
  lastName: string;
}

export interface GlobalContextInterface {}

export declare interface GlobalContextProviderProps {
  children: React.ReactNode;
}

export const GlobalContext = createContext<GlobalContextInterface>({});

export const GlobalContextProvider = ({
  children,
}: GlobalContextProviderProps) => {
  return <GlobalContext.Provider value={{}}>{children}</GlobalContext.Provider>;
};

export const useGlobalContext = (): GlobalContextInterface => {
  return useContext(GlobalContext);
};
