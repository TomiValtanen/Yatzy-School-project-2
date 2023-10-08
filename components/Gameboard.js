import { useEffect, useState } from "react"
import { Pressable, Text, View } from "react-native"
import { Styles } from "../styles/Styles";
import Header from "./Header";
import Footer from "./Footer";
import { NBR_OF_DICES, NBR_OF_THROWS, MIN_SPOT, MAX_SPOT, BONUS_POINTS, BONUS_POINTS_LIMIT } from "../constants/Game";
import { Container, Row, Col } from 'react-native-flex-grid';
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons"

let board=[]

function Gameboard({navigation,route}){
    const [playerName,setPlayerName]=useState("")
    const [nbrOfThrowsLeft,setNbrOfThrowsLeft]=useState(NBR_OF_THROWS)
    const [status,setStatus]=useState("Throw Dices")
    const [gameEndStatus,setGameEndStatus]=useState(false)
    const [selectedDices,setSelectedDices]=useState(new Array(NBR_OF_DICES).fill(false))
    const [diceSpots,setDiceSpots]=useState(new Array(NBR_OF_DICES).fill(0))
    const [selectedDicePoints,setSelectedDicePoints]=useState(new Array(MAX_SPOT).fill(false))
    const [dicePointsTotal,setDicePointsTotal]=useState(new Array(MAX_SPOT).fill(0))

    const dicesRow=[]
    for (let dice=0;dice < NBR_OF_DICES;dice++){
        dicesRow.push(
            <Col key={`dice${dice}`}>
                <Pressable onPress={()=>selectDice(dice)}>
                <MaterialCommunityIcons
                name={board[dice]}
                key={`dice${dice}`}
                size={50}
                color={getDiceColor(dice)}
                
                />
                </Pressable>
            </Col>
        )
    }

    const pointsRow=[]
    for (let spot=0;spot < MAX_SPOT;spot++){
        pointsRow.push(
            <Col key={`pointsRow${spot}`}>
                <Text key={`pointsRow${spot}`}>{getSpotTotal(spot)}</Text> 
            </Col>
        )
    }
    const pointsToSelectRow=[]
    for (let diceButton=0;diceButton < MAX_SPOT;diceButton++){
        pointsToSelectRow.push(
            <Col key={`buttonsRow${diceButton}`}>
                <Pressable >
                    
                <MaterialCommunityIcons
                name={`numeric-${diceButton+1}-circle`}
                key={`buttonsRow${diceButton}`}
                size={35}
                //color={getDicePointsColor(diceButton)}
                //onPress={()=>selectDicePoints(diceButton)}
                />
                </Pressable>
            </Col>
        )
    }
    function getSpotTotal(i){
        return dicePointsTotal[i]
    }
    const selectDice=(i)=>{
        if(nbrOfThrowsLeft<NBR_OF_THROWS && !gameEndStatus){
            let dices=[...selectedDices]
            dices[i] = selectedDices[i] ? false : true
            setSelectedDices(dices)
        }else{
            setStatus("You have to throw dices first.")
        }
    }

    function getDiceColor(i){
        return selectedDices[i] ? "black" : "steelblue"
    }

    useEffect(()=>{
        if(playerName==="" && route.params?.player){
            setPlayerName(route.params.player)
        }
    },[])



    return(
        <View style={Styles.gameboard}>
          <Header/>
          <Container fluid>
            <Row>{dicesRow}</Row>
          </Container>
          <Container fluid>
            <Row>{pointsRow}</Row>
          </Container>
          <Container fluid>
            <Row>{pointsToSelectRow}</Row>
          </Container>
          <Text>Player: {playerName}</Text>
          <Footer/>
        </View>
    )
}
export default Gameboard