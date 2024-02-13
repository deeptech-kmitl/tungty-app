import React, { FC, useState } from "react"
import { observer } from "mobx-react-lite";
import { ViewStyle, TextStyle, TextInputProps, Image, View, } from "react-native";
import { AppStackScreenProps } from "app/navigators";
import { Screen, Text, TextField, Button } from "app/components";
import { CheckBox } from 'react-native-elements';

interface CreatePartyScreenProps extends AppStackScreenProps<"CreateParty"> { }

export const CreatePartyScreen: FC<CreatePartyScreenProps> = observer(function CreatePartyScreen() {
  const handleSubmit = () => {
    // Handle form submission logic here
    // You can use state, MobX stores, or any other state management solution
    console.log("Form submitted!");
  };

  const [isPublic, setIsPublic] = useState(false);

  return (
    <Screen style={$root} preset="scroll">
      <View style={containerPicture}>
        <Image
          source={require("../../../assets/images/foodParty_icon.png")}
          style={{ width: 90, height: 90, resizeMode: 'contain' }}
        />
      </View>
      <TextField
        label="Party Type :"
        placeholder="Choose Party Type"
        style={textFieldStyle}
      />
      <TextField
        label="Party Name"
        placeholder="Enter Party Name"
        style={textFieldStyle}
      />
      <TextField
        label="Date"
        placeholder="Enter date"
        style={textFieldStyle}
      />
      <TextField
        label="Time"
        placeholder="Enter time"
        style={textFieldStyle}
      />
      <TextField
        label="About"
        placeholder="Enter detail"
        style={[textFieldStyle, { height: 60 }]}
      // Additional props like value, onChangeText, etc., can be added as needed
      />
      {/* CheckBox for selecting public or private */}
      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', alignContent:'center', alignSelf:'center' }}>
        <CheckBox
          checked={isPublic}
          onPress={() => setIsPublic(!isPublic)}
        />
        <Text style={{ marginLeft: 5 }}>Public</Text>
        <View style={{marginTop:50}}></View>
        <CheckBox
          checked={!isPublic}
          onPress={() => setIsPublic(!isPublic)}
        />
        <Text style={{ marginLeft: 5 }}>Private</Text>
      </View>
      <View style={{ alignSelf: 'center' }}>
        <Button onPress={handleSubmit} text="Save" style={{ ...buttonStyle }} textStyle={textButtonStyle} />
      </View>
    </Screen>
  );
});

const $root: ViewStyle = {
  flex: 1,
  padding: 20,
};

const textFieldStyle: TextStyle & TextInputProps = {
  marginBottom: 16,
  borderRadius: 30,
  // Additional styling for TextField as needed
};

const buttonStyle: ViewStyle = {
  backgroundColor: '#FDC319',
  borderRadius: 30,
  width: 360,
};

const textButtonStyle: TextStyle = {
  color: 'white', // Set the text color to white or your preferred color
};

const containerPicture: ViewStyle = {
  width: 140,  // Size of the circle that represents the picture
  height: 140,
  borderRadius: 80,  // Half of the width or height to make it a circle
  overflow: 'hidden',  // Clip the image outside the circle
  marginBottom: 12,  // Set as needed
  alignItems: 'center',
  alignSelf: 'center',
  justifyContent: 'center',
  backgroundColor: '#8B88FF',
}

const codeTextContainer: ViewStyle = {
  alignItems: 'center',
  paddingBottom: 20,
};
