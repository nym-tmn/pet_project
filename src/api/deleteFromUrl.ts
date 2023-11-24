import axios from "axios"

export const deleteResident = async (residentId: number): Promise<{status: number}> => {
	return await axios.delete(`https://dispex.org/api/vtest//HousingStock/bind_client/${residentId}`);
}