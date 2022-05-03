import logo from './assets/images/logo.png';
import react from 'react';
import Homepage from './pages/Homepage.js';
import User from './pages/User.js';
import Anime from './pages/Anime.js';
import './App.css';

function App() {
	const [animeList, SetAnimeList] = useState([]);
	const [creatorAnime, SetCreatorAnime] = useState([]);
	const [search, SetSearch] = useState("");

	const GetCreatorAnime = async () => {
		const temp = await fetch(`https://api.jikan.moe/v3/top/anime/1/bypopularity`)
			.then(res => res.json());

		SetCreatorAnime(temp.top.slice(0, 5));
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
		GetCreatorAnime();
	}, []);
	
	return (
		<div className="App">
			<Header />
			<div className="content-wrap">
				<Sidebar 
					creatorAnime={creatorAnime} />
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