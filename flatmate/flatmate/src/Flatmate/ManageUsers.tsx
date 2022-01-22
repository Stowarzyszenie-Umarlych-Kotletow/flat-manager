import * as React from "react";
import { useState } from "react";
import styles from "../static/styles";
import { Text, View, TouchableOpacity, ScrollView } from "react-native";
import { Button } from "react-native-elements";
import { AddUserToFlatModal } from './AddUserToFlatModal';
import { BottomNavigationBar } from '../common/BottomNavigationBar';
import { useFlat } from "../features/hooks";
import { useDeleteUserFromFlatMutation } from "../features/api/flat-api";
import { useAppSelector } from "../store";

const userDeleteIcon = require("../static/userDelete.svg") as string;

export function ManageUsers({navigation}) {

  const username = useAppSelector((state) => state.auth.user?.username);
  const [showAddUserToFlatModal, setShowAddUserToFlatModal] = useState(false);
  const [deleteUserWarning, setDeleteUserWarning] = useState(null);
  const { flatId, flatUsers } = useFlat();
  const [deleteUserFromFlat] = useDeleteUserFromFlatMutation();

  async function deleteUser(userId:string) {
    // TODO: backend connection delete User test
    let warning: string = null;
    try {
      await deleteUserFromFlat({flatId, userId}).unwrap();
    } catch (err) {
      warning = `Cannot remove user (error ${err})`
    }
    setDeleteUserWarning(warning);
  }

  return (
    <View style={{ maxHeight: 'calc(100vh - 75px)' }}>
      <div style={{height: 'calc(100vh - 150px)', display: "flex", flexDirection: "column" }}>
        <Text style={styles.logoText}> Users </Text>
        <Button
            buttonStyle={styles.greenButton}
            title="Add user"
            onPress={() => setShowAddUserToFlatModal(true)}
        />
        {!deleteUserWarning == null ? null : <Text style={styles.warningText}>{deleteUserWarning}</Text>}
        <ScrollView>
        {flatUsers.map((user) => {
          if (user.username != username) return (
            <View
              style={styles.card}
              key={user.id}
            >
              <View style={styles.viewRow}>
                <Text style={styles.cardTitle}>{user.username}</Text>
                <TouchableOpacity 
                  onPress={() => {deleteUser(user.id);}}
                >
                <img src={userDeleteIcon} alt=" " style={{width: '20px', height: '20px'}}/>
                </TouchableOpacity>
              </View>
            </View>
          );})
        }
        </ScrollView>
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
