import React, { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import Image from "next/image";
import {
	AiFillCaretLeft,
	AiFillCaretRight,
	AiFillCloseCircle,
	AiFillLeftCircle,
	AiOutlineArrowLeft,
	AiOutlineLeft,
	AiOutlineQuestionCircle,
	AiOutlineSwapLeft,
} from "react-icons/ai";

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

	return (
		<div className="Characters">
			<header>
				<Link href="/">
					<AiOutlineArrowLeft className="i" />
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
						key={number}
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
					<div
						key={char.id}
						className="char-card"
					>
						<div className="img-container">
							<Image
								src={char.image}
								width={200}
								height={100}
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
