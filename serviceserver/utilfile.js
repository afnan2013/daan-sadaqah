let FLAG_APPEND = "a+";

function writeFile(fs, path, content, mode)
{
	if (mode !== undefined)
		fs.writeFileSync(path, content, { "flag": mode }, err => {
			if (err) {
				console.error(err);
			}
		});
	else
		fs.writeFileSync(path, content, err => {
			if (err) {
				console.error(err);
			}
		});
}

function readFile(fs, path)
{
	return fs.readFileSync(path);
}

module.exports ={
					"writeFile"		:	writeFile	, 
					"readFile"		:	readFile	, 
					"FLAG_APPEND"	:	FLAG_APPEND	, 
				}
;
