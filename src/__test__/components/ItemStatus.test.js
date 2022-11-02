import { render, screen, within } from "@testing-library/react-native";
import '@testing-library/react-native'
import * as eva from "@eva-design/eva";
import { ApplicationProvider } from "@ui-kitten/components";
import ItemStatus from "../../components/ItemStatus";


import "@testing-library/jest-dom/extend-expect";

describe('It renders', () => {
  it('renders successfully', () => {
    render(<ApplicationProvider {...eva} mapping={eva.mapping} theme={eva.light}>
      <ItemStatus />
    </ApplicationProvider>);
  })

  it('it renders text status', () => {
    const { getByText } =  render(<ApplicationProvider {...eva} mapping={eva.mapping} theme={eva.light}>
      <ItemStatus status={'Testing'}/>
    </ApplicationProvider>);

  expect(getByText('Testing')).toBeTruthy();
  })
})

