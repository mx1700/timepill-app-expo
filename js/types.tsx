/**
 * 根导航器页面属性
 */
export type RootStackParamList = {
  Root: undefined;
  NotFound: undefined;
  User: { id?: string, name?: string };
  Login: undefined;
  Diary: { id?: string };
  Photo: { url: String }
};

/**
 * Tab导航页面注册
 */
export type BottomTabParamList = {
  Home: undefined;
  Follow: undefined;
  My: undefined;
  TabTwo: undefined;
};

export type HomeParamList = {
  HomeScreen: undefined;
};

export type MyParamList = {
  MyScreen: undefined;
};

export type FollowParamList = {
  FollowScreen: undefined;
};

export type TabTwoParamList = {
  TabTwoScreen: undefined;
};
