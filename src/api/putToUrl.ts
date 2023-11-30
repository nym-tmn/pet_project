import axios from "axios";

type ResponseType = {
	status: number
}

export const putClient = async (activeApartment: number | undefined, clientId: number): Promise<ResponseType> => {
	return await axios.put(`https://dispex.org/api/vtest/HousingStock/bind_client`, {
		AddressId: activeApartment,
		ClientId: clientId
	});
}