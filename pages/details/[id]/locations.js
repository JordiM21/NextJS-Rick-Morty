import React from "react";
import { useRouter } from "next/router";

const locations = () => {
	const router = useRouter();
	const id = router.query.id;

	return (
		<div>
			<h1 className="text-white">Hola soy el id {id}</h1>
		</div>
	);
};

export default locations;
