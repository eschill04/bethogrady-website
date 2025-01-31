// const API_KEY = 'AIzaSyBAOs5p9WANUI48u1HeHxp3ztQZnbsdl4c'; // Replace with your Google API key
// const PARENT_FOLDER_ID = '1EpLthwJ_EJZm1Q-rke8XZEEbb0dF58Dd'; // Replace with your parent folder ID

// // Fetch subfolders from Google Drive
// async function fetchSubfolders() {
//   const url = `https://www.googleapis.com/drive/v3/files?q='${PARENT_FOLDER_ID}'+in+parents+and+mimeType='application/vnd.google-apps.folder'&key=${API_KEY}`;
//   const response = await fetch(url);
//   const data = await response.json();
//   return data.files; // Returns a list of subfolders
// }

// // Fetch files in a folder
// async function fetchFilesInFolder(folderId) {
//   const url = `https://www.googleapis.com/drive/v3/files?q='${folderId}'+in+parents&key=${API_KEY}`;
//   const response = await fetch(url);
//   const data = await response.json();
//   return data.files; // Returns files in the folder
// }

// // Load gallery
// async function loadGallery() {
//   const gallery = document.getElementById('2020-2021-gallery');
//   gallery.innerHTML = '';

//   const subfolders = await fetchSubfolders();
//   for (const folder of subfolders) {
//     const files = await fetchFilesInFolder(folder.id);
//     const metadataFile = files.find(file => file.name === 'metadata.json');
//     const coverImage = files.find(file => file.name.startsWith('title_'));

//     // Fetch metadata
//     const metadataResponse = await fetch(`https://www.googleapis.com/drive/v3/files/${metadataFile.id}?alt=media&key=${API_KEY}`);
//     const metadata = await metadataResponse.json();

//     // Add cover image to gallery
//     const artworkDiv = document.createElement('div');
//     artworkDiv.classList.add('artwork');

//     const img = document.createElement('img');
//     img.src = `https://www.googleapis.com/drive/v3/files/${coverImage.id}?alt=media&key=${API_KEY}`;
//     img.alt = metadata.imageTitle;

//     img.addEventListener('click', () => {
//       window.location.href = `artwork.html?folderId=${folder.id}`;
//     });

//     artworkDiv.appendChild(img);
//     gallery.appendChild(artworkDiv);
//   }
// }

// // Initialize gallery
// loadGallery();
