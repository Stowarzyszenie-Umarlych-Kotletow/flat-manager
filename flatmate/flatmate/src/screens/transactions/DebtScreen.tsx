import { TextInput, Text, View, ScrollView } from "react-native";
import { useState } from "react";
import styles from "../../static/styles";
import { Button } from "react-native-elements";
import {useFlat} from "../../features/hooks";
import * as React from "react";
import {BottomNavigationBar} from "../../components/main/BottomNavigationBar";
import { DebtModal } from "../../components/transactions/DebtModal";



export function DebtScreen({navigation}) {
  const [showDebt, setShowDebt] = useState(false);

  function getUsername(userId: string): string {
    const { flatUsers } = useFlat();
    for (const user of flatUsers) {
        if(userId == user.id)
            return user.username;
    }
    return "Unknown user";
  }

  // function that returns money that i owe to others
  function getMyDebt() {
    //TODO: backend connection
    return {
      "1": "123",
      "2": "8",
      "3": "12",
      "4": "0",
    }
  }

  
  // function that returns money that others owe to me
  function getOthersDebt() {
    //TODO: backend connection
    return {
      "1": "0",
      "2": "13",
      "3": "65",
      "4": "54",
      "5": "65",
      "6": "54",
      "7": "65",
      "8": "54",
    }
  }

  return(
    <View style={styles.container1Navbar} >
    <Text style={styles.logoText}>Debts</Text>
    <Button
      buttonStyle={styles.greenButton}
      title="Add Payment"
      onPress={() => setShowDebt(true)}
    />
    <Text > </Text> {/* a breakline */} 
    <ScrollView style={styles.container2Navbars} >

      <Text style={styles.bigText}> My debt to others</Text>
      <View style={styles.borderLeftRed}>
      {Object.keys(getMyDebt()).map((id, index)=>{
        let value = getMyDebt()[id]; 
        if (value != "0") {
        return (
          <Text key={id} style={styles.smallText}>{getUsername(id)} - {value} </Text>
      )}})}
      </View>

      <Text style={styles.bigText} > Others's debt to me </Text>
      <View style={styles.borderLeftGreen}>
      {Object.keys(getOthersDebt()).map((id, index)=>{
        let value = getOthersDebt()[id]; 
        if (value != "0") {
        return (
          <Text key={id} style={styles.smallText}>{getUsername(id)} - {value} </Text>
      )}})}
      </View>
      
    </ScrollView>

    {showDebt? (<DebtModal setShowDebt={setShowDebt}/>) : null}
    
	  <BottomNavigationBar navigation={navigation} />
  </View>);
}
