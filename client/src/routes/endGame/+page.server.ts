export async function load({ fetch }) {
	const response = await fetch('/api/endgame');
	const result = await response.json();
	if (response.status === 200) {
		return { result: result };
	} else {
		return { result: [] };
	}
}
