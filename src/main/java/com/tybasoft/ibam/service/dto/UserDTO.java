package com.tybasoft.ibam.service.dto;

import com.tybasoft.ibam.config.Constants;
import com.tybasoft.ibam.domain.Authority;
import com.tybasoft.ibam.domain.User;
import java.time.Instant;
import java.util.Set;
import java.util.stream.Collectors;
import javax.persistence.Column;
import javax.validation.constraints.*;

/**
 * A DTO representing a user, with his authorities.
 */
public class UserDTO {
    private Long id;

    @NotBlank
    @Pattern(regexp = Constants.LOGIN_REGEX)
    @Size(min = 1, max = 50)
    private String login;

    @Size(max = 50)
    private String firstName;

    @Size(max = 50)
    private String lastName;

    @Email
    @Size(min = 5, max = 254)
    private String email;

    @Size(max = 256)
    private String imageUrl;

    private boolean activated = false;

    @Size(min = 2, max = 10)
    private String langKey;

    private String createdBy;

    private Instant createdDate;

    private String lastModifiedBy;

    private Instant lastModifiedDate;

    private Set<String> authorities;

    private String layoutColor = null;

    private Boolean sidebarCollapsed = null;

    private String sidebarSize = null;

    private String sidebarBackgroundColor = null;

    private Boolean sidebarBackgroundImage = null;

    private String sidebarBackgroundImageURL = null;

    public UserDTO() {
        // Empty constructor needed for Jackson.
    }

    public String getLayoutColor() {
        return layoutColor;
    }

    public void setLayoutColor(String layoutColor) {
        this.layoutColor = layoutColor;
    }

    public Boolean getSidebarCollapsed() {
        return sidebarCollapsed;
    }

    public void setSidebarCollapsed(Boolean sidebarCollapsed) {
        this.sidebarCollapsed = sidebarCollapsed;
    }

    public String getSidebarSize() {
        return sidebarSize;
    }

    public void setSidebarSize(String sidebarSize) {
        this.sidebarSize = sidebarSize;
    }

    public String getSidebarBackgroundColor() {
        return sidebarBackgroundColor;
    }

    public void setSidebarBackgroundColor(String sidebarBackgroundColor) {
        this.sidebarBackgroundColor = sidebarBackgroundColor;
    }

    public Boolean getSidebarBackgroundImage() {
        return sidebarBackgroundImage;
    }

    public void setSidebarBackgroundImage(Boolean sidebarBackgroundImage) {
        this.sidebarBackgroundImage = sidebarBackgroundImage;
    }

    public String getSidebarBackgroundImageURL() {
        return sidebarBackgroundImageURL;
    }

    public void setSidebarBackgroundImageURL(String sidebarBackgroundImageURL) {
        this.sidebarBackgroundImageURL = sidebarBackgroundImageURL;
    }

    public UserDTO(User user) {
        this.id = user.getId();
        this.login = user.getLogin();
        this.firstName = user.getFirstName();
        this.lastName = user.getLastName();
        this.email = user.getEmail();
        this.activated = user.getActivated();
        this.imageUrl = user.getImageUrl();
        this.langKey = user.getLangKey();
        this.createdBy = user.getCreatedBy();
        this.createdDate = user.getCreatedDate();
        this.lastModifiedBy = user.getLastModifiedBy();
        this.lastModifiedDate = user.getLastModifiedDate();
        this.authorities = user.getAuthorities().stream().map(Authority::getName).collect(Collectors.toSet());
        this.layoutColor = user.getLayoutColor();
        this.sidebarBackgroundColor = user.getSidebarBackgroundColor();
        this.sidebarBackgroundImage = user.getSidebarBackgroundImage();
        this.sidebarBackgroundImageURL = user.getSidebarBackgroundImageURL();
        this.sidebarCollapsed = user.getSidebarCollapsed();
        this.sidebarSize = user.getSidebarSize();
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getLogin() {
        return login;
    }

    public void setLogin(String login) {
        this.login = login;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getImageUrl() {
        return imageUrl;
    }

    public void setImageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
    }

    public boolean isActivated() {
        return activated;
    }

    public void setActivated(boolean activated) {
        this.activated = activated;
    }

    public String getLangKey() {
        return langKey;
    }

    public void setLangKey(String langKey) {
        this.langKey = langKey;
    }

    public String getCreatedBy() {
        return createdBy;
    }

    public void setCreatedBy(String createdBy) {
        this.createdBy = createdBy;
    }

    public Instant getCreatedDate() {
        return createdDate;
    }

    public void setCreatedDate(Instant createdDate) {
        this.createdDate = createdDate;
    }

    public String getLastModifiedBy() {
        return lastModifiedBy;
    }

    public void setLastModifiedBy(String lastModifiedBy) {
        this.lastModifiedBy = lastModifiedBy;
    }

    public Instant getLastModifiedDate() {
        return lastModifiedDate;
    }

    public void setLastModifiedDate(Instant lastModifiedDate) {
        this.lastModifiedDate = lastModifiedDate;
    }

    public Set<String> getAuthorities() {
        return authorities;
    }

    public void setAuthorities(Set<String> authorities) {
        this.authorities = authorities;
    }

    @Override
    public String toString() {
        return (
            "UserDTO{" +
            "login='" +
            login +
            '\'' +
            ", firstName='" +
            firstName +
            '\'' +
            ", lastName='" +
            lastName +
            '\'' +
            ", email='" +
            email +
            '\'' +
            ", imageUrl='" +
            imageUrl +
            '\'' +
            ", activated=" +
            activated +
            ", langKey='" +
            langKey +
            '\'' +
            ", createdBy=" +
            createdBy +
            ", createdDate=" +
            createdDate +
            ", lastModifiedBy='" +
            lastModifiedBy +
            '\'' +
            ", lastModifiedDate=" +
            lastModifiedDate +
            ", authorities=" +
            authorities +
            "}"
        );
    }
}
