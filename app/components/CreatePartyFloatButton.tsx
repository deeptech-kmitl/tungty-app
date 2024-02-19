import React from 'react';
import { View, Pressable, Text, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { CreatePartyScreen } from 'app/screens';

interface CreatePartyFloatButtonProps {
  targetScreen: string;
}

const CreatePartyFloatButton: React.FC<CreatePartyFloatButtonProps> = ({ targetScreen }) => {
  const navigation = useNavigation();

  const handlePress = () => {
    navigation.navigate(targetScreen);
  };

  return (
    <View style={styles.container}>
      <Pressable
        style={styles.button}
        onPress={handlePress}
      >
        <Text style={styles.buttonText}>+</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 70,
    right: 16,
    zIndex: 2,
  },
  button: {
    backgroundColor: 'red',
    width: 80,
    height: 80,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 40,
  },
});

export default CreatePartyFloatButton;

