import React, { FC } from "react";
import { observer } from "mobx-react-lite";
import { View, ViewStyle } from "react-native";
import { AppStackScreenProps } from "app/navigators";
import { Screen } from "app/components";
import { Avatar, Text, Button } from "@rneui/base";
import { useNavigation } from '@react-navigation/native';
import { LoginScreen } from "./Auth-section/auth-section";

interface MyProfileScreenProps extends AppStackScreenProps<"MyProfile"> { }

export const MyProfileScreen: FC<MyProfileScreenProps> = observer(function MyProfileScreen(_props) {
  const { navigation } = _props
  const goNext=() => {
    navigation.navigate("Demo", { screen: "DemoShowroom", params: {} })
  }
  return (
    <Screen style={$root} preset="scroll">
      <View style={{ marginTop: '30%' }}>
        <View style={$imgContainer}>
          <Avatar
            size={185}
            rounded
            source={{ uri: "https://media.discordapp.net/attachments/756756071657242706/1201554789188776047/TS4_x64_2024-01-03_01-16-11.png?ex=65ca3e19&is=65b7c919&hm=0193920c721cf953596eecbf5691ab9f7df93ca8eefda6168a0ea98a603905f2&=&format=webp&quality=lossless&width=1191&height=670" }}
          />
          <Text h3 style={{ color: '#FDC319' }}>มีสุข มากมาย</Text>
          <View style={{ backgroundColor: '#000000', width: '50%', height: '0.5%' }}></View>
          <View style={{ flexDirection: 'row' }}>
            <View style={$box}>
              <Text style={{ color: '#ffffff' }}>ปี 2</Text>
            </View>
            <View style={$box}>
              <Text style={{ color: '#ffffff' }}>IT</Text>
            </View>
          </View>
          <Text h4 style={{ color: '#4542C1', margin: '5%' }}>เรียนที่คณะเทคโนโลยีสารสนเทศ
            สจล. ปี3 รุ่น 18 ชอบเล่นเกมมาก ชอบเล่นบาสมากชวนเล่นได้ค่ะ </Text>
          <Button
            onPress={goNext}
            title="SIGN OUT"
            buttonStyle={{
              backgroundColor: '#FDC319',
              borderWidth: 2,
              borderRadius: 30,
              
            }}
            containerStyle={{
              width: 200,
              marginHorizontal: 50,
              marginVertical: 10,
            }}
            titleStyle={{ color: '4542C1', fontWeight: 'bold' }}
          />
        </View>
      </View>
    </Screen>
  );
});

const $root: ViewStyle = {
  flex: 1,
};
const $imgContainer: ViewStyle = {
  justifyContent: 'center',
  alignItems: 'center',
};
const $box: ViewStyle = {
  backgroundColor: '#4542C1',
  paddingVertical: 5,
  paddingHorizontal: 15,
  marginTop: 10,
  borderRadius: 50,
  alignItems: 'center',
};

