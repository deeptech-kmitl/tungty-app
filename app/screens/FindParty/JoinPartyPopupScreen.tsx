import React, { FC } from "react";
import { observer } from "mobx-react-lite";
import { View, Text, Modal, TouchableOpacity, Image, ViewStyle, TextStyle } from "react-native";
import { Divider } from '@rneui/themed'; // Remove Button import
import { AppStackScreenProps } from "app/navigators";
import { useNavigation } from "@react-navigation/native";

interface JoinPartyPopupScreenProps extends AppStackScreenProps<"JoinPartyPopup"> {}

export const JoinPartyPopupScreen: FC<JoinPartyPopupScreenProps> = observer(() => {
  const navigation = useNavigation();

  const handleClose = () => {
    navigation.goBack(); // Close the JoinPartyPopupScreen
  };

  return (
    <Modal visible={true} animationType="slide" transparent={true}>
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
        <View style={{ backgroundColor: '#4542C1', padding: 20, borderRadius: 10, alignItems: 'center' }}>
          <TouchableOpacity onPress={handleClose} style={{ position: 'absolute', top: 10, right: 10 }}>
            <Text style={{ fontSize: 24, color:'white' }}>✕</Text>
          </TouchableOpacity>
          <View style={containerPicture}>
        <Image
          source={require("../../../assets/images/foodParty_icon.png")}
          style={{ width: 120, height: 120, resizeMode: 'contain' }}
        />
      </View>
          <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 20, color:'#FDC319' }}>พากันไปกินชาบูสุดอร่อยเพื่อนชาวสจล...</Text>
          <Divider orientation="vertical" style={dividerStyle} />
          <Text style={{ fontSize: 18, textAlign: 'center', marginBottom: 20, color:'#FDC319' }}>4 ก.ย. 2024 08:30</Text>
          <Divider orientation="vertical" style={dividerStyle} />
          <Text style={{ fontSize: 18, textAlign: 'center', marginBottom: 20, color:'white' }}>เป็นปาร์ตี้ปลุกพาไปทานชาบูสุดอร่อย สำหรับเพื่อน ๆ ที่สนใจตอนนี้เพียงกดเข้าร่วมกลุ่ม เพื่อสามารถ
หาเพื่อนไปกินชาบูโดยไม่เดียวดายอีกต่อไป ...</Text>
          <Divider style={{ marginBottom: 20 }} />
          <TouchableOpacity onPress={() => console.log("Joining party...")} style={[buttonStyle, { width: '100%' }]}>
            <Text style={{ fontSize: 20, color: 'white', textAlign: 'center' }}>JOIN</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
});

const dividerStyle: ViewStyle = {
  height: '100%',
  marginHorizontal: 10,
  borderWidth:1,
  borderColor:'white',
};

const buttonStyle: ViewStyle = {
  backgroundColor: '#FDC319',
  paddingVertical: 10,
  paddingHorizontal: 20,
  borderRadius: 5,
};

const containerPicture: ViewStyle = {
  width: 200,  // Size of the circle that represents the picture
  height: 200,
  borderRadius: 180,  // Half of the width or height to make it a circle
  overflow: 'hidden',  // Clip the image outside the circle
  marginBottom: 12,  // Set as needed
  alignItems: 'center',
  alignSelf: 'center',
  justifyContent: 'center',
  backgroundColor: '#8B88FF',
}