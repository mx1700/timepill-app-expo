/**
 * 根导航器页面属性
 */
export type RootStackParamList = {
  Root: undefined;
  NotFound: undefined;
  User: { id: String };
  Login: undefined;
  Diary: undefined;
};

/**
 * Tab导航页面注册
 */
export type BottomTabParamList = {
  Home: undefined;
  TabOne: undefined;
  TabTwo: undefined;
};

export type HomeParamList = {
  HomeScreen: undefined;
};

export type TabOneParamList = {
  TabOneScreen: undefined;
};

export type TabTwoParamList = {
  TabTwoScreen: undefined;
};
