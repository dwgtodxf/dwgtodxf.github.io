// Function to handle tab switching
function openTab(event, tabName) {
    const tabContents = document.querySelectorAll(".tab-content");
    tabContents.forEach((content) => content.classList.remove("active"));

    const tabButtons = document.querySelectorAll(".tab-btn");
    tabButtons.forEach((btn) => btn.classList.remove("active"));

    document.getElementById(tabName).classList.add("active");
    event.currentTarget.classList.add("active");
}

// Drag and Drop functionality
function handleDragOver(event) {
    event.preventDefault();
    event.stopPropagation();
    event.currentTarget.classList.add("hover");
}

function handleDragLeave(event) {
    event.preventDefault();
    event.stopPropagation();
    event.currentTarget.classList.remove("hover");
}

function handleDrop(event, fileType) {
    event.preventDefault();
    event.stopPropagation();
    event.currentTarget.classList.remove("hover");

    // Get the file input based on the file type (dwg or dxf)
    const fileInput = fileType === 'dwg' ? document.getElementById('dwgInput') : document.getElementById('dxfInput');
    // Set the dropped files to the input element
    fileInput.files = event.dataTransfer.files;

    // Display file details
    displayFileDetails(fileInput.files[0], fileType);
}

// File select handler
function handleFileSelect(event) {
    const file = event.target.files[0];
    if (file) {
        displayFileDetails(file, event.target.id === 'dwgInput' ? 'dwg' : 'dxf');
    }
}

// Display file details
function displayFileDetails(file, type) {
    const fileDetailsDiv = type === 'dwg' ? document.getElementById('dwgFileDetails') : document.getElementById('dxfFileDetails');
    
    const fileDetailsHTML = `
        <strong>File Name:</strong> ${file.name} <br>
        <strong>File Type:</strong> ${file.type} <br>
        <strong>File Size:</strong> ${(file.size / 1024).toFixed(2)} KB
    `;
    
    fileDetailsDiv.innerHTML = fileDetailsHTML;
}


// Simulate downloading the converted file
function downloadFile(type) {
    // Here we can create a mock file download. In a real case, this would be a link to the converted file.
    const blob = new Blob([`Mock converted ${type.toUpperCase()} file content`], { type: 'application/octet-stream' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = type === 'dwg' ? 'converted.dxf' : 'converted.dwg';
    link.click();
}
function convertFile(type) {
    // File selection check
    const fileInput = document.getElementById(`${type}Input`);
    if (!fileInput.files || fileInput.files.length === 0) {
        alert('Please choose your file as you want to convert');
        return;
    }

    // Set up elements for progress display
    const progressContainer = document.querySelector(`#${type}ProgressBar`).parentElement;
    const progressBar = document.getElementById(`${type}Progress`);
    const progressText = document.getElementById(`${type}ProgressText`);
    const downloadButton = document.getElementById(`${type}DownloadBtn`);
    
    // Reset download button and progress bar for fresh upload
    downloadButton.style.display = 'none';
    progressContainer.style.display = 'block';
    progressBar.style.width = '0%';
    progressText.textContent = 'Uploading... 0%';
    
    // Simulate upload progress (0-100%)
    let progress = 0;
    const uploadInterval = setInterval(() => {
        progress += 10;
        progressBar.style.width = `${progress}%`;
        progressText.textContent = `Uploading... ${progress}%`;
        
        if (progress >= 100) {
            clearInterval(uploadInterval);
            progressText.textContent = 'Upload Complete!';
            
            // Start conversion simulation after upload completes
            let convertingProgress = 0;
            const convertInterval = setInterval(() => {
                convertingProgress += 10;
                progressBar.style.width = `${convertingProgress}%`;
                progressText.textContent = `Converting... ${convertingProgress}%`;
                
                if (convertingProgress >= 100) {
                    clearInterval(convertInterval);
                    progressText.textContent = 'Conversion Complete!';
                    
                    // Show the download button after a short delay
                    setTimeout(() => {
                        downloadButton.style.display = 'inline-block';
                    }, 1000);
                }
            }, 500); // Adjust conversion speed here (500 ms per step)
        }
    }, 500); // Adjust upload speed here (500 ms per step)
}
