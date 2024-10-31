import { useState } from 'react';
import { View, TouchableOpacity, Text } from 'react-native';

const handleSearch = () => {};
const handleMyLibrary = () => {};

export default function Navbar() {
    const [selectedTab, setSelectedTab] = useState('search');

    return (
        <View className="mx-4 mt-6 mb-4 rounded-lg overflow-hidden">
            <View className="flex-row items-center">
                {/* Search Tab */}
                <TouchableOpacity
                    onPress={() => setSelectedTab('search')}
                    className={`flex-1 p-2 border-r border-purple-200 ${
                        selectedTab === 'search' ? 'bg-purple-200' : 'bg-black'
                    }`}
                >
                    <Text className={`text-xl font-semibold text-center ${
                        selectedTab === 'search' ? 'text-black' : 'text-purple-300'
                    }`}>
                        Search
                    </Text>
                </TouchableOpacity>

                {/* My Library Tab */}
                <TouchableOpacity
                    onPress={() => setSelectedTab('library')}
                    className={`flex-1 p-2 ${
                        selectedTab === 'library' ? 'bg-purple-200' : 'bg-black'
                    }`}
                >
                    <Text className={`text-xl font-semibold text-center ${
                        selectedTab === 'library' ? 'text-black' : 'text-purple-300'
                    }`}>
                        My Library
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}
