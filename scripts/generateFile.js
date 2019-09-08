const fs = require('fs');
function formatDate(date) {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) 
        month = '0' + month;
    if (day.length < 2) 
        day = '0' + day;

    return [year, month, day].join('-');
}

const postname = process.argv[2];
if (!postname) {
    console.log('Please supply a filename')
    process.exit(1)
}

const filename = `${formatDate(Date.now())}-${postname.split(' ').join('-')}.md`
const filepath = `./posts/${filename}`

if (fs.existsSync(filepath)){
    console.log('File exists')
    process.exit(1)
}
console.log(fs.existsSync(filepath))
fs.writeFileSync(`./posts/${filename}`, '')
console.log(`Created post ${filename}`)
