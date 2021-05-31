export const CONTRACT_ADDRESS = "0xfD486371fbD61c6Aff77371029c3fD6FbDD77368";
export default [
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "string",
				"name": "name",
				"type": "string"
			}
		],
		"name": "ContentsUpdated",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "newContents",
				"type": "string"
			}
		],
		"name": "setContents",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "author",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "contents",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getContents",
		"outputs": [
			{
				"internalType": "string",
				"name": "whiteBoardContents",
				"type": "string"
			},
			{
				"internalType": "address",
				"name": "contentsAuthor",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
]
