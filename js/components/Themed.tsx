import * as React from 'react';
import {
  Text as DefaultText,
  View as DefaultView,
  ActivityIndicator as DefaultActivityIndicator,
  StyleSheet
} from 'react-native';
import { Input as DefaultInput, Button as DefaultButton, Divider as DefaultDivider } from "react-native-elements";
import { Ionicons as DefaultIonicons,  } from '@expo/vector-icons';
import { Fontisto as DefaultFontisto } from '@expo/vector-icons';

import Colors from '../constants/Colors';
import useColorScheme from '../hooks/useColorScheme';
import {IconProps} from "@expo/vector-icons/build/createIconSet";
// @ts-ignore
import Touchable from './touchable';

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

export function Container(props: ViewProps) {
  const { style, lightColor, darkColor, ...otherProps } = props;
  const backgroundColor = useThemeColor({ light: lightColor, dark: darkColor }, 'background');

  return <DefaultView style={[{ backgroundColor, flex: 1, height: 1 }, style]} {...otherProps} />;
}

export function View(props: ViewProps) {
  const { style, lightColor, darkColor, ...otherProps } = props;
  const backgroundColor = useThemeColor({ light: lightColor, dark: darkColor }, 'background');

  return <DefaultView style={[{ backgroundColor }, style]} {...otherProps} />;
}

export function Input(props: ThemeProps & DefaultInput['props']) {
  const { style, lightColor, darkColor, inputStyle, containerStyle, ...otherProps } = props;
  const color = useThemeColor({ light: lightColor, dark: darkColor }, 'text');

  return (<DefaultInput
    style={style}
    inputStyle={[{color:color},inputStyle]}
    errorStyle={{display:"none"}}
    containerStyle={[{marginBottom: 10},containerStyle]}
    {...otherProps}
  />);
}

export function Button(props: ThemeProps & DefaultButton['props']) {
  const {style, lightColor, darkColor, buttonStyle, type, ...otherProps} = props;
  const color = useThemeColor({light: lightColor, dark: darkColor}, 'primary');

  const colorStyle = type != 'outline' ? {backgroundColor: color} : {borderColor: color, borderWidth: 1}
  return (<DefaultButton
    style={style}
    type={type}
    buttonStyle={[colorStyle, localStyle.button, buttonStyle]}
    {...otherProps}
  />);
}

export function Ionicons(props: ThemeProps & IconProps<string>) {
  // return <DefaultIonicons name="md-checkmark-circle" size={32} color="green" />
  const { lightColor, darkColor, ...otherProps } = props;
  const color = useThemeColor({ light: lightColor, dark: darkColor }, 'text');
  return (<DefaultIonicons color={color} {...otherProps} />)
}

export function Fontisto(props: ThemeProps & IconProps<string>) {
  const { lightColor, darkColor, ...otherProps } = props;
  const color = useThemeColor({ light: lightColor, dark: darkColor }, 'text');
  return (<DefaultFontisto color={color} {...otherProps} />)
}

export function HeadIcon(props: ThemeProps & IconProps<string>) {
  const { lightColor, darkColor, ...otherProps } = props;
  const color = useThemeColor({ light: lightColor, dark: darkColor }, 'text');
  return (
      <Ionicons size={24} color={color} style={{paddingVertical: 10, paddingHorizontal: 16}} {...otherProps}/>
    )
}

export function ActivityIndicator(props: ThemeProps & DefaultActivityIndicator['props']) {
  const { lightColor, darkColor, ...otherProps } = props;
  const color = useThemeColor({ light: lightColor, dark: darkColor }, 'primary');
  return (<DefaultActivityIndicator color={color} {...otherProps}/>);
}

export function Divider(props: ThemeProps & DefaultDivider['props']) {
  const { lightColor, darkColor, style, ...otherProps } = props;
  const color = useThemeColor({ light: lightColor, dark: darkColor }, 'divider');
  return (<DefaultDivider style={[{backgroundColor: color}, style]} />);
}

const localStyle = StyleSheet.create({
  button: {
    borderRadius: 999,
    paddingVertical: 10,
    paddingHorizontal: 15,
    marginHorizontal: 8,
  }
});