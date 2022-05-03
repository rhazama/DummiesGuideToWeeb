import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

import { useState, useEffect } from 'react';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import MainContent from './components/MainContent';

import User from './pages/User';
import Navbar from './components/Navbar'

const httpLink = createHttpLink ({
	uri: '/graphql'
  });
  
  const authLink = setContext((_, { headers }) => {
	const token = localStorage.getItem('id_token');
  
	return {
	  headers: {
		...headers,
		authorization: token ? `Bearer ${token}` : '',
	  },
	};
  });
  
  const client = new ApolloClient({
	link: authLink.concat(httpLink),
	Cache: new InMemoryCache(),
  });


function App() {
	const [animeList, SetAnimeList] = useState([]);
	const [topAnime, SetTopAnime] = useState([]);
	const [search, SetSearch] = useState("");

	const GetTopAnime = async () => {
		const temp = await fetch(`https://api.jikan.moe/v3/top/anime/1/bypopularity`)
			.then(res => res.json());

		SetTopAnime(temp.top.slice(0, 5));
	}

	const HandleSearch = e => {
		e.preventDefault();

		FetchAnime(search);
	}

	const FetchAnime = async (query) => {
		const temp = await fetch(`https://api.jikan.moe/v3/search/anime?q=${query}&order_by=title&sort=asc&limit=10`)
			.then(res => res.json());

		SetAnimeList(temp.results);
	}

	useEffect(() => {
		GetTopAnime();
	}, []);
	
	return (
		<div className="App">
			<Header />
			<Router>
				<Navbar/>
				<Switch>
					<Route exact path="/user" component={User} />
					<Route render={() => <h1 className="display-2">Sorry wrong page</h1>} />
				</Switch>
      		</Router>
    
			<div className="content-wrap">
				<Sidebar 
					topAnime={topAnime} />
				<MainContent
					HandleSearch={HandleSearch}
					search={search}
					SetSearch={SetSearch}
					animeList={animeList} />
			</div>
		</div>
	);
}

export default App;