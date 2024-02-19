import React, { FC, useEffect, useState } from "react"
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
  Modal,
  ActivityIndicator,
} from "react-native"
import { AppStackScreenProps } from "app/navigators"
import { Header, Screen, Text } from "app/components"
import FontAwesome from "react-native-vector-icons/FontAwesome"
import Octicons from "react-native-vector-icons/Octicons"
import { RadioButton } from "react-native-paper"
import * as Navigation from "./../../navigators/navigationUtilities"
// import { array } from "mobx-state-tree/dist/internal"

// interface PartyItem {
//   name: string
//   imagepath: string
//   people: number
//   date: string
//   color: string
// }
interface Partyfetch {
  partyId: string
  partyCode: string
  partyOwner: string
  partyName: string
  partyDescription: string
  partyType: string
  partyCategory: string
  appointmentDate: string
  appointmentTime: string
  memberAmount: number
  memberList: Array<string>
  createDateTime: string
  updateDateTime: string
  color: string
  imagepath: string
}

interface MyPartyScreenProps extends AppStackScreenProps<"MyParty"> {}
const userId = "Rawipas"

export const MyPartyScreen: FC<MyPartyScreenProps> = observer(function MyPartyScreen(this: any) {
  const [modalVisible, setModalVisible] = useState(false)
  const [selectedOption, setSelectedOption] = useState("")
  const [search, setSearch] = useState("")
  const [partylist, setPartylist] = useState<Partyfetch[]>([])
  const [renderList, setRenderList] = useState<Partyfetch[]>(partylist)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // fetch every minute
    fetchPartyData()

    setInterval(() => {
      fetchPartyData()
    }, 60000)
  }, [])

  // Handle search functionality
  const handleSearch = (search: string) => {
    const filteredList = partylist.filter((element) =>
      element.partyName.toLowerCase().includes(search.toLowerCase()),
    )
    const updatedRenderList = filteredList.length > 0 ? filteredList : renderList
    setRenderList(updatedRenderList)
  }

  // Handle sorting/filtering functionality
  const handleSortFilter = (value: string) => {
    if (value === "popular") {
      renderList.sort((b, a) => a.memberList.length - b.memberList.length)
    } else if (value === "newest") {
      renderList.sort((b, a) => Date.parse(a.createDateTime) - Date.parse(b.createDateTime))
    } else {
      renderList.sort((a, b) => Date.parse(a.createDateTime) - Date.parse(b.createDateTime))
    }
    setModalVisible(!modalVisible)
  }

  // fetch from backend
  const fetchPartyData = async () => {
    try {
      const response = await fetch(`http://192.168.1.107:8083/party/myParty/${userId}`)
      console.log(response.status)
      const data = await response.json()
      setPartylist(data)
      setRenderList(data)
      console.log(data)
      setLoading(false)
    } catch (error) {
      console.log("error" + error)
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <Screen style={$root}>
        <ActivityIndicator size="large" color="#0000ff" />
      </Screen>
    )
  }

  // renderItem for flatList
  const renderPartyCard = ({ item }: { item: Partyfetch }) => (
    <TouchableOpacity
      style={[styles.partyCard, { backgroundColor: "#A0B0FE" }]}
      onPress={() => Navigation.navigate("Party", { item: item })}
    >
      <Image
        source={{ uri: "https://cdn-icons-png.flaticon.com/512/1719/1719420.png" }}
        style={styles.partyImage}
      />
      <View style={styles.partyDetails}>
        <Text style={styles.partyName} numberOfLines={2}>
          {item.partyName}
        </Text>
        <View style={styles.icons}>
          <FontAwesome name="user" size={20} color="#FFC107" />
          <Text>{item.memberList.length}</Text>
        </View>
      </View>
    </TouchableOpacity>
  )

  return (
    <Screen style={$root} preset="scroll">
      <Header
        rightIcon="bell"
        rightIconColor="#FFC107"
        onRightPress={() => {}}
        backgroundColor="#4542C1"
      >
      </Header>
      <View style={styles.searchBar}>
        <TextInput style={styles.input} onChangeText={setSearch} placeholder="Search" />
        <TouchableOpacity
          onPress={() => {
            handleSearch(search)
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
                  <RadioButton.Android value="popular" color="white" />
                  <Text style={styles.radioText}>ยอดนิยม</Text>
                </View>
                <View style={styles.radioButton}>
                  <RadioButton.Android value="newest" color="white" />
                  <Text style={styles.radioText}>ใหม่ล่าสุด</Text>
                </View>
                <View style={styles.radioButton}>
                  <RadioButton.Android value="oldest" color="white" />
                  <Text style={styles.radioText}>เก่าที่สุด</Text>
                </View>
              </RadioButton.Group>
            </View>

            <TouchableOpacity onPress={() => handleSortFilter(selectedOption)}>
              <View style={styles.confirmButton}>
                {/* RadioButton */}
                <Text>Okay</Text>
              </View>
            </TouchableOpacity>
          </View>
        </Modal>
      </View>
      <FlatList
        keyExtractor={(item, index) => index.toString()}
        data={renderList}
        renderItem={renderPartyCard}
        numColumns={2}
      />
    </Screen>
  )
})

const $root: ViewStyle = {
  height: "100%",
  flex: 1,
}

const styles = {
  searchBar: {
    flexDirection: "row",
    marginTop: "10%",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
    marginHorizontal: 8,
  } as ViewStyle,
  container: {
    flex: 1,
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
    margin: 10,
    padding: "8%",
    borderRadius: 10,
    elevation: 6,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.7,
    shadowRadius: 3.84,
    marginHorizontal: 10,
    flexDirection: "row",
  } as ViewStyle,

  partyImage: {
    resizeMode: "contain",
    width: "50%",
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
