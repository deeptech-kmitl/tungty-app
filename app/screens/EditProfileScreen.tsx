import React, { FC } from "react"
import { observer } from "mobx-react-lite"
import { TextInputProps, TextStyle, View, ViewStyle } from "react-native"
import { AppStackScreenProps } from "app/navigators"
import { Screen, TextField } from "app/components"
import { Avatar, Button } from "@rneui/base";
// import { useNavigation } from "@react-navigation/native"
// import { useStores } from "app/models"

interface EditProfileScreenProps extends AppStackScreenProps<"EditProfile"> { }

export const EditProfileScreen: FC<EditProfileScreenProps> = observer(function EditProfileScreen() {

  return (
    <Screen style={$root} preset="scroll">
      <View style={{ marginTop: '20%' }}>
        <View style={$imgContainer}>
          <Avatar
            size={185}
            rounded
            source={{ uri: "https://media.discordapp.net/attachments/756756071657242706/1201554789188776047/TS4_x64_2024-01-03_01-16-11.png?ex=65ca3e19&is=65b7c919&hm=0193920c721cf953596eecbf5691ab9f7df93ca8eefda6168a0ea98a603905f2&=&format=webp&quality=lossless&width=1191&height=670" }}
          />
          <TextField
            label="Name"
            placeholder="Name"
            style={textFieldStyle}
          />

          <TextField
            label="About Me"
            placeholder="About Me"
            style={textFieldStyle}
            multiline
          />
          <TextField
            label="Password"
            placeholder="Password"
            style={textFieldStyle}
            secureTextEntry
          />
          <TextField
            label="Password"
            placeholder="Confirm Password"
            style={textFieldStyle}
            secureTextEntry
          />
          <Button
            title="SAVE"
            buttonStyle={{
              backgroundColor: '#d9d9d9',
              borderWidth: 2,
              borderColor: 'd9d9d9',
              borderRadius: 30,
            }}
            containerStyle={{
              width: 200,
              marginHorizontal: 50,
              marginVertical: 10,
            }}
            titleStyle={{ color: '#4542C1', fontWeight: 'bold' }}
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
const textFieldStyle: TextStyle & TextInputProps = {
  marginBottom: 16,
  borderRadius: 30,
};