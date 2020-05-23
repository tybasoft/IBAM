package com.tybasoft.ibam.service;

import org.apache.commons.io.FileUtils;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.net.MalformedURLException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;

@Service
public class FileStorageService {
    private final Path imagesStorageLocation;
    private final Path documentsStorageLocation;

    public FileStorageService() {
        this.imagesStorageLocation = Paths.get("./src/main/webapp/content/uploads/images").toAbsolutePath().normalize();
        this.documentsStorageLocation = Paths.get("./src/main/webapp/content/uploads/documnets").toAbsolutePath().normalize();

        try {
            Files.createDirectories(this.imagesStorageLocation);
            Files.createDirectories(this.documentsStorageLocation);
        } catch (Exception e) {
            throw new FileStorageException("Could not create the directory where the uploaded files will be stored.", e);
        }
    }

    public String storeFile(MultipartFile file, String fileName) {
        String imageName= "img"+fileName;
        try {
            // Check if the file's name contains invalid characters
            if(imageName.contains("..")) {
                throw new FileStorageException("Sorry! Filename contains invalid path sequence " + imageName);
            }

            // Copy file to the target location (Replacing existing file with the same name)
            Path targetLocation = this.imagesStorageLocation.resolve(imageName);
            Files.copy(file.getInputStream(), targetLocation, StandardCopyOption.REPLACE_EXISTING);

            return imageName;
        } catch (IOException ex) {
            throw new FileStorageException("Could not store file " + imageName + ". Please try again!", ex);
        }
    }



    public Resource loadFileAsResource(String fileName) {
        try {
            Path filePath = this.imagesStorageLocation.resolve(fileName).normalize();
            Resource resource = new UrlResource(filePath.toUri());
            if(resource.exists()) {
                return resource;
            } else {
                throw new MyFileNotFoundException("File not found " + fileName);
            }
        } catch (MalformedURLException ex) {
            throw new MyFileNotFoundException("File not found " + fileName, ex);
        }
    }

    public void deleteFile(String fileName) {
        String filePath = this.imagesStorageLocation.resolve(fileName).normalize().toString();

        if(filePath != null) {
            File filetoDelete= FileUtils.getFile(filePath);
            FileUtils.deleteQuietly(filetoDelete);
        } else {
            throw new MyFileNotFoundException("File not found " + fileName);
        }
    }

}
