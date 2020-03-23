import { writable } from "svelte/store";
import F7 from "framework7";
import Dialog from "framework7/components/dialog/dialog.js";
import Card from "framework7/components/card/card.js";
import SmartSelect from "framework7/components/smart-select/smart-select.js";
import Radio from "framework7/components/radio/radio.js";

export const create = (appTheme) => {
  let theme = appTheme || "auto";
  if (document.location.search.indexOf("theme=") >= 0) {
    theme = document.location.search.split("theme=")[1].split("&")[0];
  }
  F7.use([  ]);
  return new F7({
    root: "#app",
    name: "Sapper Test",
    id: "dev.dinify.sapper-test",
    theme
  });
}

let instance = create('ios');

export const Framework7 = F7;

export const app = writable(instance);
