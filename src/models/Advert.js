export default class Advert {
  id;
  name;
  photo;
  description;
  price;
  forSale;
  tags;
  member;

  constructor(advert) {
    this.id = advert._id;
    this.name = advert.name;
    this.photo = advert.photo.startsWith("/images/anuncios/")
      ? `http://localhost:3001${advert.photo}`
      : advert.photo;
    this.description = advert.description;
    this.price = advert.price;
    this.forSale = advert.for_sale;
    this.tags = advert.tags;
    this.member = advert.member;
  }
}