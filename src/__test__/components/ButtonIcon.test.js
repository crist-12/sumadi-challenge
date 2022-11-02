import { render, screen, within } from "@testing-library/react-native";
import '@testing-library/react-native'
import * as eva from "@eva-design/eva";
import { ApplicationProvider } from "@ui-kitten/components";
import ButtonIcon from "../../components/ButtonIcon";
import "@testing-library/jest-dom/extend-expect";

describe('It renders', () => {
  it('renders successfully', () => {
    render(<ApplicationProvider {...eva} mapping={eva.mapping} theme={eva.light}>
      <ButtonIcon />
    </ApplicationProvider>);
  })
  it('show the text', () => {
    const testWord = 'Testing';

    const { getByText } =  render(<ApplicationProvider {...eva} mapping={eva.mapping} theme={eva.light}>
      <ButtonIcon text={testWord} style={{flex: 1}} />
    </ApplicationProvider>);

  expect(getByText(testWord)).toBeTruthy();
  })
})

