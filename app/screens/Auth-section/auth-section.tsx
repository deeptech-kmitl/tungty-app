import { AppStackScreenProps } from "app/navigators"
import { observer } from "mobx-react-lite"
import React, { FC, useState } from "react"
import { TextStyle, View, ViewStyle, Text, TextInput, TouchableOpacity } from "react-native"
// import { useNavigation } from "@react-navigation/native";

interface LoginProps extends AppStackScreenProps<"Login"> {}

const LoginScreen: FC<LoginProps> = observer(function Login(_props) {
  // const LoginScreen = () => {
  const [Username, setUsername] = useState("")
  const [password, setPassword] = useState("")

  const { navigation } = _props

  function goNext() {
    navigation.navigate("Signup")
  }

  const handleLogin = () => {
    // Handle login logic here
    console.log("Logging in with:", Username, password)
  }

  return (
    <View style={$screenContentContainer}>
      <Text testID="login-heading" style={$signIn}>
        TungTy
      </Text>

      <Text testID="login-heading" style={$label}>
        Username
      </Text>
      <TextInput
        value={Username}
        onChangeText={setUsername}
        style={$textField}
        autoCapitalize="none"
        autoComplete="email"
        autoCorrect={false}
        keyboardType="email-address"
        placeholder=""
      />

      <Text testID="login-heading" style={$label}>
        Password
      </Text>
      <TextInput
        value={password}
        onChangeText={setPassword}
        style={$textField}
        autoCapitalize="none"
        autoComplete="password"
        autoCorrect={false}
        secureTextEntry={true}
        placeholder=""
      />

      <View style={{ alignItems: "center" }}>
        <TouchableOpacity
          onPress={() => {
            handleLogin()
          }}
        >
          <Text style={$tapButton}>SIGN IN</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => {
            goNext()
          }}
        >
          <Text style={$tapButtonR}>สมัครสมาชิก</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
})

interface SignUpProps extends AppStackScreenProps<"Signup"> {}

const SignUpScreen: FC<SignUpProps> = observer(function SignUp(_props) {
  const [Name, setName] = useState("")
  const [Username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [ConfirmPassword, setConfirmPassword] = useState("")
  
  const { navigation } = _props

  const goback = () => {
    // Your sign up logic
    navigation.navigate("Login"); // Navigate back to previous screen
  };

  // const handleSignUp = () => {
  //   // Handle signup logic here
  //   console.log("Signing up with:", Username, password)
  // }

  return (
    <View style={$screenContentContainer}>
      <Text testID="login-heading" style={$signIn}>
        REGISTER
      </Text>

      <Text testID="login-heading" style={$label}>
        Name
      </Text>
      <TextInput
        value={Name}
        onChangeText={setName}
        style={$textField}
        autoCapitalize="none"
        autoCorrect={false}
        keyboardType="email-address"
        placeholder=""
      />

      <Text testID="login-heading" style={$label}>
        Username
      </Text>
      <TextInput
        value={Username}
        onChangeText={setUsername}
        style={$textField}
        autoCapitalize="none"
        autoComplete="email"
        autoCorrect={false}
        keyboardType="email-address"
        placeholder=""
      />

      <Text testID="login-heading" style={$label}>
        Password
      </Text>
      <Text style={{ color: "white", marginLeft: 9, fontSize: 12 }}>
        กรอกตัวอักษรและตัวเลข 8 ตัว (ตัวอักษร, ตัวเลข, สัญลักษณ์)
      </Text>
      <TextInput
        value={password}
        onChangeText={setPassword}
        style={$textField}
        autoCapitalize="none"
        autoComplete="password"
        autoCorrect={false}
        secureTextEntry={true}
        placeholder=""
      />

      <Text testID="login-heading" style={$label}>
        ConfirmPassword
      </Text>
      <TextInput
        value={ConfirmPassword}
        onChangeText={setConfirmPassword}
        style={$textField}
        autoCapitalize="none"
        autoComplete="password"
        autoCorrect={false}
        secureTextEntry={true}
        placeholder=""
      />

      <View style={{ alignItems: "center" }}>
        <TouchableOpacity
          onPress={() => {
            goback()
          }}
        >
          <Text style={$tapButtonU}>SIGN UP</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
})

const $screenContentContainer: ViewStyle = {
  flex: 1,
  backgroundColor: "#4542C1",
  padding: 27,
  justifyContent: "center",
}

const $signIn: TextStyle = {
  color: "#FDC319",
  fontSize: 64,
  textAlign: "center",
  fontWeight: "bold",
}

const $label: TextStyle = {
  marginTop: 18,
  color: "white",
  fontSize: 18,
  fontWeight: "bold",
}

const $textField: ViewStyle = {
  marginTop: 9,
  padding: 9,
  paddingLeft: 18,
  borderRadius: 30,
  backgroundColor: "white",
  width: "100%",
  fontWeight: "bold",
  fontSize: 15,
}

const $tapButton: ViewStyle = {
  marginTop: 24,
  borderRadius: 30,
  backgroundColor: "#FDC319",
  padding: 15,
  color: "#4542C1",
  textAlign: "center",
  width: 270,
  fontWeight: "bold",
  fontSize: 18,
}

const $tapButtonR: ViewStyle = {
  marginTop: 90,
  backgroundColor: "white",
  padding: 18,
  color: "#4542C1",
  textAlign: "center",
  width: 270,
  fontWeight: "bold",
  fontSize: 18,
}

const $tapButtonU: ViewStyle = {
  marginTop: 90,
  borderRadius: 30,
  backgroundColor: "#FDC319",
  padding: 15,
  color: "#4542C1",
  textAlign: "center",
  width: 270,
  fontWeight: "bold",
  fontSize: 18,
}

export { LoginScreen, SignUpScreen }
