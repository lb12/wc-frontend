export default class Advert {
  id;
  name;
  photo;
  description;
  price;
  forSale;
  tags;
  reserved;
  sold;
  member;
  slug;

  constructor(advert) {
    this.id = advert._id;
    this.name = advert.name;
    this.photo =
      process.env.NODE_ENV === "production"
        ? `https://api.depatitos.com/${advert.photo}`
        : `http://localhost:3000${advert.photo}`;
    this.description = advert.description;
    this.price = advert.price;
    this.forSale = advert.for_sale;
    this.tags = advert.tags;
    this.reserved = advert.reserved;
    this.sold = advert.sold;
    this.member = advert.member;
    this.slug = advert.slug;
  }
}
