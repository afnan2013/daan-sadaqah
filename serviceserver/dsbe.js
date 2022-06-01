let express 	= require("express"		);
let https		= require("https"		);
let bodyParser	= require("body-parser"	);
let fs			= require("fs"			);
let mysql		= require("mysql2"		);
let axios		= require("axios"		);

let utilFile	= require("./utilfile"	); //{ writeFile, FLAG_APPEND , readFile}
let utilRest	= require("./utilrest"	); 

let dsUserRoleMenu	= require("./dsuserrolemenu"); 
let smsActivities	= require("./sms"			); 

const pool = mysql.createPool	(	{
										"host"				: "103.36.103.150"	,
										"port"				: 33062				,
										"user"				: "dsa"				,
										"password"			: "Nopass@1234"		,
										"database"			: "ds"				,
										"waitForConnections": true				,
										"connectionLimit"	: 10				,
										"rowsAsArray"		: false				,
										"queueLimit"		: 0
									}
								)
;
const promisePool = pool.promise();

let port		= 6443		;
let appExpress	= express()	;

let optionsSSL	=	{
						"key"	: utilFile.readFile(fs, "./ssl_private.key"		),
						"ca"	: utilFile.readFile(fs, "./ssl_ca_bundle.crt"	),
						"cert"	: utilFile.readFile(fs, "./ssl_certificate.crt"	),
					}		
;
let otionsBPRaw	=	{
						"limit"	: "100mb"						,
						"type"	: "application/octet-stream"	,
					}
;
let otionsBPJSON=	{
						"limit"	: "100mb"				,
						"type"	: "application/*+json"	,
					}
;
let otionsBPUE	=	{
						"extended"		: true									,
						"parameterLimit": 10000									,
						"limit"			: "100mb"								,
						"parameterLimit": 100									,
						"type"			: "application/x-www-form-urlencoded"	,
					}
;
let otionsBPText=	{
						"limit"	: "100mb"	,
						"type"	: "*/*"		,
					}
;

let serverRoleMenu = {};

appExpress.use(bodyParser.json		(otionsBPJSON	));
appExpress.use(bodyParser.urlencoded(otionsBPUE		));
appExpress.use(bodyParser.raw		(otionsBPRaw	));
appExpress.use(bodyParser.text		(otionsBPText	));

appExpress.use(express.static(__dirname + "/static" ));

appExpress.get('/', function (req, resp) {
    resp.send("New BE Server 1");
});

appExpress.post('/', function (req, resp) {
    resp.send("New BE Server 1");
});

appExpress.get('/dbtest', function (req, resp) {
	dbtest(req, resp);
});

appExpress.post('/dbtest', function (req, resp) {
	dbtest(req, resp);
});

appExpress.post('/getRoles', function (req, resp) {
	dsUserRoleMenu.getRoles(dbCall, req, resp);
});

appExpress.post('/getUsers', function (req, resp) {
	dsUserRoleMenu.getUsers(dbCall, req, resp);
});

appExpress.post('/getMenus', function (req, resp) {
	dsUserRoleMenu.getMenus(dbCall, req, resp);
});

appExpress.post('/getRoleMenuMaps', function (req, resp) {
	dsUserRoleMenu.getRoleMenuMaps(dbCall, req, resp);
});

appExpress.post('/reloadRoleMenuData', function (req, resp) {
	reloadRoleMenu(req, resp);
});

appExpress.post('/getRoleMenuData', function (req, resp) {
	resp.send(serverRoleMenu);
});

appExpress.post('/setPassword', function (req, resp) {
	dsUserRoleMenu.setPassword(dbCall, req, resp);
});

appExpress.post('/checkPassword', function (req, resp) {
	dsUserRoleMenu.checkPassword(dbCall, req, resp);
});

appExpress.post('/login', function (req, resp) {
	dsUserRoleMenu.login(dbCall, req, resp);
});

appExpress.post('/sendOTP', function (req, resp) {
	smsActivities.sendOTP(dbCall, axios, req, resp);
});

appExpress.post('/sendSMS', function (req, resp) {
	smsActivities.smsService(axios, req, resp);
});

async function reloadRoleMenu(req, resp)
{
	serverRoleMenu = await dsUserRoleMenu.getRoleMenuData(dbCall, serverRoleMenu, resp);
}

async function dbtest(req, resp)
{
	let body = JSON.parse(req.body);
	console.log(body.v1);
	console.log(body.v2);
	console.log(req.query.n1);
	console.log(req.query.n2);
	let dbResponse = await dbCall("testSP2", ['a', 1], false);
	resp.send(dbResponse);
}

async function dbCall(spName, params, showLogs)
{
	if (showLogs) console.log("dbCall in");
	let dbResponse = {"returnTables" : [], "columnDefinitions": [], "status": 0, "issue": {}};
	
	try{
		let questionMarks = "";
		
		try
		{
			if (params === undefined || params === null || params.length === 0 || params === "")
			{
				params = [];
			}
			else if (params.length > 0)
			{
				questionMarks = "?";
				
				for (let i = 1; i < params.length; i++)
					questionMarks = questionMarks + ", ?";
			}
		}
		catch(e)
		{
		}
		
		let dbr = await promisePool.execute	(	"CALL `" + spName +"` (" + questionMarks + ");", 
												params
											)
		;

		let responseTables = dbr[0];
		let responseTableCount = responseTables.length - 1;
		for(let i = 0; i < responseTableCount; i++)
		{
			if (showLogs) console.log("result set: start	: " + i);
			dbResponse.returnTables.push(responseTables[i]);
			
			for(let j = 0; j < responseTables[i].length; j++)
				if (showLogs) console.log(responseTables[i][j]);
			if (showLogs) console.log("result set: stop	: " + i);
		}

		let responseColumns = dbr[1];
		let responseColumnCount = responseColumns.length;
		for(let i = 0; i < responseTableCount; i++)
		{
			let definitionSet = responseColumns[i];
			let columnsDefinitions = [];
			if (showLogs) console.log("column set: start	: " + i);
			for(let j = 0; j < definitionSet.length; j++)
			{
				let columnsDefinition =	{	"encoding"		: ""		,
											"name"			: "alpha1"	,
											"columnLength"	: -1		,
											"decimals"		: -1
										}
				;
				columnsDefinition.encoding		= definitionSet[j].encoding		;
				columnsDefinition.name			= definitionSet[j].name			;
				columnsDefinition.columnLength	= definitionSet[j].columnLength	;
				columnsDefinition.decimals		= definitionSet[j].decimals		;
				columnsDefinitions.push(columnsDefinition);
				if (showLogs) console.log(columnsDefinition);
			}
			dbResponse.columnDefinitions.push(columnsDefinitions);
			if (showLogs) console.log("column set: stop	: " + i);
		}
		dbResponse.status = 1;
	}
	catch(e)
	{
		dbResponse.status = -1;
		dbResponse.issue = e;
	}

	if (showLogs) console.log("dbCall out");
	return dbResponse;
}

let server = https.createServer(optionsSSL, appExpress).listen(port, function () {
    console.log("Started server on port %d..", port);
});

function init()
{
	reloadRoleMenu();
}

init();
