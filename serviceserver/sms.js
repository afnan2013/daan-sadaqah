async function sendOTP(dbCall, axios, req, resp)
{
	let body = JSON.parse(req.body);
	
//	let dbResponse = await dbCall("getOTP", [body.p_userid], false);
//	let otpid = dbResponse.returnTables[0][0].otpId;
	//let otpValue = dbResponse.returnTables[0][0].otpValue;
	let otpValue = Math.floor(100000 + Math.random() * 900000);

	let otp5Response = await dbCall("getLastOTP", [5, body.p_userid], false);
	
	console.log(otp5Response.returnTables[0][0]);
	if (otp5Response.returnTables[0][0]["c"] !== 0)
	{
		resp.send({"status": "TIME5", "message": "Last OTP was less than 5 minutes ago."});
		return;
	}
	
	let smsText = "Your DS OTP is: " + otpValue;
	let sendSMSResponse = await sendSMS(axios, "88" + body.p_userid, smsText);
	let updateOTPSMSResponse = await dbCall("updateOTPSMS", ["88" + body.p_userid, otpValue, smsText, sendSMSResponse], false);
	let otpid = JSON.stringify(updateOTPSMSResponse);
	resp.send({"status": "sent", "otpid": updateOTPSMSResponse.returnTables[0][0]["id"]});
}

async function smsService(axios, req, resp)
{
	let body = JSON.parse(req.body);
    let response = await sendSMS(axios, body.phoneNumber, body.smsText);
	resp.send(response);
//	console.log(JSON.stringify(response, null, 4));
}

async function sendSMS(axios, phoneNumber, smsText)
{
//	console.log(phoneNumber);
//	console.log(smsText);
//	let url = `http://sms.ajuratech.com/api/mt/SendSMS?user=maxis&password=maxis123&senderid=8809612448801&channel=Normal&DCS=0&flashsms=0&number=phoneNumber&text=smsmessage`;
	let url = `http://217.172.190.215/sendtext?apikey=4f2d7511866670b8&secretkey=0f7a0899&callerID=8809612770464&toUser=phoneNumber&messageContent=smsmessage`;
	url = url.replace("phoneNumber", phoneNumber);
	url = url.replace("smsmessage", smsText);
	let smsResponse = await axios.get(url);
//	console.log(smsResponse);
	return smsResponse.data;
}

module.exports ={
					"sendOTP"	:	sendOTP	,
					"sendSMS"	:	sendSMS	,
					"smsService":	smsService
				}
;
