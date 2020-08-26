import * as Linking from 'expo-linking';

export default {
  // prefixes: [Linking.makeUrl('/')],
  prefixes: ['timepill://', 'https://timepill.net'],
  config: {
    screens: {
      Root: {
        screens: {
          Home: {
            screens: {
              HomeScreen: 'home',
            },
          },
          Follow: {
            screens: {
              FollowScreen: 'follow',
            },
          },
          TabTwo: {
            screens: {
              TabTwoScreen: 'two',
            },
          },
          My: {
            screens: {
              MyScreen: {
                path: 'my',
                screens: {
                  Intro: "intro",
                  Diary: "diary",
                  Notebook: "notebook"
                }
              },
            },
          },
        },
      },
      User: {
        path: "user/:id",
        screens: {
          Intro: "intro",
          Diary: "diary",
          Notebook: "notebook"
        }
      },
      Login: "login",
      Diary: "diaries/:id/detail",  //必须在id参数后边再增加一层目录,否则在页面刷新的时候id会丢失,原因不明
      Photo: 'photo',
      NotFound: '*',
    },
  },
};
