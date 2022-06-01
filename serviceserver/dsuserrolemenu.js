async function getRoles(dbCall, req, resp)
{
	let dbResponse = await dbCall("getRoles", [], false);
	resp.send(dbResponse);
}

async function getMenus(dbCall, req, resp)
{
	let dbResponse = await dbCall("getMenus", [], false);
	resp.send(dbResponse);
}

async function getRoleMenuMaps(dbCall, req, resp)
{
	let dbResponse = await dbCall("getRoleMenuMaps", [], false);
	resp.send(dbResponse);
}

async function getUsers(dbCall, req, resp)
{
	let dbResponse = await dbCall("getUsers", [], false);
	resp.send(dbResponse);
}

async function getRoleMenuData(dbCall, serverRoleMenu, resp)
{
	serverRoleMenu = await dbCall("getRoleMenuData", [], false);
	if (resp !== undefined) resp.send({"status": "loaded"});
	return serverRoleMenu;
}

async function setPassword(dbCall, req, resp)
{
	let body = JSON.parse(req.body);
	let dbResponse = await dbCall("setPassword", [body.p_userid, body.p_password], false);
	resp.send(dbResponse);
}

async function checkPassword(dbCall, req, resp)
{
	let body = JSON.parse(req.body);
	let dbResponse = await dbCall("checkPassword", [body.p_userid, body.p_password], false);
	resp.send(dbResponse);
}

async function login(dbCall, req, resp)
{
	let body = JSON.parse(req.body);
	let dbResponse = await dbCall("login", [body.p_userid, body.p_password], false);
	resp.send(dbResponse);
}

module.exports ={
					"getRoles"			:	getRoles		, 
					"getUsers"			:	getUsers		, 
					"getMenus"			:	getMenus		, 
					"getRoleMenuMaps"	:	getRoleMenuMaps	, 
					"getRoleMenuData"	:	getRoleMenuData	,
					"setPassword"		:	setPassword		, 
					"checkPassword"		:	checkPassword 	,
					"login"				:	login
				}
;
