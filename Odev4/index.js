const fs = require('node:fs');

let employe={"name": "Employee 1 Name", "salary": 2000}
//Dosyaya veri yazma işlemi ...
fs.writeFile('employees.json', `{name:"${employe.name}" salary:${employe.salary}}`,"utf8", (err,data) => {
    if (err) console.log(err);
    console.log('Saved!');
  });

//Dosyada yazılı olan veriyi okuma işlemi ...
fs.readFile("employees.json","utf8",(err,data)=>{
    if (err) console.log(err)
    console.log(data)
})

//Dosya içerisindeki verileri koruyarak yeni verileri ekleme işlemi...
fs.appendFile('employees.json', '\nYENI EKLENEN VERİ', 'utf8', (err,data) => {
    if (err) console.log(err);
});

//Verilen dosyanın silinmesi işlemi.
fs.unlink('employees.json', (err) => {
    if (err) console.log(err);
    console.log("Silme İşlemi Başarılı...")
});