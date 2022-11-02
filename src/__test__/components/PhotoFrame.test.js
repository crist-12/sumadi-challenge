import { render, screen, within } from "@testing-library/react-native";
import '@testing-library/react-native'
import * as eva from "@eva-design/eva";
import { Text } from "@ui-kitten/components";
import { ApplicationProvider } from "@ui-kitten/components";
import PhotoFrame from "../../components/PhotoFrame";

import "@testing-library/jest-dom/extend-expect";

describe('It renders', () => {
  it('renders successfully', () => {
    render(<ApplicationProvider {...eva} mapping={eva.mapping} theme={eva.light}>
      <PhotoFrame />
    </ApplicationProvider>);
  })
})

