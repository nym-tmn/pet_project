import { useState } from "react";

import { StreetDataType } from "../../types/types";
import { getStreets } from "../../api/getFromUrl";
import { Houses } from "./Houses/Houses";

// import classes from "./CityContainer.module.css";
import classes from "./Streets.module.css";

const Streets = () => {

	const [streets, setStreets] = useState<StreetDataType[]>();

	const getAxiosStreets = async () => {
		try {
			const streets = await getStreets();
			setStreets(streets.data)
		}
		catch (e) {
			console.error(e);
		}
	}

	if (!streets) {
		getAxiosStreets();
	}

	return (
		<div className={classes.city}>
			{streets && streets.map(street => <div className={classes.streetsContainer} key={street.id}>
				<div className={classes.streets}>{`Улица ${street.name}`}</div>
				<Houses streetId={street.id} />
			</div>)}
		</div>
	)
}

export default Streets;