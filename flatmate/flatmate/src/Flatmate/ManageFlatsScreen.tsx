import * as React from "react";
import {useState} from "react";
import styles from "../static/styles";
import {Text, View} from "react-native";
import {Button} from "react-native-elements";
import {CreateFlatModal} from "./CreateFlatModal";

export function ManageFlatsScreen({navigation, currentFlat = null, setCurrentFlat}) {
    const [showCreateFlatModal, setShowCreateFlatModal] = useState(false);

    function getFlats() {
        const flats = [
            {
                name: "Rzeczna 21", 
                id: "231f13d12"
            }, {
                name: "Domek - wyjzad w Bieszczady", 
                id: "edq21eq21s"
            }, {
                name: "Domek - wyjzad w Bieszczady2", 
                id: "edq21ewrreq21s"
            }, {
                name: "Domek - wyjzad w Bieszczady3", 
                id: "edq2wer1eq21s"
            }
        ];
        // backend connection
        // get flats user is assigned to

        return flats;
    }

    function handleClickOnFlat(flat_id) {
        setCurrentFlat(flat_id)
        console.log(flat_id)
        if (currentFlat != null) navigation.popToTop()
    }

    return (
    <View style={{
        overflow: "scroll", 
        height: 'calc(100vh - 75px)', 
        display: "flex", 
        flexDirection: "column", 
        paddingBottom: "20px"
        }}
    >
        <Text style={styles.logoText}>Manage flats</Text>
        <Button
            buttonStyle={styles.greenButton}
            title="Create flat"
            onPress={() => setShowCreateFlatModal(true)}
        />
        {getFlats().map((flat) => {
            return (<Button
                    buttonStyle={styles.highButton}
                    title={flat.name}
                    key={flat.id}
                    onPress={() => handleClickOnFlat(flat.id)}
                />);
        })}
        <CreateFlatModal
            showCreateFlatModal={showCreateFlatModal}
            setShowCreateFlatModal={setShowCreateFlatModal}
            setCurrentFlat={setCurrentFlat}
        />
    </View>)
}