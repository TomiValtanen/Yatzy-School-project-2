import { Text } from "react-native";
import { View, Pressable } from "react-native";
import { DataTable } from "react-native-paper"
import Header from "./Header";
import Footer from "./Footer";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import { NBR_OF_SCOREBOARD } from "../constants/Game";


const SCOREBOARD_KEY = "@score_key"

function Scoreboard({ navigation }) {
    const [scores, setScores] = useState([])

    useEffect(() => {
        const unsubscribe = navigation.addListener("focus", () => {
            getScoreboardData()
        })
        return unsubscribe
    }, [navigation])

    const getScoreboardData = async () => {
        try {
            const jsonValue = await AsyncStorage.getItem(SCOREBOARD_KEY)
            if (jsonValue !== null) {
                let tmpScores = JSON.parse(jsonValue)
                setScores(tmpScores)
            }
        } catch (e) {
            console.log(e)
        }
    }

    const clearScoreBoard = async () => {
        try {
            await AsyncStorage.clear()
            setScores([])
        } catch (e) {
            console.log(e)
        }
    }
    return (
        <View>
            <Header />
            <View>
                <Text>Scoreboard</Text>
                {scores.length === 0 ?
                    <Text>Scoreboard is empty</Text>
                    :
                    scores.map((player, index) => (
                        index < NBR_OF_SCOREBOARD &&
                        <DataTable.Row key={player.key}>
                            <DataTable.Cell><Text>{index + 1}</Text></DataTable.Cell>
                            <DataTable.Cell><Text>{player.name}</Text></DataTable.Cell>
                            <DataTable.Cell><Text>{player.date}</Text></DataTable.Cell>
                            <DataTable.Cell><Text>{player.time}</Text></DataTable.Cell>
                            <DataTable.Cell><Text>{player.points}</Text></DataTable.Cell>

                        </DataTable.Row>

                    ))

                }
            </View>
            <View>
                <Pressable onPress={() => clearScoreBoard()}>
                    <Text>Clear Scoreboard</Text>
                </Pressable>
            </View>
            <Footer />
        </View>
    )
}


export default Scoreboard