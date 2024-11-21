import React, { useState } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    TextInput,
    ScrollView,
    Modal,
} from 'react-native';
import { Feather, MaterialIcons } from '@expo/vector-icons';
import Clipboard from 'expo-clipboard';

const DocDetailsCard = ({ docDetails }) => {
    const copyToClipboard = async (text) => {
        await Clipboard.setStringAsync(text);
        alert(`Copied to clipboard: ${text}`);
    };

    const fields = [
        { label: "Name", value: docDetails.name, icon: "user" },
        { label: "Degree", value: docDetails.degree, icon: "book" },
        { label: "Phone", value: docDetails.phone, icon: "phone" },
        { label: "Address", value: docDetails.address, icon: "map-pin" },
    ];

    return (
        <View className="bg-purple-200 p-4 rounded-lg shadow-md shadow-purple-700 mb-4">
            {fields.map((field, index) => (
                <View
                    key={field.label}
                    className={`flex-row items-center ${index !== fields.length - 1 ? 'mb-3' : ''}`}
                >
                    <Feather name={field.icon} size={18} color="black"/>
                    <View className="flex-1 mx-2">
                        <Text className="text-gray-700 text-sm">{field.label}</Text>
                        <Text className="text-black text-base font-bold">{field.value}</Text>
                        <View className="mt-0.5 h-0.5 bg-gray-600 w-11/12"/>
                    </View>
                    <TouchableOpacity onPress={() => copyToClipboard(field.value)}>
                        <MaterialIcons name="content-copy" size={18} color="black"/>
                    </TouchableOpacity>
                </View>
            ))}
        </View>
    );
};

export default DocDetailsCard;
