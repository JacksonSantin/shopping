import React, { useEffect, useState } from 'react';

import { View, Image, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { BorderlessButton, RectButton } from 'react-native-gesture-handler';

import api from '../../services/api';

import styles from '../../assets/pages/stylesLanding';

import landingImg from '../../assets/images/shopping_128.png';
import establishmentIcon from '../../assets/images/icons/office-building.png';
import productsIcon from '../../assets/images/icons/barcode.png';
import heartIcon from '../../assets/images/icons/heart.png';
import { useAuth } from '../../contexts/auth';
import { Feather } from '@expo/vector-icons';

function Landing() {
  const { navigate } = useNavigation();
  const [totalConnections, setTotalConnections] = useState(0);
  const { signOut } = useAuth();

  useEffect(() => {
    api.get('conexoes').then((response) => {
      const { total } = response.data;

      setTotalConnections(total);
    });
  }, []);

  function handleNavigateToGiveProductsPage() {
    navigate('Products');
  }

  function handleNavigateToEstablishmentPages() {
    navigate('Establishment');
  }

  function handleUserCad() {
    navigate('Usercad');
  }


  return (
    <View style={styles.container}>

      <View style={styles.infoTop}>
        <BorderlessButton onPress={handleUserCad}>
          <Feather name="user" size={26} color="#FCA311" />
        </BorderlessButton>
        <RectButton
          onPress={signOut}
          style={[styles.buttonLogout]}
        >
          <Feather name="log-out" size={20} color="#FCA311" />
          <Text style={styles.buttonTextLogout}>Sair</Text>
        </RectButton>
      </View>

      <Image source={landingImg} style={styles.banner} />
      <Text style={styles.textoImg}>SHOPPING</Text>

      <Text style={styles.title}>
        Bem-vindo de volta!
      </Text>

      <View style={styles.buttonsContainer}>
        <RectButton
          onPress={handleNavigateToEstablishmentPages}
          style={[styles.button, styles.buttonPrimary]}
        >
          <Image source={establishmentIcon} />
          <Text style={styles.buttonText}>Estabelecimento</Text>
        </RectButton>
        <RectButton
          onPress={handleNavigateToGiveProductsPage}
          style={[styles.button, styles.buttonSecondary]}
        >
          <Image source={productsIcon} />
          <Text style={styles.buttonText}>Produto</Text>
        </RectButton>
      </View>

      <View style={styles.footerContent}>
        <Text style={styles.totalConnections}>
          Total de {totalConnections} conexões já realizadas{' '}
          <Feather name="heart" size={12} color="#FCA311" />
        </Text>


      </View>
    </View>
  );
}

export default Landing;
