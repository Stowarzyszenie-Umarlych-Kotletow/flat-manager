import { TextInput, Text, View, ScrollView } from "react-native";
import { useState } from "react";
import styles from "../../static/styles";
import { Button } from "react-native-elements";
import { useFlat } from "../../features/hooks";
import * as React from "react";
import { BottomNavigationBar } from "../../components/main/BottomNavigationBar";
import { DebtModal } from "../../components/transactions/DebtModal";
import { useGetFlatDebtsQuery } from "../../features/api/flat-api";
import { CURRENCY } from "../../config";



export function DebtScreen({ navigation }) {
  const [showDebt, setShowDebt] = useState(false);
  const { flatId, flatUsers } = useFlat();
  const { currentData: myDebt = [] } = useGetFlatDebtsQuery({flatId}, { refetchOnMountOrArgChange: true });

  function getUsername(userId: string): string {
    for (const user of flatUsers) {
      if (userId == user.id)
        return user.username;
    }
    return "Unknown user";
  }


  return (
    <View style={styles.container1Navbar} >
      <Text style={styles.logoText}>Debts</Text>
      <Text > </Text> {/* a breakline */}
      <ScrollView style={styles.container2Navbars} >

        <Text style={styles.bigText}> My debt</Text>
        <View style={styles.borderLeftRed}>
          {myDebt.map((debt) => {
              return (
                <Text key={debt.userId} style={styles.smallText}>{getUsername(debt.userId)} - {(+debt.amount).toFixed(2)} {CURRENCY} </Text>
              )
          })}
        </View>



      </ScrollView>

      {showDebt ? (<DebtModal setShowDebt={setShowDebt} />) : null}

      <BottomNavigationBar navigation={navigation} />
    </View>);
}
