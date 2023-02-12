$(function () {
  // input focus
  $("input")
    .on("focus", (e) => $(e.target).parent().addClass("focus-target"))
    .on("focusout", (e) => (!e.target.value ? $(e.target).parent().removeClass("focus-target") : null));
  try {
    AOS.init({disable: window.innerWidth < 768});
  } catch (e) {
    console.error(e);
  }
  $('[href=""]').attr("href", "javascript:void(0)");
  $("[mask-url]").each((i, e) => {
    // inner
    e.setAttribute('style',`-webkit-mask-box-image:${$(e).attr("mask-url")};
    mask-image:${$(e).attr("mask-url")};
    -webkit-mask-box-image-width: 10px;`);
    // outer
    $(e).parent().attr('style',`-webkit-mask-box-image:${$(e).attr("mask-url")};
    mask-image:${$(e).attr("mask-url")}`)
  });
});
