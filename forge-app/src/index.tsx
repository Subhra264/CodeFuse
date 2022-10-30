import ForgeUI, {
  render,
  ContextMenu,
  InlineDialog,
  Text,
  useState,
  Strong,
  useProductContext,
  useEffect,
} from '@forge/ui';

import { fetch } from '@forge/api';

const createDocFromTemplate = async () => {
  return fetch('https://jsonplaceholder.typicode.com/todos')
    .then((res) => res.json())
    .then((data) => data);
};

interface DataType {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}

const App = () => {
  const [data, setData] = useState<DataType[]>([]);

  const {
    // @ts-ignore
    extensionContext: { selectedText },
  } = useProductContext();

  useEffect(async () => {
    setData(await createDocFromTemplate());
  }, [selectedText]);

  return (
    <InlineDialog>
      <Text>
        <Strong>Selected text</Strong>
      </Text>
      <Text>{selectedText}</Text>
      {/* <Text>{data.length ? "Your data is ready" : "Fetching"}</Text> */}
      {/* <Button text="Fetch Data" onClick={async () => setData(await createDocFromTemplate())} /> */}
      {/* {data?.map((item:DataType) => (
        <Text>{ item.title}</Text>
      ))} */}
      {
        // data && data[0] && <Text>{ data[0].title }</Text>
      }
    </InlineDialog>
  );
};

export const run = render(
  <ContextMenu>
    <App />
  </ContextMenu>,
);
