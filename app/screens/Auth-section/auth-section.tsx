import { useStores } from "app/models/helpers/useStores"
import { AppStackScreenProps } from "app/navigators"
import { observer } from "mobx-react-lite"
import React, { FC, useEffect, useState } from "react"
import { TextStyle, View, ViewStyle, Text, TextInput, TouchableOpacity } from "react-native"
// import { useNavigation } from "@react-navigation/native";

interface LoginProps extends AppStackScreenProps<"Login"> {}

const LoginScreen: FC<LoginProps> = observer(function Login(_props) {
  // const LoginScreen = () => {
  // const [authPassword, setAuthPassword] = useState("")
  // const [isSubmitted, setIsSubmitted] = useState(false)
  const [attemptsCount, setAttemptsCount] = useState(0)
  // const [validationError, setValidationError] = useState("")
  const {
    authenticationStore: { authEmail, setAuthEmail, setAuthToken, authPassword, setAuthPassword, validationError },
  } = useStores()

  useEffect(() => {
    // Here is where you could fetch credentials from keychain or storage
    // and pre-fill the form fields.
    setAuthEmail("")
    setAuthPassword("")

    // Return a "cleanup" function that React will run when the component unmounts
    return () => {
      setAuthPassword("")
      setAuthEmail("")
    }
  }, [])

  const { navigation } = _props

  function goNext() {
    setAuthPassword("")
    setAuthEmail("")
    // setValidationError("")
    navigation.navigate("Signup")
  }

  function login() {
    // setIsSubmitted(true)
    setAttemptsCount(attemptsCount + 1)

    // Basic validation: Check if email and password are not empty
    // if (authEmail.length === 0) {
    //   setValidationError("Email can't be blank")
    //   return
    // }
    // if (authEmail.length < 6) {
    //   setValidationError("Email must be at least 6 characters")
    //   return 
    // }
    // if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(authEmail)) {
    //   setValidationError("Email must be a valid email address")
    //   return 
    // }
    // if (!authEmail || !AuthPassword) {
    //   setValidationError("Email and password are required.")
    //   return
    // }

    if (validationError) return
    
    // You can add more sophisticated validation here if needed

    // If validation passes, attempt login
    authenticateUser()
  }

  function authenticateUser() {
    // Make a request to your server to get an authentication token.
    // If successful, reset the fields and set the token.
    // setIsSubmitted(false)
    setAuthPassword("")
    setAuthEmail("")

    // We'll mock this with a fake token.
    setAuthToken(String(Date.now()))
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
        value={authEmail}
        onChangeText={setAuthEmail}
        style={{ ...$textField, fontWeight: "bold", fontSize: 18 }}
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
        value={authPassword}
        onChangeText={setAuthPassword}
        style={{ ...$textField, fontWeight: "bold", fontSize: 18 }}
        autoCapitalize="none"
        autoComplete="password"
        autoCorrect={false}
        secureTextEntry={true}
        placeholder=""
      />

      <View style={{ alignItems: "center" }}>
        <TouchableOpacity
          onPress={() => {
            login()
          }}
        >
          <Text
            style={{
              ...$tapButtonL,
              color: "#4542C1",
              textAlign: "center",
              fontWeight: "bold",
              fontSize: 18,
            }}
          >
            SIGN IN
          </Text>
        </TouchableOpacity>

        {validationError ? <Text style={{ color: "red" }}>{validationError}</Text> : null}

        <TouchableOpacity
          onPress={() => {
            goNext()
          }}
        >
          <Text
            style={{
              ...$tapButtonR,
              textAlign: "center",
              color: "#4542C1",
              fontWeight: "bold",
              fontSize: 18,
            }}
          >
            สมัครสมาชิก
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  )
})

interface SignUpProps extends AppStackScreenProps<"Signup"> {}

const SignUpScreen: FC<SignUpProps> = observer(function SignUp(_props) {
  const [Name, setName] = useState("")
  const [AuthPassword, setAuthPassword] = useState("")
  const [ConfirmPassword, setConfirmPassword] = useState("")
  const [validationError, setValidationError] = useState("")
  const {
    authenticationStore: { authEmail, setAuthEmail },
  } = useStores()

  const { navigation } = _props

  const goback = () => {
    // Your sign up logic
    navigation.navigate("Login") // Navigate back to previous screen
  }

  function ValidateSignup() {
    // Basic validation
    if (!Name || !authEmail || !AuthPassword || !ConfirmPassword) {
      setValidationError("All fill are required.")
      return
    } else if (AuthPassword !== ConfirmPassword) {
      setValidationError("Passwords are not the same.")
      return
    }
    // Clear any previous validation error
    setValidationError("")
    goback()
  }

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
        style={{ ...$textField, fontWeight: "bold", fontSize: 18 }}
        autoCapitalize="none"
        autoCorrect={false}
        keyboardType="email-address"
        placeholder=""
      />

      <Text testID="login-heading" style={$label}>
        Username
      </Text>
      <TextInput
        value={authEmail}
        onChangeText={setAuthEmail}
        style={{ ...$textField, fontWeight: "bold", fontSize: 18 }}
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
        value={AuthPassword}
        onChangeText={setAuthPassword}
        style={{ ...$textField, fontWeight: "bold", fontSize: 18 }}
        autoCapitalize="none"
        autoComplete="password"
        autoCorrect={false}
        secureTextEntry={true}
        placeholder=""
      />

      <Text testID="login-heading" style={$label}>
        Confirm Password
      </Text>
      <TextInput
        value={ConfirmPassword}
        onChangeText={setConfirmPassword}
        style={{ ...$textField, fontWeight: "bold", fontSize: 18 }}
        autoCapitalize="none"
        autoComplete="password"
        autoCorrect={false}
        secureTextEntry={true}
        placeholder=""
      />

      <View style={{ alignItems: "center", marginTop: 36 }}>
        {validationError ? <Text style={{ color: "red" }}>{validationError}</Text> : null}
        <TouchableOpacity
          onPress={() => {
            ValidateSignup()
          }}
        >
          <Text
            style={{
              ...$tapButtonU,
              color: "#4542C1",
              textAlign: "center",
              fontWeight: "bold",
              fontSize: 18,
            }}
          >
            SIGN UP
          </Text>
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
}

const $tapButtonL: ViewStyle = {
  marginBottom: 36,
  marginTop: 24,
  borderRadius: 30,
  backgroundColor: "#FDC319",
  padding: 15,
  width: 270,
}

const $tapButtonR: ViewStyle = {
  marginTop: 36,
  backgroundColor: "white",
  padding: 18,
  width: 270,
}

const $tapButtonU: ViewStyle = {
  marginTop: 36,
  borderRadius: 30,
  backgroundColor: "#FDC319",
  padding: 15,
  width: 270,
}

export { LoginScreen, SignUpScreen }
