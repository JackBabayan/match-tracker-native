import React, { useState, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, useWindowDimensions, Animated, Platform, UIManager, Image } from 'react-native';
import { CommandIcon, ArrowDownIcon } from '../../assets/icon/index';

if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
}

const MatchItem = ({ match }) => {
    const [expanded, setExpanded] = useState(false);
    const { width } = useWindowDimensions();
    const isMobile = width < 768;
    const animation = useRef(new Animated.Value(0)).current;
    const rotation = useRef(new Animated.Value(0)).current;

    const [homeScore, setHomeScore] = useState(match.homeScore);
    const [awayScore, setAwayScore] = useState(match.awayScore);

    const homeScoreOldOpacity = useRef(new Animated.Value(1)).current;
    const awayScoreOldOpacity = useRef(new Animated.Value(1)).current;
    const homeScoreNewOpacity = useRef(new Animated.Value(0)).current;
    const awayScoreNewOpacity = useRef(new Animated.Value(0)).current;

    
    const animateScoreChange = (newHomeScore, newAwayScore) => {
        Animated.timing(homeScoreOldOpacity, {
            toValue: 0,
            duration: 500, 
            useNativeDriver: true,
        }).start();

        Animated.timing(awayScoreOldOpacity, {
            toValue: 0,
            duration: 500,
            useNativeDriver: true,
        }).start();


        Animated.timing(homeScoreNewOpacity, {
            toValue: 1,
            duration: 500,
            useNativeDriver: true,
        }).start();

        Animated.timing(awayScoreNewOpacity, {
            toValue: 1,
            duration: 500,
            useNativeDriver: true,
        }).start();
    };

    
    useEffect(() => {
        animateScoreChange(match.homeScore, match.awayScore);
        setHomeScore(match.homeScore);
        setAwayScore(match.awayScore);
    }, [match.homeScore, match.awayScore]);

    const toggleExpand = () => {
        Animated.timing(animation, {
            toValue: expanded ? 0 : 1,
            duration: 300,
            useNativeDriver: false
        }).start();

        Animated.timing(rotation, {
            toValue: expanded ? 0 : 1,
            duration: 300,
            useNativeDriver: true
        }).start();

        setExpanded(!expanded);
    };


    const heightInterpolate = animation.interpolate({
        inputRange: [0, 1],
        outputRange: [0, 136],
    });

    const rotateInterpolate = rotation.interpolate({
        inputRange: [0, 1],
        outputRange: ['0deg', '180deg'],
    });

    const statusStyle = match.status === 'Finished'
        ? styles.finished
        : match.status === 'Scheduled'
            ? styles.scheduled
            : match.status === 'Ongoing'
                ? styles.ongoing
                : styles.defaultStatus;

    return (
        <View style={[styles.matchItemWrapper, isMobile && styles.mobileWrapper]}>
            <TouchableOpacity style={styles.arrow} onPress={toggleExpand}>

                <View style={styles.matchItemSectionTop}>
                    <View style={styles.matchItemSection}>
                        <View style={styles.name}>
                            <CommandIcon width={48} height={48} />
                            <Text style={styles.teamName}>{match.awayTeam.name}</Text>
                        </View>

                        <View style={styles.score}>
                            <Text style={styles.scoreText}>
                                <Animated.View style={{ opacity: homeScoreOldOpacity }}>
                                    <Text>{homeScore}</Text>
                                </Animated.View>
                                <Animated.View style={{ opacity: homeScoreNewOpacity }}>
                                    <Text>{match.homeScore}</Text>
                                </Animated.View>
                                {' : '}
                                <Animated.View style={{ opacity: awayScoreNewOpacity }}>
                                    <Text>{match.awayScore}</Text>
                                </Animated.View>
                                <Animated.View style={{ opacity: awayScoreOldOpacity }}>
                                    <Text>{awayScore}</Text>
                                </Animated.View>
                            </Text>
                            <View style={[styles.status, statusStyle]}>
                                <Text style={styles.statusText}>{match.status}</Text>
                            </View>
                        </View>

                        <View style={styles.name}>
                            <Text style={styles.teamName2}>{match.homeTeam.name}</Text>
                            <CommandIcon width={48} height={48} />
                        </View>
                    </View>
                    <View style={styles.arrowWrap}>
                        <TouchableOpacity style={styles.arrow}>
                            <Animated.View style={{
                                transform: [
                                    { rotate: rotateInterpolate },
                                    { perspective: 1000 },
                                ],
                                alignSelf: 'center',
                            }}>
                                <ArrowDownIcon />
                            </Animated.View>
                        </TouchableOpacity>
                    </View>
                </View>
            </TouchableOpacity>

            <Animated.View style={[styles.details, { height: heightInterpolate, opacity: animation }]}>
                {expanded && (
                    <View style={{ marginTop: 10, flexDirection: 'row' }} >
                        <View style={styles.detailsLeft}>
                            <View style={styles.playerWrap}>
                                {
                                    match.awayTeam.players.map((player, index) => (
                                        <View style={styles.player} key={index}>
                                            <View style={styles.playerItem}>
                                                <Image
                                                    source={require('../../assets/img/avatar_global.png')}
                                                    style={styles.playerImg}
                                                />
                                                <Text style={styles.textWhite}>
                                                    {player.username}
                                                </Text>
                                            </View>
                                            <View style={styles.playerItem}>
                                                <Text style={styles.textGray}>
                                                    Убийств:
                                                </Text>
                                                <Text style={styles.textWhite}>
                                                    {player.kills}
                                                </Text>
                                            </View>
                                        </View>
                                    ))
                                }
                            </View>
                            <View style={styles.playerInfo} >
                                <View style={[styles.playerInfoWrapper, { borderRightColor: "#141A21", borderRightWidth: 1 }]} >
                                    <Text style={styles.textGray}>
                                        Points:
                                    </Text>
                                    <Text style={styles.textWhite}>
                                        {match.awayTeam.points}
                                    </Text>
                                </View>
                                <View style={[styles.playerInfoWrapper, { borderRightColor: "#141A21", borderRightWidth: 1 }]} >
                                    <Text style={styles.textGray}>
                                        Место:
                                    </Text>
                                    <Text style={styles.textWhite}>
                                        {match.awayTeam.place}
                                    </Text>
                                </View>
                                <View style={styles.playerInfoWrapper} >
                                    <Text style={styles.textGray}>
                                        Всего убийств:
                                    </Text>
                                    <Text style={styles.textWhite}>
                                        {match.awayTeam.total_kills}
                                    </Text>
                                </View>

                            </View>
                        </View>
                        <View style={styles.detailsRight}>
                            <View style={styles.playerWrap}>

                                {
                                    match.homeTeam.players.map((player, index) => (
                                        <View style={styles.player} key={index}>
                                            <View style={styles.playerItemName}>
                                                <Image
                                                    source={require('../../assets/img/avatar_global.png')}
                                                    style={styles.playerImg}
                                                />
                                                <Text style={styles.textWhite}>
                                                    {player.username}
                                                </Text>
                                            </View>
                                            <View style={styles.playerItem}>
                                                <Text style={styles.textGray}>
                                                    Убийств:
                                                </Text>
                                                <Text style={styles.textWhite}>
                                                    {player.kills}
                                                </Text>
                                            </View>
                                        </View>
                                    ))
                                }
                            </View>
                            <View style={styles.playerInfo} >
                                <View style={[styles.playerInfoWrapper, { borderRightColor: "#141A21", borderRightWidth: 1 }]} >
                                    <Text style={styles.textGray}>
                                        Points:
                                    </Text>
                                    <Text style={styles.textWhite}>
                                        {match.homeTeam.points}
                                    </Text>
                                </View>
                                <View style={[styles.playerInfoWrapper, { borderRightColor: "#141A21", borderRightWidth: 1 }]} >
                                    <Text style={styles.textGray}>
                                        Место:
                                    </Text>
                                    <Text style={styles.textWhite}>
                                        {match.homeTeam.place}
                                    </Text>
                                </View>
                                <View style={styles.playerInfoWrapper} >
                                    <Text style={styles.textGray}>
                                        Всего убийств:
                                    </Text>
                                    <Text style={styles.textWhite}>
                                        {match.homeTeam.total_kills}
                                    </Text>
                                </View>

                            </View>
                        </View>
                    </View>
                )}
            </Animated.View>

        </View>
    );
};

const styles = StyleSheet.create({
    matchItemWrapper: {
        width: '100%',
        backgroundColor: '#0F1318',
        paddingVertical: 16,
        paddingHorizontal: 16,
        borderRadius: 4,
        marginBottom: 12,
    },
    matchItemSectionTop: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    matchItemSection: {
        width: 'calc(100% - 40px)',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    mobileWrapper: {
        flexDirection: 'column',
        alignItems: 'center',
    },
    name: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    teamName: {
        fontWeight: '600',
        color: '#fff',
        fontSize: 16,
        marginLeft: 10,
    },
    teamName2: {
        fontWeight: '600',
        color: '#fff',
        fontSize: 16,
        marginRight: 10,
    },
    score: {
        flexDirection: 'column',
        alignItems: 'center',
    },
    scoreText: {
        fontSize: 20,
        fontWeight: '600',
        color: '#fff',
    },
    status: {
        borderRadius: 4,
        paddingVertical: 4,
        paddingHorizontal: 10,
        marginTop: 4,
    },
    statusText: {
        fontSize: 12,
        fontWeight: '600',
        color: '#fff',
    },
    finished: {
        backgroundColor: '#F1274C',
    },
    scheduled: {
        backgroundColor: '#EB6402',
    },
    ongoing: {
        backgroundColor: '#43AD28',
    },
    defaultStatus: {
        backgroundColor: '#ccc',
    },
    arrowWrap: {
        width: 40,
        marginLeft: 12
    },
    details: {
        width: '100%',
        overflow: 'hidden',
    },
    detailsLeft: {
        paddingLeft: 12,
        paddingVertical: 12,
        width: 'calc(50% - 16px)',
        marginRight: 32
    },
    detailsRight: {
        paddingRight: 12,
        paddingVertical: 12,
        width: 'calc(50% - 16px)',
    },
    player: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: 'calc(33.33% - 6px)',
        backgroundColor: '#1A1F26',
        borderRadius: 4,
        paddingVertical: 8,
        paddingHorizontal: 24
    },
    playerWrap: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    playerItem: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    playerItemName: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginRight: 8
    },
    playerInfo: {
        backgroundColor: '#1A1F26',
        borderRadius: 4,
        marginTop: 8,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
        paddingVertical: 14,
        paddingHorizontal: 24
    },
    playerInfoWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        width: '33.33%',
    },
    textWhite: {
        color: '#fff',
        fontWeight: 600,
        fontSize: 16,
        lineHeight: "1.5",
    },
    textGray: {
        color: '#FAFAFA66',
        marginRight: 8,
        fontWeight: 500,
        fontSize: 14,
        lineHeight: '1.5',
        display: 'block'

    },
    playerImg: {
        marginRight: 8,
        width: 36,
        height: 36
    }

});

export default MatchItem;
