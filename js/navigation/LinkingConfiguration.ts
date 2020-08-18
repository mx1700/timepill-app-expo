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
                  Intro: "my/intro"
                }
              },
            },
          },
        },
      },
      User: 'users',
      Login: 'login',
      Diary: 'diary',
      NotFound: '*',
    },
  },
};
