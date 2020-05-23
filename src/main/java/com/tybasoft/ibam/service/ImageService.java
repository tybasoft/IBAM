package com.tybasoft.ibam.service;

import com.tybasoft.ibam.domain.Image;
import com.tybasoft.ibam.repository.ImageRepository;
import org.springframework.stereotype.Service;

@Service
public class ImageService {
    private final ImageRepository imageRepository;

    public ImageService(ImageRepository imageRepository) {
        this.imageRepository = imageRepository;
    }

    public Image createImageEntity(Image image){
        Image newimage= new Image();

        String imagePath= "img"+ image.getPath();
        newimage.setTitre(image.getTitre()+"-Image");
        newimage.setPath("/content/uploads/images/"+imagePath);

        return imageRepository.save(newimage);
    }
}
