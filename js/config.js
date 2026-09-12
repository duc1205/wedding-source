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
    hero: "assets/images/hero.svg",
    heroMobile: "assets/images/hero-sp.svg",
    groom: "assets/images/groom.svg",
    bride: "assets/images/bride.svg",
    couple: "assets/images/groom-bride.svg",
    bgQuote: "assets/images/bg-quote.svg",
    bgQuote1: "assets/images/bg-quote-1.svg",
    thankYou: "assets/images/thank-you.svg",
    thankYouMobile: "assets/images/thank-you-sm.svg",
    album: [
      "assets/images/album-01.svg",
      "assets/images/album-02.svg",
      "assets/images/album-03.svg",
      "assets/images/album-04.svg",
      "assets/images/album-05.svg",
      "assets/images/album-06.svg",
      "assets/images/album-07.svg",
      "assets/images/album-08.svg",
    ],
  },

  music: {
    provider: "soundcloud",
    url: "https://soundcloud.com/bau-studio/hon-ca-yeu-tran-vinh-quang",
    title: "Hơn Cả Yêu",
  },

  story: {
    intro:
      "Hôm nay, tụi mình muốn kể lại câu chuyện ấy với những người mình yêu quý nhất. Mỗi cột mốc dưới đây vẫn là lời nháp — bạn hãy thay bằng hành trình thật của hai bạn.",
    items: [
      {
        period: "20XX",
        title: "Lần đầu gặp nhau",
        text: "Thay đoạn này bằng khoảnh khắc hai bạn gặp nhau lần đầu — một lớp học, một quán cà phê, hay một lần tình cờ nào đó đã mở đầu câu chuyện.",
      },
      {
        period: "20XX",
        title: "Ngày chúng mình bắt đầu",
        text: "Thay bằng ngày chính thức bên nhau: nơi ấy, lời ấy, và cảm xúc của buổi hẹn đã biến hai người thành một cặp.",
      },
      {
        period: "20XX",
        title: "Cùng nhau trưởng thành",
        text: "Những ngày thường nhật, những lần chờ đợi và những cái nắm tay giữa bao bộn bề đã dạy hai bạn cách yêu thương, thấu hiểu và trân trọng nhau hơn.",
      },
      {
        period: "20XX",
        title: "Lời hứa nghiêm túc",
        text: "Thay bằng câu chuyện cầu hôn — không còn là lời tỏ tình của những ngày đầu, mà là lời hứa về một mái ấm và một hành trình sẽ luôn có nhau.",
      },
      {
        period: "2026",
        title: "Về chung một nhà",
        text: "Hôn nhân không phải là đích đến của tình yêu, mà là khởi đầu cho một hành trình mới. Từ hôm nay, chúng mình sẽ cùng nhau vun đắp một mái ấm và viết tiếp những chương đẹp nhất của câu chuyện mang tên “chúng mình”.",
      },
    ],
  },
};
