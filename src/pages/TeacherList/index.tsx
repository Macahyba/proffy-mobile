import React, { useState, useCallback } from 'react';
import { View, ScrollView, Text } from 'react-native';
import { BorderlessButton, RectButton } from 'react-native-gesture-handler';
import { Feather } from '@expo/vector-icons';
import AsyncStorage from '@react-native-community/async-storage';
import {Picker} from '@react-native-community/picker';
import DateTimePicker from '@react-native-community/datetimepicker';

import PageHeader from '../../components/PageHeader';
import TeacherItem, { Teacher } from '../../components/TeacherItem';

import api from '../../services/api';

import styles from './styles';
import { useFocusEffect } from '@react-navigation/native';

function TeacherList(){
    const [teachers, setTeachers] = useState([]);
    const [bookmarks, setBookmarks] = useState<number[]>([]);
    const [ isFiltersVisible, setIsFiltersVisible ] = useState(false);
    const [viewTimePicker, setViewTimePicker] = useState(false);

    const [subject, setSubject] = useState('');
    const [week_day, setWeekDay] = useState('');
    const [time, setTime] = useState('');

    function loadBookmarks() {
        AsyncStorage.getItem('bookmarks').then(response => {
            if (response) {
                const bookmarkTeachers = JSON.parse(response);
                const bookmarkTeachersIds = bookmarkTeachers.map((teacher: Teacher) => {
                    return teacher.id;
                })

                setBookmarks(bookmarkTeachersIds);
            }
        });
    
    }

    useFocusEffect(useCallback(() => {
        loadBookmarks();
    }, []));

    function handleToggleFiltersVisible(){
        setIsFiltersVisible(!isFiltersVisible);
    }

    async function handleFiltersSubmit(){
        loadBookmarks();

        const response = await api.get('classes', {
            params :{
                subject,
                week_day,
                time
            }
        })

        setIsFiltersVisible(false);
        setTeachers(response.data);
    }

    const showTimePicker = () => {
        setViewTimePicker(true);
    };

    const handleWeekDay = (value: any) => {
        setWeekDay(value);
    }

    const handleSelectTime = (value: any) => {   
        setViewTimePicker(false);  
        if (value.nativeEvent.timestamp) {
            const miliSeconds = new Date(value.nativeEvent.timestamp)
            setTime(
                ("0" + miliSeconds.getHours()).slice(-2) + ':' + 
                ("0" + miliSeconds.getMinutes()).slice(-2)
                .toString());
        } else {
            setTime('')
        }
    }


    return(
        <View style={styles.container} >
            <PageHeader 
                title="Proffys disponíveis" 
                headerRight={(
                    <BorderlessButton onPress={handleToggleFiltersVisible}>
                        <Feather name="filter" size={20} color='#FFF' />
                    </BorderlessButton>
                )}
            >
                { isFiltersVisible && (
                    <View style={styles.searchForm}>
                        <Text style={styles.label}>Matéria</Text>
                        <View style={styles.input}>
                            <Picker 
                                selectedValue={subject}
                                onValueChange={(value) =>setSubject(value.toString())}
                            >
                                <Picker.Item label="Selecione..." value="" />
                                <Picker.Item label="Matemática" value="Matemática" />
                                <Picker.Item label="Física" value="Física" />
                                <Picker.Item label="Geografia" value="Geografia" />
                                <Picker.Item label="Química" value="Química" />
                                <Picker.Item label="Portugês" value="Portugês" />
                            </Picker>                          
                        </View>
                        <View style={styles.inputGroup} >
                            <View style={styles.inputBlockWeek}>
                                <Text style={styles.label}>Dia da semana</Text>
                                <View style={styles.input}>
                                    <Picker 
                                        selectedValue={week_day}
                                        onValueChange={(value) => handleWeekDay(value)}
                                    >
                                        <Picker.Item label="Selecione..." value="" />
                                        <Picker.Item label="Domingo" value={0} />
                                        <Picker.Item label="Segunda-Feira" value={1} />
                                        <Picker.Item label="Terça-Feira" value={2} />
                                        <Picker.Item label="Quarta-Feira" value={3} />
                                        <Picker.Item label="Quinta-Feira" value={4} />
                                        <Picker.Item label="Sexta-Feira" value={5} />
                                        <Picker.Item label="Sábado" value={6} />
                                    </Picker>        
                                </View>                        
                            </View>
                            <View style={styles.inputBlockTime}>
                                <Text style={styles.label}>Horário</Text>
                                <View>
                                    <RectButton style={styles.timeButton} onPress={showTimePicker}>
                                        <Text style={styles.timeButtonText}>{time}</Text>
                                    </RectButton>
                                </View>
                                { viewTimePicker && (<DateTimePicker
                                    value={new Date(0)}
                                    mode="time"
                                    is24Hour={true}
                                    display="default"
                                    onChange={value => handleSelectTime(value)}
                                />)}                             
                            </View>
                        </View>
                        <RectButton onPress={handleFiltersSubmit} style={styles.submitButton}>
                            <Text style={styles.submitButtonText}>Filtrar</Text>
                        </RectButton>
                    </View>       
                )}
            </PageHeader>

            <ScrollView 
                style={styles.teacherList}
                contentContainerStyle={{ 
                    paddingHorizontal: 16,
                    paddingBottom: 16
                 }}
            >
                { teachers.map((teacher: Teacher) => {
                    return (
                        <TeacherItem 
                            key={teacher.id} 
                            teacher={teacher}
                            bookmark={bookmarks.includes(teacher.id)}
                        />)}
                )}
            </ScrollView>
        </View>        
    )
}

export default TeacherList;