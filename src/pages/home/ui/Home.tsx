// import s from "./Home.module.scss"
// import { header } from "@mui/material";

import { useEffect } from "react";

const Home = () => {

	const title ='Мое приложение';
  
	useEffect(() => {
	  document.title = title;
	}, [title]);
	  
	return (
		<>
			<h1>Home page</h1>

		</>		
	)
}

export default Home