import { Switch, StyleSheet, Text, View, KeyboardAvoidingView, TextInput, Image, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { useSelector } from 'react-redux';
import React from 'react';

import AppLoading  from 'expo-app-loading';
import { useFonts } from '@use-expo/font';



const PlaceholderImage = require("../../assets/Vector.png");


export default function SettingsScreen({ navigation }) {

  const user = useSelector((state) => state.user.value);


  // Controle des switchs
  const [isEnabled, setIsEnabled] = React.useState(false);
  const [isReadyToAccomodate, setisReadyToAccomodat] = React.useState(false);
  const [isReadyToLift, setisReadyToLift] = React.useState(false);
  const [isReadyToAssist, setisReadyToAssist] = React.useState(false);

  const [isLoaded] = useFonts({
    'OpenSans': require("../../assets/OpenSans/OpenSans-Regular.ttf"),
    'Raleway': require('../../assets/Raleway/static/Raleway-Regular.ttf')
    });
  if(!isLoaded) {
    return <AppLoading />
  }
  return (
    <SafeAreaView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <View style={styles.topprofilContainer}>
        <View>
          <Text style={styles.profilName}> User Name {user.email}</Text>
        </View>
        <View>
          <Image source={PlaceholderImage} style={styles.profilePic}></Image>
        </View>

      </View>

      <View style={styles.profilContainer}>
        <Text style={styles.title}>Mon profil</Text>

        <View style={styles.readytohelpcontainer}>
          <View>
            <Switch
              value={isEnabled}
              onValueChange={(value) => setIsEnabled(value)}
              trackColor={{ false: "#E6EBE0", true: "#5CA4A9" }}
              thumbColor={isEnabled ? "white" : "white"}
              ios_backgroundColor="#e5eadf"
              style={{ transform: [{ scaleX: 1.0 }, { scaleY: 1.0 }] }} />

          </View>
          <View>
            <Text style={styles.subtitle}>     Je suis disponible pour aider</Text>
          </View>
        </View>
        <View style={styles.lineStyle} />

        <View style={styles.optionhelpcontainer}>

          <View>
            <Text style={styles.subtitle}>HEBERGEMENT                                 </Text>
          </View>

          <View>
            <Switch
              value={isReadyToAccomodate}
              onValueChange={(value) => setisReadyToAccomodat(value)}
              trackColor={{ false: "#E6EBE0", true: "#5CA4A9" }}
              thumbColor={isReadyToAccomodate ? "white" : "white"}
              ios_backgroundColor="#e5eadf"
              style={{ transform: [{ scaleX: 1.0 }, { scaleY: 1.0 }] }} />
          </View>

        </View>
        <Text style={styles.smallText} > Je peux héberger une personne en cas d'urgence</Text>


        <View style={styles.optionhelpcontainer}>

          <View>
            <Text style={styles.subtitle}>TRANSPORT                                      </Text>
          </View>

          <View>
            <Switch
              value={isReadyToLift}
              onValueChange={(value) => setisReadyToLift(value)}
              trackColor={{ false: "#E6EBE0", true: "#5CA4A9" }}
              thumbColor={isReadyToLift ? "white" : "white"}
              ios_backgroundColor="#e5eadf"
              style={{ transform: [{ scaleX: 1.0 }, { scaleY: 1.0 }] }} />
          </View>

        </View>
        <Text style={styles.smallText}> Je peux véhiculer une personne en cas d'urgence</Text>


        <View style={styles.optionhelpcontainer}>

          <View>
            <Text style={styles.subtitle}>ACCOMPAGNEMENT                        </Text>
          </View>

          <View>
            <Switch
              value={isReadyToAssist}
              onValueChange={(value) => setisReadyToAssist(value)}
              trackColor={{ false: "#E6EBE0", true: "#5CA4A9" }}
              thumbColor={isReadyToAssist ? "white" : "white"}
              ios_backgroundColor="#e5eadf"
              style={{ transform: [{ scaleX: 1.0 }, { scaleY: 1.0 }] }} />
          </View>

        </View>
        <Text style={styles.smallText} > Je peux assister une personne en cas d'urgence</Text>

      </View>

      <View style={styles.lineStyle} />






      <View style={styles.userBadgeContainer}>
        <Text style={styles.subtitle}> MES BADGES :</Text>

        <View style={styles.badgeContainer}>
          <FontAwesome name='trophy' size={40} color='green' />
          <FontAwesome name='trophy' size={40} color='blue' />
          <FontAwesome name='trophy' size={40} color='purple' />
          <FontAwesome name='trophy' size={40} color='gold' />
        </View>
      </View>

    </SafeAreaView>


  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'center',
  },

  topprofilContainer: {
    flex: 1,
    //backgroundColor: '#ccc',
    alignItems: 'center',
    justifyContent: 'center',
    width: '90%',
    flexDirection: 'row',
  },

  profilePic: {
    width: 40,
    height: 40,
  },

  profilName: {
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'left',
    width: 300,
  }
  ,
  profilContainer: {
    flex: 4,
    // backgroundColor: 'green',
    alignItems: 'center',
    justifyContent: 'space-around',
    width: '90%',
  },

  readytohelpcontainer: {
    height: 50,
    flexDirection: 'row',
    //backgroundColor: 'red',
    width: '90%',

  },

  optionhelpcontainer: {
    height: 30,
    flexDirection: 'row',
    // backgroundColor: 'yellow',
    width: '90%',
  },

  userBadgeContainer: {
    flex: 1,
    // backgroundColor: 'grey',
    alignItems: 'center',
    justifyContent: 'center',
    width: '90%',

  },

  badgeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    margin: 10,
    //backgroundColor: 'grey',
    width: '50%',
  },

  image: {
    width: '100%',
    height: '50%',
  },
  title: {
    width: '80%',
    fontSize: 38,
    fontWeight: '600',
    textAlign: 'center',
  },

  subtitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#5CA4A9',

  },

  smallText: {
    fontSize: 14,
    margin: 0,
    textAlign: 'left',
    backgroundColor: 'white',
    width: '90%',

  },

  input: {
    width: '80%',
    marginTop: 25,
    borderBottomColor: '#EC6E5B',
    borderBottomWidth: 1,
    fontSize: 20,
  },
  button: {
    display: 'flex',
    alignItems: 'center',
    paddingTop: 8,
    width: '80%',
    marginTop: 30,
    backgroundColor: 'blue',
    borderRadius: 10,
    marginBottom: 80,
  },
  textButton: {
    color: '#ffffff',
    height: 30,
    fontWeight: '600',
    fontSize: 16,
  },

  lineStyle: {
    borderWidth: 0.5,
    width: '80%',
    borderColor: 'black',
    margin: 10,

  },
});