import { MDCChipSet } from "@material/chips";
import { MDCDrawer } from "@material/drawer";
import { MDCTopAppBar } from "@material/top-app-bar";
import { MDCMenu } from "@material/menu";
import { MDCTextField } from "@material/textfield";
import { MDCRipple } from "@material/ripple";

window.onload = function() {
  var state = {
    fixedSideBar: true,
    drawer: null
  };

  if ($("div").hasClass("mdc-chip-set")) {
    const chipSetEl = document.querySelector(".mdc-chip-set");
    const chipSet = new MDCChipSet(chipSetEl);
  }

  function drawer(state) {
    state.drawer = MDCDrawer.attachTo(document.querySelector(".mdc-drawer"));
    const topAppBar = MDCTopAppBar.attachTo(document.getElementById("app-bar"));
    topAppBar.setScrollTarget(document.getElementById("main-content"));
    topAppBar.listen(
      "MDCTopAppBar:nav",
      () => (state.drawer.open = !state.drawer.open)
    );
  }
  drawer(state);

  function openMenu() {
    const menu = new MDCMenu(document.querySelector(".mdc-menu"));
    menu.open = !menu.open;
  }

  jQuery(".open-submenu").click(() => openMenu());

  function changeSideBarType(context, state) {
    console.log(state);
    if (context.innerWidth < 1024 && state.fixedSideBar) {
      console.log("hew1");
      state.fixedSideBar = false;
      jQuery(".mdc-drawer").addClass("mdc-drawer--modal");
    }

    if (context.innerWidth > 1024 && !state.fixedSideBar) {
      state.drawer.open = false;
      state.fixedSideBar = true;
      jQuery(".mdc-drawer").removeClass("mdc-drawer--modal");
    }
  }

  jQuery(window).resize(function() {
    changeSideBarType(this, state);
  });

  function initSideBar(context, state) {
    if (context.innerWidth < 1024) {
      state.fixedSideBar = false;
      jQuery(".mdc-drawer").addClass("mdc-drawer--modal");
    } else {
      state.fixedSideBar = true;
      jQuery(".mdc-drawer").removeClass("mdc-drawer--modal");
    }
  }

  initSideBar(window, state);

  /*Dropdown menu*/
  const menu = new MDCMenu(document.querySelector(".mdc-menu"));
  $("#header-menu-button").click(function() {
    $("#header-dropdown-menu").toggleClass("mdc-menu-surface--open");
  });

  if ($("div").hasClass("mdc-button")) {
    /* Check if current page contains mdc-button  - then initialize Ripple effect*/
    const buttonRipple = new MDCRipple(document.querySelector(".mdc-button")); //button
  }

  if ($("div").hasClass("mdc-text-field")) {
    /* Check if current page contains inputs*/
    const textField1 = new MDCTextField(
      document.querySelector(".mdc-text-field1")
    );
    const textField2 = new MDCTextField(
      document.querySelector(".mdc-text-field2")
    );
    const textField3 = new MDCTextField(
      document.querySelector(".mdc-text-field3")
    );
    const textField4 = new MDCTextField(
      document.querySelector(".mdc-text-field4")
    );
  }

  /*Check the number of notifications in the header of the page
    (If notifications number is less then 10, or more then 10).
    According to it - change "left" css property of number(inside heart icon)*/

  function checkNotifNumber() {
    /*Check if current page header contains div with notification number(inside heart)*/
    if ($("p").hasClass("header-notifications--number")) {
      let notifNumberBlock = document.getElementById(
        "header-notifications--number"
      );
      let notifNumberText = document.getElementById(
        "header-notifications--number"
      ).innerText;
      if (notifNumberText < 10) {
        notifNumberBlock.style.right = "12px";
      } else {
        notifNumberBlock.style.right = "8px";
      }
    }
  }
  setInterval(checkNotifNumber, 500);
};
