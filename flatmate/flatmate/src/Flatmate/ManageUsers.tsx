import * as React from "react";
import { useState } from "react";
import styles from "../static/styles";
import { Text, View, TouchableOpacity } from "react-native";
import { Button } from "react-native-elements";
import { AddUserToFlatModal } from './AddUserToFlatModal';
import { BottomNavigationBar } from '../common/BottomNavigationBar';
import { useFlat } from "../features/hooks";

export function ManageUsers({navigation}) {
  
  const [showAddUserToFlatModal, setShowAddUserToFlatModal] = useState(false);

  function deleteUser(id) {
    // TODO: backend connection delete User
  }

  const { flatUsers } = useFlat();

  return (
    <View style={{ maxHeight: 'calc(100vh - 75px)' }}>
      <div style={{ overflowY: "scroll", height: 'calc(100vh - 150px)', display: "flex", flexDirection: "column" }}>
        <Text style={styles.logoText}> Tasks </Text>
        <Button
            buttonStyle={styles.greenButton}
            title="Add user"
            onPress={() => setShowAddUserToFlatModal(true)}
        />
        {flatUsers.map((user) => {
          return (
            <View
              style={styles.card}
              key={user.id}
            >
              <View style={styles.viewRow}>
                <Text style={styles.cardTitle}>{user.username}</Text>
                <TouchableOpacity 
                  onPress={() => {deleteUser(user.id);}}
                >
                  <Text style={styles.cardTitle}>❌</Text> 
                </TouchableOpacity>
              </View>
            </View>
          );
        })}
      </div>

      {showAddUserToFlatModal ? (<AddUserToFlatModal
        setShowAddUserToFlatModal={setShowAddUserToFlatModal}
      />): null}

      <BottomNavigationBar
        openUsers={() => { navigation.navigate('Users'); }}
        openTasks={() => { navigation.navigate('Tasks'); }}
        openCalendar={() => { navigation.navigate('ViewCalendarScreen'); }}
        openTransactionManager={() => {navigation.navigate('TransactionManagementView')}}
        openDashboard={()=>{navigation.navigate('DashboardScreen')}}
      />
    </View>

  );
}
