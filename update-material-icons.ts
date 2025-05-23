const fs = require('node:fs');
const icons = [
  "account_tree",
  "apps",
  "cancel",
  "check_circle",
  "copy_all",
  "delete",
  "delete_forever",
  "edit",
  "error",
  "first_page",
  "folder_shared",
  "get_app",
  "help",
  "home",
  "info",
  "last_page",
  "list",
  "navigate_before",
  "navigate_next",
  "note_add",
  "place",
  "public_off",
  "schedule",
  "search",
  "task_alt",
  "tune",
  "upload",
  "warning",
  "web_stories",
  "workspace_premium"
];

updateMaterialIcons();

/**
 * Gets the list of icons from google server and saves it as a font under /assets/fonts/material-icons/material_icon_subset.woff

 The following link contains the requiered icons in the icon_names parameter and will return a CSS file form Google, which contains a URL to the required font WOFF file.
 This WOFF file must be downloaded and added to assets/material-icons.
 BEWARE: The list of icon names in the URL must be 100% correct and sorted alphanumerically!!!
 https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@48,500,0,0&icon_names=account_tree,apps,cancel,check_circle,copy_all,delete,delete_forever,edit,error,first_page,folder_shared,get_app,help,home,info,last_page,list,navigate_before,navigate_next,note_add,place,public_off,schedule,search,task_alt,tune,upload,warning,web_stories,workspace_premium"
 */
function updateMaterialIcons() {
  const iconParams = icons.sort().join(",");
  fetch("https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@48,500,0,0&icon_names="+iconParams)
    .then(
      res =>  res.text()
    ).then(
      css => {
        const regex = /url\((https:\/\/fonts\.gstatic\.com[^\)]+)\)/;
        const match = css.match(regex);
        const url = match ? match[1] : null;
        if(url) {
          console.log("Found font url in CSS " + url)
          downloadAndSave(url);
        }
        else console.error("No font url found in CSS")
      }
  )
}

function downloadAndSave(url:string) {
  console.log("Trying to download font file from " + url)
  fetch(url).then(
    res =>
      res.blob()
    ).then(
      fontBlob => fontBlob.arrayBuffer()
  ).then(
      fontArrayBuffer => {
        const fontBuffer = Buffer.from(fontArrayBuffer);
        console.log("Writing to file")
        fs.writeFile('src/assets/fonts/material-icons/material_icons_subset.woff', fontBuffer, (err: any) => {console.error(err)})
      }
  )
}
