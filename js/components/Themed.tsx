import * as React from 'react';
import { Text as DefaultText, View as DefaultView } from 'react-native';
import { Input as DefaultInput, Button as DefaultButton } from "react-native-elements";

import Colors from '../constants/Colors';
import useColorScheme from '../hooks/useColorScheme';

export function useThemeColor(
  props: { light?: string; dark?: string },
  colorName: keyof typeof Colors.light & keyof typeof Colors.dark
) {
  const theme = useColorScheme();
  const colorFromProps = props[theme];

  if (colorFromProps) {
    return colorFromProps;
  } else {
    return Colors[theme][colorName];
  }
}

type ThemeProps = {
  lightColor?: string;
  darkColor?: string;
};

export type TextProps = ThemeProps & DefaultText['props'];
export type ViewProps = ThemeProps & DefaultView['props'];

export function Text(props: TextProps) {
  const { style, lightColor, darkColor, ...otherProps } = props;
  const color = useThemeColor({ light: lightColor, dark: darkColor }, 'text');

  return <DefaultText style={[{ color }, style]} {...otherProps} />;
}

export function View(props: ViewProps) {
  const { style, lightColor, darkColor, ...otherProps } = props;
  const backgroundColor = useThemeColor({ light: lightColor, dark: darkColor }, 'background');

  return <DefaultView style={[{ backgroundColor }, style]} {...otherProps} />;
}

export function Input(props: ThemeProps & DefaultInput['props']) {
  const { style, lightColor, darkColor, ...otherProps } = props;
  const color = useThemeColor({ light: lightColor, dark: darkColor }, 'text');

  return <DefaultInput style={style} inputStyle={{color:color}} {...otherProps} />;
}

export function Button(props: ThemeProps & DefaultButton['props']) {
  const { style, lightColor, darkColor, buttonStyle, ...otherProps } = props;
  const color = useThemeColor({ light: lightColor, dark: darkColor }, 'primary');

  return (<DefaultButton
    style={style}
    buttonStyle={[{backgroundColor:color, borderRadius: 999}, buttonStyle]}
    {...otherProps} />);
}
