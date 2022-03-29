import { FormEvent, useCallback, useMemo, useState } from 'react';

import { XCircleIcon } from '@heroicons/react/solid';

import { Meta } from '@/layout/Meta';
import { Main } from '@/templates/Main';

interface ILinkInput {
  label: string;
  link: string;
  id: number;
}

interface ILink {
  label: string;
  link: string;
}

interface ILinkInputMap {
  [key: number]: ILinkInput;
}

const useLinkInputs = (existingLinkInputs: ILink[] = []) => {
  const [linkInputMap, setLinkInputMap] = useState<ILinkInputMap>(
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
          className="my-2 flex-[0.3] rounded-sm text-black"
        ></input>
        <input
          type="text"
          value={link}
          onChange={(event: FormEvent<HTMLInputElement>) =>
            setLinkInput(id, label, event.currentTarget.value)
          }
          placeholder="Link"
          className="m-2 flex-[0.7] rounded-sm text-black"
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
  };
};

const Create = () => {
  const { addLinkInput, renderLinkInputs } = useLinkInputs([
    { link: '', label: '' },
  ]);

  return (
    <Main
      meta={
        <Meta
          title="Create OneLink"
          description="Create a OneLink page for your account."
        />
      }
    >
      <h1 className="mb-4 text-center font-sans text-2xl font-bold text-white">
        Create your OneLink
      </h1>
      <div className="container mt-2 rounded-lg bg-white px-3 py-5">
        <div>{renderLinkInputs()}</div>
        <div className="flex justify-end" onClick={addLinkInput}>
          <button className="rounded-full bg-purple-900 px-10 py-2 text-xl font-bold text-white">
            Add
          </button>
        </div>
        <div className="flex justify-center">
          <button className="rounded-full bg-purple-900 px-10 py-2 text-xl font-bold text-white">
            Publish
          </button>
        </div>
      </div>
    </Main>
  );
};

export default Create;
