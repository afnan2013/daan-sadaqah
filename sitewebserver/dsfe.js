let express 	= require("express"		);
let https		= require("https"		);
let bodyParser	= require("body-parser"	);
let fs			= require("fs"			);
let mysql		= require("mysql"		);
let axios		= require("axios"		);
let path		= require("path"		);
let utilFile	= require("./utilfile"	); //{ writeFile, FLAG_APPEND , readFile}
let utilRest	= require("./utilrest"	); 

let port		= 443		;
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
					};
let otionsBPJSON=	{
						"limit"	: "100mb"				,
						"type"	: "application/*+json"	,
					};
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
					};
appExpress.use(bodyParser.json		(otionsBPJSON	));
appExpress.use(bodyParser.urlencoded(otionsBPUE		));
appExpress.use(bodyParser.raw		(otionsBPRaw	));
appExpress.use(bodyParser.text		(otionsBPText	));
appExpress.use(express.static(path.join(__dirname, 'build')));

appExpress.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

appExpress.post("/*", function (req, resp) {
    resp.send("New FE Server 1");
});

let server = https.createServer(optionsSSL, appExpress).listen(port, function () {
    console.log("Started server on port %d..", port);
});
