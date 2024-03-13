import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import axios from 'axios';

const CourseForm = ({ route, navigation }) => {
  const [nomCours, setNomCours] = useState('');
  const [nomPersonne, setNomPersonne] = useState('');
  const [prenomPersonne, setPrenomPersonne] = useState('');
  const [prenomphone, setPrenomphone] = useState('');
  const [dateDepart, setDateDepart] = useState('');
  const [enLigne, setEnLigne] = useState(false);
  const [inscriptionSuccess, setInscriptionSuccess] = useState(false);

  useEffect(() => {
    if (route.params && route.params.nomCour) {
      setNomCours(route.params.nomCour);
    }
  }, [route.params]);

  const handleFormSubmit = async () => {
    // Vérifier si tous les champs obligatoires sont remplis
    if (!nomPersonne || !prenomPersonne || !prenomphone || !dateDepart) {
      Alert.alert('Champs obligatoires', 'Veuillez remplir tous les champs obligatoires.');
      return;
    }

    try {
      const response = await axios.post('http://192.168.137.1:8080/cours/create', {
        nom_cour: nomCours,
        nom_persone: nomPersonne,
        prenom_persone: prenomPersonne,
        phone: prenomphone,
        dateDepart: dateDepart,
        enLigne: enLigne
      });
      console.log('Cours créé avec succès:', response.data);
      navigation.navigate('Dashboard');
    } catch (error) {
      console.error('Erreur lors de la création du cours:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Nom du cours:</Text>
      <TextInput
        style={[styles.input, { backgroundColor: '#f0f0f0' }]}
        value={nomCours}
        onChangeText={setNomCours}
        editable={false}
      />
      <Text style={styles.label}>Nom de la personne:</Text>
      <TextInput
        style={styles.input}
        value={nomPersonne}
        onChangeText={setNomPersonne}
      />
      <Text style={styles.label}>Prénom de la personne:</Text>
      <TextInput
        style={styles.input}
        value={prenomPersonne}
        onChangeText={setPrenomPersonne}
      />
      <Text style={styles.label}>Phone:</Text>
      <TextInput
        style={styles.input}
        value={prenomphone}
        onChangeText={setPrenomphone}
      />
      <Text style={styles.label}>Date de départ:</Text>
      <TextInput
        style={styles.input}
        value={dateDepart}
        onChangeText={setDateDepart}
      />
      <View style={styles.checkboxContainer}>
        <Text style={styles.label}>En ligne:</Text>
        <Button
          title={enLigne ? 'Oui' : 'Non'}
          onPress={() => setEnLigne(!enLigne)}
        />
      </View>
      <Button
        title="S'inscrire au cours"
        onPress={handleFormSubmit}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  successMessage: {
    alignItems: 'center',
    marginTop: 20,
  },
  successText: {
    fontSize: 18,
    marginBottom: 10,
  },
});

export default CourseForm;
