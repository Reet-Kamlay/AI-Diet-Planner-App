import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native'
import React,{ useContext, useState }  from 'react'
import Colors from '../../shared/Colors'
import Input from './../../components/shared/Input'
import { HugeiconsIcon } from '@hugeicons/react-native'
import { Dumbbell01Icon, FemaleSymbolIcon, MaleSymbolIcon, PlusSignSquareIcon, WeightScaleIcon } from '@hugeicons/core-free-icons'
import Button from './../../components/shared/Button'
import { useMutation, useConvex } from 'convex/react'
import {api} from './../../convex/_generated/api'
import { UserContext } from '../../context/UserContext'
import { useRouter } from 'expo-router'
import { CalculateCaloriesAI } from '../../services/AiModel'
import Prompt from '../../shared/Prompt'

export default function Preferance() {
    const [weight,setWeight]=useState();
    const [height,setHeight]=useState();
    const [gender,setGender]=useState();
    const [goal,setGoal]=useState();
    const {user,setUser}=useContext(UserContext)
    const router = useRouter();
    const convex = useConvex();
    const UpdateUserPref = useMutation(api.Users.UpdateUserPref);

    const OnContinue = async () => {
  if (!weight || !height || !gender) {
    Alert.alert("Fill All details", "Enter all details to continue");
    return;
  }

  const userData = {
    uid: user?._id,
    weight,
    height,
    gender,
    goal,
  };

  try {
    const PROMPT = JSON.stringify(userData) + Prompt.CALORIES_PROMPT;
    const AIResult = await CalculateCaloriesAI(PROMPT);
    const rawText = AIResult.choices[0].message.content.trim();

    console.log("🧠 AI Raw Response:\n", rawText);

    const nutritionData = JSON.parse(rawText);

    console.log("✅ Parsed JSON:\n", nutritionData);

    const result = await UpdateUserPref({
      uid: user._id,
      weight,
      height,
      gender,
      goal,
      calories: nutritionData.calories,
      proteins: nutritionData.proteins,
    });

    setUser((prev) => ({
      ...prev,
      ...userData,
      ...nutritionData,
    }));

    router.replace("/(tabs)/Home");
  } catch (err) {
    console.error("❌ Error in OnContinue:", err);
    Alert.alert("Something went wrong", "Please try again.");
  }
};





    return (
        <View style={{
            padding: 20,
            backgroundColor: Colors.WHITE,
            height: '100%'
        }}>
            <Text style={{
                textAlign: 'center',
                fontSize: 30,
                fontWeight: 'bold',
                marginTop: 30
            }}>Tell us about yourself</Text>
            <Text style={{
                fontSize: 16,
                textAlign: 'center',
                color: Colors.GRAY
            }}>This help us create your personalized meal plan</Text>

            {/* Inputs */}
            <View style={{
                display: 'flex',
                flexDirection: 'row',
                gap: 10
            }}>
                <View style={{ flex: 1 }}>
                    <Input placeholder={'e.g 70'} label='Weight (Kg)' onChangeText={setWeight} />
                </View>
                <View style={{ flex: 1 }}>
                    <Input placeholder={'e.g 5.10'} label='Height (ft)' onChangeText={setHeight} />
                </View>
            </View>

            {/* Gender */}
            <View style={{ marginTop: 20 }}>
                <Text style={{ fontWeight: 'medium', fontSize: 18 }}>Gender</Text>
                <View style={{ display: 'flex', flexDirection: 'row', gap: 10 }}>
                    <TouchableOpacity onPress={() => setGender('Male')} style={{
                        borderWidth: 1,
                        padding: 15,
                        borderColor: gender === "Male" ? Colors.PRIMARY : Colors.GRAY,
                        borderRadius: 10,
                        flex: 1,
                        alignItems: 'center'
                    }}>
                        <HugeiconsIcon icon={MaleSymbolIcon} size={40} color={Colors.BLUE} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => setGender('Female')} style={{
                        borderWidth: 1,
                        padding: 15,
                        borderColor: gender === "Female" ? Colors.PRIMARY : Colors.GRAY,
                        borderRadius: 10,
                        flex: 1,
                        alignItems: 'center'
                    }}>
                        <HugeiconsIcon icon={FemaleSymbolIcon} size={40} color={Colors.PINK} />
                    </TouchableOpacity>
                </View>
            </View>

            {/* Goal */}
            <View style={{ marginTop: 15 }}>
                <Text style={{ fontWeight: 'medium', fontSize: 18 }}>What&apos;s Your Goal?</Text>
                <TouchableOpacity onPress={() => setGoal('Weight Loss')} style={[styles.goalContainer, {
                    borderColor: goal === 'Weight Loss' ? Colors.PRIMARY : Colors.GRAY
                }]}>
                    <HugeiconsIcon icon={WeightScaleIcon} />
                    <View>
                        <Text style={styles.goalText}>Weight Loss</Text>
                        <Text>Reduce body fat and get leaner</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setGoal('Muscle Gain')} style={[styles.goalContainer, {
                    borderColor: goal === 'Muscle Gain' ? Colors.PRIMARY : Colors.GRAY
                }]}>
                    <HugeiconsIcon icon={Dumbbell01Icon} />
                    <View>
                        <Text style={styles.goalText}>Muscle Gain</Text>
                        <Text>Build Muscle and get Stronger</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setGoal('Weight Gain')} style={[styles.goalContainer, {
                    borderColor: goal === 'Weight Gain' ? Colors.PRIMARY : Colors.GRAY
                }]}>
                    <HugeiconsIcon icon={PlusSignSquareIcon} />
                    <View>
                        <Text style={styles.goalText}>Weight Gain</Text>
                        <Text>Increase healthy body mass</Text>
                    </View>
                </TouchableOpacity>
            </View>

            {/* Continue Button */}
            <View style={{ marginTop: 25 }}>
                <Button title={'Continue'} onPress={OnContinue} />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    goalContainer: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        gap: 20,
        padding: 15,
        borderWidth: 1,
        borderColor: Colors.GRAY,
        borderRadius: 15,
        marginTop: 10
    },
    goalText: {
        fontSize: 20,
        fontWeight: 'bold'
    },
    goalSubText: {
        color: Colors.GRAY
    }
});
