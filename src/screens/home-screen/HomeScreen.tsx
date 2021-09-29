import React from 'react';
import { useHistory } from 'react-router-dom';
import styled, { ThemeProvider } from 'styled-components';
import { Api } from '../../api';
import * as Types from "../../api.types"
import { Header } from '../../components/Header';
import { PosterCard } from '../../components/PosterCard';
import { SearchBar } from '../../components/SearchBar';
import { darkTheme, lightTheme } from '../../Theme';

interface HomeScreenProps {
    location?: {
        state?: {
            theme: string
        }
    }
}

const StyledHomeScreen = styled.div`
    background-color: ${props => props.theme.palette.general.background};
    min-height: 100vh;
    height: 100%;
`;

const StyledGridContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
`;

/**
 * HomeScreen where we show the popular movies and with a searchbar we can look for specific movies
 */
export const HomeScreen = (props: HomeScreenProps) => {
    let history = useHistory(); // used for navigation

    const api = new Api(); // api instance to make the requests

    const [movies, setMovies] = React.useState<Types.Movie[]>([]);

    // Check if there is a theme initialized already if note we default to light theme
    const [theme, setTheme] = React.useState<string>(props.location && props.location.state ? props.location.state.theme: "light" );

    // Called when click on a PosterCard
    function handleClick(movie: Types.Movie) {
        history.push("/movie", {movie, theme})
    }

    // Called whenever the text in the SearchBar is updated
    function handleSearch(text: string){
        // This case handle the fact if the user delete the input without the cross
        if(text !== ""){
            api.searchMovies(text).then(filteredMovies =>{
                setMovies(filteredMovies);
            })
        }else{
            setPopularMovies()
        }

    }

    function setPopularMovies() {
        api.getPopularMovies().then(popularMovies => {
            setMovies(popularMovies)
        })
    }

    function toggleTheme(value: boolean){
        if(value){
            setTheme("dark");
        }else{
            setTheme("light");
        }
    }

    React.useEffect(() => {
        setPopularMovies()
    }, [])

    return (
        <ThemeProvider theme={theme === "light" ? lightTheme : darkTheme}>
           <StyledHomeScreen>
                <Header 
                    title="Movies"
                    toggleMode={(value: boolean) => toggleTheme(value)}
                    toggleInitValue={
                        props.location && props.location.state && props.location.state.theme === "light"
                        ? false : true
                    }
                />
                <SearchBar onTextChange={(text: string) => handleSearch(text)} onCrossClick={setPopularMovies}/>
                <StyledGridContainer>
                    {
                        movies.map(movie => (
                            <PosterCard
                                key={movie.id}
                                posterUrl={api.IMAGE_BASE_URL + "/w185" + movie.poster_path}
                                clickHandle={() => handleClick(movie)}
                                title={movie.title}
                            />
                        ))
                    }
                </StyledGridContainer>
            </StyledHomeScreen> 
        </ThemeProvider>
        
    );
};