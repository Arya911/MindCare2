import React, {useContext, useState} from 'react';
import {SafeAreaView, View, Image, Text, TextInput, TouchableOpacity, Alert, StatusBar} from 'react-native';
import { Feather } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import {UserContext} from "@/app/UserContext";
import {postProfileUpdates} from "@/services/profileService"; // Feather icons include pencil and check icons

const ProfileScreen = () => {
    const {user, updateUser} = useContext(UserContext);
    // Initialize user details state with the user data passed as a prop
    const [userDetails, setUserDetails] = useState({
        username: user.username,
        email: user.email,
        name: user.name,
        bloodgroup: user.bloodgroup,
        birthdate: user.birthdate,
        gender: user.gender,
        data: user.data,
        password: user.password,
        affirmationCollections: user.affirmationCollections,
        affirmationToCollectionsMap: user.affirmationToCollectionsMap
    });

    const [isEditing, setIsEditing] = useState(false);

    // Toggle between edit and save mode
    const handleEditProfileToggle = async () => {
        if (isEditing) {
            // Save the profile and make API call when toggling from edit to view mode
            updateUser(userDetails);
            const keysToRemove = ['affirmationCollections', 'affirmationToCollectionsMap'];
            const filtered = Object.fromEntries(
                Object.entries(userDetails).filter(([key]) => !keysToRemove.includes(key))
            );

            const response = await postProfileUpdates(filtered);
            if(response.success) Alert.alert('Profile saved!');
            else Alert.alert(response.message);
        }
        setIsEditing(!isEditing); // Toggle edit mode
    };

    const handleCancelEdit = () => {
        setUserDetails(user);
        setIsEditing(false);
    }
    // Function to handle changes to user details
    const handleInputChange = (field, value) => {
        setUserDetails(prevState => ({ ...prevState, [field]: value }));
    };

    return (
        <SafeAreaView style={{ paddingTop: StatusBar.currentHeight || 0 }} className="flex h-full bg-black p-5">
            {/* Top-right icon button */}
            {isEditing && (
                <TouchableOpacity
                    className="absolute top-5 right-20 p-3 rounded-lg border-solid border-4 border-purple-300"
                    onPress={handleCancelEdit} // Function to cancel editing
                >
                    <Feather
                        name="x" // 'X' icon for cancel
                        size={22}
                        color="rgb(233 213 255);"
                    />
                </TouchableOpacity>
            )}

            <TouchableOpacity
                className="absolute top-5 right-5 bg-purple-300 p-3 rounded-lg shadow-md shadow-purple-500"
                onPress={handleEditProfileToggle}
            >
                <Feather
                    name={isEditing ? 'check' : 'edit'} // Toggle between pencil and check icon
                    size={24}
                    color="black"
                />
            </TouchableOpacity>

            {/* Profile Picture and Username */}
            <View className="flex items-center mb-6">
                <Image
                    source={{ uri: "https://www.example.com/profile-picture.jpg" }} // Replace with actual profile picture URL
                    style={{ width: 100, height: 100, borderRadius: 50 }}
                />

                {isEditing ? (
                    // Editable username
                    <TextInput
                        className="text-white text-2xl font-extrabold mt-4"
                        value={userDetails.username}
                        onChangeText={(text) => handleInputChange('username', text)}
                        style={{ color: 'white', fontSize: 24, fontWeight: 'bold' }}
                    />
                ) : (
                    // View-only username
                    <Text className="text-white text-2xl font-extrabold mt-4">
                        {userDetails.username}
                    </Text>
                )}

                {isEditing ? (
                    // Editable email
                    <TextInput
                        className="text-gray-400 text-md"
                        value={userDetails.email}
                        keyboardType="email-address"
                        onChangeText={(text) => handleInputChange('email', text)}
                        style={{ color: 'gray', fontSize: 16 }}
                    />
                ) : (
                    // View-only email
                    <Text className="text-gray-400 text-md">
                        {userDetails.email}
                    </Text>
                )}
            </View>

            {/* Profile Details Section */}
            <View className="bg-purple-200 p-6 rounded-lg shadow-md shadow-purple-700 mb-6">

                {/* Name Field */}
                <View className="flex-row items-center w-4/5">
                    <Feather name="user" size={20} color="black" />
                    <View className="flex-1 mx-3">
                        <Text className="text-black text-base">Name</Text>
                        {isEditing ? (
                            <TextInput
                                className="text-black text-lg font-bold"
                                value={userDetails.name}
                                onChangeText={(text) => handleInputChange('name', text)}
                            />
                        ) : (
                            <Text className="text-black text-lg font-bold">
                                {userDetails.name}
                            </Text>
                        )}
                    </View>
                </View>

                {/* Separator */}
                <View className="h-0.5 bg-gray-600 w-11/12 mb-4" />

                {/* Gender Field */}
                <View className="flex-row items-center w-4/5">
                    <MaterialCommunityIcons name="gender-male-female" size={20} color="black" />
                    <View className="flex-1 mx-3">
                        <Text className="text-black text-base">Gender</Text>
                        {isEditing ? (
                            <TextInput
                                className="text-black text-lg font-bold"
                                value={userDetails.gender}
                                onChangeText={(text) => handleInputChange('gender', text)}
                            />
                        ) : (
                            <Text className="text-black text-lg font-bold">
                                {userDetails.gender}
                            </Text>
                        )}
                    </View>
                </View>

                {/* Separator */}
                <View className="h-0.5 bg-gray-600 w-11/12 mb-4" />

                {/* Blood Group Field */}
                <View className="flex-row items-center w-4/5">
                    <Feather name="droplet" size={20} color="black" />
                    <View className="flex-1 mx-3">
                        <Text className="text-black text-base">Blood Group</Text>
                        {isEditing ? (
                            <TextInput
                                className="text-black text-lg font-bold"
                                value={userDetails.bloodgroup}
                                onChangeText={(text) => handleInputChange('bloodGroup', text)}
                            />
                        ) : (
                            <Text className="text-black text-lg font-bold">
                                {userDetails.bloodgroup}
                            </Text>
                        )}
                    </View>
                </View>

                {/* Separator */}
                <View className="h-0.5 bg-gray-600 w-11/12 mb-4" />

                {/* Birthdate Field */}
                <View className="flex-row items-center w-4/5">
                    <Feather name="calendar" size={20} color="black" />
                    <View className="flex-1 mx-3">
                        <Text className="text-black text-base">Birthdate</Text>
                        {isEditing ? (
                            <TextInput
                                className="text-black text-lg font-bold"
                                value={userDetails.birthdate}
                                onChangeText={(text) => handleInputChange('birthdate', text)}
                            />
                        ) : (
                            <Text className="text-black text-lg font-bold">
                                {userDetails.birthdate}
                            </Text>
                        )}
                    </View>
                </View>

                {/* Separator */}
                <View className="h-0.5 bg-gray-600 w-11/12 mb-4" />

            </View>
            {/*</View>*/}
        </SafeAreaView>
    );
};

export default ProfileScreen;
