import { useState } from "react";

import { getApartments, getResidents } from "../../../../api/getFromUrl";
import { ApartmentsDataType, ClientDataType, ResidentsType } from "../../../../types/types";
import { postClient } from "../../../../api/postToUrl";
import { putClient } from "../../../../api/putToUrl";

import classes from "./Apartment.module.css";
import { deleteResident } from "../../../../api/deleteFromUrl";

type ApartmentsPropsType = {
	houseId: number
}

export const Apartments: React.FC<ApartmentsPropsType> = ({
	houseId,
}: ApartmentsPropsType) => {

	const [apartments, setApartments] = useState<ApartmentsDataType[]>();
	const [isOpenAccordion, setIsOpenAccordion] = useState(false);
	const [activeApartment, setActiveApartment] = useState<number>()
	const [client, setClient] = useState<ClientDataType | {}>({})
	const [residents, setResidents] = useState<ResidentsType[]>()

	const getAxiosApartments = async () => {
		try {
			const apartments = await getApartments(houseId);
			// eslint-disable-next-line no-self-compare
			setApartments(apartments.data.filter(apartment => apartment.typeId === 3 && Number(apartment.name[0])))
		}
		catch (e) {
			console.error(e);
		}
	}

	const handleClickOpenAccordion = () => {
		setIsOpenAccordion(isOpenAccordion => !isOpenAccordion)
		if (!apartments) {
			getAxiosApartments();
		}
	}

	const handleApartmentClick = async (id: number) => {
		setActiveApartment(id)
		const residents = await getResidents(id);
		setResidents(residents.data)
	}

	const saveClient = async () => {
		const { data } = await postClient(client);
		const response = await putClient(activeApartment, data.id);
		const residents = await getResidents(activeApartment);
		setResidents(residents.data)

		if (response.status === 200) {
			setActiveApartment(undefined);
			setClient({});
		}
	}

	const handleDeleteResidentClick = async (id: number) => {
		const res = await deleteResident(id);

		if (res.status === 200) {
			setResidents(residents?.filter((resident: ResidentsType) => resident.id !== id));
		}
	}

	return (
		<div>
			<button onClick={handleClickOpenAccordion}>{isOpenAccordion ? '-' : '+'}</button>
			<div className={classes.apartmentsContainer}>
				<div className={classes.apartmentContainer}>
					{isOpenAccordion && apartments && apartments.map((apartment: ApartmentsDataType) => <div className={classes.apartments} onClick={() => handleApartmentClick(apartment.id)} key={apartment.id}>
						{`Квартира № ${apartment.name}`}
					</div>)}
				</div>
				{isOpenAccordion && activeApartment && <div className={classes.residentsBlock}>
					<div className={classes.inputs}>
						<div>Имя
							<input type="text" onChange={(e) => {
								setClient(prevValue => ({ ...prevValue, Name: e.target.value }))
							}} />
						</div>
						<div>Номен телефона
							<input type="text" onChange={(e) => {
								setClient(prevValue => ({ ...prevValue, Phone: e.target.value }))
							}} />
						</div>
						<div>Email
							<input type="text" onChange={(e) => {
								setClient(prevValue => ({ ...prevValue, Email: e.target.value }))
							}} />
						</div>
						<button disabled={Object.keys(client).length < 3} onClick={saveClient}>Привязать жильца</button>
					</div>
					<div className={classes.residentsContainer}>
						<div className={classes.residentsTitle}>
							Список прописаных жильцов:
						</div>
						{!residents ? 'Нет прописанных жильцов' : <div className={classes.residents}>
							{residents && residents.map(resident => <div className={classes.resident} key={resident.id}>
								<div className={classes.residentItem}>
									<div>Имя: {resident.name}</div>
									<div>Номер телефона: {resident.phone}</div>
									<div>Email: {resident.email}</div>
									<button className={classes.deleteButton} onClick={() => handleDeleteResidentClick(resident.id)}>Удалить</button>
								</div>
							</div>)}
						</div>}
					</div>
				</div>}
			</div>
		</div>
	)
}