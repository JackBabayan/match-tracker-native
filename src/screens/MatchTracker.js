import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchMatches , updateMatchAction } from '../store/matchSlice';
import { View, Text, ActivityIndicator, FlatList, StyleSheet } from 'react-native';
import MatchItem from '../components/MatchItem';

const MatchTracker = () => {
    const dispatch = useDispatch();
    const { filter ,matches, isLoading, error } = useSelector((state) => state.matches);

    const filteredMatches = matches.filter((match) => {
        if (filter === 'All') return true;
        if (filter === 'Live') return match.status === 'Ongoing';
        if (filter === 'Finished') return match.status === 'Finished';
        return true;
    });

    useEffect(() => {

        dispatch(fetchMatches());
        
        const socket = new WebSocket('wss://app.ftoyd.com/fronttemp-service/ws');

        socket.onmessage = (event) => {
            const data = JSON.parse(event.data);
            if (data.type === 'update_matches') {
                data.data.forEach((updatedMatch) => {
                    dispatch(updateMatchAction(updatedMatch));
                });
            }
        };

        socket.onerror = (error) => {
            console.log('WebSocket ошибка: ', error);
        };

        return () => {
            socket.close();
        };
    }, [dispatch]);

    if (isLoading) {
        return (
            <View style={styles.matchContainer}>
                <ActivityIndicator size="large" color="#EB0237" />
            </View>
        );
    }

    if (error) {
        return (
            <View style={styles.matchContainer}>
                <Text style={styles.errorText}>{error}</Text>
            </View>
        );
    }

    return (
        <View style={styles.matchContainer}>
            {filteredMatches.length > 0 ? (
                <FlatList
                    data={filteredMatches}
                    renderItem={({ item }) => <MatchItem match={item} />}
                    keyExtractor={(item) => item.time.toString()}
                    initialNumToRender={10}
                    maxToRenderPerBatch={10}
                    style={styles.matchContainerList}
                />
            ) : (
                <Text>Нет матчей</Text>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    matchContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        minHeight: '80%',
        width: "100%",
    },
    matchContainerList: {
        width: "100%",
    },
    errorText: {
        color: 'red',
        fontSize: 16,
        textAlign: 'center',
    },
});

export default MatchTracker;
