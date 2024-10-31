import {Text, TouchableOpacity, View} from "react-native";
import {FontAwesome5, FontAwesome6} from "@expo/vector-icons";
import React from "react";

// @ts-ignore
export default function CategoryBlocks({onSelectCategory}) {
    return (
    <View className="space-y-4 mt-4">
        <Text className="text-white text-lg font-bold">Categories</Text>
        {/* Self-Esteem */}
        <View className="flex flex-row justify-between">
            <TouchableOpacity
                onPress={() => onSelectCategory('self_esteem')}
                className="flex-1 bg-yellow-200 p-5 rounded-lg mr-2 flex items-center"
            >
                <FontAwesome6 name="ranking-star" size={50} color="black" className="mb-2"/>
                <Text className="mt-4 text-black text-sm text-center">Self-Esteem</Text>
            </TouchableOpacity>

            {/* Motivation */}
            <TouchableOpacity
                onPress={() => onSelectCategory('motivation')}
                className="flex-1 bg-green-200 p-5 rounded-lg flex items-center"
            >
                <FontAwesome5 name="bolt" size={50} color="black" className="mb-2"/>
                <Text className="mt-4 text-black text-sm text-center">Motivation</Text>
            </TouchableOpacity>
        </View>

        <View className="flex flex-row justify-between">
            {/* Spiritual */}
            <TouchableOpacity
                onPress={() => onSelectCategory('spiritual')}
                className="flex-1 bg-blue-200 p-5 rounded-lg mr-2 flex items-center"
            >
                <FontAwesome5 name="spa" size={50} color="black" className="mb-2"/>
                <Text className="mt-4 text-black text-sm text-center">Spiritual</Text>
            </TouchableOpacity>

            {/* Relationships */}
            <TouchableOpacity
                onPress={() => onSelectCategory('relationships')}
                className="flex-1 bg-red-200 p-5 rounded-lg flex items-center"
            >
                <FontAwesome5 name="heart" size={50} color="black" className="mb-2"/>
                <Text className="mt-4 text-black text-sm text-center">Relationships</Text>
            </TouchableOpacity>
        </View>
    </View>
    )
}
