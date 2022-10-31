import ForgeUI, {
  render,
  ContextMenu,
  InlineDialog,
  Text,
  Button,
  useState,
  Strong,
  useProductContext,
  Fragment,
  ButtonSet,
} from '@forge/ui';
import type { ContextMenuExtensionContext } from '@forge/ui';

import getCodeInfo from './utils/fetchCodeInfo';

const App = () => {
  const [result, setResult] = useState<string>('');

  const { extensionContext } = useProductContext();
  const selectedText = (extensionContext as ContextMenuExtensionContext).selectedText;

  const code = selectedText.replace(/^[0-9]+/gm, '').trim();

  const explainCode = async () => {
    const res = await getCodeInfo('code-explain', code);
    setResult(res);
  };

  const calculateComplexity = async () => {
    const res = await getCodeInfo('time-complexity', code);
    setResult(res);
  };

  return (
    <InlineDialog>
      <Text>
        <Strong>Selected text</Strong>
      </Text>
      <Text>{code}</Text>

      <ButtonSet>
        <Button text="Explain Code" onClick={explainCode} />
        <Button text="Calculate Time Complexity" onClick={calculateComplexity} />
        <Button text="Translate languages" onClick={async () => {}} />
        <Button text="SQL" onClick={async () => {}} />
      </ButtonSet>

      {result && (
        <Fragment>
          <Text>
            <Strong>Result</Strong>
          </Text>
          <Text>{result}</Text>
        </Fragment>
      )}
    </InlineDialog>
  );
};

export const run = render(
  <ContextMenu>
    <App />
  </ContextMenu>,
);
