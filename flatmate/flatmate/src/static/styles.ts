import { Background } from "@react-navigation/elements";
import { StyleSheet , Dimensions} from "react-native";
import { withTheme } from "react-native-elements";

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export default StyleSheet.create({
    eventFail: {
        backgroundColor: 'rgba(214, 61, 57, 1)'
    },
    eventPending: {
        backgroundColor: 'rgba(78, 116, 289, 1)'
    },
    eventCompleted: {
        backgroundColor: 'rgba(111, 202, 186, 1)',
    },
    eventFuture: {
        backgroundColor: 'rgb(182,117,245)'
    },
    accScreenContainer: {
        flex: 1,
    },
    errText:{
        fontSize: 20,
        fontWeight: "500",
        textAlign: 'center',
        color: '#ff0000',
    },
    smallTextCenter: {
        fontSize: 20,
        fontWeight: "500",
        marginTop: 20,
        marginBottom: 20,
        textAlign: 'center',
    },
    tinyTextCenter: {
        fontSize: 15,
        fontWeight: 'bold',
        marginTop: 5,
        marginBottom: 5,
        textAlign: 'center',
    },
    smallText: {
        fontSize: 20,
        fontWeight: 'bold',
        marginTop: 5,
        marginBottom: 5,
        textAlign: 'auto',
    },
    bigText: {
        fontSize: 25,
        fontWeight: 'bold',
        marginTop: 5,
        marginBottom: 5,
        textAlign: 'auto',
    },
    bigTextCenter: {
        fontSize: 25,
        fontWeight: 'bold',
        marginTop: 5,
        marginBottom: 5,
        textAlign: 'center',
    },
    warningText: {
        fontSize: 13,
        fontWeight: 'bold',
        marginTop: 5,
        marginBottom: 5,
        color: 'red',
        textAlign: 'center',
    },
    loginLogoText: {
        fontSize: 40,
        fontWeight: "800",
        marginTop: 150,
        marginBottom: 30,
        textAlign: 'center',
    },
    logoText: {
        fontSize: 40,
        fontWeight: "800",
        marginTop: 15,
        marginBottom: 15,
        textAlign: 'center',
    },
    textInput: {
        height: 45,
        minWidth: 100,
        fontSize: 14,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: '#eaeaea',
        backgroundColor: '#fafafa',
        paddingLeft: 10,
        marginLeft: 5,
        marginRight: 5,
        marginTop: 5,
        marginBottom: 5,
    },
    blueButton: {
        backgroundColor: '#3897f1',
        borderRadius: 5,
        height: 45,
        marginTop: 10,
        marginLeft: 25,
        marginRight: 25,
    },
    greenButton: {
        backgroundColor: '#5cd07f',
        borderRadius: 5,
        height: 45,
        marginTop: 10,
        marginLeft: 25,
        marginRight: 25,
    },
    redButton: {
        backgroundColor: '#e74040',
        borderRadius: 5,
        height: 45,
        marginTop: 10,
        marginLeft: 25,
        marginRight: 25,
    },
    orangeButton: {
        backgroundColor: '#ff9933',
        borderRadius: 5,
        height: 45,
        marginTop: 10,
        marginLeft: 25,
        marginRight: 25,
    },
    blueButtonTall: {
        backgroundColor: '#3897f1',
        borderRadius: 5,
        height: 100,
        marginTop: 10,
        marginLeft: 25,
        marginRight: 25,
    },
    orangeButtonTall: {
        backgroundColor: '#ff9933',
        borderRadius: 5,
        height: 100,
        marginTop: 10,
        marginLeft: 25,
        marginRight: 25,
    },
    greenButtonNarrow: {
        backgroundColor: '#5cd07f',
        borderRadius: 5,
        height: 45,
        marginTop: 10,
        marginLeft: 5,
        marginRight: 5,
        width: windowWidth * 0.35
    },
    blueButtonNarrow: {
        backgroundColor: '#3897f1',
        borderRadius: 5,
        height: 45,
        marginTop: 10,
        marginLeft: 5,
        marginRight: 5,
        width: windowWidth * 0.35
    },
    redButtonNarrow: {
        backgroundColor: '#e74040',
        borderRadius: 5,
        height: 45,
        marginTop: 10,
        marginLeft: 5,
        marginRight: 5,
        width: windowWidth * 0.35
    },
    orangeButtonNarrow: {
        backgroundColor: '#ff9933',
        borderRadius: 5,
        height: 45,
        marginTop: 10,
        marginLeft: 5,
        marginRight: 5,
        width: windowWidth * 0.35
    },
    imageUploadContainer: {
        padding:50,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    borderLeftBlack: {
        borderLeftColor: '#000000',
        borderLeftWidth: 4,
        paddingLeft: 5
    },
    borderLeftRed: {
        borderLeftColor: '#ff0000',
        borderLeftWidth: 4,
        paddingLeft: 5
    },
    borderLeftGreen: {
        borderLeftColor: '#00ff00',
        borderLeftWidth: 4,
        paddingLeft: 5
    },
    columnView: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
    },
    viewRowSpaceAround: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: "space-around",
        alignItems: 'center'
    },
    viewRow: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: "space-between",
        alignItems: 'center'
    },
    viewColumnCenter: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: "space-around"
        
    },
    card: {
        borderColor: 'rgb(0, 102, 255)',
        borderWidth: 1,
        borderRadius: 5,
        paddingHorizontal: 20,
        marginTop: 20,
        marginStart: 20,
        marginEnd: 20,
    },
    cardDisabled: {
        opacity: 0.6,
        borderColor: 'rgb(255, 0, 0)',
        borderWidth: 1,
        borderRadius: 5,
        paddingHorizontal: 20,
        marginTop: 20,
        marginStart: 20,
        marginEnd: 20,
    },
    cardTitle: {
        fontSize: 22,
        fontWeight: "bold",
        marginTop: 5,
        marginBottom: 5,
    },
    cardText: {
        fontSize: 20,
        fontWeight: "500",
        marginTop: 5,
        marginBottom: 5,
    },
    container1Navbar: {
        height: windowHeight - 75,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center"
    },
    container2Navbars: {
        paddingBottom: 95,
        paddingHorizontal: 10,
    }
});

