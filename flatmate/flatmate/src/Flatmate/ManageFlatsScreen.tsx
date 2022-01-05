import * as React from "react";
import {useState} from "react";
import styles from "../static/styles";
import {Text, View} from "react-native";
import {Button} from "react-native-elements";
import {CreateFlatModal} from "./CreateFlatModal";
import { useAppDispatch, useFlatContext, useAppSelector } from "../store";
import flatSlice, { getUserFlats, getFlatTasks } from "../features/flat";


export function ManageFlatsScreen({navigation}) {
    const [showCreateFlatModal, setShowCreateFlatModal] = useState(false);

    const flats = useAppSelector(state => state.flat.flats);
    const test_f = useAppSelector(state => state);
    const selectedFlatId = useAppSelector(state => state.flat.selectedFlatId);
    const dispatch = useAppDispatch();
    const flatContext = useFlatContext();

    React.useEffect(() => {
        dispatch(getUserFlats());
    }, []);


    function handleClickOnFlat(flatId) {
        dispatch(flatSlice.actions.setCurrentFlat(flatId));
        if (flatId !== null)
            navigation.popToTop();
        console.log(flatId);
        console.log("state", test_f)
        dispatch(getFlatTasks(flatContext?.id));
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
        {Object.values(flats).map((flat) => {
            return (<Button
                    buttonStyle={styles.highButton}
                    title={flat.name}
                    key={flat.id}
                    onPress={() => handleClickOnFlat(flat.id)}
                />);
        })}
        {showCreateFlatModal ? (<CreateFlatModal
            setShowCreateFlatModal={setShowCreateFlatModal}
        />) : null}
        
    </View>)
}