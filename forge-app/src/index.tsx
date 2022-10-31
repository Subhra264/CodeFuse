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
import getCodeInfo from './utils/fetchCodeInfo';

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
    const explanation = await getCodeInfo('code-explain', selectedText);
    setResult(explanation);
  }

  const calculateComplexity = async () => {
    const explanation = await getCodeInfo('time-complexity', selectedText);
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
        <Button text="Calculate Time Complexity" onClick={calculateComplexity} />
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
