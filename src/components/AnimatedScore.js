import React, { useState, useRef, useEffect } from 'react';
import { View, Text, Animated, StyleSheet } from 'react-native';

const AnimatedScore = ({ score }) => {
    const [prevScore, setPrevScore] = useState(score);
    const animatedScore = useRef(new Animated.Value(score)).current; 

    useEffect(() => {
        if (score !== prevScore) {
            
            Animated.timing(animatedScore, {
                toValue: score, 
                duration: 500,
                useNativeDriver: false,
            }).start();

            setPrevScore(score);
        }
    }, [score, prevScore, animatedScore]);

    return (
        <View style={styles.scoreWrapper}>
            <Animated.Text style={[styles.scoreText, { opacity: animatedScore.interpolate({
                inputRange: [0, 1],
                outputRange: [0, 1],
            }) }]}>
                {animatedScore.interpolate({
                    inputRange: [0, score],
                    outputRange: [prevScore, score],
                }).toFixed(0)}
            </Animated.Text>
        </View>
    );
};

const styles = StyleSheet.create({
    scoreWrapper: {
        padding: 10,
        backgroundColor: '#1A1F26',
        borderRadius: 5,
        margin: 10,
    },
    scoreText: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#fff',
    },
});

export default AnimatedScore;
