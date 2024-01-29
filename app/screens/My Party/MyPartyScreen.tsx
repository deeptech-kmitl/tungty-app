import React, { FC, useState } from "react"
import { observer } from "mobx-react-lite"
import {
  View,
  ViewStyle,
  TextInput,
  TouchableOpacity,
  TextStyle,
  Image,
  FlatList,
  ImageStyle,
  ScrollView,
  Modal,
} from "react-native"
import { AppStackScreenProps } from "app/navigators"
import { Screen, Text } from "app/components"
import FontAwesome from "react-native-vector-icons/FontAwesome"
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons"
import Octicons from "react-native-vector-icons/Octicons"
import { RadioButton } from "react-native-paper"

interface PartyItem {
  name: string
  imagepath: string
  people: number
  color: string
}

interface MyPartyScreenProps extends AppStackScreenProps<"MyParty"> {}

const partylist: PartyItem[] = [
  {
    name: "เราพวกผองชาวสจล.ไปหาข้าวกิน...",
    imagepath: "https://cdn-icons-png.flaticon.com/512/1719/1719420.png",
    people: 8,
    color: "#FDE619",
  },
  {
    name: "เล่นเกมกันเพื่อนๆ",
    imagepath: "https://cdn-icons-png.flaticon.com/512/5779/5779819.png ",
    people: 23,
    color: "#BEAEFF",
  },
]

export const MyPartyScreen: FC<MyPartyScreenProps> = observer(function MyPartyScreen() {
  // Handle search functionality
  const handleSearch = (query: string) => {
    // Implement your search logic here
  }

  // Handle sorting/filtering functionality
  const handleSortFilter = () => {
    // Implement your sorting/filtering logic here
  }

  const [modalVisible, setModalVisible] = useState(false)
  const [selectedOption, setSelectedOption] = useState("")

  const renderPartyCard = ({ item }: { item: PartyItem }) => (
    <TouchableOpacity style={[styles.partyCard, { backgroundColor: item.color }]}>
      <Image source={{ uri: item.imagepath }} style={styles.partyImage} />
      <View style={styles.partyDetails}>
        <Text style={styles.partyName}>{item.name}</Text>
        <View style={styles.icons}>
          <FontAwesome name="user" size={20} color="#FFC107" />
          <Text>{item.people}</Text>
        </View>
      </View>
    </TouchableOpacity>
  )

  return (
    <Screen style={$root} preset="scroll">
      <ScrollView>
        <View style={styles.topBar}>
          <TouchableOpacity
            onPress={() => {
              /* Handle bell icon press */
            }}
          >
            <MaterialCommunityIcons name="bell-ring" size={30} color="#FFC107" />
          </TouchableOpacity>
        </View>
        <View style={styles.searchBar}>
          <TextInput style={styles.input} onChangeText={handleSearch} placeholder="Search" />
          <TouchableOpacity
            onPress={() => {
              /* Handle bell icon press */
            }}
          >
            <View style={styles.searchIcon}>
              <FontAwesome name="search" size={24} color="black" />
            </View>
          </TouchableOpacity>
        </View>
        <View style={styles.titleNSorting}>
          <Text style={styles.titlePage}>ปาร์ตี้ของฉัน</Text>
          <TouchableOpacity onPress={() => setModalVisible(true)}>
            <Octicons name="sort-desc" size={42} color="black" />
          </TouchableOpacity>
          <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
              setModalVisible(!modalVisible)
            }}
          >
            <View style={styles.modalView}>
              <View style={styles.modalTop}>
                <Text style={styles.modalText}>Sort by</Text>
                <TouchableOpacity onPress={() => setModalVisible(!modalVisible)}>
                  <FontAwesome name="close" size={40} color="white" />
                </TouchableOpacity>
              </View>

              <View style={styles.radioButtonContainer}>
                <RadioButton.Group
                  onValueChange={(value) => setSelectedOption(value)}
                  value={selectedOption}
                >
                  <View style={styles.radioButton}>
                    <RadioButton.Android value="option1" color="white" />
                    <Text style={styles.radioText}>ยอดนิยม</Text>
                  </View>
                  <View style={styles.radioButton}>
                    <RadioButton.Android value="option2" color="white" />
                    <Text style={styles.radioText}>ใหม่ล่าสุด</Text>
                  </View>
                  <View style={styles.radioButton}>
                    <RadioButton.Android value="option3" color="white" />
                    <Text style={styles.radioText}>เก่าที่สุด</Text>
                  </View>
                </RadioButton.Group>
              </View>

              <TouchableOpacity onPress={() => setModalVisible(!modalVisible)}>
                <View style={styles.confirmButton}>
                  {/* RadioButton */}
                  <Text>Okay</Text>
                </View>
              </TouchableOpacity>
            </View>
          </Modal>
        </View>
        <View>
          <FlatList
            data={partylist}
            renderItem={renderPartyCard}
            keyExtractor={(item, index) => index.toString()}
            numColumns={2}
          />
        </View>
      </ScrollView>
    </Screen>
  )
})

const $root: ViewStyle = {
  height: "100%",
  flex: 1,
}

const styles = {
  topBar: {
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "flex-end",
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: "#4542C1",
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  } as ViewStyle,

  searchBar: {
    flexDirection: "row",
    marginTop: 16,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
    marginHorizontal: 8,
  } as ViewStyle,

  input: {
    fontSize: 16,
    width: "80%",
    paddingVertical: 8,
    paddingHorizontal: 8,
    borderWidth: 2,
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
  } as TextStyle,

  searchIcon: {
    backgroundColor: "#A0B0FE",
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderWidth: 2,
    borderLeftWidth: 0,
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
  } as TextStyle,

  titleNSorting: {
    marginRight: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  } as ViewStyle,

  titlePage: {
    padding: 30,
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 8,
    marginTop: "10%",
    fontSize: 42,
    color: "#FFC107",
    fontWeight: "bold",
  } as TextStyle,

  modalView: {
    margin: 30,
    marginVertical: "30%",
    backgroundColor: "#4542C1",
    borderRadius: 20,
    padding: 35,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  } as ViewStyle,

  confirmButton: {
    padding: 10,
    marginHorizontal: "30%",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 50,
    backgroundColor: "#FDC319",
  } as ViewStyle,

  modalText: {
    fontWeight: "bold",
    alignSelf: "center",
    fontSize: 24,
    color: "#fff",
  } as TextStyle,

  modalTop: {
    marginBottom: 15,
    padding: 10,
    flexDirection: "row",
    justifyContent: "space-between",
  } as ViewStyle,

  partyCard: {
    width: "45%",
    backgroundColor: "#ffffff",
    margin: 10,
    padding: 30,
    borderRadius: 10,
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    marginHorizontal: 10,
    marginBottom: 8,
    flexDirection: "row",
  } as ViewStyle,

  partyImage: {
    resizeMode: "contain",
    aspectRatio: 1 / 1,
    borderRadius: 10,
    marginRight: 10,
  } as ImageStyle,

  partyDetails: {
    flex: 1,
    justifyContent: "center",
  } as ViewStyle,

  partyName: {
    fontSize: 12,
  } as TextStyle,

  icons: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
  } as ViewStyle,

  radioButtonContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: "10%",
    justifyContent: "space-between",
    marginBottom: 20,
  } as ViewStyle,

  radioButton: {
    flexDirection: "row",
    alignItems: "center",
  } as ViewStyle,

  radioText: {
    marginLeft: 10,
    color: "white",
    fontWeight: "bold",
    fontSize: 20,
  } as TextStyle,
}
