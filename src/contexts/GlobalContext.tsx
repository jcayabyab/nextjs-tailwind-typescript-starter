import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';

import { useRouter } from 'next/router';

export interface IUser {
  username: string;
  oneLink: string;
  links: { label: string; link: string }[];
  likes: Set<string>;
  firstName: string;
  lastName: string;
}

export interface GlobalContextInterface {
  user?: IUser | null;
  setUser: (user: IUser) => void;
  logout: () => void;
}

export declare interface GlobalContextProviderProps {
  children: React.ReactNode;
}

export const GlobalContext = createContext<GlobalContextInterface>({
  setUser: () => {},
  logout: () => {},
});

export const GlobalContextProvider = ({
  children,
}: GlobalContextProviderProps) => {
  const [user, setUserState] = useState<IUser | null>(null);
  const router = useRouter();

  const setUser = useCallback(
    (inputUser: IUser) => {
      const temp: IUser = {
        username: inputUser.username,
        oneLink: inputUser.oneLink,
        firstName: inputUser.firstName,
        lastName: inputUser.lastName,
        likes: new Set(inputUser.likes),
        links: inputUser.links,
      };
      setUserState(temp);
      localStorage.setItem('user', JSON.stringify(inputUser));
    },
    [setUserState]
  );

  const logout = useCallback(() => {
    setUserState(null);
    localStorage.removeItem('user');
    router.push('/login');
  }, [setUserState, router]);

  useEffect(() => {
    const userFromLocalStorage = localStorage.getItem('user');

    if (router && userFromLocalStorage) {
      setUser(JSON.parse(userFromLocalStorage));
    } else if (
      !new Set(['/login', '/register', '/_error']).has(router.pathname) &&
      !(router.pathname.slice(0, 3) === '/l/')
    ) {
      router.push('/login');
    }
  }, [setUser, router]);

  return (
    <GlobalContext.Provider value={{ user, setUser, logout }}>
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = (): GlobalContextInterface => {
  return useContext(GlobalContext);
};
