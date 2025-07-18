import { View, Text, FlatList, TouchableOpacity, Alert } from 'react-native';
import React, { useContext, useEffect, useState } from 'react';
import moment from 'moment';
import Colors from '../shared/Colors';
import Button from './shared/Button';
import { useMutation } from 'convex/react';
import { api } from '../convex/_generated/api';
import { UserContext } from './../context/UserContext';


// ✅ Lucide icons
import { Coffee, Sun, Moon } from 'lucide-react-native';

export default function AddToMealActionSheet({ recipeDetail, hideActionSheet }) {
  const [dateList, setDateList] = useState([]);
  const [selectedDate, setSelectedDate] = useState();
  const [selectedMeal, setSelectedMeal] = useState();

  const CreateMealPlan = useMutation(api.MealPlan.CreateMealPlan);
  const { user } = useContext(UserContext);

  const mealOptions = [
    {
      title: 'Breakfast',
      icon: Coffee,
    },
    {
      title: 'Lunch',
      icon: Sun,
    },
    {
      title: 'Dinner',
      icon: Moon,
    },
  ];

  useEffect(() => {
    GenerateDates();
  }, []);

  const GenerateDates = () => {
    const result = [];
    for (let i = 0; i < 4; i++) {
      const nextDate = moment().add(i, 'days').format('DD/MM/YYYY');
      result.push(nextDate);
    }
    setDateList(result);
  };

  const AddToMealPlan = async () => {
    if (!selectedDate || !selectedMeal) {
      Alert.alert('Error!', 'Please Select All Details');
      return;
    }
    const result = await CreateMealPlan({
      date: selectedDate,
      mealType: selectedMeal,
      recipeId: recipeDetail?._id,
      uid: user?._id,
    });
    console.log(result);
    Alert.alert('Added!', 'Added to Meal Plan');
    hideActionSheet();
  };

  return (
    <View style={{ padding: 20 }}>
      <Text style={{ fontSize: 20, fontWeight: 'bold', textAlign: 'center' }}>Add to Meal</Text>

      <Text style={{ fontSize: 18, fontWeight: 'bold', marginTop: 15 }}>Select Date</Text>

      <FlatList
        data={dateList}
        numColumns={4}
        keyExtractor={(item) => item}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => setSelectedDate(item)}
            style={{
              flex: 1,
              alignItems: 'center',
              padding: 7,
              borderWidth: 1,
              borderRadius: 10,
              margin: 5,
              backgroundColor: selectedDate === item ? Colors.SECONDARY : Colors.WHITE,
              borderColor: selectedDate === item ? Colors.PRIMARY : Colors.GRAY,
            }}
          >
            <Text style={{ fontSize: 18, fontWeight: '500' }}>{moment(item, 'DD/MM/YYYY').format('ddd')}</Text>
            <Text style={{ fontSize: 20, fontWeight: 'bold' }}>{moment(item, 'DD/MM/YYYY').format('DD')}</Text>
            <Text style={{ fontSize: 16 }}>{moment(item, 'DD/MM/YYYY').format('MMM')}</Text>
          </TouchableOpacity>
        )}
      />

      <Text style={{ fontSize: 20, fontWeight: 'bold', marginTop: 15 }}>Select Meal</Text>

      <FlatList
        data={mealOptions}
        numColumns={3}
        keyExtractor={(item) => item.title}
        renderItem={({ item }) => {
          const Icon = item.icon;
          return (
            <TouchableOpacity
              onPress={() => setSelectedMeal(item.title)}
              style={{
                flex: 1,
                alignItems: 'center',
                padding: 7,
                borderWidth: 1,
                borderRadius: 10,
                margin: 5,
                backgroundColor: selectedMeal === item.title ? Colors.SECONDARY : Colors.WHITE,
                borderColor: selectedMeal === item.title ? Colors.PRIMARY : Colors.GRAY,
              }}
            >
              <Icon size={30} color="black" />
              <Text style={{ fontSize: 20, fontWeight: 'bold' }}>{item.title}</Text>
            </TouchableOpacity>
          );
        }}
      />

      <View style={{ marginTop: 15 }}>
        <Button title={'+ Add to Meal Plan'} onPress={AddToMealPlan} />
        <TouchableOpacity onPress={() => hideActionSheet()} style={{ padding: 15 }}>
          <Text style={{ textAlign: 'center', fontSize: 20 }}>Cancel</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
