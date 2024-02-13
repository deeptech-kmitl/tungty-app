import React, { FC } from "react"
import { observer } from "mobx-react-lite"
import { ViewStyle } from "react-native"
import { AppStackScreenProps } from "app/navigators"
import { Screen, Text } from "app/components"
// import { useNavigation } from "@react-navigation/native"
// import { useStores } from "app/models"

interface FindPartyScreenProps extends AppStackScreenProps<"FindParty"> {}

export const FindPartyScreen: FC<FindPartyScreenProps> = observer(function FindPartyScreen() {
  // Pull in one of our MST stores
  // const { someStore, anotherStore } = useStores()

  // Pull in navigation via hook
  // const navigation = useNavigation()
  return (
    <Screen style={$root} preset="scroll">
      <Text text="findParty" />
    </Screen>
  )
})

const $root: ViewStyle = {
  flex: 1,
}
