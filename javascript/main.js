import ipads from "../data/ipads.js";
import navigations from "../data/navigations.js";

// Basket
const basketStarterEl = document.querySelector("header .basket-starter");
const basketEl = basketStarterEl.querySelector(".basket");

basketStarterEl.addEventListener("click", function (event) {
  event.stopPropagation(); // allows basket to appear
  if (basketEl.classList.contains("show")) {
    //check if it contains certain class
    //hide
    basketEl.classList.remove("show");
  } else {
    //show
    basketEl.classList.add("show");
  }
});
basketEl.addEventListener("click", function (event) {
  event.stopPropagation();
});
window.addEventListener("click", function () {
  basketEl.classList.remove("show");
});

// search
const headerEl = document.querySelector("header");
const headerMenuEls = [...headerEl.querySelectorAll("ul.menu > li")];
const searchWrapEl = headerEl.querySelector(".search-wrap");
const searchStarterEl = headerEl.querySelector(".search-starter");
const searchCloserEl = searchWrapEl.querySelector(".search-closer");
const searchShadowEl = searchWrapEl.querySelector(".shadow");
const searchInputEl = searchWrapEl.querySelector("input");
const searchDelayEl = [...searchWrapEl.querySelectorAll("li")];

searchStarterEl.addEventListener("click", showSearch);
searchCloserEl.addEventListener("click", function (event) {
  event.stopPropagation();
  hideSearch();
});
searchShadowEl.addEventListener("click", hideSearch);

function showSearch() {
  headerEl.classList.add("searching");
  stopScroll();
  headerMenuEls.reverse().forEach(function (el, index) {
    el.style.transitionDelay = (index * 0.4) / headerMenuEls.length + "s";
  });
  searchDelayEl.forEach(function (el, index) {
    el.style.transitionDelay = (index * 0.4) / searchDelayEl.length + "s";
  });

  setTimeout(function () {
    searchInputEl.focus();
  }, 600);
}
function hideSearch() {
  headerEl.classList.remove("searching");
  playScroll();
  headerMenuEls.reverse().forEach(function (el, index) {
    el.style.transitionDelay = (index * 0.4) / headerMenuEls.length + "s";
  });
  searchDelayEl.reverse().forEach(function (el, index) {
    el.style.transitionDelay = (index * 0.4) / searchDelayEl.length + "s";
  });
  searchDelayEl.reverse();
  searchInputEl.value = "";
}

function playScroll() {
  document.documentElement.classList.remove("fixed");
}
function stopScroll() {
  document.documentElement.classList.add("fixed");
}

//header toggle
const menuStartEl = document.querySelector("header .menu-start");
menuStartEl.addEventListener("click", function () {
  if (headerEl.classList.contains("menuing")) {
    headerEl.classList.remove("menuing");
    searchInputEl.value = "";
    playScroll();
  } else {
    headerEl.classList.add("menuing");
    stopScroll();
  }
});

//header search
const searchTextFieldEl = document.querySelector("header .textfield");
const searchCancelEl = document.querySelector("header .search-canceler");
searchTextFieldEl.addEventListener("click", function () {
  headerEl.classList.add("search--mobile");
  searchInputEl.focus();
});
searchCancelEl.addEventListener("click", function () {
  headerEl.classList.remove("search--mobile");
});

//
window.addEventListener("resize", function () {
  if (window.innerWidth <= 740) {
    headerEl.classList.remove("searching");
  } else {
    headerEl.classList.remove("search--mobile");
    headerEl.classList.remove("menuing");
  }
});

//
const navEl = document.querySelector("nav");
const navMenuToggleEl = document.querySelector(".menu-toggle");
const navShadowEl = document.querySelector("nav .shadow");
navMenuToggleEl.addEventListener("click", function () {
  if (navEl.classList.contains("menuing")) {
    hideMenu();
  } else {
    showMenu();
  }
});

navShadowEl.addEventListener("click", function () {
  hideMenu();
});

navEl.addEventListener("click", function (event) {
  event.stopPropagation();
});

window.addEventListener("click", function () {
  hideMenu();
});

function showMenu() {
  navEl.classList.add("menuing");
}
function hideMenu() {
  navEl.classList.remove("menuing");
}

// Intersection Observer
const io = new IntersectionObserver(function (entries) {
  entries.forEach(function (entry) {
    if (!entry.isIntersecting) {
      return;
    }
    entry.target.classList.add("show");
  });
});
const infoEls = document.querySelectorAll(".info");
infoEls.forEach(function (el) {
  io.observe(el);
});

//video play pause

const video = document.querySelector(".stage video");
const playBtn = document.querySelector(".stage .controller--play");
const pauseBtn = document.querySelector(".stage .controller--pause");

playBtn.addEventListener("click", function () {
  video.play();
  playBtn.classList.add("hide");
  pauseBtn.classList.remove("hide");
});
pauseBtn.addEventListener("click", function () {
  video.pause();
  playBtn.classList.remove("hide");
  pauseBtn.classList.add("hide");
});

// rendering

const itemsEl = document.querySelector("section.compare .items");
ipads.forEach(function (ipad) {
  const itemEl = document.createElement("div");
  itemEl.classList.add("item");
  let colorList = "";
  ipad.colors.forEach(function (color) {
    colorList += `<li style ="background-color: ${color};"></li>`;
  });
  // console.log(colorList);
  itemEl.innerHTML = /* html*/ `
    <div class="thumbnail">
      <img src = "${ipad.thumbnail}" alt ="${ipad.name}"/>
    </div>
    <ul class="colors">
      ${colorList}
    </ul>
    <h3 class ="name">${ipad.name}</h3>
    <p class ="tagline">${ipad.tagline}</p>
    <p class ="price">₩${ipad.price.toLocaleString("en-US")}부터</p>
    <button class ="btn">구입하기</button>
    <a href = "${ipad.url}" class ="link">더 알아보기</a>
`;
  itemsEl.append(itemEl);
});

const naviEl = document.querySelector("footer .navigation");
navigations.forEach(function (nav) {
  const mapEl = document.createElement("div");
  mapEl.classList.add("map");
  let mapList = "";
  nav.maps.forEach(function (map) {
    mapList += /*html*/ `<li>
      <a href = "${map.url}">${map.name}
    </li>`;
  });

  mapEl.innerHTML = /* html*/ `
    <h3>
      <span class = "text">${nav.title}</span>
      <span class="icon">+</span>
    </h3>
    <ul>
      ${mapList}
    </ul>
  `;
  naviEl.append(mapEl);
});

const thisYearEl = document.querySelector("span.thisyear");
thisYearEl.textContent = new Date().getFullYear();

// to-top
window.addEventListener(
  "scroll",
  _.throttle(function () {
    if (window.scrollY > 500) {
      gsap.to("#to-top", 0.2, {
        x: 0,
      });
    } else {
      gsap.to("#to-top", 0.2, {
        x: 100,
      });
    }
  })
);

const toTopEl = document.querySelector("#to-top");
toTopEl.addEventListener("click", function () {
  gsap.to(window, 2.3, {
    scrollTo: 0,
    ease: Power1.easeInOut,
  });
});

// change viewport in fixed class
let temp = window.innerWidth;
console.log(temp);
window.onresize = function () {
  checkScreenSize();
};

function checkScreenSize() {
  //화면 해상도 확인

  let screenWidth = window.innerWidth;
  if (temp < 740 && screenWidth >= 740) {
    if (document.documentElement.classList.contains("fixed")) {
      document.documentElement.classList.remove("fixed");
    }
  }
  temp = screenWidth;
}

//mobile footer navigation

const mapEls = document.querySelectorAll("footer .navigation .map");
mapEls.forEach(function (el) {
  const h3El = el.querySelector("h3");
  h3El.addEventListener("click", function () {
    el.classList.toggle("active");
  });
});
