import * as Linking from 'expo-linking';

export default {
  // prefixes: [Linking.makeUrl('/')],
  prefixes: ['timepill://', 'http://localhost', 'http://timepill.net'],
  config: {
    screens: {
      Root: {
        screens: {
          Home: {
            screens: {
              HomeScreen: 'home',
            },
          },
          TabOne: {
            screens: {
              TabOneScreen: 'one',
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
      Login: 'login',
      Diary: 'diary',
      NotFound: '*',
    },
  },
};
