import { useState } from "react";

import { getHouses } from "../../../api/getFromUrl";
import { HousesDataType } from "../../../types/types";
import { Apartments } from "./Apartments/Apartments";

import classes from "./Houses.module.css";

type HousesPropsType = {
	streetId: number
}

export const Houses: React.FC<HousesPropsType> = ({
	streetId,
}) => {

	const [houses, setHouses] = useState<HousesDataType[]>();
	const [isOpenAccordion, setIsOpenAccordion] = useState(false);

	const getAxiosHouses = async () => {
		try {
			const houses = await getHouses(streetId);
			setHouses(houses.data.filter(house => Number(house.name[0])))
		}
		catch (e) {
			console.error(e);
		}
	}

	const handleClickOpenAccordion = () => {
		setIsOpenAccordion(isOpenAccordion => !isOpenAccordion)
		if (!houses) {
			getAxiosHouses();
		}
	}

	return (
		<div>
			<button className={classes.buttonHousesAccordion} onClick={handleClickOpenAccordion}>{isOpenAccordion ? '-' : '+'}</button>
			{isOpenAccordion && houses && houses.map(house => <div className={classes.housesContainer} key={house.id}>
				<div className={classes.houses}>{`Дом № ${house.name}`}</div>
				<Apartments houseId={house.id} />
			</div>)}
		</div>
	)
}