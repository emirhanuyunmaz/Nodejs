const Photo = require('../models/Photo');
const fs = require('fs')

exports.getAllPhoto = async (req, res) => {
  //Bu işlem bir syafanın ekranda gösterilmesi işlemini yapmaktadır.
  //res.sendFile(path.resolve(__dirname,"temp/index.html"))

  const photos = await Photo.find({}).sort('-dateCreated'); //sort işlemi sayesinde verileri sıralama  işlemi yapmaktayız

  //Buradaki render eden ejs eklentisi öncelikle "views" klasörüne bakar ve oradaki dosyaları çalıştırır.
  //Bu işlem yukarıdaki ile aynı tek fark olarak ejs formatındaki verileri göstermemizi sağlar
  res.render('index', { photos });
};

exports.getPhoto = async (req, res) => {
  const photo = await Photo.find({ _id: req.params.id });
  console.log(photo.title);

  res.render('photos', { photo });

  //res.render("about")
};

exports.editPhoto = async (req, res) => {
  const photo = await Photo.find({ _id: req.params.id });
  console.log(photo.title);

  res.render('edit', { photo });

  //res.render("about")
};

exports.updatePhoto = async (req, res) => {
  //Fotoğrafı güncelleme işlemi yaptık
  await Photo.updateOne(
    { _id: req.params.id },
    { title: req.body.title, description: req.body.description }
  );
  //Sayfa yönlendirme işlemi yaptık
  res.redirect(`/photos/${req.params.id}`);
};

exports.deletePhoto = async (req, res) => {
  const photo = await Photo.find({ _id: req.params.id });
  console.log(req.params.id);
  ///uploads/saat_kulesi.jpg
  let deletePhoto = __dirname + '/../public/' + photo[0].image;
  fs.unlinkSync(deletePhoto); //Fotoğrafı dosya dizininden silme işlemi yaptık.
  //Fotoğrafı silme işlemi yaptık
  await Photo.deleteOne(
    { _id: req.params.id },
    //{ title: req.body.title, description: req.body.description }
  );
  //Sayfa yönlendirme işlemi yaptık
  res.redirect(`/`);
};

exports.addPhoto = async (req, res) => {
  //console.log(req.files.image)//resim ile ilgili bilgileri içermektedir.

  const uploadDir = 'public/uploads';

  let uploadeImage = req.files.image;

  let uploadePath = __dirname + '/../public/uploads/' + req.files.image.name;

  if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir);
  }

  uploadeImage.mv(uploadePath, async () => {
    await Photo.create({
      ...req.body,
      image: '/uploads/' + uploadeImage.name,
    });
  });

  //res.render("add")
  //await Photo.create(req.body)
  //burada girilen verileri alıyoruz.
  //console.log(req.body)
  //Burada daha sonra işlem tamamlanmış olarak index sayfasına gitmesini sağlayacağız.
  res.redirect('/');
};
