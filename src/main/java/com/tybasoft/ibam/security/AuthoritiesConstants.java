package com.tybasoft.ibam.security;

/**
 * Constants for Spring Security authorities.
 */
public final class AuthoritiesConstants {
    
	    public static final String ADMIN = "ROLE_ADMIN";

	    public static final String USER = "ROLE_USER";

	    public static final String ANONYMOUS = "ROLE_ANONYMOUS";
	    
	    public static final String   POINTEUR = "ROLE_POINTEUR";
	    
	    public static final String   MAGASINIER =  "ROLE_MAGASINIER";
	    
	    public static final String   CHEFMATERIEL   = "MATERIEL_ROLE";
	    
	    public static final String   CHEFMATERIAU   = "MATERIEAU_ROLE";
	    
	    public static final String   RESPONSABLEME= "ME_ROLE";
	    		
	    public static final String   RESPONSABLEPROJET="AVT_ROLE";
	    
	    
	    public static final String   ADD_EMP="ADDEMP_ROLE";
	    public static final String   DELETE_EMP="DELETEEMP_ROLE";
	    
	
        
    private AuthoritiesConstants() {}
}
