import React, { Component } from "react"
import { View, Text, ImageBackground, StyleSheet, ActivityIndicator, TouchableOpacity } from "react-native"
import LinearGradient from "react-native-linear-gradient"
import Icon from 'react-native-vector-icons/dist/AntDesign'
import API_CONFIG from "../Services/Services";

class MovieDetails extends Component {
  constructor(props) {
    super(props)
    this.state = {
      movieDetail: null,
      loading: true,
    }
  }
  componentDidMount() {
    this.getMoviesDataById()
  }

  componentDidUpdate(prevProps) {
    const prevMovieId = prevProps.route?.params?.movie;
    const currentMovieId = this.props.route?.params?.movie;
  
    if (prevMovieId !== currentMovieId) {
      this.setState({ movieDetail: null, loading: true }, () => {
        this.getMoviesDataById();
      });
    }
  }
  getMoviesDataById = async () => {
    
    const { route } = this.props
    console.log(route)
    const movieId = route?.params?.movie || "tt5304172"

    fetch(`${API_CONFIG.BASE_URL}?i=${movieId}&apikey=${API_CONFIG.API_KEY}`)
    .then(response => response.json())
    .then(data => {
      if (data && data.Response !== "False") {
        this.setState({ movieDetail: data, loading: false });
      } else {
        this.setState({ loading: false });
      }
    })
    .catch(error => {
      console.error("Error fetching movie data:", error);
      this.setState({ loading: false });
    });
  }

  render() {
    const { movieDetail, loading } = this.state

    if (loading) {
      return (
        <View style={styles.loaderContainer}>
          <ActivityIndicator size="large" color="#fff" />
        </View>
      )
    }

    return (
      <ImageBackground source={{ uri: movieDetail.Poster }} style={styles.background}>

        <View style={styles.goback}>
          <TouchableOpacity onPress={() => this.props.navigation.navigate("Home")}>
            <Icon name="arrowleft" size={30} color="black" style={styles.gobackicon} />
          </TouchableOpacity>
        </View>

        <LinearGradient colors={['#4d4d4d', '#000c', '#000']} style={styles.overlay}>
          <View style={styles.content}>
            <Text style={styles.title}>{movieDetail.Title}</Text>
            <View style={styles.timerratingView}>
              <View style={styles.rating}>
                <Icon name="staro" size={20} color="white" style={{ marginHorizontal: 3 }} />
                <Text style={styles.ratingvalue}>{movieDetail.imdbRating}</Text>
              </View>

              <View style={styles.timer}>
                <Icon name="clockcircleo" size={20} color="white" style={{ marginHorizontal: 3 }} />
                <Text style={styles.ratingvalue}>{movieDetail.Runtime}</Text>
              </View>
            </View>
            <View style={styles.genreContainer}>
              <View >
                <Text style={{ fontSize: 25, fontWeight: "600", color: "white", marginTop: 10 }}>Hologram</Text>
              </View>
              <View style={styles.genreContainerinside}>
                {movieDetail.Genre.split(", ").map((genre, index) => (
                  <Text key={index} style={styles.genreTag}>
                    {genre}
                  </Text>
                ))}
              </View>
            </View>
            <Text style={styles.description}>{movieDetail.Plot}</Text>
            <View style={styles.detailsContainer}>
              <Text style={styles.detail}>
                <Text style={styles.sectionTitle}>Director: </Text>
                {movieDetail.Director}
              </Text>

              <Text style={styles.detail}>
                <Text style={styles.sectionTitle}>Writer: </Text>
                {movieDetail.Writer}
              </Text>

              <Text style={styles.detail}>
                <Text style={styles.sectionTitle}>Actors: </Text>
                {movieDetail.Actors}
              </Text>
            </View>

          </View>
        </LinearGradient>
      </ImageBackground>
    )
  }
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: "flex-end",
  },
  overlay: {
    position: "absolute",
    width: "97%",
    height: "55%",
    bottom: 0,
    marginLeft: 5,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10
    // marginRight:10
  },
  content: {
    padding: 25,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    minHeight: "40%",
    marginBottom: 0,

  },

  title: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#fff",
  },
  timerratingView: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 5,
  },

  genreContainer: {
    flexDirection: "row",
    marginTop: 10,
    justifyContent: "space-between"
  },

  genreContainerinside: {
    flexDirection: "row",
    marginTop: 10,
    justifyContent: "flex-end"
  },
  genreTag: {
    backgroundColor: "#444",
    color: "#fff",
    padding: 5,
    marginRight: 5,
    borderRadius: 5,
    fontSize: 12,
  },
  sectionTitle: {
    fontSize: 16,
    color: "#ccc",
    marginTop: 15,
  },
  description: {
    color: "#ccc",
    fontSize: 14,
    marginTop: 13,
    lineHeight: 25,
  },
  detail: {
    color: "#ccc",
    fontSize: 14,
    lineHeight: 25
  },
  loaderContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#000",
  },
  errorText: {
    color: "#fff",
    fontSize: 16,
  },
  goback: {
    width: 50,
    height: 50,
    backgroundColor: "#fff"
  },
  goback: {
    position: "absolute",
    top: 40,
    left: 20,
    width: 40,
    height: 40,
    backgroundColor: "rgba(255, 255, 255, 0.8)",
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    zIndex: 10,
  },
  detailsContainer: {
    marginTop: 20,
    marginRight: 10,
    letterSpacing: 3
  },
  gobackicon: {
    fontWeight: "bold",
    marginLeft: 2,
    marginBottom: 1,
    fontSize: 25
  },
  rating: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
    marginRight: 30
  },
  timer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10
  },
  ratingvalue: {
    marginLeft: 5,
    color: "white",
    fontWeight: "bold"
  }
})

export default MovieDetails