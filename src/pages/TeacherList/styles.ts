import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f0f0f7',
        justifyContent: 'space-evenly'
    },

    teacherList: {
        marginTop: -40
    },

    searchForm: {
        marginBottom: 24,
        justifyContent: 'space-between'
    },

    label: {
        color: '#d4c2ff',
        fontFamily: 'Poppins_400Regular'
    },

    inputGroup: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },

    inputBlockWeek: {
        width: '68%'
    },

    inputBlockTime: {
        width: '28%'
    },

    input: {
        height: 54,
        backgroundColor: '#FFF',
        borderRadius: 8,
        justifyContent: 'center',
        paddingHorizontal: 4,
        marginTop: 4,
        marginBottom: 16
    },

    timeButton: {
        height: 54,
        backgroundColor: '#FFF',
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 4,
        marginTop: 4,
        marginBottom: 16
    },

    timeButtonText: {
        fontSize: 16
    },

    submitButton: {
        backgroundColor: '#04d361',
        height: 56,
        borderRadius: 8,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },

    submitButtonText: {
        color: '#FFF',
        fontFamily: 'Archivo_700Bold',
        fontSize: 16
    }
});

export default styles;