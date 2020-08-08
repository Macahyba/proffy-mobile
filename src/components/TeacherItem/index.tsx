import React, { useState } from 'react';
import { View, Image, Text, Linking } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-community/async-storage';

import heartOutlineIcon from '../../assets/images/icons/heart-outline.png';
import unBookmarkIcon from '../../assets/images/icons/unfavorite.png';
import whatsappIcon from '../../assets/images/icons/whatsapp.png';

import api from '../../services/api';
import styles from './styles';


export interface Teacher {
    id: number;
    avatar: string;
    bio: string;
    cost: number;
    name: string;
    subject: string;
    whatsapp: string;
};

interface TeacherItemProps {
    teacher: Teacher;
    bookmark: boolean;
}

const TeacherItem: React.FC<TeacherItemProps> = ({ teacher, bookmark }) => {
    const [isBookmark, setIsBookmark] = useState(bookmark);

    function handleLinkToWhatsapp(){

        api.post('connections', {
            user_id: teacher.id
        })
        Linking.openURL(`whatsapp://send?phone=${teacher.whatsapp}`)
    }

    async function handleToggleBookmark() {
        const bookmarks = await AsyncStorage.getItem('bookmarks');
        let bookmarkArray: Array<Teacher> = []

        if (bookmarks) bookmarkArray = JSON.parse(bookmarks);     

        if (isBookmark) {

            const bookmarkIndex = bookmarkArray.findIndex((teacherItem: Teacher) => {
                return teacherItem.id === teacher.id;
            })

            bookmarkArray.splice(bookmarkIndex, 1);
            setIsBookmark(false);
        } else {

            bookmarkArray.push(teacher);
            setIsBookmark(true);
        }

        await AsyncStorage.setItem('bookmarks', JSON.stringify(bookmarkArray));
    }

    return (
        <View style={styles.container} >
            <View style={styles.profile}>
                <Image 
                    style={styles.avatar}
                    source={{ uri: teacher.avatar }} 
                />

                <View style={styles.profileInfo} >
                    <Text style={styles.name} >{teacher.name}</Text>
                    <Text style={styles.subject} >{teacher.subject}</Text>
                </View>
            </View>

            <Text style={styles.bio} >{teacher.bio.replace('\n','\n')}</Text>

            <View style={styles.footer}>
                <Text style={styles.price}>
                    Preço/hora {'  '}
                    <Text style={styles.priceValue}>R$ {teacher.cost}</Text>
                </Text>

                <View style={styles.buttonContainer}>
                    <RectButton 
                        onPress={handleToggleBookmark}
                        style={[
                            styles.bookmarkButton, 
                            isBookmark ? styles.bookmark : {}
                        ]}>
                        { isBookmark 
                            ? <Image source={unBookmarkIcon} /> 
                            : <Image source={heartOutlineIcon} /> 
                        }                        
                    </RectButton>

                    <RectButton onPress={handleLinkToWhatsapp} style={styles.contactButton}>
                        <Image source={whatsappIcon} />   
                        <Text style={styles.contactButtonText}>Entrar em contato</Text>                     
                    </RectButton>
                </View>
            </View>
        </View>
    )
}

export default TeacherItem;