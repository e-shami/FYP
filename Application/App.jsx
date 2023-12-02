import {StatusBar, StyleSheet, Text, View} from 'react-native';
import MainApp from "./root/Screens/MainApp";
import SessionProvider from "./root/Context/SessionContext";
import NotificationProvider from "./root/Context/NotificationContext";


export default function App() {
    return (
        <SessionProvider>
            <NotificationProvider>
                <StatusBar style="light"  />
                <MainApp/>
            </NotificationProvider>
        </SessionProvider>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
