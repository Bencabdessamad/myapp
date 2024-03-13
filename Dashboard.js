import React from 'react';
import { View, Text, ScrollView, Pressable, Button, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const formations = [
  { id: 1, titre: 'Formation Java', description: 'Formation avancée sur le langage de programmation Java...' },
  { id: 2, titre: 'Formation C++', description: 'Formation complète sur le langage de programmation C++ ...' },
  { id: 3, titre: 'Formation Python', description: 'Formation approfondie sur le langage de programmation Python...' },
  { id: 4, titre: 'Formation C', description: 'Formation approfondie sur le langage de programmation C...' },
  { id: 5, titre: 'Formation Js', description: 'Formation approfondie sur le langage de programmation Js...' },
];

const Dashboard = () => {
  const navigation = useNavigation();

  const handleInscription = (formationId, nomCour) => {
    console.log('Nom du cours:', nomCour);
    navigation.navigate('FormulaireInscription', { formationId, nomCour });
  };

  const handleVoirInscrits = (formationId, nomCour) => {
    // Vérifier si le nom du cours correspond à l'un des noms exacts dans la base de données
    const coursExacts = ['Java', 'Formation Java', 'Formation C++', 'Formation Python', 'Formation C','Formation Js'];
    if (coursExacts.includes(nomCour)) {
      navigation.navigate('ListeInscrits', { formationId, nomCour });
    } else {
      console.error('Le nom du cours ne correspond à aucun cours dans la base de données.');
    }
  };

  const handleLogout = () => {
    navigation.navigate('Login');
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {formations.map(formation => (
        <View key={formation.id} style={styles.card}>
          <Text style={styles.titre}>{formation.titre}</Text>
          <Text style={styles.description}>{formation.description}</Text>
          <View style={styles.buttonContainer}>
            <Pressable style={styles.button} onPress={() => handleInscription(formation.id, formation.titre)}>
              <Text style={styles.buttonText}>S'inscrire</Text>
            </Pressable>
            <Pressable style={styles.button} onPress={() => handleVoirInscrits(formation.id, formation.titre)}>
              <Text style={styles.buttonText}>Voir les inscrits</Text>
            </Pressable>
          </View>
        </View>
      ))}
      <View style={styles.logoutContainer}>
        <Button title="Déconnexion" onPress={handleLogout} />
      </View>
    </ScrollView>
  );
};


const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    alignItems: 'center',
    paddingVertical: 20,
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    marginVertical: 10,
    padding: 15,
    width: '80%',
  },
  titre: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  description: {
    fontSize: 16,
    marginBottom: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  button: {
    backgroundColor: 'blue',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    alignSelf: 'flex-end',
  },
  buttonText: {
    color: 'white',
    fontSize: 14,
  },
  logoutContainer: {
    marginTop: 20,
  },
});

export default Dashboard;
