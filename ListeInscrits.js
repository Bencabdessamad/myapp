import React, { useState, useEffect } from 'react';
import { Linking } from 'react-native';
import { View, Text, StyleSheet, FlatList, ActivityIndicator, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import axios from 'axios';

const ListeInscrits = ({ route }) => {
  const { formationId, nomCour } = route.params;
  const [loading, setLoading] = useState(true);
  const [personnesInscrites, setPersonnesInscrites] = useState([]);
  const [selectedPersonne, setSelectedPersonne] = useState(null);

  useEffect(() => {
    const fetchPersonnesInscrites = async () => {
      try {
        const response = await axios.get('http://192.168.137.1:8080/cours/all');
        console.log('Données récupérées depuis l\'API :', response.data);
        const personnes = response.data.filter(personne => personne.nom_cour === nomCour);
        console.log('Personnes inscrites à la formation', nomCour, ':', personnes);
        setPersonnesInscrites(personnes);
        setLoading(false);
      } catch (error) {
        console.error('Erreur lors de la récupération des personnes inscrites:', error);
        setLoading(false);
      }
    };

    fetchPersonnesInscrites();
  }, [nomCour]);

  const handlePersonneClick = (personne) => {
    setSelectedPersonne(personne);
  };

  const handleCall = () => {
    const phoneNumber = selectedPersonne.phone; // Supposons que vous ayez un champ "phone" dans votre objet "selectedPersonne"
    if (phoneNumber) {
      Linking.openURL(`tel:${phoneNumber}`);
    } else {
      console.log('Numéro de téléphone non disponible');
    }
  };
  
  const handleSMS = () => {
    const phoneNumber = selectedPersonne.phone; // Supposons que vous ayez un champ "phone" dans votre objet "selectedPersonne"
    if (phoneNumber) {
      Linking.openURL(`sms:${phoneNumber}`);
    } else {
      console.log('Numéro de téléphone non disponible');
    }
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="blue" />
        <Text style={styles.loadingText}>Chargement...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Liste des personnes inscrites à la formation {nomCour}:</Text>
      <FlatList
        data={personnesInscrites}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => handlePersonneClick(item)}>
            <View style={styles.personneContainer}>
              <Text style={styles.personneText}>{item.nom_persone} {item.prenom_persone}</Text>
            </View>
          </TouchableOpacity>
        )}
      />
      {selectedPersonne && (
        <View style={styles.detailsContainer}>
          <Text style={styles.detailsText}>{selectedPersonne.nom_persone} {selectedPersonne.prenom_persone}</Text>
          <View style={styles.iconsContainer}>
            <TouchableOpacity onPress={handleCall}>
              <Ionicons name="call" size={24} color="green" />
            </TouchableOpacity>
            <TouchableOpacity onPress={handleSMS}>
              <Ionicons name="chatbox" size={24} color="blue" />
            </TouchableOpacity>
          </View>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
  },
  personneContainer: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 15,
    marginBottom: 10,
  },
  personneText: {
    fontSize: 16,
  },
  detailsContainer: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 15,
    marginTop: 20,
  },
  detailsText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  iconsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

export default ListeInscrits;
