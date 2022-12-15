import React, { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import Image from "next/image";

const Characters = () => {
	const [characters, setCharacters] = useState({});

	useEffect(() => {
		axios.get(
			`https://rickandmortyapi.com/api/character?page=1`
		).then((res) => setCharacters(res.data));
	}, []);

	const pages = [1, 2, 3, 4, 5, 6, 7];
	const [page, setPage] = useState(1);
	const [idInput, setIdInput] = useState([]);
	const [filterStatus, setFilterStatus] = useState("");

	useEffect(() => {
		axios.get(
			`https://rickandmortyapi.com/api/character/?page=${page}`
		)
			.then((res) => setCharacters(res.data))
			.then((res) => setFilterStatus(""));
	}, [page]);

	useEffect(() => {
		axios.get(
			`https://rickandmortyapi.com/api/character/?name=${idInput}&status=${filterStatus}`
		)
			.then((res) => setCharacters(res.data))
			.catch(() => setCharacters({}));
	}, [idInput, filterStatus]);

	const [modal, setModal] = useState("close");

	return (
		<div className="Characters">
			<header>
				<Link href="/">
					<i class="fa-solid fa-chevron-left"></i>
				</Link>

				<h1>Characters</h1>
			</header>
			<div className="search-input">
				<button
					style={{ cursor: "pointer" }}
					onClick={() => setIdInput("")}
				>
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
				<i
					style={{ cursor: "pointer" }}
					onClick={() => setModal("open")}
					class="fa-regular fa-circle-question"
				></i>
			</div>
			<div
				className={
					modal == "open"
						? "open modal"
						: "close modal"
				}
			>
				<i
					style={{ cursor: "pointer" }}
					onClick={() => setModal("close")}
					class="fa-solid fa-x"
				></i>
				<h2>Información Importante</h2>
				<ul>
					Esta es una app interactiva en la cual
					podrás: <br />
					<li>
						Filtrar los personajes por su
						estatos (alive, dead o unknown)
					</li>
					<li>Filtrar por nombre de Personaje</li>
					<li>
						{" "}
						Ver la paginación de la
						totalidad de los personajes
					</li>
					<li>
						Filtra el nombre y status a la
						vez, es decir puedes buscar algo
						como (Rick Alive) y te mostrará
						todos los personajes de nombre
						Rick que están vivos
					</li>
					<li>
						(Recuerdas que si cambias la
						página los filtros se
						reiniciarán)
					</li>
				</ul>
			</div>
			<div className="pagination">
				<button
					onClick={() => setPage(page - 1)}
					disabled={page === 1}
				>
					<i class="fa-solid fa-arrow-left"></i>
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
					<i class="fa-solid fa-arrow-right"></i>
				</button>
			</div>
			<div className="filters">
				<p>Filter by: </p>
				<div className="filter-buttons">
					<button
						onClick={() =>
							setFilterStatus("Alive")
						}
					>
						Alive
					</button>
					<button
						onClick={() =>
							setFilterStatus("Dead")
						}
					>
						Dead
					</button>
					<button
						onClick={() =>
							setFilterStatus(
								"Unknown"
							)
						}
					>
						Unknown
					</button>
				</div>
				<p>
					Showing results for:
					<strong>
						{" "}
						{idInput} {filterStatus}
					</strong>
				</p>
			</div>
			<div className="flex">
				{characters.results?.map((char) => (
					<div className="char-card">
						<div className="img-container">
							<Image
								src={char.image}
								fill
							/>
						</div>
						<h1>{char.name}</h1>
						<p>Gender: {char.gender} </p>
						<p>Specie: {char.species}</p>
						<p>
							Origin:{" "}
							{char.origin.name}
						</p>
						{char.status == "Alive" ? (
							<span className="green"></span>
						) : char.status == "Dead" ? (
							<span className="red"></span>
						) : (
							<span className="gray"></span>
						)}
					</div>
				))}
			</div>
		</div>
	);
};

export default Characters;
