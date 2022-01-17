let id = 0;
const createData = (building_id, building_name, unit_type, unit_capacity, unit_filled) => {
	id += 1;
	return { id, building_id, building_name, unit_type, unit_capacity, unit_filled };
};

export default [
	createData(
		"1",
		159,
		6.0,
		24,
		4.0
	),
	createData(
		"2",
		237,
		9.0,
		37,
		4.3
	),
	createData(
		"3",
		262,
		16.0,
		24,
		6.0
	),
	createData(
		"4",
		305,
		3.7,
		67,
		4.3
	),
	createData(
		"5",
		356,
		16.0,
		49,
		3.9
	)
];
