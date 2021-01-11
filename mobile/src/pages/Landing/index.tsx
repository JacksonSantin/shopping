import React, { useEffect, useState } from 'react';

import { View, Image, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { BorderlessButton, RectButton } from 'react-native-gesture-handler';

import api from '../../services/api';

import styles from './styles';

import landingImg from '../../assets/images/shopping_128.png';
import studyIcon from '../../assets/images/icons/office-building.png';
import giveClassesIcon from '../../assets/images/icons/barcode.png';
import heartIcon from '../../assets/images/icons/heart.png';
import logOutIcon from '../../assets/images/icons/logout.png';
import userIcon from '../../assets/images/icons/user_32.png';
import { useAuth } from '../../contexts/auth';

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
        <Image source={userIcon} resizeMode="contain" />
      </BorderlessButton>
      <RectButton
            onPress={signOut}
            style={[styles.buttonLogout]}
          >
          <Image source={logOutIcon} />
          <Text style={styles.buttonTextLogout}>Sair</Text>
      </RectButton>
    </View>

      <Image source={landingImg} style={styles.banner} />
      <Text style={styles.textoImg}>SHOPPING</Text>

      <Text style={styles.title}>
        Seja bem-vindo, {'\n'}
        <Text style={styles.titleBold}>O que deseja visualizar?</Text>
      </Text>

      <View style={styles.buttonsContainer}>
        <RectButton
          onPress={handleNavigateToEstablishmentPages}
          style={[styles.button, styles.buttonPrimary]}
        >
          <Image source={studyIcon} />
          <Text style={styles.buttonText}>Estabelecimento</Text>
        </RectButton>
        <RectButton
          onPress={handleNavigateToGiveProductsPage}
          style={[styles.button, styles.buttonSecondary]}
        >
          <Image source={giveClassesIcon} />
          <Text style={styles.buttonText}>Produto</Text>
        </RectButton>
      </View>

      <View style={styles.footerContent}>
        <Text style={styles.totalConnections}>
          Total de {totalConnections} conexões já realizadas{' '}
          <Image source={heartIcon} />
        </Text>
        
        
      </View>
    </View>
  );
}

export default Landing;
