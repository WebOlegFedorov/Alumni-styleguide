import { MDCTopAppBar } from "@material/top-app-bar";
import { MDCDrawer } from "@material/drawer";
import { MDCDialog } from "@material/dialog";
import { MDCMenu } from "@material/menu";
import { MDCFormField } from "@material/form-field";
import { MDCCheckbox } from "@material/checkbox";

jQuery(document).ready(() => new tooltips().init());

/*ACCORDION*/
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

  /*Menu(appears after click on 3 dots inside Admin Table)*/
  openMenu(context) {
    new MDCMenu(
      jQuery(context)
        .parent()
        .find(".mdc-menu")[0]
    ).open = true;
  }

  /*DIALOG(appears after click on 3 dots inside Admin Table->Reply row)*/
  openDialog() {
    new MDCDialog(document.querySelector(".mdc-dialog")).open();
  }

  // Tabs. Desktop
  changeTab(context) {
    console.log(context); //context = clicked element
    $(context)
      .closest(".tab-one-type")
      .find(".tab")
      .removeClass("tab-active");
    $(context).addClass("tab-active");
    // Get id number of clicked Tab
    var currentId = $(".tab").index(context);

    // hide all the tabs, but clicked one inside clicked tab parent.
    $(context)
      .closest(".tab-one-type")
      .find(".one-tab-info")
      .css("display", "none");
    // Show tab info with same the same id, like clicked tab
    $(".one-tab-info")
      .eq(currentId)
      .css("display", "block");
  }

  // Tabs. Mobile (mobile version of tabs look like dropdowns).
  changeTabMob(context) {
    //context = clicked element
    console.log(context);
    $(context)
      .closest(".tab-one-type")
      .find(".tab")
      .removeClass("tab-active");

    $(".dropdown-item").removeClass("tab-active");
    $(context).addClass("tab-active");
    // Get id number of clicked Tab
    var currentId = $(".dropdown-item").index(context);
    // hide all the tabs,but clicked one inside clicked tab parent.
    $(context)
      .closest(".tab-one-type")
      .find(".one-tab-info")
      .css("display", "none");
    // Show tab info with same the same id, like clicked tab
    $(".one-tab-info")
      .eq(currentId)
      .css("display", "block");
  }

  // Open/hide dropdown items + toggle "opened" class on dropdown title. Tabs.Mobile version.
  toggleDropdown(context) {
    $(context)
      .find(".dropdown-title")
      .toggleClass("opened");
    $(context)
      .find(".dropdown-items")
      .slideToggle(350);
  }

  // Тabs. Mobile. Change dropdown title after click on option.
  changeDropdownTitle(context) {
    $(".dropdown-items span").removeClass("active");
    $(context).addClass("active");
  }

  init() {
    const state = this.state;
    const changeTab = this.changeTab;
    const changeTabMob = this.changeTabMob;
    const openMenu = this.openMenu;
    const openDialog = this.openDialog;
    const toggleDropdown = this.toggleDropdown;
    const changeDropdownTitle = this.changeDropdownTitle;

    // Tabs. Desktop
    jQuery(".tab").click(function() {
      changeTab(this);
    });

    // Tabs. Mobile
    jQuery(".dropdown-item").click(function() {
      changeTabMob(this);
    });

    // Tabs. Mobile. Open/hide dropdown items + toggle "opened" class on dropdown title.
    jQuery(".dropdown-wrapper").click(function() {
      toggleDropdown(this);
    });

    // Тabs. Mobile. Change dropdown title after click on option.
    jQuery(".dropdown-wrapper span").click(function() {
      changeDropdownTitle(this);
    });

    // Checkboxes initialization
    const checkbox = new MDCCheckbox(document.querySelector(".mdc-checkbox"));
    const formField = new MDCFormField(
      document.querySelector(".mdc-form-field")
    );
    formField.input = checkbox;

    /*Menu(appears after click on 3 dots inside Admin Table)*/
    jQuery(".mdc-data-table__cell-dots").click(function() {
      openMenu(this);
    });

    /*DIALOG(appears after click on 3 dots inside Admin Table->Reply row)*/
    jQuery(".reply").click(function() {
      openDialog();
    });
  }
}
