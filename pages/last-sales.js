import { useEffect, useState } from "react";

function LastSalesPage() {
	const [sales, setSales] = useState();
	const [isLoading, setIsLoading] = useState(false);

	useEffect(() => {
		setIsLoading(true);
		fetch(
			'https://nextjs-course-859dc-default-rtdb.firebaseio.com/sales.json'
		).then((response) => response.json())
		.then(data => {
			const transformedSales = [];

			for (const key in data) {
				transformedSales.push({
					id: key,
					username: data[key].username,
					volume: data[key].volume});
			}

			setSales(transformedSales)
			setIsLoading(false);
		});
	}, [])

	if (isLoading) {
		return <p>....Loading</p>
	}

	if (!sales) {
		return <p>No data</p>
	}

	return (
		<ul>
			{sales.map((sale) => (
				<li key={sale.id}>
					{sale.username} - ${sale.volume}
				</li>
			))}
		</ul>
	)
}

export default LastSalesPage;
