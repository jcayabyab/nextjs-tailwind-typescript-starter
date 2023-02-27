import React, {
  FormEvent,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';

import { PlusIcon, XCircleIcon } from '@heroicons/react/solid';
import axios from 'axios';
import { useRouter } from 'next/router';

import { useGlobalContext } from '@/contexts/GlobalContext';
import { ILink } from '@/hooks/useLinks';

interface ILinkInput {
  label: string;
  link: string;
  id: number;
}

interface ILinkInputMap {
  [key: number]: ILinkInput;
}

interface LinkFormProps {
  initialLinkInput?: ILink[] | null;
  sendButtonText?: string;
}

const useLinkInputs = (existingLinkInputs: ILink[] = []) => {
  const [linkInputMap, setLinkInputMap] = useState<ILinkInputMap>({});
  const { user } = useGlobalContext();
  const router = useRouter();

  useEffect(() => {
    if (existingLinkInputs) {
      setLinkInputMap(
        existingLinkInputs.reduce(
          (obj: { map: ILinkInputMap; ctr: number }, li: ILink) => ({
            map: {
              ...obj.map,
              [obj.ctr]: {
                ...li,
                id: obj.ctr,
              },
            },
            ctr: obj.ctr + 1,
          }),
          { map: {}, ctr: 0 }
        ).map
      );
    }
  }, [existingLinkInputs]);

  const [counter, setCounter] = useState<number>(existingLinkInputs.length + 1);

  const addLinkInput = useCallback(() => {
    setLinkInputMap((prevLinkInputMap) => ({
      ...prevLinkInputMap,
      [counter]: { label: '', link: '', id: counter },
    }));
    setCounter((prevCounter) => prevCounter + 1);
  }, [setLinkInputMap, counter, setCounter]);

  const removeLinkInput = useCallback(
    (id: number) => {
      setLinkInputMap((prevLinkInputs) => {
        const newLinkInputs = { ...prevLinkInputs };
        delete newLinkInputs[id];
        return newLinkInputs;
      });
    },
    [setLinkInputMap]
  );

  const setLinkInput = useCallback(
    (id: number, label: string, link: string) =>
      setLinkInputMap((prevLinkInputMap) => ({
        ...prevLinkInputMap,
        [id]: { link, label, id },
      })),
    [setLinkInputMap]
  );

  const saveLinks = useCallback(async () => {
    await axios.post('/api/updateLinks', { user, linkInputMap });
    await router.push('/');
  }, [linkInputMap, router, user]);

  const linkInputs = useMemo(() => Object.values(linkInputMap), [linkInputMap]);

  const renderLinkInputs = () =>
    linkInputs.map(({ id, label, link }) => (
      <div key={id} className="flex">
        <input
          type="text"
          value={label}
          onChange={(event: FormEvent<HTMLInputElement>) =>
            setLinkInput(id, event.currentTarget.value, link)
          }
          placeholder="Label"
          className="my-2 min-w-0 flex-[0.3] rounded-sm text-black"
        ></input>
        <input
          type="text"
          value={link}
          onChange={(event: FormEvent<HTMLInputElement>) =>
            setLinkInput(id, label, event.currentTarget.value)
          }
          placeholder="Link"
          className="m-2 min-w-0 flex-[0.7] rounded-sm text-black"
        ></input>
        {linkInputs.length > 1 && (
          <button
            onClick={() => removeLinkInput(id)}
            className="text-red-500 hover:text-red-600"
          >
            <XCircleIcon className="h-5 w-5 " />
          </button>
        )}
      </div>
    ));

  return {
    linkInputs,
    addLinkInput,
    renderLinkInputs,
    saveLinks,
  };
};

const defaultLinkInputs = [{ link: '', label: '' }];

export default function LinkForm({
  initialLinkInput,
  sendButtonText,
}: LinkFormProps) {
  const { addLinkInput, renderLinkInputs, saveLinks } = useLinkInputs(
    initialLinkInput || defaultLinkInputs
  );

  return (
    <>
      <div className="container mt-2 rounded-lg bg-white px-3 pb-5">
        <h1 className="text-center font-bold text-black">Links</h1>
        <div>{renderLinkInputs()}</div>
        <div className="mt-2 flex justify-end" onClick={addLinkInput}>
          <button className="inline-flex items-center rounded-full bg-purple-900 px-6 py-1 text-lg font-bold text-white">
            <PlusIcon className="mr-2 h-5 w-5" />
            Add
          </button>
        </div>
        <div className="flex justify-center" onClick={saveLinks}>
          <button className="rounded-full bg-purple-900 px-10 py-2 text-xl font-bold text-white">
            {sendButtonText || 'Publish'}
          </button>
        </div>
      </div>
    </>
  );
}
