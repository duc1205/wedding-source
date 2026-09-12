/* ============================================================
 *  CHỈNH SỬA WEBSITE CƯỚI TẠI ĐÂY
 *  - Đổi tên, ngày giờ, địa điểm, lời mời
 *  - Đổi ảnh: thay file trong thư mục assets/images/
 *    (giữ nguyên tên file, hoặc sửa đường dẫn bên dưới)
 * ============================================================ */

window.WEDDING = {
  couple: {
    groomShort: "Minh Đức",
    brideShort: "Phan Giang",
    groomFull: "Minh Đức",
    brideFull: "Phan Giang",
    groomRole: "Trưởng Nam",
    brideRole: "Trưởng Nữ",
  },

  date: {
    text: "20 tháng 09, 2026",
    simplify: "20.09.2026",
    iso: "2026-09-20T11:00:00+07:00",
    calendarYear: 2026,
    calendarMonth: 9,
  },

  family: {
    groomParents: ["Nguyễn Minh Tài", "Lê Thị Hiệp"],
    groomAddress: "Thôn Văn Long, xã Đại Đồng, tỉnh Nghệ An",
    brideParents: ["Phan Văn Dự", "Nguyễn Thị Hồng"],
    brideAddress: "Xóm Xuân Tường - xã Xuân Lâm - tỉnh Nghệ An",
  },

  inviteLead: "Tới dự lễ Vu quy và lễ Thành hôn của con chúng tôi",

  /* Lễ vu quy — tư gia nhà gái */
  brideCeremony: {
    enabled: true,
    receptionTime: "16:00",
    weekday: "THỨ BẢY",
    day: "19",
    month: "THÁNG 09",
    year: "2026",
    lunar: "(Tức ngày 09 tháng 08 năm Bính Ngọ)",
    restaurant: "TƯ GIA NHÀ GÁI",
    restaurantAddress: "Xóm Xuân Tường - xã Xuân Lâm - tỉnh Nghệ An",
    restaurantMapLink: "https://maps.app.goo.gl/oEWU6basVXpcpBPY6",
    calendarDay: 19,
  },

  /* Lễ thành hôn — nhà trai */
  weddingCeremony: {
    receptionTime: "11:00",
    weekday: "CHỦ NHẬT",
    day: "20",
    month: "THÁNG 09",
    year: "2026",
    lunar: "(Tức ngày 10 tháng 08 năm Bính Ngọ)",
    restaurant: "SÂN THỂ THAO THÔN VĂN LONG",
    restaurantAddress: "Xã Đại Đồng, tỉnh Nghệ An",
    restaurantMapLink:
      "https://www.google.com/maps/place/Q8V4%2BR2G+Qu%C3%A1n+T%E1%BA%A1p+Ho%C3%A1+B%E1%BA%A3y+Ho%C3%A0,+V%C3%B5+Th%C3%BAc+%C4%90%E1%BB%93ng,+V%C4%83n+long,+Thanh+Ch%C6%B0%C6%A1ng,+Ngh%E1%BB%87+An/data=!4m2!3m1!1s0x3139e500488d13d1:0xfb601a89a24e6f01",
    calendarDay: 20,
  },

  images: {
    hero: "assets/images/1.jpg",
    heroMobile: "assets/images/1.jpg",
    groom: "assets/images/6.jpg",
    bride: "assets/images/5.jpg",
    couple: "assets/images/12.jpg",
    bgQuote: "assets/images/11.jpg",
    bgQuote1: "assets/images/7.jpg",
    thankYou: "assets/images/9.jpg",
    thankYouMobile: "assets/images/9.jpg",
    album: [
      "assets/images/1.jpg",
      "assets/images/12.jpg",
      "assets/images/3.jpg",
      "assets/images/4.jpg",
      "assets/images/5.jpg",
      "assets/images/6.jpg",
      "assets/images/7.jpg",
      "assets/images/8.jpg",
      "assets/images/9.jpg",
      "assets/images/11.jpg",
      "assets/images/13.jpg",
      "assets/images/14.jpg",
    ],
  },

  music: {
    provider: "soundcloud",
    url: "https://soundcloud.com/thanh-le-110000981/bui-anh-tuan-hien-hocuoi-nhau-di-yes-i-docuoi-nhau-di-yes-i-do",
    trackId: "617343069",
    title: "Cưới Nhau Đi (Yes I Do)",
    startMs: 33000,
  },

};
