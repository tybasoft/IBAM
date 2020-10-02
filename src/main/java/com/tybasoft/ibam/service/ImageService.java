package com.tybasoft.ibam.service;

import com.tybasoft.ibam.domain.Image;
import com.tybasoft.ibam.repository.ImageRepository;
import com.tybasoft.ibam.web.rest.errors.BadRequestAlertException;
import org.slf4j.Logger;
import org.springframework.stereotype.Service;


@Service
public class ImageService {
    private final ImageRepository imageRepository;

    public ImageService(ImageRepository imageRepository) {
        this.imageRepository = imageRepository;
    }

    public Image saveImage(Image image, Logger log, String entityName) {
        if (image != null) {
            log.debug("REST request to save Image : {}", image);
            if (image.getId() != null) {
                throw new BadRequestAlertException("A new image cannot already have an ID", entityName, "idexists");
            }
            return createImageEntity(image);
        }
        return null;
    }

    public Image createImageEntity(Image image){
        Image newimage= new Image();

        String imagePath= "img"+ image.getPath();
        newimage.setTitre(image.getTitre()+"-Image");
        newimage.setPath("/content/uploads/images/"+imagePath);

        if (image.getId() != null) {
            newimage.setId(image.getId());
        }

        return imageRepository.save(newimage);
    }

    public void deleteImageEntityFile(Image image, Logger log, ImageRepository imageRepository, FileStorageService fileStorageService) {
        if (image != null) {
            Image newimage= imageRepository.findById(image.getId()).get();
            String imagePath= newimage.getPath().substring(24);

            log.debug("REST request to delete Image : {}", newimage.getId());
            imageRepository.deleteById(newimage.getId());
            fileStorageService.deleteFile(imagePath, "image");
        }
    }
}
