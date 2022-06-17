let DSRouter = class 
{
	static name		= "DSRouter";
	static folder	= "/static"	;

	static otionsBPRaw	=	{
								"limit"	: "100mb"						,
								"type"	: "application/octet-stream"	,
							}
	;
	static otionsBPJSON=	{
								"limit"	: "100mb"				,
								"type"	: "application/*+json"	,
							}
	;
	static otionsBPUE	=	{
								"extended"		: true									,
								"parameterLimit": 10000									,
								"limit"			: "100mb"								,
								"parameterLimit": 100									,
								"type"			: "application/x-www-form-urlencoded"	,
							}
	;
	static otionsBPText=	{
								"limit"	: "100mb"	,
								"type"	: "*/*"		,
							}
	;

	constructor(params)
	{
		this.properties = params;
		this.initialize(params);//this.properties["bodyParser"], this.properties["express"], this.properties["appExpress"]);
		this.setRoutes();
	}
	
	initialize(bodyParser, express, appExpress)
	{
		this.appExpress		= this.properties["appExpress"]		;
		this.dsUserRoleMenu	= this.properties["dsUserRoleMenu"]	;
		this.smsActivities	= this.properties["smsActivities"]	;
		
		let bodyParser = this.properties["bodyParser"];
		let express = this.properties["express"];

		this.appExpress.use(bodyParser.json			(DSRouter.otionsBPJSON	));
		this.appExpress.use(bodyParser.urlencoded	(DSRouter.otionsBPUE	));
		this.appExpress.use(bodyParser.raw			(DSRouter.otionsBPRaw	));
		this.appExpress.use(bodyParser.text			(DSRouter.otionsBPText	));

		this.appExpress.use(express.static(__dirname + DSRouter.folder));
	}

	setValue(value)
	{
		this.value = value;
	}

	printSelf()
	{
		console.log(DSRouter.name);
	}
	
	setRoutes()
	{
		this.appExpress.get('/', function (req, resp) {
			resp.send("New BE Server 1");
		});

		this.appExpress.post('/', function (req, resp) {
			resp.send("New BE Server 1");
		});

/*
		this.appExpress.get('/dbtest', function (req, resp) {
			this.dbtest(req, resp);
		});

		this.appExpress.post('/dbtest', function (req, resp) {
			this.dbtest(req, resp);
		});
*/
		this.appExpress.post('/getRoles', function (req, resp) {
			this.dsUserRoleMenu.getRoles(dbCall, req, resp);
		});

		this.appExpress.post('/getUsers', function (req, resp) {
			this.dsUserRoleMenu.getUsers(dbCall, req, resp);
		});

		this.appExpress.post('/getMenus', function (req, resp) {
			this.dsUserRoleMenu.getMenus(dbCall, req, resp);
		});

		this.appExpress.post('/getRoleMenuMaps', function (req, resp) {
			this.dsUserRoleMenu.getRoleMenuMaps(dbCall, req, resp);
		});

		this.appExpress.post('/reloadRoleMenuData', function (req, resp) {
			this.dsUserRoleMenu.reloadRoleMenu(req, resp);
		});

		this.appExpress.post('/getRoleMenuData', function (req, resp) {
			resp.send(serverRoleMenu);
		});

		this.appExpress.post('/setPassword', function (req, resp) {
			dsUserRoleMenu.setPassword(dbCall, req, resp);
		});

		this.appExpress.post('/checkPassword', function (req, resp) {
			dsUserRoleMenu.checkPassword(dbCall, req, resp);
		});

		this.appExpress.post('/login', function (req, resp) {
			dsUserRoleMenu.login(dbCall, req, resp);
		});

		this.appExpress.post('/sendOTP', function (req, resp) {
			smsActivities.sendOTP(dbCall, axios, req, resp);
		});

		this.appExpress.post('/sendSMS', function (req, resp) {
			smsActivities.smsService(axios, req, resp);
		});
	}
}
;

module.exports = DSRouter;
