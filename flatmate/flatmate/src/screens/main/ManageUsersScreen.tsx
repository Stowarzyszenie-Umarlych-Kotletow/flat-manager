import * as React from "react";
import {useState} from "react";
import styles from "../../static/styles";
import {Text, View, TouchableOpacity, ScrollView} from "react-native";
import {Button} from "react-native-elements";
import {AddUserToFlatModal} from '../../components/main/AddUserToFlatModal';
import {useFlat} from "../../features/hooks";
import {useDeleteUserFromFlatMutation} from "../../features/api/flat-api";
import {useAppSelector} from "../../store";
import {BottomNavigationBar} from "../../components/main/BottomNavigationBar";
import {showMessage} from "react-native-flash-message";

const userDeleteIcon = require("../../static/userDelete.svg") as string;

export function ManageUsersScreen({navigation}) {

  const username = useAppSelector((state) => state.auth.user?.username);
  const [showAddUserToFlatModal, setShowAddUserToFlatModal] = useState(false);
  const [deleteUserWarning, setDeleteUserWarning] = useState(null);
  const {flatId, flatUsers} = useFlat();
  const [deleteUserFromFlat] = useDeleteUserFromFlatMutation();

  async function handleDeleteUser(userId: string) {
    let warning: string = null;
    try {
      await deleteUserFromFlat({flatId, userId}).unwrap();
      showMessage({
        message: "User deleted",
        type: "success"
      })
    } catch {
      showMessage({
        message: `Cannot delete user`,
        type: "danger"
      })
    }
    setDeleteUserWarning(warning);
  }

  return (
    <View style={styles.container1Navbar}>
      <Text style={styles.logoText}> Users </Text>
      <Button
        buttonStyle={styles.greenButton}
        title="Add user"
        onPress={() => setShowAddUserToFlatModal(true)}
      />
      <ScrollView style={styles.container2Navbars}>
        {!deleteUserWarning == null ? null : <Text style={styles.warningText}>{deleteUserWarning}</Text>}
        {flatUsers.map((user) => {
          if (user.username != username) return (
            <View
              style={styles.card}
              key={user.id}
            >
              <View style={styles.viewRow}>
                <Text style={styles.cardTitle}>{user.username}</Text>
                <TouchableOpacity
                  onPress={() => {
                    handleDeleteUser(user.id);
                  }}
                >
                  <img src={userDeleteIcon} alt=" " style={{width: '20px', height: '20px'}}/>
                </TouchableOpacity>
              </View>
            </View>
          );
        })
        }
      </ScrollView>

      {showAddUserToFlatModal ? (<AddUserToFlatModal
        setShowAddUserToFlatModal={setShowAddUserToFlatModal}
      />) : null}
      <BottomNavigationBar navigation={navigation}/>
    </View>
  );
}
