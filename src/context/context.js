import React, { useState, useEffect, useContext } from 'react';
import mockUser from './mockData.js/mockUser';
import mockRepos from './mockData.js/mockRepos';
import mockFollowers from './mockData.js/mockFollowers';
import axios from 'axios';

const rootUrl = 'https://api.github.com/users';

const GithubContext = React.createContext();

const GithubProvider = ({children}) => {

    // GRAPH INFO
    const [githubUser, setGithubUser] = useState(mockUser);
    const [repos, setRepos] = useState(mockRepos);
    const [followers, setFollowers] = useState(mockFollowers);

    // REQUEST AND LOAD INFO
    const [requests, setRequests] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState({show:false, msg: ""})

    // github user request
    const searchGithubUser = async(user) => {
        toggleError()
        setIsLoading(true)
        let search = await axios(`${rootUrl}/${user}`)

        // IS THERE A WAY TO DO IT IN ONE CALL TO BRING DOWN API USAGE???
        // GITHUB GRAPHQL COULD BE AN ALTERNATIVE IN THE FUTURE

        let repos = await axios(`${rootUrl}/${user}/repos?per_page=100`);
        let followers = await axios(`${rootUrl}/${user}/followers`)

        .catch(err => console.log(err))
        if(search){
            setGithubUser(search.data)
            setRepos(repos.data)
            setFollowers(followers.data)

            // POSSIBLY FASTER WAY

            // await Promise.allSettled([
            //     axios(`${rootUrl}/${user}/repos?per_page=100`),
            //     axios(`${rootUrl}/${user}/followers`)
            // ])
            // .then((res) => {
            //     const [repos, followers] = res;
            //     const status = "fulfilled";
            //     if(repos.status === status){
            //         setRepos(repos.value.data);
            //     }
            //     if(followers.status === status){
            //         setRepos(repos.value.data);
            //     }
            // })
        }
        else{
            toggleError(true, "No user of that name exists...")
        }
        setIsLoading(false);
        checkRequestLimit();
    }

    //check request function api limit
    const checkRequestLimit = () => {
        axios.get("https://api.github.com/rate_limit")
        .then((res) => {
            let requestLimit = res.data.rate.remaining;
            setRequests(requestLimit);
            if(requestLimit === 0){
                toggleError(true, "Hourly request limit maxed...")
            }

        })
        .catch(err => console.log(err))
    }
    // error checking and showing function
    function toggleError(show = false, msg = ""){
        setError({show, msg})
    }

    useEffect(checkRequestLimit, [])

    return (
        <GithubContext.Provider
        value={{
            githubUser,
            repos,
            followers,
            requests,
            isLoading,
            error,
            searchGithubUser
        }}>
            {children}
        </GithubContext.Provider>
    )
}

export const useGlobalContext = () => {
    return useContext(GithubContext)
}

export {GithubContext, GithubProvider}