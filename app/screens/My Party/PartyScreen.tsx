import React, { FC } from "react"
import { observer } from "mobx-react-lite"
import {
  View,
  ViewStyle,
  Image,
  TextStyle,
  ImageStyle,
  Dimensions,
} from "react-native"
import { AppStackScreenProps } from "app/navigators"
import { Button, Header, Screen, Text } from "app/components"
// import { useNavigation } from "@react-navigation/native"
// import { useStores } from "app/models"
import FontAwesome from "react-native-vector-icons/FontAwesome"
import { goBack } from "app/navigators/navigationUtilities"
import { TouchableOpacity } from "react-native-gesture-handler"
import * as Navigation from '../../navigators/navigationUtilities';

interface PartyScreenProps extends AppStackScreenProps<"Party"> {}

export const PartyScreen: FC<PartyScreenProps> = observer(function PartyScreen({ route }) {
  // Pull in one of our MST stores
  // const { someStore, anotherStore } = useStores()

  const { item } = route.params
  const date = new Date(Date.parse(item.createDateTime))
  const [month, day, year, hour, minute] = [
    date.toLocaleString("default", { month: "long" }).toUpperCase(),
    date.getDate(),
    date.getFullYear(),
    date.getHours(),
    date.getMinutes(),
  ]


  // Pull in navigation via hook
  // const navigation = useNavigation()
  return (
    <Screen style={$root} preset="scroll">
      <Header leftIcon='caretLeft' leftIconColor='white' onLeftPress={() => {goBack()}} backgroundColor="#4542C1"></Header>
      <Text style={styles.datecreated}>
        {day + " " + month + " " + year + " " + hour + ":" + minute}
      </Text>

      <View style={[styles.imageContainer , { backgroundColor: "#A0B0FE", width: "45%" }]}>
        <Image source={{ uri: "https://cdn-icons-png.flaticon.com/512/1719/1719420.png" }} style={styles.partyImage} />
      </View>
      <Text style={{color: '#FDC319', fontWeight: "bold", fontSize: 32, padding: '5%', margin:10, alignSelf: "center"}}>{item.partyName}</Text>
      <View style={styles.separator} />
      <View style={styles.icons}>
        <TouchableOpacity onPress={() => Navigation.navigate("Member")}>
          <FontAwesome name="user" size={32} color="#8B88FF" />
        </TouchableOpacity>
        <Text style={{ fontSize: 26, padding: 10, textAlign: "justify"}}>{item.memberList.length}</Text>
      </View>
      <View style={styles.separator}  />
      <Text style={{fontWeight: "bold", fontSize: 16, padding: 10, marginTop:10, alignSelf: "center"}}>{item.partyDescription}</Text>
      <View style={styles.footer}>
        <Button text="Chat" style={styles.bxstyle} textStyle={styles.bxtxstyle}></Button>
      </View>
    </Screen>
  )
})

const $root: ViewStyle = {
  flex: 1,
}

const styles = {
  datecreated: {
    padding: Dimensions.get("window").width * 0.1,
    alignSelf: "center",
    fontSize: Dimensions.get("window").width * 0.06,
    justifyContent: "center",
    color: "#4542C1",
    fontWeight: "bold",
  } as TextStyle,
  partyImage: {
    resizeMode: "contain",
    justifyContent: "center",
    alignItems: "center",
    padding: Dimensions.get("window").width * 0.15,
    height: Dimensions.get("window").height * 0.1,
    width: Dimensions.get("window").width * 0.1,
    borderRadius: 10,
  } as ImageStyle,
  imageContainer: {
    alignSelf: "center",
    justifyContent: "center",
    width: "45%",
    padding: Dimensions.get("window").height * 0.04,
    borderRadius: 500,
    flexDirection: "row",
  } as ViewStyle,
  icons: {
    flexDirection: "row",
    alignItems: "stretch",
    justifyContent: "center",
  } as ViewStyle,
  separator: {
    marginBottom: 10,
    borderBottomWidth: 2,
    borderBottomColor: "#ccc",
    marginHorizontal: 20,
  } as ViewStyle,
  footer: {
    paddingTop: 100,
    marginVertical: "5%"
  } as ViewStyle,
  bxstyle: {
    backgroundColor: "#4542C1",
    justifyContent: "center"
  } as ViewStyle,
  bxtxstyle: {
    fontSize: 20,
    color: "white"
  } as TextStyle
}
