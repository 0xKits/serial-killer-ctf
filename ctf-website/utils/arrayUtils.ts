export const addOneToArray = (arr: number[]) => {
	const next = Math.max(...arr) + 1;
	return [...arr, next];
};