import { MDCTopAppBar } from "@material/top-app-bar";
import { MDCDrawer } from "@material/drawer";
import { MDCDialog } from "@material/dialog";
import { MDCMenu } from "@material/menu";
import { MDCFormField } from "@material/form-field";
import { MDCCheckbox } from "@material/checkbox";

jQuery(document).ready(() => new tooltips().init());

/*COLLAPSIBLE SECTION(accordion)*/

var acc = document.getElementsByClassName("accordion");
var i;

for (i = 0; i < acc.length; i++) {
  acc[i].addEventListener("click", function() {
    this.classList.toggle("active");
    var panel = this.nextElementSibling;
    if (panel.style.maxHeight) {
      panel.style.maxHeight = null;
    } else {
      panel.style.maxHeight = panel.scrollHeight + "px";
    }
  });
}
/*end of accordion*/

class tooltips {
  constructor() {}
  /*DROPDOWN(appears after click on 3 dots inside Admin Table)*/
  dropDown(context) {
    new MDCMenu(
      jQuery(context)
        .parent()
        .find(".mdc-menu")[0]
    ).open = true;
  }

  /*----------------------------------------------------------------------
    DIALOG(appears after click on 3 dots inside Admin Table->Reply row)
  -----------------------------------------------------------------------*/
  openDialog() {
    new MDCDialog(document.querySelector(".mdc-dialog")).open();
  }
  /*------------end of DIALOG  ------------------*/

  changeTab(context) {
    //context = clicked element
    console.log(context);
    $(context)
      .closest(".tab-one-type")
      .find(".tab")
      .removeClass("tab-active");
    $(context).addClass("tab-active");
    var currentId = $(".tab").index(context);
    // var attr = $(context).attr("data-id");
    // $(context)
    //   .closest(".tab-one-type")
    //   .find(".one-tab-info")
    //   .each(function() {
    //     console.log($(".one-tab-info").attr("id"));
    //   });
    // console.log("currentId=" + currentId);
    // console.log("attr=" + attr);

    // hide all the tabs,but clicked one inside clicked tab parent.
    $(context)
      .closest(".tab-one-type")
      .find(".one-tab-info")
      .css("display", "none");
    $(".one-tab-info")
      .eq(currentId)
      .css("display", "block");
  }

  changeTabMob(context) {
    //context = clicked element
    console.log(context);
    $(context)
      .closest(".tab-one-type")
      .find(".tab")
      .removeClass("tab-active");

    $(".dropdown-item").removeClass("tab-active");
    $(context).addClass("tab-active");
    var currentId = $(".dropdown-item").index(context);
    // hide all the tabs,but clicked one inside clicked tab parent.
    $(context)
      .closest(".tab-one-type")
      .find(".one-tab-info")
      .css("display", "none");
    $(".one-tab-info")
      .eq(currentId)
      .css("display", "block");
  }
  /*Toggle dropdown(tabs in mobile version)*/
  toggleDropdown(context) {
    $(context)
      .find(".dropdown-title")
      .toggleClass("opened");
    $(context)
      .find(".dropdown-items")
      .slideToggle(350);
  }

  /*Change dropdown title after clicking on one of dropdown options*/
  changeDropdownTitle(context) {
    $(".dropdown-items span").removeClass("active");
    $(context).addClass("active");

    var innerText = $(context).text();
    console.log(innerText);
    console.log(
      $(context)
        .closest(".dropdown-wrapper")
        .find(".dropdown-title")
        .text(innerText)
    );
  }

  init() {
    const changeTab = this.changeTab;
    jQuery(".tab").click(function() {
      changeTab(this);
    });

    const changeTabMob = this.changeTabMob;
    jQuery(".dropdown-item").click(function() {
      changeTabMob(this);
    });

    const toggleDropdown = this.toggleDropdown;
    jQuery(".dropdown-wrapper").click(function() {
      toggleDropdown(this);
    });

    const changeDropdownTitle = this.changeDropdownTitle;
    jQuery(".dropdown-wrapper span").click(function() {
      changeDropdownTitle(this);
    });

    const checkbox = new MDCCheckbox(document.querySelector(".mdc-checkbox"));
    const formField = new MDCFormField(
      document.querySelector(".mdc-form-field")
    );
    formField.input = checkbox;

    const state = this.state;
    const dropDown = this.dropDown;

    jQuery(".mdc-data-table__cell-dots").click(function() {
      dropDown(this);
    });

    const openDialog = this.openDialog;
    jQuery(".reply").click(function() {
      openDialog();
    });
  }
}
