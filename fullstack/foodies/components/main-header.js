import Link from "next/link";
import logoImg from "@/assets/logo.png";

export default function MainHeader() {
	return (
		<header>
			<Link href="/" className="logo">
				<img src={logoImg} alt="NextLevel Food" />
				NextLevel Food
			</Link>

			<nav>
				<ul>
					<Link href="/meals">
						Browse Meals
					</Link>
					<Link href="/community">
						Foodies Community
					</Link>
				</ul>
			</nav>
		</header>
	);
}
