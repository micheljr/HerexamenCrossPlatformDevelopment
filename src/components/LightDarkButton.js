import * as React from 'react-native';
import { ToggleButton } from 'react-native-paper';

export const LightDarkButton = ({ toggleTheme }) => (
  <ToggleButton.Row value="left" onValueChange={toggleTheme}>
    <ToggleButton icon="flashlight" value="left" />
    <ToggleButton icon="flashlight-off" value="right" />
  </ToggleButton.Row>
);

//export default LightDarkButton;