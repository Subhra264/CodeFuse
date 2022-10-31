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
  Form,
  Select,
  Option,
} from '@forge/ui';
import type { ContextMenuExtensionContext } from '@forge/ui';

import getCodeInfo from './utils/fetchCodeInfo';
import { translateLang } from './utils/translateLang';

const App = () => {
  const [result, setResult] = useState<string>('');
  const [lang, setLang] = useState<string>('');

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

  const translateSQL = async () => {
    const res = await getCodeInfo('sql-translate', code);
    setResult(res);
  };

  const handleTranslate = async ({ language }: { language: string }) => {
    const res = await translateLang({ code: code, toLang: language });
    setLang(language);
    setResult(res);
  };

  return (
    <InlineDialog>
      <Text>
        <Strong>Selected text:</Strong>
      </Text>
      <Text>{code}</Text>

      <ButtonSet>
        <Button text="Explain Code" onClick={explainCode} />
        <Button text="Calculate Time Complexity" onClick={calculateComplexity} />
        <Button text="SQL Translate" onClick={translateSQL} />
      </ButtonSet>

      <Text>
        <Strong>Code Language Translator</Strong>
      </Text>

      <Form onSubmit={handleTranslate}>
        <Select
          label="Convert to"
          name="language"
          description="Select the Language in which you want to convert"
        >
          <Option label="JavaScript" value="JavaScript" />
          <Option label="Python" value="Python" />
          <Option label="Haskell" value="Haskell" />
        </Select>
      </Form>

      {result && (
        <Fragment>
          <Text>
            <Strong>Result {lang && `in ${lang}`}:</Strong>
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
