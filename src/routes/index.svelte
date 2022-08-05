<script lang="ts">
	import { Client, RequestManager, HTTPTransport } from '@open-rpc/client-js';

	let response = '...';
	let msg: string;

	const client = new Client(new RequestManager([new HTTPTransport('http://127.0.0.1:4173')]));

	async function handleClick() {
		const res = await client.request({
			method: 'hello',
			params: ['sui desktop wallet app']
		});
		response = res;
	}
</script>

<h1>
	<!-- {#await response}
		...
	{:then response}
		{response}
	{/await} -->
	{response}
</h1>
<input type="text" bind:value={msg} />
<button on:click={handleClick}>send request</button>
