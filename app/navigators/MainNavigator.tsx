import { BottomTabScreenProps, createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { CompositeScreenProps } from "@react-navigation/native"
import React from "react"
import { TextStyle, ViewStyle } from "react-native"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import { Icon } from "../components"
import { translate } from "../i18n"
import { CreatePartyScreen,FilterPartyPopupScreen } from "../screens"
import { FindPartyscreen, Profilescreen, } from "../screens"
import { colors, spacing, typography } from "../theme"
import { AppStackParamList, AppStackScreenProps } from "./AppNavigator"
import { MyPartyScreen } from '../screens/My Party/MyPartyScreen';

export type DemoTabParamList = {
  DemoShowroom: { queryIndex?: string; itemIndex?: string }
  DemoDebug: undefined
  DemoPodcastList: undefined
  CreateParty: undefined
  // PartyInfo: undefined
  FindParty: undefined
  JoinPartyPopup: undefined
  FilterPartyPopup: undefined
  Profile: undefined
  MyParty: undefined
}


/**
 * Helper for automatically generating navigation prop types for each route.
 *
 * More info: https://reactnavigation.org/docs/typescript/#organizing-types
 */
export type DemoTabScreenProps<T extends keyof DemoTabParamList> = CompositeScreenProps<
  BottomTabScreenProps<DemoTabParamList, T>,
  AppStackScreenProps<keyof AppStackParamList>
>

const Tab = createBottomTabNavigator<DemoTabParamList>()

export function DemoNavigator() {
  const { bottom } = useSafeAreaInsets()

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarHideOnKeyboard: true,
        tabBarStyle: [$tabBar, { height: bottom + 70 }],
        tabBarActiveTintColor: colors.text,
        tabBarInactiveTintColor: colors.text,
        tabBarLabelStyle: $tabBarLabel,
        tabBarItemStyle: $tabBarItem,
      }}
    >
      <Tab.Screen
        name="CreateParty"
        component={CreatePartyScreen}
        options={{
          tabBarLabel: translate("demoNavigator.componentsTab"),
          tabBarIcon: ({ focused }) => (
            <Icon icon="components" color={focused ? colors.tint : undefined} size={30} />
          ),
        }}
      />

      <Tab.Screen
        name="MyParty"
        component={MyPartyScreen}
        options={{
          tabBarLabel: "MyParty",
          tabBarIcon: ({ focused }) => (
            <Icon icon="view" color={focused ? colors.tint : undefined} size={30} />
          ),
        }}
      />

      <Tab.Screen
        name="FindParty"
        component={FindPartyscreen}
        options={{
          tabBarLabel: "หาปาร์ตี้",
          tabBarIcon: ({ focused }) => (
            <Icon icon="community" color={focused ? colors.tint : undefined} size={30} />
          ),
        }}
      />

      <Tab.Screen
        name="Profile"
        component={Profilescreen}
        options={{
          tabBarLabel: "โปรไฟล์",
          tabBarIcon: ({ focused }) => (
            <Icon icon="debug" color={focused ? colors.tint : undefined} size={30} />
          ),
        }}
      />
    </Tab.Navigator>
  )
}

const $tabBar: ViewStyle = {
  backgroundColor: "#FDC319",
  borderTopColor: colors.transparent,
}

const $tabBarItem: ViewStyle = {
  paddingTop: spacing.md,
}

const $tabBarLabel: TextStyle = {
  fontSize: 12,
  fontFamily: typography.primary.medium,
  lineHeight: 16,
}
