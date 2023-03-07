import React from 'react';
import { Text, View } from 'react-native';
import ThemeManager, { themable } from 'react-themable';

const Button = (props, context) => {
  // if you are not using a pure funciton,
  // you access the theme via this.context.theme
  themeManager.setTheme(context.theme);
  const { styles } = themeManager;

  return (
    <View style={styles.view}>
      <Text style={styles.text}>{props.children}</Text>
    </View>
  );
};

const themeManager = new ThemeManager();

// simple mode -- styles applied only on blue theme
themeManager.create('blue', {
  text: { color: '#5685ee' },
});

// if I dont pass a theme, styles will be applied globally.
// variables will still get the correspondent theme value.
// you can also specify the themes as an array at the first argument (e.g. ['dark', 'light'])
themeManager.create({
  view: { height: 100, backgroundColor: '$backgroundColor' },
  text: {
    fontSize: '$fontSize',
    textAlign: 'center',
    marginTop: 40,
    color: '$textColor',
  },
});

export default themable(Button);
