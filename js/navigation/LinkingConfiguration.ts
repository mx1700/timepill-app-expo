import * as Linking from 'expo-linking';

export default {
  // prefixes: [Linking.makeUrl('/')],
  prefixes: ['timepill://', 'http://localhost', 'https://timepill.net'],
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
              // MyScreen: 'my',
              MyScreen: {
                screens: {
                  Intro: "my/intro",
                  Diary: "my/diary",
                  Notebook: "my/notebook"
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
      Diary: "diaries/:id",
      Photo: 'photo',
      NotFound: '*',
    },
  },
};
