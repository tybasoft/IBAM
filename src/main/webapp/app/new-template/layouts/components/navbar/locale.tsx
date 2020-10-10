import React from 'react';
import { DropdownItem, DropdownMenu } from 'reactstrap';
// import { NavDropdown } from './menu-components';
import { locales, languages } from 'app/config/translation';
// import { Form, Media, Collapse, Navbar, Nav, NavItem, UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import ReactCountryFlag from 'react-country-flag';

export const LocaleMenu = ({ onClick }) =>
  Object.keys(languages).length > 1 && (
    <DropdownMenu right>
      {locales.map(locale => (
        <DropdownItem key={locale} value={locale} onClick={onClick}>
          <ReactCountryFlag code={languages[locale].code} countryCode={languages[locale].code} svg />
          {languages[locale].name}
        </DropdownItem>
      ))}
      {/* <DropdownItem>
               <ReactCountryFlag code="us" countryCode="US" svg /> English
             </DropdownItem>
             <DropdownItem>
               <ReactCountryFlag code="fr" countryCode="FR" svg /> Francais
             </DropdownItem>
             <DropdownItem>
               <ReactCountryFlag code="ma" countryCode="MA" svg /> Arabe
             </DropdownItem> */}
      {/* <DropdownItem>
                      <ReactCountryFlag code="cn" svg /> Chinese
                    </DropdownItem> */}
    </DropdownMenu>
    //     <NavDropdown icon="flag" name={currentLocale ? languages[currentLocale].name : undefined}>
    //       {locales.map(locale => (
    //         <DropdownItem key={locale} value={locale} onClick={onClick}>
    //           {languages[locale].name}
    //         </DropdownItem>
    //       ))}
    //     </NavDropdown>
  );
