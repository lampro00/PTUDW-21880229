const helper = {};
helper.createStar = (stars) => {
  let star = Math.floor(stars);
  let half = stars - star;
  let str = `<div class="ratting">`;
  let i;
  let dem = 0;
  for (i = 1; i <= star; i++) {
    str += `<i class="fa fa-star"></i>`;
  }
  if (half > 0) {
    str += `<i class="fa fa-star-half"></i>`;
    dem = 1;
  }
  for (i = dem + star; i < 5; i++) {
    str += `<i class="fa fa-star-o"></i>`;
    //   }
  }
  str += `</div>`;
  return str;
};
module.exports = helper;
