import React, { FC, useState } from "react";
import { observer } from "mobx-react-lite";
import { View, Text, Modal, TouchableOpacity, ViewStyle, ScrollView } from "react-native";
import { Divider } from '@rneui/themed'; // Remove Button import
import { AppStackScreenProps } from "app/navigators";
import { useNavigation } from "@react-navigation/native";
import { CheckBox } from 'react-native-elements'; // Import CheckBox from react-native-elements

interface FilterPartyPopupScreenProps extends AppStackScreenProps<"FilterPartyPopup"> { }

const categories = [
  "อาหาร",
  "บันเทิง",
  "สุขภาพ",
  "การเรียน",
  "แฟชัน",
  "ท่องเที่ยว",
  "ความสัมพันธ์",
  "ครอบครัว",
  "หนังสือ",
  "ภาษา/ศาสนา/ความเชื่อ",
  "เทคโนโลยี",
];

export const FilterPartyPopupScreen: FC<FilterPartyPopupScreenProps> = observer(function FilterPartyPopupScreen() {
  const navigation = useNavigation();
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);

  const handleClose = () => {
    navigation.goBack(); // Close the JoinPartyPopupScreen
  };

  const toggleFilter = (filter: string) => {
    const index = selectedFilters.indexOf(filter);
    if (index !== -1) {
      // Filter already selected, remove it
      setSelectedFilters(selectedFilters.filter(item => item !== filter));
    } else {
      // Filter not selected, add it
      setSelectedFilters([...selectedFilters, filter]);
    }
  };

  return (
    <Modal visible={true} animationType="slide" transparent={true}>
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
        <View style={{ height: '80%', width: '90%', backgroundColor: '#4542C1', borderRadius: 10 }}>
          <TouchableOpacity onPress={handleClose} style={{ position: 'absolute', top: 10, right: 10 }}>
            <Text style={{ fontSize: 24, color: 'white' }}>✕</Text>
          </TouchableOpacity>
          <ScrollView contentContainerStyle={{ alignItems: 'center' }}>
            <View style={{ width: '100%', alignItems: 'flex-start', paddingTop: 20 }}>
              <Text style={{ fontSize: 20, color: 'white', marginBottom: 10 }}>Filter by:</Text>
              {categories.map((category, index) => (
                <TouchableOpacity key={index} onPress={() => toggleFilter(category)} style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10 }}>
                  <CheckBox
                    checked={selectedFilters.includes(category)}
                    onPress={() => toggleFilter(category)}
                  />
                  <Text style={{ fontSize: 18, color: 'white', marginLeft: 10, marginRight: 5 }}>{category}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </ScrollView>
          <TouchableOpacity onPress={() => console.log("Joining party...")} style={[buttonStyle, { width: '100%', marginBottom: 20 }]}>
            <Text style={{ fontSize: 20, color: 'white', textAlign: 'center' }}>SAVE</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
});

const buttonStyle: ViewStyle = {
  backgroundColor: '#FDC319',
  paddingVertical: 10,
  paddingHorizontal: 20,
  borderRadius: 5,
};

