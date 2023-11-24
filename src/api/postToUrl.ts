import axios from "axios";
import { ClientDataType } from "../types/types";

type DataType = {
	data: {
		id: number
		result: string
	}
}

export const postClient = async (client: ClientDataType | {}): Promise<DataType> => {
	return await axios.post(`https://dispex.org/api/vtest/HousingStock/client`, client)
}