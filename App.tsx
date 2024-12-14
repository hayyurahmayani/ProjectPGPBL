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
  TouchableOpacity,
  Linking,
  Image,
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

type SectionProps = PropsWithChildren<{
  title: string;
  secondaryDescription?: string; // Properti opsional untuk deskripsi kedua
}>;

function Section({children, title, secondaryDescription}: SectionProps): React.JSX.Element {
  return (
    <View style={styles.sectionContainer}>
      <Text
        style={[
          styles.sectionTitle,
          {
            color: 'brown',
            fontSize: 20,
          },
        ]}>
        {title}
      </Text>

      {/* Deskripsi utama */}
      <Text
        style={[
          styles.sectionDescription,
          {
            color: 'green',
            textAlign: 'justify',
            fontSize: 15,
          },
        ]}>
        {children}
      </Text>

      {/* Deskripsi kedua, jika ada */}
      {secondaryDescription && (
        <Text
          style={[
            styles.secondaryDescription,
            {
              color: 'green',
              textAlign: 'justify',
              fontSize: 15,
              marginTop: 10,
            },
          ]}>
          {secondaryDescription}
        </Text>
      )}

      {/* Garis pembatas */}
      <View style={styles.divider} />
    </View>
  );
}

function App(): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : '#fffaf0', // Warna latar belakang
  };

  // Fungsi untuk menangani klik email
  const handleEmailPress = () => {
    const email = 'hayyurahmayanipuspitasari0703@mail.ugm.ac.id'; // Alamat email
    const subject = 'Hello Developer';
    const body = 'I have some questions about your app.';
    const mailtoLink = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    Linking.openURL(mailtoLink).catch(err => console.error('Error opening mail link:', err));
  };

  return (
    <SafeAreaView style={[styles.container, backgroundStyle]}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={[styles.container, backgroundStyle]}>
        <Header />
        <View style={backgroundStyle}>
          <Section title="About VonTaIn 🌋">
            The <Text style={styles.highlight}>VonTaIn</Text> application provides 
            comprehensive data and maps of Indonesian volcanoes, including their current activity status. 
            Designed to enhance awareness and support disaster management, VonTaIn offers real-time updates, 
            detailed profiles of each volcano, and visualization tools for better 
            understanding volcanic activity across the archipelago.
          </Section>
          
          <Section title="Tutorial 📚">
  <Image source={require('./data/tutorial.png')} style={{width: 350, height: 400}} />
</Section>


          <Section title="More Information 🕵️">
            In order to access <Text style={styles.highlight}>more detailed information</Text>, please visit the following link. 
          </Section>
          <LearnMoreLinks />

          {/* Footnote Section */}
          <View style={styles.footnoteContainer}>
            <Text style={styles.footnote}>
              <Text style={styles.footnoteTitle}>Developer Information:</Text>{'\n'}
              Hayyu Rahmayani Puspitasari{'\n'}
              22/497739/SV/21157{'\n'}
              Contact: {'\n'}
              <TouchableOpacity onPress={handleEmailPress}>
                <Text style={styles.link}>✉️ hayyurahmayanipuspitasari0703@mail.ugm.ac.id</Text>
              </TouchableOpacity>
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fffaf0', // Warna latar belakang utama
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
    backgroundColor: '#fffaf0', // Warna latar belakang setiap section
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    borderWidth: 2,
    borderColor: 'brown',
    padding: 8,
    borderRadius: 5,
    marginBottom: 0,
  },
  divider: {
    height: 2,
    backgroundColor: 'lightblue',
    marginTop: 10,
    marginBottom: -20,
    width: '100%',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
    borderWidth: 1,
    borderColor: 'green',
    padding: 10,
    borderRadius: 5,
    backgroundColor: '#fffaf0',
  },
  secondaryDescription: {
    fontSize: 16,
    fontWeight: '400',
    borderWidth: 1,
    borderColor: 'lightsalmon',
    padding: 10,
    borderRadius: 5,
    backgroundColor: '#fffaf0',
  },
  highlight: {
    fontWeight: '700',
  },
  footnoteContainer: {
    marginTop: 20,
    marginBottom: 70,
    paddingHorizontal: 24,
    borderTopWidth: 1,
    borderTopColor: 'lightgray',
    paddingTop: 10,
    padding: 20,
    backgroundColor: '#fffaf0', // Latar belakang footnote
  },
  footnote: {
    fontSize: 10,
    color: 'gray',
    textAlign: 'center',
  },
  link: {
    color: 'blue',
    textDecorationLine: 'underline',
    fontSize: 10,
  },
  footnoteTitle: {
    fontWeight: 'bold',
    fontSize: 12,
  },
});

export default App;
