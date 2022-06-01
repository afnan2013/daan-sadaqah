let METHOD_GET	= "GET"	;
let METHOD_POST	= "POST";
let PROTOCOL_HTTP	= "http"	;
let PROTOCOL_HTTPS	= "https"	;

async function handleRequest(axios, method, headers, protocol, domain, port, pathWithoutStartingFrontSlashes, queryParameters, data)
{
	let config ={};
	let url = protocol + "://" + domain + ":" + port + "/" + pathWithoutBordersFrontSlashes;
	
	if (method !== undefined && method !== null)
		config.method = method;
	if (headers !== undefined && headers !== null)
		config.headers = headers;
	if (queryParameters !== undefined && queryParameters !== null)
		config.params = queryParameters;
		
	let response = undefined;

	try
	{
		if (method === METHOD_POST)
			response = await axios.post(url, data, config);
		else if (method === METHOD_GET)
			response = await axios.get(url, config);
	}
	catch(e)
	{
		console.log("await exception");
	}
	
	try
	{
		let result = {};
		result.status = 200;
		result.data = response.data;
		return result;
	}
	catch(e)
	{
		let result = {};
		result.status = 0;
		return result;
	}
	response.data;
}

module.exports = { handleRequest };
