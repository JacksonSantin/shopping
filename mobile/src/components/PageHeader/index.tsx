import React from "react";
import { View, Text } from "react-native";
import { BorderlessButton } from "react-native-gesture-handler";

import { Feather } from '@expo/vector-icons';
import { useNavigation } from "@react-navigation/native";

import styles from '../../assets/components/stylesPageHeader';

interface HeaderProps {
  title: string;
  showCancel?: boolean;
  showGoBack?: boolean;
}

export default function Header({ title, showCancel = true, showGoBack = true }: HeaderProps) {

  const navigation = useNavigation();

  function handleGoBackToAppHomePage() {
    navigation.navigate('Landing');
  }

  return (
    <View style={styles.container}>
      {showGoBack ? (
        <BorderlessButton onPress={navigation.goBack}>
          <Feather name="arrow-left" size={24} color="#FCA311" />
        </BorderlessButton>
      ) : (
        <View />
      )}


      <Text style={styles.title}>{title}</Text>

      {showCancel ? (
        <BorderlessButton onPress={handleGoBackToAppHomePage}>
          <Feather name="x" size={24} color="#ff669d" />
        </BorderlessButton>
      ) : (
        <View />
      )}
    </View>
  );
}
