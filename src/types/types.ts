export type StreetDataType = {
	city: string
	cityId: number
	id: number
	name: string
	nameWithPrefix: string
	prefix: {
		id: number
		name: string
		shortName: string
	}
}

export type HousesDataType = {
	id: number
	name: string
}

export type ApartmentsDataType = {
	id: number
	name: string
	flat: string
	typeId: number
	typeName: string
}

export type ClientDataType = {
	Name: string
	Phone: string
	Email: string
}

export type ResidentsType = {
	id: number
	name: string
	phone: string
	email: string
	bindId: number
}
