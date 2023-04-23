import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import axios from 'axios'

const locations = () => {
	const router = useRouter();

	const [location, setLocation] = useState({});

	useEffect(() => {
		axios.get(
			`https://rickandmortyapi.com/api/location/${router.query.id}`
		).then((res) => console.log(res.data));
	}, []);

	return (
		<div>
			<h1 className="text-white">Hola soy el Planeta {location.name}</h1>
			<div>
				residents here
				{
					location.residents?.map(residents => (
						<p>residents</p>
					))
				}
			</div>
		</div>
	);
};

export default locations;
