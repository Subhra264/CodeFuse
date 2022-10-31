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
    </InlineDialog>
  );
};

export const run = render(
  <ContextMenu>
    <App />
  </ContextMenu>,
);
