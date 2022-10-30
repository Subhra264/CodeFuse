import ForgeUI, {
  render,
  ContextMenu,
  InlineDialog,
  Text,
  Button,
  useState,
  Strong,
  useProductContext,
  useEffect,
  Fragment,
  ButtonSet,
} from '@forge/ui';

import { fetch } from '@forge/api';

const createDocFromTemplate = async () => {
  return fetch('https://1d25-202-142-71-153.ngrok.io')
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
  const [result, setResult] = useState<string>('');

  const {
    // @ts-ignore
    extensionContext: { selectedText },
  } = useProductContext();

  const explainCode = async () => {
    const response_ = await fetch('https://1d25-202-142-71-153.ngrok.io', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        code: selectedText
      })
    });

    const response = await response_.json();
    console.log('Response', response)
    const explanation = response?.message.length && response?.message[0].text;

    setResult(explanation);
  }

  return (
    <InlineDialog>
      <Text>
        <Strong>Selected text</Strong>
      </Text>
      <Text>{selectedText}</Text>

      <ButtonSet>
        <Button text="Explain Code" onClick={explainCode} />
        <Button text="Calculate Time Complexity" onClick={async () => {}} />
        <Button text="Translate languages" onClick={async () => {}} />
        <Button text="SQL" onClick={async () => {}} />
      </ButtonSet>

      {
        result && (
          <Fragment>
            <Text>
              <Strong>Result</Strong>
            </Text>
            <Text>{result}</Text>
          </Fragment>
        )
      }

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
