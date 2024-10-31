import affirmations from '@/constants/affirmations.json'
import React, { useState } from 'react';
import {View, Text, ScrollView, SafeAreaView, StatusBar} from 'react-native';
import Navbar from '@/app/components/affirmations/navbar';
import SearchBar from "@/app/components/affirmations/searchBar";
import CategoryBlocks from "@/app/components/affirmations/categories";
import SelectedCategory from "@/app/components/affirmations/selectedCategory";
import DropdownWithCategories from "@/app/components/affirmations/catDropdown";

const AffirmationSearchPage = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategories, setSelectedCategories] = useState([]);

    // const filteredAffirmations = affirmations.filter(item =>
    //     item.text.toLowerCase().includes(searchTerm.toLowerCase()) ||
    //     item.keywords.some(keyword => keyword.toLowerCase().includes(searchTerm.toLowerCase()))
    // );

    function handleCategorySelect (category: any) {
        // @ts-ignore
        if (!selectedCategories.includes(category)) {
            // @ts-ignore
            setSelectedCategories([...selectedCategories, category]);
        }
    }

    const handleCategoryRemove = (category: any) => {
        setSelectedCategories(selectedCategories.filter(cat => cat !== category));
    };

    const filteredAffirmations = affirmations.filter(item => {
        const matchesSearchTerm = searchTerm
            ? item.text.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.keywords.some(keyword => keyword.toLowerCase().includes(searchTerm.toLowerCase()))
            : true;

        const matchesCategory = selectedCategories.length > 0
            ? selectedCategories.includes(item.category)
            : true;

        return matchesSearchTerm && matchesCategory;
    });


    return (
        <SafeAreaView style={{ paddingTop: StatusBar.currentHeight || 0 }} className="flex h-full bg-black p-5">
            <ScrollView>
            <View className="space-y-4">
                {/* Navbar */}
                <Navbar/>

                {/* Search Bar */}
                <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm}/>

                {/* Selected Category Components */}
                <View className="flex flex-row flex-wrap space-x-2 mb-4">
                    {selectedCategories.map((category) => (
                        <SelectedCategory category={category} handleCategoryRemove={handleCategoryRemove}/>
                    ))}
                    {selectedCategories.length !== 4 && selectedCategories.length !== 0 && (
                        <DropdownWithCategories selectedCategories={selectedCategories} handleCategoryRemove={handleCategoryRemove} setSelectedCategories={setSelectedCategories}/>
                    )}
                </View>

                {/* Category Blocks or Affirmation Results */}
                {selectedCategories.length === 0 && !searchTerm ? (
                    <CategoryBlocks onSelectCategory={handleCategorySelect} />
                ) : (
                    <View className="space-y-4">
                        {filteredAffirmations.map((affirmation) => (
                            <View key={affirmation.id} className="bg-purple-200 p-4 rounded-lg">
                                <Text className="text-black text-base">{affirmation.text}</Text>
                            </View>
                        ))}
                    </View>
                )}
            </View>
            </ScrollView>
        </SafeAreaView>
    );
};

export default AffirmationSearchPage;
