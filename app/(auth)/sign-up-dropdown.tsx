import React, { useContext, useState } from "react";
import { Dropdown } from "react-native-element-dropdown";
import AntDesign from "@expo/vector-icons/AntDesign";
import { useRouter } from "expo-router";
import { UserContext } from "@/app/UserContext";
import { postSignUpDetails } from "@/services/authService";

const data = [
  { label: "Item 1", value: "1" },
  { label: "Item 2", value: "2" },
  { label: "Item 3", value: "3" },
  { label: "Item 4", value: "4" },
  { label: "Item 5", value: "5" },
  { label: "Item 6", value: "6" },
  { label: "Item 7", value: "7" },
  { label: "Item 8", value: "8" },
];

const DropdownComponent = () => {
  const [value, setValue] = useState(null);
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    username: "",
    password: "",
    email: "",
    birthdate: "",
    bloodgroup: "",
    gender: "",
    data: "",
  });
  const [err, setErr] = useState("");
  const { updateUser } = useContext(UserContext);

  const handleSignUp = async () => {
    console.log("Sign up button pressed");
    console.log("Form Data:", formData);
    try {
      const response = await postSignUpDetails(formData);
      if (response.success) {
        updateUser(response.user);
        router.replace("/(tabs)/home"); // Redirect to home page after successful sign-up
      } else {
        setErr(response.message);
      }
    } catch (err) {
      console.error("Sign up failed", err);
      setErr("Sign up failed due to unknown error.");
    }
  };

  const handleSignInRedirect = () => {
    router.replace("/(auth)/sign-in");
  };

  return (
    <Dropdown
      className="m-4 h-12 bg-purple-100 rounded-md border-b-2 border-purple-400 px-2"
      placeholderStyle="text-base text-purple-600"
      selectedTextStyle="text-base text-purple-700"
      inputSearchStyle="h-10 text-base text-purple-800 bg-purple-200 rounded-md px-2"
      iconStyle="w-5 h-5"
      data={data}
      search
      maxHeight={300}
      labelField="label"
      valueField="value"
      placeholder="Select item"
      searchPlaceholder="Search..."
      value={value}
      onChange={(item) => {
        setValue(item.value);
      }}
      renderLeftIcon={() => (
        <AntDesign name="Safety" className="text-purple-500 mr-2" size={20} />
      )}
    />
  );
};

export default DropdownComponent;
