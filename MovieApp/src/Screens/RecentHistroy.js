import React, { Component } from "react"
import { View, Text, FlatList, Image, StyleSheet, Alert, TouchableOpacity,Dimensions } from "react-native"
import Icon from 'react-native-vector-icons/dist/AntDesign'
import AsyncStorage from "@react-native-async-storage/async-storage";


class RecentHistroy extends Component {
    constructor(props) {
        super(props)
        this.state = {
            recentData: [],
            windowWidth: Dimensions.get('window').width,
            windowHeight: Dimensions.get('window').height
        }
    }

    componentDidMount = async () => {
        this.loadRecentDetails()
    }

    loadRecentDetails = async () => {
        try {
            const storedSearches = await AsyncStorage.getItem("recentSearches");
            if (storedSearches !== null) {
                this.setState({ recentData: JSON.parse(storedSearches) });
            }
        } catch (error) {
            console.error("Error loading recent searches:", error);
        }
    }

    truncateText(text, wordLimit = 4) {
        const words = text.split(" ");
        return words.length > wordLimit ? words.slice(0, wordLimit).join(" ") + " ..." : text;
    }

    gotDetails = async (item) => {
        this.props.navigation.navigate("MovieDetails", { movie: item.imdbID })
    }

    rendermovies = ({ item }) => {
        return (
            <TouchableOpacity onPress={() => this.gotDetails(item)}>
                <View style={styles.movieCard}>
                    <Image source={{ uri: item.Poster }} style={styles.movieImage} />
                    <Text style={styles.movieTitle}>{this.truncateText(item.Title)}</Text>
                    <Text style={styles.movieYear}>{item.Year}</Text>
                </View>
            </TouchableOpacity>
        )
    }

    emptyComponent = () => {
        return (
          <View style={{ alignItems: 'center', marginTop: this.state.windowHeight/2,color:"#fff" }}>
            <Text style={{color:"#fff"}}>No Recent Search Data</Text>
          </View>
        );
      };

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.headerContainer}>
                    <View style={styles.goback}>
                        <TouchableOpacity onPress={() => this.props.navigation.navigate("Home")}>
                            <Icon name="arrowleft" size={20} color="black" style={{ fontWeight: "bold", marginLeft: 2, marginBottom: 1, fontSize: 20 }} />
                        </TouchableOpacity>
                    </View>
                    <View>
                        <Text style={styles.title}>Recent Search Histroy</Text>
                    </View>
                </View>
                <FlatList
                    data={this.state.recentData}
                    keyExtractor={(item) => item.imdbID}
                    numColumns={3}
                    renderItem={this.rendermovies}
                    ListEmptyComponent={this.emptyComponent}
                />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: "#000",
    },
    goback: {
        width: 30,
        height: 30,
        backgroundColor: "rgba(255, 255, 255, 0.8)",
        borderRadius: 20,
        justifyContent: "center",
        alignItems: "center",
        zIndex: 10,
    },
    title: {
        fontSize: 18,
        fontWeight: "bold",
        marginBottom: 8,
        color: "#fff",
        marginLeft: 20
    },
    movieCard: {
        flex: 1,
        width: "100%",
        marginLeft: 15,
        marginTop: 12,
        margin: 8,
    },
    movieImage: {
        width: 100,
        height: 150,
        borderRadius: 8,
        marginTop: 15
    },
    movieTitle: {
        fontSize: 9,
        fontWeight: "bold",
        textAlign: "left",

        width: 100,
        marginTop: 8,
        color: "white"
    },
    movieYear: {
        fontSize: 12,
        color: "#fff",
        textAlign: "left",
        marginTop: 5
    },
    headerContainer: {
        flexDirection: "row",
        justifyContent: "flex-start",
        alignItems: "center",
        paddingHorizontal: 15,
        paddingVertical: 10,
    },

})

export default RecentHistroy
