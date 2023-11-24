import axios from "axios";

import { ApartmentsDataType, HousesDataType, ResidentsType, StreetDataType } from "../types/types";

export const getStreets = async (): Promise<{data: StreetDataType[]}> => {
	return await axios.get('https://dispex.org/api/vtest/Request/streets')
}

export const getHouses = async (streetId: number): Promise<{ data: HousesDataType[] }> => {
	return await axios.get(`https://dispex.org/api/vtest/Request/houses/${streetId}`)
}

export const getApartments = async (houseId: number): Promise<{ data: ApartmentsDataType[] }> => {
	return await axios.get(`https://dispex.org/api/vtest/Request/house_flats/${houseId}`)
}

export const getResidents = async (addressId: number | undefined): Promise<{data: ResidentsType[]}> => {
	return await axios.get(`https://dispex.org/api/vtest/HousingStock/clients?addressId=${addressId}`)
}
