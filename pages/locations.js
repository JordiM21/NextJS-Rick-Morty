import React, { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import {
	AiFillCaretLeft,
	AiOutlineArrowLeft,
	AiFillCaretRight,
} from "react-icons/ai";
import { useRouter } from "next/router";



export default function characters() {
	const [idInput, setIdInput] = useState([]);
	const [location, setLocation] = useState({});

	const router = useRouter();

	useEffect(() => {
		axios.get(
			`https://rickandmortyapi.com/api/location?page=1`
		).then((res) => setLocation(res.data));
	}, []);

	const pages = [1, 2, 3, 4, 5, 6, 7];
	const [page, setPage] = useState(1);
	useEffect(() => {
		// alert("cambio pagina");
		axios.get(
			`https://rickandmortyapi.com/api/location/?page=${page}`
		).then((res) => setLocation(res.data));
	}, [page]);

	useEffect(() => {
		axios.get(
			`https://rickandmortyapi.com/api/location/?name=${idInput}`
		)
			.then((res) => setLocation(res.data))
			.catch(() => setLocation({}));
	}, [idInput]);

	return (
		<div className="Locations">
			<header>
				<Link href="/">
					<AiOutlineArrowLeft className="i" />
				</Link>
				<h1>Locations</h1>
			</header>
			<div className="search-input">
				<button onClick={() => setIdInput("")}>
					Clear
				</button>
				<input
					value={idInput}
					onChange={(e) =>
						setIdInput(e.target.value)
					}
					type="text"
					placeholder="Type a location name"
				/>
			</div>
			<div className="pagination">
				<button
					onClick={() => setPage(page - 1)}
					disabled={page === 1}
				>
					<AiFillCaretLeft />
				</button>
				{pages.map((number) => (
					<button
						className={
							number == page
								? "selected"
								: "normal"
						}
						onClick={() => setPage(number)}
					>
						{number}
					</button>
				))}
				<button
					onClick={() => setPage(page + 1)}
					disabled={page === 7}
				>
					<AiFillCaretRight />
				</button>
			</div>
			<div className="flex">
				{location?.results?.map((location) => (
					<div
						className="info-card"
						key={location.url}
					>
						<button
							type='button'
							onClick={() => {
								router.push({
									pathname: "/locationDetail/[id]",
									query: {
										id: location.id,
									},
								})
							}}
						>
							<h4>{location.name}</h4>
							<div className="d-flex">
								<p>
									Dimension:
									<br />
									{
										location.dimension
									}
								</p>
								<p>
									Type:
									<br />
									{
										location.type
									}
								</p>
								<p>
									Residents:
									<br />
									{
										location
											.residents
											.length
									}
								</p>
							</div>
						</button>
					</div>
				))}
			</div>
		</div>
	);
}
