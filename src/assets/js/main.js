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

  // set masks
  $("[mask-url]").each((i, e) => {
    // inner
    e.setAttribute(
      "style",
      `-webkit-mask-box-image:${$(e).attr("mask-url")};
    mask-image:${$(e).attr("mask-url")};
    -webkit-mask-box-image-width: 10px; mask-repeat: no-repeat;`
    );
    // outer
    $(e)
      .parent()
      .attr(
        "style",
        `-webkit-mask-box-image:${$(e).attr("mask-url")};
    mask-image:${$(e).attr("mask-url")}; mask-repeat: no-repeat;`
      );
  });

  // center absolute elements
  $("[center]").each((i, e) => {
    
    $(e).css('left', `calc(50% - ${$(e).width() / 2}px)` );
  });
});
