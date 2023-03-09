import * as React from 'react-native';
import { Switch, useTheme } from 'react-native-paper';

export function LightDarkButton({ toggle }) {
  const theme = useTheme();

  return (
    <Switch value={theme.dark} onValueChange={toggle} />
    // <ToggleButton.Row value="left" onValueChange={toggleTheme}>
    //   <ToggleButton icon="flashlight" value="left" />
    //   <ToggleButton icon="flashlight-off" value="right" />
    // </ToggleButton.Row>
  );
}

//export default LightDarkButton;
