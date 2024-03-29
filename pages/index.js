import styles from "../styles/Home.module.css";
import Link from "next/link";
import Locations from "../public/Locations.jpg";
import Characters from "../public/Characters.jpg";
import Image from "next/image";
import Modal from "../components/Modal";
import { useRef, useState } from "react";
import { AiOutlineQuestionCircle } from "react-icons/ai";

export default function Home() {
	const [open, setOpen] = useState(false);

	const cancelButtonRef = useRef(null);
	return (
		<div className="home">
			<p className="text-end text-gray-400 font-bold">
				codedByJordi
			</p>
			<Modal
				open={open}
				setOpen={setOpen}
				cancelButtonRef={cancelButtonRef}
			/>
			<h4>
				Welcome Human! <br />
				Select a place to go and start exploring.
			</h4>
			<AiOutlineQuestionCircle
				className="question"
				onClick={() => setOpen(true)}
				style={{ cursor: "pointer" }}
			/>
			<div className="d-flex">
				<Link href="/locations">
					<div className="img-container">
						<h2>Locations</h2>
						<Image src={Locations}></Image>
					</div>
				</Link>
				<Link href="/characters">
					<div className="img-container">
						<h2>Characters</h2>
						<Image src={Characters}></Image>
					</div>
				</Link>
			</div>
		</div>
	);
}
