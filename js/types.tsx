/**
 * 根导航器页面属性
 */
export type RootStackParamList = {
  Root: undefined;
  NotFound: undefined;
  User: { id?: string, name?: string };
  Login: undefined;
  Diary: undefined;
};

/**
 * Tab导航页面注册
 */
export type BottomTabParamList = {
  Home: undefined;
  My: undefined;

  TabOne: undefined;
  TabTwo: undefined;
};

export type HomeParamList = {
  HomeScreen: undefined;
};

export type MyParamList = {
  MyScreen: undefined;
};

export type TabOneParamList = {
  TabOneScreen: undefined;
};

export type TabTwoParamList = {
  TabTwoScreen: undefined;
};
