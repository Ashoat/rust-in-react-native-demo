/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import type {PropsWithChildren} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  TextInput,
} from 'react-native';

import { Colors, Header } from 'react-native/Libraries/NewAppScreen';
import NativeTurboModule from './tm/NativeTurboModule';

type SectionProps = PropsWithChildren<{
  title: string;
}>;

function Section({children, title}: SectionProps): JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';
  return (
    <View style={styles.sectionContainer}>
      <Text
        style={[
          styles.sectionTitle,
          {
            color: isDarkMode ? Colors.white : Colors.black,
          },
        ]}>
        {title}
      </Text>
      <Text
        style={[
          styles.sectionDescription,
          {
            color: isDarkMode ? Colors.light : Colors.dark,
          },
        ]}>
        {children}
      </Text>
    </View>
  );
}

function App(): JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  const [firstInput, setFirstInput] = React.useState('');
  const [secondInput, setSecondInput] = React.useState('');

  const [addResult, setAddResult] = React.useState('');
  React.useEffect(() => {
    (async () => {
      const result = await NativeTurboModule.add(
        parseInt(firstInput),
        parseInt(secondInput),
      );
      setAddResult(result.toString());
    })();
  }, [firstInput, secondInput]);

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={backgroundStyle}>
        <Header />
        <View
          style={{
            backgroundColor: isDarkMode ? Colors.black : Colors.white,
          }}>
          <Section title="Cxx TurboModule">
            <View style={styles.textInputContainer}>
              <TextInput
                onChangeText={setFirstInput}
                value={firstInput}
                style={styles.textInput}
                placeholder="First number"
              />
              <TextInput
                onChangeText={setSecondInput}
                value={secondInput}
                style={styles.textInput}
                placeholder="Second number"
              />
            </View>
            <View style={styles.centerTextContainer}>
              <Text style={styles.centerText}>
                Sum = {addResult}
              </Text>
            </View>
          </Section>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  textInputContainer: {
    flexDirection: 'row',
  },
  textInput: {
    height: 40,
    width: '100%',
    flex: 1,
    borderWidth: 1,
    borderRadius: 4,
    margin: 8,
    padding: 8,
  },
  centerTextContainer: {
    width: '100%',
  },
  centerText: {
    textAlign: 'center',
    fontSize: 24,
  },
});

export default App;
