export const roundUp = num => {
	let positiveNumber = num * -1;
	let roundedUpNumber = Math.ceil(positiveNumber);
	let saving = roundedUpNumber - positiveNumber;
	return parseFloat(saving.toFixed(2));
}


export const formatNumber = num => num.replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,");