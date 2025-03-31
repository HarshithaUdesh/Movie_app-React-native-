import React, { Component } from "react"
import { View, Text, TextInput, FlatList, Image, StyleSheet, ActivityIndicator, TouchableOpacity } from "react-native"
import Icon from 'react-native-vector-icons/dist/FontAwesome'
import Icons from 'react-native-vector-icons/MaterialIcons'
import AsyncStorage from "@react-native-async-storage/async-storage";
import API_CONFIG from "../Services/Services";

class Home extends Component {
  constructor(props) {
    super(props)
    this.state = {
      search: "",
      moviesData: [],
      loading: true,
      recentSearches: [],
      SearchData: [],
      isSearching: false,
      // windowWidth: Dimensions.get('window').width,
      // windowHeight: Dimensions.get('window').height
    }
  }

  componentDidMount = async () => {
    this.getMoviesData()
    this.loadRecentSearches();
  }

  loadRecentSearches = async () => {
    try {
      const storedSearches = await AsyncStorage.getItem("recentSearches");
      if (storedSearches !== null) {
        this.setState({ recentSearches: JSON.parse(storedSearches) });
      }
    } catch (error) {
      console.error(error);
    }
  };

  getMoviesData = async () => {
    fetch(`${API_CONFIG.BASE_URL}?s=marvel&apikey=${API_CONFIG.API_KEY}`)
    .then(response => response.json())
    .then(data => {
      if (data.Search) {
        this.setState({ moviesData: data.Search, loading: false });
      } else {
        this.setState({ loading: false });
      }
    })
    .catch(error => {
      console.error("Error in getting movies:", error);
      this.setState({ loading: false });
    });
  }

  truncateText(text, wordLimit = 4) {
    const words = text.split(" ");
    return words.length > wordLimit ? words.slice(0, wordLimit).join(" ") + " ..." : text;
  }


  handleSearch = (text) => {
  this.setState({ search: text })
    console.log(this.state.search.length > 2, this.state.search.length);
    if (this.state.search.length > 1) {
      fetch(`${API_CONFIG.BASE_URL}?s=${this.state.search}&apikey=${API_CONFIG.API_KEY}`)
        .then(response => response.json())
        .then(data => {
          if (data.Response === "True") {
            console.log(data.Search, "Search Results");
            this.setState({ moviesData: data.Search, isSearching: false });
          } else {
            this.setState({ moviesData: [], isSearching: true });
          }
        })
        .catch(error => {
          console.error("Error In Search movies:", error);
          this.setState({ loading: false });
        });
    } else {
      this.setState({ moviesData: [],isSearching: false });
      this.getMoviesData()
    }
  
};


  gotoRecentpage() {
    this.props.navigation.navigate("Recent Histroy")
  }

  gotDetails = async (item) => {
    
      try {
        let updatedSearches = [...this.state.recentSearches];
        if (!updatedSearches.some((search) => search.imdbID === item.imdbID)) {
          updatedSearches.unshift(item);
        }
        await AsyncStorage.setItem("recentSearches", JSON.stringify(updatedSearches));
        this.setState({ recentSearches: updatedSearches });
        this.props.navigation.navigate("Movie Details", { movie: item.imdbID })
      } catch (error) {
        console.error(error);
      }
    
   }
  rendermovies = ({ item }) => {
    return (
      <TouchableOpacity onPress={() => this.gotDetails(item,)}>
        <View style={styles.movieCard}>
          <Image source={{ uri: item.Poster }} style={styles.movieImage} />
          <Text style={styles.movieTitle}>{this.truncateText(item.Title)}</Text>
          <Text style={styles.movieYear}>{item.Year}</Text>
        </View>
      </TouchableOpacity>
    )
  }

  clearSearch() {
    this.setState({ search: "", moviesData: [], isSearching: false })
    this.getMoviesData()
  }
  
  emptyComponent = () => {
    return (
      <View style={{ alignItems: 'center', marginTop: this.state.windowHeight/5,color:"#fff" }}>
        <Text style={{color:"#fff"}}>No Recent Search Data</Text>
      </View>
    );
  };
  render() {
     if (this.state.loading) {
      return (
        <View style={styles.loaderContainer}>
          <ActivityIndicator size="large" color="#000" />
        </View>
      )
    }

    return (
      <View style={styles.container}>

        <View style={styles.headerContainer}>
          <View>
            <Text style={styles.title}>Browse</Text>
            <Text style={styles.subtitle}>Movies</Text>
          </View>
          <TouchableOpacity  onPress={() => this.props.navigation.openDrawer()} >
          <View style={{ position: "relative" }} >
            <Icons name="segment" size={26} color="white" />

          </View>
          </TouchableOpacity>
        
        </View>

        <View style={styles.searchContainer}>
          <Icon name="search" size={20} color="#aaa" style={styles.icon} />
          <TextInput
            style={styles.searchBar}
            placeholder="Search movies"
            placeholderTextColor="#aaa"
            onChangeText={text => this.handleSearch(text)}
            value={this.state.search}
          />
          {this.state.search.length > 0 ?
            <TouchableOpacity onPress={() => this.clearSearch()}>
              <Icon name="close" size={20} color="#aaa" style={styles.icon} />
            </TouchableOpacity>
            : null}

        </View>
        <FlatList
          data={this.state.moviesData}
          keyExtractor={(item) => item.imdbID}
          numColumns={3}
          style={this.state.SearchData.length > 0 ? styles.hidden : {}}
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
  title: {
    fontSize: 25,
    fontWeight: "bold",
    marginBottom: 8,
    color: "#fff"
  },
  subtitle: {
    fontSize: 15,
    marginBottom: 12,
    marginTop: -10,
    color: "#67686b",
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 6,
    borderWidth: 1,
    backgroundColor: "#333538",
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  searchBar: {
    flex: 1,
    fontSize: 16,
    color: '#fff',
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
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 15,
    paddingVertical: 10,

  },
  searchhistroy: {
    textAlign: "right",
    color: "blue",
    margin: 20,
    textDecorationLine: "underline"
  },
  overlayContainer: {
    position: "absolute",
    top: 10,
    left: 0,
    right: 0,
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 10,
    zIndex: 10,
    maxHeight: 700,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  hidden: {
    display: "none",
  },
  loaderContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#000",
  },
})

export default Home
