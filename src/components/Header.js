import React from 'react';
import { View, Text, StyleSheet ,Picker} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { fetchMatches ,setFilter} from '../store/matchSlice';
import { LogoIcon, AlertIcon, LoadingIcon } from "../../assets/icon";
import Button from "../components/Button";

export default function Header() {
    const { filter ,isLoading, error } = useSelector((state) => state.matches);
    
    const dispatch = useDispatch();

    const handleFilterChange = (filterValue) => {
        dispatch(setFilter(filterValue)); // Обновляем фильтр в глобальном состоянии
    };

    return (
        <View style={styles.header}>
            <View style={styles.rightSide}>
                <LogoIcon />
                <Picker
                    selectedValue={filter}
                    onValueChange={handleFilterChange}
                    style={styles.picker}
                >
                    <Picker.Item label="Все матчи" value="All" />
                    <Picker.Item label="Текущие" value="Live" />
                    <Picker.Item label="Завершенные" value="Finished" />
                </Picker>
            </View>

            <View style={styles.rightSide}>
                {error && (
                    <View style={styles.error}>
                        <AlertIcon />
                        <Text style={styles.errorText}>{error || 'Ошибка: не удалось загрузить информацию'}</Text>
                    </View>
                )}
                <Button
                    disabled={isLoading}
                    onPress={() => dispatch(fetchMatches())}
                    text={'Обновить'}
                    icon={<LoadingIcon />}
                />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    header: {
        marginBottom: 20,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 12,
    },
    picker: {
        marginLeft:24,
        height: 57,
        minWidth: 170,
        color: '#fff', 
        backgroundColor: '#0B0E12', 
        borderRadius: 4,
        borderColor: 'none',
        borderWidth: 0,
        paddingVertical:16,
        paddingHorizontal:16
    },
    rightSide: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
    },
    error: {
        display: 'flex',
        alignItems: 'center',
        gap: 10,
        backgroundColor: '#0F1318',
        paddingVertical: 14,
        paddingHorizontal: 16,
        borderRadius: 4,
    },
    errorText: {
        fontWeight: '500',
        color: '#fff',
        fontSize: 18,
        lineHeight: 1
    },
});
