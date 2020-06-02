package com.tybasoft.ibam.web.rest;

import com.tybasoft.ibam.service.FileStorageService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import javax.servlet.http.HttpServletRequest;
import java.io.IOException;


@RestController
@RequestMapping("/api")
public class FileUploadDownloadController {
    class UploadFileResponse {
        private String fileName;
        private String fileDownloadUri;
        private String fileType;
        private long size;

        UploadFileResponse(String fileName, String fileDownloadUri, String fileType, long size) {
            this.fileName = fileName;
            this.fileDownloadUri = fileDownloadUri;
            this.fileType = fileType;
            this.size = size;
        }

        public String getFileName() {
            return fileName;
        }
        public void setFileName(String fileName) {
            this.fileName = fileName;
        }
        public String getFileDownloadUri() {
            return fileDownloadUri;
        }
        public void setFileDownloadUri(String fileDownloadUri) {
            this.fileDownloadUri = fileDownloadUri;
        }
        public String getFileType() {
            return fileType;
        }
        public void setFileType(String fileType) {
            this.fileType = fileType;
        }
        public long getSize() {
            return size;
        }
        public void setSize(long size) {
            this.size = size;
        }
    }

    private static final Logger logger= LoggerFactory.getLogger(FileUploadDownloadController.class);

    private final FileStorageService fileStorageService;

    public FileUploadDownloadController(FileStorageService fileStorageService) {
        this.fileStorageService = fileStorageService;
    }

    @PostMapping("/images/uploadFile")
    public ResponseEntity<UploadFileResponse> uploadImageFile(@RequestParam("file") MultipartFile file, @RequestParam("storageName") String storageName) {
        String fileName = fileStorageService.storeFile(file, storageName, "image");

        String fileDownloadUri = ServletUriComponentsBuilder.fromCurrentContextPath()
            .path("/downloadFile/")
            .path("fileName")
            .toUriString();

        UploadFileResponse result= new UploadFileResponse(fileName, fileDownloadUri, file.getContentType(), file.getSize());
        return  ResponseEntity.ok()
            .body(result);
    }

    @DeleteMapping("/images/deleteFile/{fileName:.+}")
    public ResponseEntity<String> deleteImageFile(@PathVariable String fileName){
        fileStorageService.deleteFile(fileName, "image");

        return ResponseEntity.ok("file: "+fileName+ "was deleted with success");
    }

    @GetMapping("/downloadFile/{fileName:.+}")
    public ResponseEntity<Resource> downloadFile(@PathVariable String fileName, HttpServletRequest request) {
        // Load file as Resource
        Resource resource = fileStorageService.loadFileAsResource(fileName);
        // Try to determine file's content type
        String contentType = null;
        try {
            contentType = request.getServletContext().getMimeType(resource.getFile().getAbsolutePath());
        } catch (IOException ex) {
            logger.info("Could not determine file type.");
        }
        // Fallback to the default content type if type could not be determined
        if(contentType == null) {
            contentType = "application/octet-stream";
        }

        return ResponseEntity.ok()
            .contentType(MediaType.parseMediaType(contentType))
            .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + resource.getFilename() + "\"")
            .body(resource);
    }

    @PostMapping("/documents/uploadFile")
    public ResponseEntity<UploadFileResponse> uploadDocumentFile(@RequestParam("file") MultipartFile file, @RequestParam("storageName") String storageName) {
        String fileName = fileStorageService.storeFile(file, storageName,"document");

        String fileDownloadUri = ServletUriComponentsBuilder.fromCurrentContextPath()
            .path("/downloadFile/")
            .path("fileName")
            .toUriString();

        UploadFileResponse result= new UploadFileResponse(fileName, fileDownloadUri, file.getContentType(), file.getSize());
        return  ResponseEntity.ok()
            .body(result);
    }

    @DeleteMapping("/documents/deleteFile/{fileName:.+}")
    public ResponseEntity<String> deleteDocumentFile(@PathVariable String fileName){
        fileStorageService.deleteFile(fileName, "document");

        return ResponseEntity.ok("file: "+fileName+ "was deleted with success");
    }
}
