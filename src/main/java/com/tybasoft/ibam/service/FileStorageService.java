package com.tybasoft.ibam.service;

import java.io.File;
import java.io.IOException;
import java.net.MalformedURLException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import org.apache.commons.io.FileUtils;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

@Service
public class FileStorageService {
    private final Path imagesStorageLocation;
    private final Path documentsStorageLocation;
    private final Path ImportsStorageLocation;

    public FileStorageService() {
        this.imagesStorageLocation = Paths.get("./src/main/webapp/content/uploads/images").toAbsolutePath().normalize();
        this.documentsStorageLocation = Paths.get("./src/main/webapp/content/uploads/documents").toAbsolutePath().normalize();
        this.ImportsStorageLocation = Paths.get("./src/main/webapp/content/uploads/Imports").toAbsolutePath().normalize();

        try {
            Files.createDirectories(this.imagesStorageLocation);
            Files.createDirectories(this.documentsStorageLocation);
            Files.createDirectories(this.ImportsStorageLocation);
        } catch (Exception e) {
            throw new FileStorageException("Could not create the directory where the uploaded files will be stored.", e);
        }
    }

//    public String storeFile(MultipartFile file, String fileName, String fileType) {
//        Path targetLocation;
//        String newfileName = null;
//        try {
//            // Check if the file's name contains invalid characters
//            if (fileName.contains("..")) {
//                throw new FileStorageException("Sorry! Filename contains invalid path sequence " + fileName);
//            }
//
//            if (fileType.equals("image")) {
//                newfileName = "img" + fileName;
//                targetLocation = this.imagesStorageLocation.resolve(newfileName);
//            }
//            if (fileType.equals("document")) {
//                newfileName = "doc" + fileName;
//                targetLocation = this.documentsStorageLocation.resolve(newfileName);
//            } else {
//                newfileName = fileName;
//                targetLocation = this.ImportsStorageLocation.resolve(newfileName);
//            }
//
//            // Copy file to the target location (Replacing existing file with the same name)
//            Files.copy(file.getInputStream(), targetLocation, StandardCopyOption.REPLACE_EXISTING);
//
//            return newfileName;
//        } catch (IOException ex) {
//            throw new FileStorageException("Could not store file " + newfileName + ". Please try again!", ex);
//        }
//    }

    public String storeFile(MultipartFile file, String fileName, String fileType) {
        Path targetLocation;
        String newfileName= null;
        try {
            // Check if the file's name contains invalid characters
            if(fileName.contains("..")) {
                throw new FileStorageException("Sorry! Filename contains invalid path sequence " + newfileName);
            }

            if (fileType.equals("image")){
                newfileName= "img"+fileName;
                targetLocation = this.imagesStorageLocation.resolve(newfileName);
            }else {
                newfileName= "doc"+fileName;
                targetLocation = this.documentsStorageLocation.resolve(newfileName);
            }

            // Copy file to the target location (Replacing existing file with the same name)
            Files.copy(file.getInputStream(), targetLocation, StandardCopyOption.REPLACE_EXISTING);

            return newfileName;
        } catch (IOException ex) {
            throw new FileStorageException("Could not store file " + newfileName + ". Please try again!", ex);
        }
    }

    public Resource loadFileAsResource(String fileName) {
        try {
            Path filePath = this.imagesStorageLocation.resolve(fileName).normalize();
            Resource resource = new UrlResource(filePath.toUri());
            if (resource.exists()) {
                return resource;
            } else {
                throw new MyFileNotFoundException("File not found " + fileName);
            }
        } catch (MalformedURLException ex) {
            throw new MyFileNotFoundException("File not found " + fileName, ex);
        }
    }

    public void deleteFile(String fileName, String fileType) {
        String filePath;
        if (fileType.equals("image")) {
            filePath = this.imagesStorageLocation.resolve(fileName).normalize().toString();
            System.out.println(filePath);
        }
        else if (fileType.equals("document")) {
            filePath = this.documentsStorageLocation.resolve(fileName).normalize().toString();
        } else{
            filePath = this.ImportsStorageLocation.resolve(fileName).normalize().toString();
        }

        if (filePath != null) {
            File filetoDelete = FileUtils.getFile(filePath);
            FileUtils.deleteQuietly(filetoDelete);
        } else {
            throw new MyFileNotFoundException("File not found " + fileName);
        }
    }
}
