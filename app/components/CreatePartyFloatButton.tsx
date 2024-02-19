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
    bottom: 0,
    right: 16,
    zIndex: 2,
  },
  button: {
    backgroundColor: 'rgb(69, 66, 193)',
    width: 90,
    height: 90,
    borderRadius: 180,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 40,
  },
});

export default CreatePartyFloatButton;

