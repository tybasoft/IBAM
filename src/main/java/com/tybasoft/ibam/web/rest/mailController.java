package com.tybasoft.ibam.web.rest;

import com.tybasoft.ibam.domain.Avancement;
import com.tybasoft.ibam.service.MailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.Valid;

@RestController
@RequestMapping("/mail")
@Transactional
public class mailController {

    @Autowired
    MailService mailService;
    @PostMapping("/send")
    public boolean send(@RequestBody Object pdf)
    {
        mailService.sendEmail("to","compte rendu","content",true,false);
        return false;
    }
}
