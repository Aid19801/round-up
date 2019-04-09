export const roundUp = num => {
	let positiveNumber = num * -1;
	let roundedUpNumber = Math.ceil(positiveNumber);
	let saving = roundedUpNumber - positiveNumber;
	return parseFloat(saving.toFixed(2));
}
