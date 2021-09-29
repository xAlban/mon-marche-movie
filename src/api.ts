import * as Types from "./api.types"

const API_KEY = "905de7dd257b22a041dd4313c88cbeda"
const BASE_URL = "https://api.themoviedb.org/3"

export class Api {
    // API INSTANCE so we have the same in the app
    static apiInstance: Api

    IMAGE_BASE_URL = "http://image.tmdb.org/t/p"

    static getInstance(){
        if(Api.apiInstance === null){
          Api.apiInstance = new Api();
        }
        return this.apiInstance;
    }
    constructor() {
        Api.getInstance()
    }


    /** 
     * Fetching the popular Movies from the DB
     * We can add pagination to the requeste to get more movies
    */
    async getPopularMovies(): Promise<Types.Movie[]> {
        let returnData : Types.Movie[] = []
        const response = await fetch(
            BASE_URL + "/movie/popular?api_key=" + API_KEY,
            {
                method: "GET"
            }
        )
        if(response.ok){
            await response.json().then(formatedResponse => {
                // console.log("popularMovies in API: ", formatedResponse.results)
                returnData = formatedResponse.results
            }).catch(error => {
                console.log("Error converting data to json: ", error)
            })
        }
        return returnData
    }

    /**
     * Fetching a filtered list of movies
     * @param text The query for the filter
     */
    async searchMovies(text: string): Promise<Types.Movie[]> {
        let returnData : Types.Movie[] = []
        const response = await fetch(
            BASE_URL + "/search/movie?api_key=" + API_KEY + "&query=" + text,
            {
                method: "GET"
            }
        )
        if(response.ok){
            await response.json().then(formatedResponse => {
                returnData = formatedResponse.results
            }).catch(error => {
                console.log("Error converting data to json: ", error)
            })
        }
        return returnData
    }
}