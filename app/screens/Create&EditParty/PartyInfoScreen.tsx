import React, { FC } from "react";
import { observer } from "mobx-react-lite";
import { ViewStyle, TextStyle, TextInputProps, Image, View, TouchableOpacity } from "react-native";
import { AppStackScreenProps } from "app/navigators";
import { Screen, Text, TextField, Button} from "app/components";
import { Divider } from '@rneui/themed';
import { useNavigation } from "@react-navigation/native";

interface PartyInfoScreenProps extends AppStackScreenProps<"PartyInfo"> {}

export const PartyInfoScreen: FC<PartyInfoScreenProps> = observer(() => {
  const navigation = useNavigation();

  const handleSubmit = () => {
    console.log("Form submitted!");
  };

  const handleChatPress = () => {
    // navigation.navigate('EditParty');
  };

  return (
    <Screen style={$root} preset="scroll">
      <View style={codeTextContainer}>
        <Text style={{fontSize:30}}>4 SEPTEMBER 2024 08:30</Text>
      </View>
      <View style={containerPicture}>
        <Image
          source={require("../../../assets/images/Party_image/food.png")}
          style={{ width: 120, height: 120, resizeMode: 'contain' }}
        />
      </View>
      <View style={codeTextContainer}>
        <Text style={{fontSize:30}}>ติวเข้มมิดเทอมไอที</Text>
      </View>
      <Divider orientation="vertical" style={dividerStyle} />
      <View style={codeTextContainer}>
        <Text style={{fontSize:30}}>👤 12</Text>
      </View>
      <Divider orientation="vertical" style={dividerStyle} />
      <View style={codeTextContainer}>
        <Text style={{fontSize:30}}>หากเพื่อนๆสนใจที่จะแลกเปลี่ยนความรู้ พากันติวและ พากันเก็บA หรือพากันรอดชีวิตขอให้อย่ารีรอ ที่จะเข้ามา</Text>
      </View>
      <Divider orientation="vertical" style={dividerStyle} />
      <View style={codeTextContainer}>
        <Text style={{fontSize:30}}>CODE:AZBrsD593</Text>
      </View>
      <Divider orientation="vertical" style={dividerStyle} />
      <TouchableOpacity style={containerStyle}>
        <Text style={{fontSize:30, color:'white'}}>CHAT</Text>
      </TouchableOpacity>
    </Screen>
  );
});

const $root: ViewStyle = {
  flex: 1,
};

const dividerStyle: ViewStyle = {
  height: '100%',
  marginHorizontal: 10,
};

const containerPicture: ViewStyle ={
  width: 200,
  height: 200,
  borderRadius: 120,
  overflow: 'hidden',
  marginBottom: 12,
  alignItems: 'center',
  alignSelf: 'center',
  justifyContent: 'center',
  backgroundColor: '#8B88FF',
};

const codeTextContainer: ViewStyle = {
  alignItems: 'center',
  paddingBottom: 20,
  paddingTop: 20,
};

const containerStyle: ViewStyle = {
  backgroundColor: '#4542C1',
  alignItems: 'center',
  height: 50,
  justifyContent: 'center',
};

const textFieldStyle: TextStyle & TextInputProps = {
  marginBottom: 16,
  borderRadius: 30,
};

const buttonStyle: ViewStyle = {
  marginTop: 24,
  backgroundColor: '#FDC319',
  borderRadius: 30,
  width: 160,
};