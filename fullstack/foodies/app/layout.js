import "./globals.css";

import MainHeader from "@/components/main-header";
import MainBodyDiv from "@/components/main-body-div";

export const metadata = {
	title: "NextLevel Food",
	description: "Delicious meals, shared by a food-loving community.",
};

export default function RootLayout({ children }) {
	return (
		<html lang="en">
			<body>
				<MainBodyDiv />
				<MainHeader />
				{children}
			</body>
		</html>
	);
}
