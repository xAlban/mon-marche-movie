import React from 'react';
import * as Types from "../../api.types"
import styled, { ThemeProvider } from 'styled-components';
import { Header } from '../../components/Header';
import { darkTheme, lightTheme } from '../../Theme';
import { useHistory } from 'react-router-dom';
import { PosterCard } from '../../components/PosterCard';
import { Api } from '../../api';

interface MovieScreenProps {
    location: {
        state: {
            movie: Types.Movie
            theme: string
        }
    }
}

const StyledMovieScreen = styled.div`
    background-color: ${props => props.theme.palette.general.background};
    min-height: 100vh;
    height: 100%;
`;

const StyledContentContainer = styled.div`
    display: flex;
    flex: 1;
    padding: 20px;
`;

const StyledDescriptionContainer = styled.div`
    flex: 1;
    color: ${props => props.theme.palette.general.textColor};
`;

/**
 * MovieScreen where we show the Poster of a specific movie with a description and the average vote
 */
export const MovieScreen = (props: MovieScreenProps) => {
    let history = useHistory(); // used for navigation

    const api = new Api(); // Api instance to get the IMAGE base URL

    const {movie, theme} = props.location.state; // Movie and Theme we got from the HomeScreen navigation

    const [localTheme, setLocalTheme] = React.useState<string>(theme);

    function toggleTheme(value: boolean){
        if(value){
            setLocalTheme("dark");
        }else{
            setLocalTheme("light");
        }
    }

    // Called when click on the back button in the header
    function handleBackClick(){
        history.push("/", {theme: localTheme})
    }

    return (
        <ThemeProvider theme={localTheme === "light" ? lightTheme : darkTheme}>
           <StyledMovieScreen>
                <Header
                    title="Movies"
                    toggleMode={
                        (value: boolean) => toggleTheme(value)
                    }
                    toggleInitValue={theme === "light" ? false : true}
                    backClick={handleBackClick}
                />
                <StyledContentContainer>
                    <StyledDescriptionContainer>
                        <p>{movie.title}</p>
                        <p>{movie.overview}</p>
                        <p>{movie.vote_average} / 10</p>
                    </StyledDescriptionContainer>
                    <PosterCard
                        posterUrl={api.IMAGE_BASE_URL + "/w185" + movie.poster_path}
                        title={movie.title}
                    />
                </StyledContentContainer>
            </StyledMovieScreen> 
        </ThemeProvider>
    );
};