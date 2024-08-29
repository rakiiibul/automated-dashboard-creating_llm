

// console.log(maxDataSize);

var fi;


var fiLength;

var maxDataSize ;

var maxFileLimit;


let newElUl = document.createElement('ul');
newElUl.classList.add('file-list');
window.onload = () => {
    fi = document.getElementById('selectFile');
fiLength = fi.files.length;
maxDataSize= fi.getAttribute('max-data-size');
maxFileLimit = fi.getAttribute('max-file');
   let getIdName = fi.getAttribute('id');
   let getValueTxt = fi.getAttribute('value');
   let newElLabel = document.createElement('label');
   newElLabel.classList.add(getIdName);
   newElLabel.setAttribute('for', getIdName);
   let createIcon = document.createElement('span');
   createIcon.classList.add('icon');
   newElLabel.appendChild(createIcon);
   newElLabel.innerHTML += getValueTxt;
   fi.before(newElLabel);

   let newEl = document.createElement('p');
   newEl.classList.add('txtMsg');

   let txt = '';

   if (fiLength == 0) {
      fi.after(newEl);
      if (maxFileLimit > 0 && maxDataSize > 0) {
         txt += `Upload Maximum ${maxFileLimit} files.<br> Not more then ${formatBytes(maxDataSize *20 *1024 * 1024)}.`;
      } else if (maxFileLimit == true | maxFileLimit > 0 && maxDataSize == null | maxDataSize <= 0) {
         txt += `Upload Maximum ${maxFileLimit} files.`;
      } else if (maxFileLimit == null | maxFileLimit <= 0 && maxDataSize == true | maxDataSize > 0) {
         txt += `Upload less then ${formatBytes(maxDataSize * 20 * 1024 * 1024)}.`;
      } else {
         txt += `Upload Multiple file.`;
      }
      newEl.innerHTML = txt;
   }
   fi.onchange = () => {

    let fileSize = maxDataSize;
    fileSize *= 20 *1024 * 1024;
    fileSize = Number(fileSize);
    let txtMsg = document.querySelector('.txtMsg');
    let ulList = '';
 
    if (fi.files.length > 0) {
       txtMsg.after(newElUl);
       let ListRender = document.querySelector('.file-list');
 
       if (maxDataSize > 0 && maxFileLimit > 0) {
          console.log('All file ok');
          for (i = 0; i <= fi.files.length - 1; i++) {
             if (fi.files.item(i).size <= fileSize == true && fi.files.length <= maxFileLimit == true) {
                ulList += `<li><span>${fi.files.item(i).name}</span> <span>${formatBytes(fi.files.item(i).size)}</span></li>`;
             } else if (fi.files.item(i).size <= fileSize == false && fi.files.length <= maxFileLimit == true) {
                txtMsg.innerHTML = `<span class="clr-red">Please do not Upload more then ${formatBytes(maxDataSize *20 * 1024 * 1024)}`;
             } else if (fi.files.item(i).size <= fileSize == true && fi.files.length <= maxFileLimit == false) {
                txtMsg.innerHTML = `<span class="clr-red">Please do not Upload more then ${maxFileLimit} files</span>`;
             } else {
                txtMsg.innerHTML = `<span class="clr-red">Please do not Upload more then ${formatBytes(maxDataSize * 20 *  1024 * 1024)}</span>`;
             }
          }
       } else if (maxDataSize == null | maxDataSize <= 0 && maxFileLimit == true | maxFileLimit > 0) {
          if (fi.files.length > maxFileLimit) {
             txtMsg.innerHTML = `<span class="clr-red">Please do not Upload more then ${maxFileLimit}</span>`;
          } else {
             for (let i = 0; i <= fi.files.length - 1; i++) {
                ulList += `<li><span>${fi.files.item(i).name}</span> <span>${formatBytes(fi.files.item(i).size)}</span></li>`;
             }
             txtMsg.innerHTML = `<span>Total File Uploaded ${fi.files.length} Files</span>`;
          }
       } else if (maxDataSize == true | maxDataSize > 0 && maxFileLimit == null | maxFileLimit <= 0) {
          for (i = 0; i <= fi.files.length - 1; i++) {
             if (fi.files.item(i).size <= fileSize) {
                ulList += `<li><span>${fi.files.item(i).name}</span> <span>${formatBytes(fi.files.item(i).size)}</span></li>`;
             } else {
                txtMsg.innerHTML = `<span class="clr-red">Please do not Upload more then ${fileSize / 1024}mb</span>`;
             }
          }
       } else {
          for (let i = 0; i <= fi.files.length - 1; i++) {
             ulList += `<li><span>${fi.files.item(i).name}</span> <span>${formatBytes(fi.files.item(i).size)}</span></li>`;
          }
          txtMsg.innerHTML = `<span>Total File Uploaded ${fi.files.length} Files</span>`;
       }
       ListRender.innerHTML = ulList;
    }
 
 }
}

//max file and size validation


formatBytes = (bytes, decimals = 2) => {
   if (bytes === 0) return '0 Bytes';
   const k = 1024;
   const dm = decimals < 0 ? 0 : decimals;
   const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
   const i = Math.floor(Math.log(bytes) / Math.log(k));
   return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
}


