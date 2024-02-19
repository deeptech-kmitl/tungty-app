import React, { FC, useState } from "react";
import { observer } from "mobx-react-lite";
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
} from "react-native";
import { AppStackScreenProps } from "app/navigators";
import { Screen, Text } from "app/components";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Octicons from "react-native-vector-icons/Octicons";
import { RadioButton } from "react-native-paper";
import CreatePartyFloatButton from "app/components/CreatePartyFloatButton";

interface PartyItem {
  name: string;
  imagepath: string;
  people: number;
  date: string;
  color: string;
  category: string; // Add a category property
}

interface FindPartyScreenProps extends AppStackScreenProps<"FindParty"> {}

const partylist: PartyItem[] = [
  {
    name: "เราพวกผองชาวสจล.ไปหาข้าวกิน...",
    imagepath: "https://cdn-icons-png.flaticon.com/512/1719/1719420.png",
    people: 8,
    date: "2023-01-13",
    color: "#FDE619",
    category: "อาหาร",
  },
  {
    name: "เล่นเกมกันเพื่อนๆ",
    imagepath: "https://cdn-icons-png.flaticon.com/512/5779/5779819.png ",
    date: "2016-04-10",
    people: 23,
    color: "#BEAEFF",
    category: "บันเทิง",
  },
  // Add more items with different categories
];

export const FindPartyScreen: FC<FindPartyScreenProps> = observer(
  function FindPartyScreen() {
    // Handle search functionality
    const handleSearch = (search: string) => {
      // Implement your search logic here
      console.log(search);
      const searchResult = partylist.filter((element) =>
        element.name.toLowerCase().includes(search.toLowerCase())
      );
      console.log(searchResult);
      setRenderList(searchResult);
    };

    // Handle filtering functionality
    const handleFilter = (selectedCategory: string) => {
      if (selectedCategory === "all") {
        setRenderList(partylist);
      } else {
        const filteredList = partylist.filter(
          (item) => item.category === selectedCategory
        );
        setRenderList(filteredList);
      }
      setModalVisible(!modalVisible);
    };

    const [modalVisible, setModalVisible] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState("all");
    const [search, setSearch] = useState("");
    const [renderList, setRenderList] = useState<PartyItem[]>(partylist);

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
    );

    const categories = [
      "all",
      "อาหาร",
      "บันเทิง",
      "สุขภาพ",
      "การเรียน",
      "แฟชัน",
      "ท่องเที่ยว",
      "ความสัมพันธ์/ครอบครัว",
      "เทคโนโลยี",
      "ภาษา/ศาสนา/ความเชื่อ",
      "อื่น ๆ",
    ];

    return (
      <Screen style={$root} preset="scroll">
        <ScrollView>
          <View style={styles.topBar}>
            <TouchableOpacity
              onPress={() => {

              }}
              >
                <MaterialCommunityIcons name="bell-ring" size={30} color="#FFC107" />
              </TouchableOpacity>
            </View>
            <View style={styles.searchBar}>
              <TextInput style={styles.input} onChangeText={setSearch} placeholder="Search" />
              <TouchableOpacity
                onPress={() => {
                  handleSearch(search);
                }}
              >
                <View style={styles.searchIcon}>
                  <FontAwesome name="search" size={24} color="black" />
                </View>
              </TouchableOpacity>
            </View>
            <View style={styles.titleNSorting}>
              <Text style={styles.titlePage}>Find ปาร์ตี้</Text>
              <TouchableOpacity onPress={() => setModalVisible(true)}>
                <Octicons name="filter" size={42} color="black" />
              </TouchableOpacity>
              <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                  setModalVisible(!modalVisible);
                }}
              >
                <View style={styles.modalView}>
                  <View style={styles.modalTop}>
                    <Text style={styles.modalText}>Filter by category</Text>
                    <TouchableOpacity onPress={() => setModalVisible(!modalVisible)}>
                      <FontAwesome name="close" size={40} color="white" />
                    </TouchableOpacity>
                  </View>
    
                  <View style={styles.radioButtonContainer}>
                    <FlatList
                      data={categories}
                      renderItem={({ item }) => (
                        <TouchableOpacity
                          onPress={() => handleFilter(item)}
                          style={styles.categoryItem}
                        >
                          <Text style={styles.categoryText}>{item}</Text>
                          {selectedCategory === item && <FontAwesome name="check" size={20} color="white" />}
                        </TouchableOpacity>
                      )}
                      keyExtractor={(item) => item}
                    />
                  </View>
                </View>
              </Modal>
            </View>
            <View>
              <FlatList
                key={renderList.length}
                data={renderList}
                renderItem={renderPartyCard}
                keyExtractor={(item, index) => index.toString()}
                numColumns={1}
              />
            </View>
            <CreatePartyFloatButton targetScreen="CreateParty" />
          </ScrollView>
        </Screen>

      )
})
const $root: ViewStyle = {
  height: "100%",
  flex: 1,
}

const styles = {
  modalView: {
    margin: 30,
    marginVertical: "5%",
    backgroundColor: "#4542C1",
    borderRadius: 20,
    width: "90%",
  } as ViewStyle,

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
    alignItems: 'center',
  } as ViewStyle,

  partyCard: {
    // width: "80%", // เพิ่มคำสั่งนี้
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
    marginBottom: 8,
  } as ViewStyle,

  partyImage: {
    resizeMode: "contain",
    aspectRatio: 1 / 1, // รักษาองค์ประกอบที่แน่นอนเพื่อรักษาสัดส่วน
    width: 60, // ปรับขนาดของภาพลงเป็น 60 หรือตามต้องการ
    height: 60, // ปรับขนาดของภาพลงเป็น 60 หรือตามต้องการ
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
    flexDirection: 'column',
    alignItems: 'flex-start',
    marginHorizontal: "10%",
    justifyContent: 'space-between',
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

  categoryText: {
    fontSize: 18,
    color: "#fff",
    padding: 10,
  } as TextStyle,

  categoryItem: {
    backgroundColor: "#4542C1",
    borderRadius: 10,
    marginBottom: 5, // ลด margin ล่าง
    marginTop: 5, // เพิ่ม margin บน
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  } as ViewStyle,
  
}