import { render, screen, within } from "@testing-library/react-native";
import '@testing-library/react-native'
import * as eva from "@eva-design/eva";
import { ApplicationProvider } from "@ui-kitten/components";
import Header from "../../components/Header";
import "@testing-library/jest-dom/extend-expect";

describe('It renders', () => {
  it('renders successfully', () => {
    render(<ApplicationProvider {...eva} mapping={eva.mapping} theme={eva.light}>
        <Header />
      </ApplicationProvider>);
  })
  it('show header text', () => {
    const testWord = 'Sumadi Test App';

    const { getByText } =  render(<ApplicationProvider {...eva} mapping={eva.mapping} theme={eva.light}>
      <Header/>
    </ApplicationProvider>);

  expect(getByText(testWord)).toBeTruthy();
  })
  it('it renders battery item status', () => {
    const testWord = 'batteryIconStatus';
    const { getByTestId } =  render(<ApplicationProvider {...eva} mapping={eva.mapping} theme={eva.light}>
      <Header/>
    </ApplicationProvider>);

  expect(getByTestId(testWord)).toBeTruthy();
  })

  it('it renders battery and internet item status', () => {
    const testWord = 'networkIconStatus';
    const { getByTestId } =  render(<ApplicationProvider {...eva} mapping={eva.mapping} theme={eva.light}>
      <Header/>
    </ApplicationProvider>);

  expect(getByTestId(testWord)).toBeTruthy();
  })

})

