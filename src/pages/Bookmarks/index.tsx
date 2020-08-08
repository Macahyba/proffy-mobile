import React, { useState, useCallback } from 'react';
import { View, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { useFocusEffect } from '@react-navigation/native'

import PageHeader from '../../components/PageHeader';
import TeacherItem, { Teacher } from '../../components/TeacherItem';

import styles from './styles';


function Bookmarks(){
    const [bookmarks, setBookmarks] = useState([]);

    function loadBookmarks() {
        AsyncStorage.getItem('bookmarks').then(response => {
            if (response) {

                const bookmarkTeachers = JSON.parse(response);
                setBookmarks(bookmarkTeachers);
            }
        });
    
    }

    useFocusEffect(useCallback(() => {
        loadBookmarks();
    }, []));

    return(
        <View style={styles.container} >
            <PageHeader title="Meus Proffys favoritos"/>

            <ScrollView 
                style={styles.teacherList}
                contentContainerStyle={{ 
                    paddingHorizontal: 16,
                    paddingBottom: 16
                }}
            >
                {bookmarks.map((teacher:Teacher) =>{
                    return (
                        <TeacherItem 
                            key={teacher.id}
                            teacher={teacher}
                            bookmark
                        />
                    )
                })}
            </ScrollView>
        </View>
    )
}

export default Bookmarks;