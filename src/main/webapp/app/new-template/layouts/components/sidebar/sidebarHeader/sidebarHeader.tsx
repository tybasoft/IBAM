// import external modules
import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { ToggleLeft, ToggleRight, X } from 'react-feather';
// import internal(own) modules
import { FoldedContentConsumer } from '../../../../utility/context/toggleContentContext';
import Logoi from '../../../../assets/img/logoi.png';
import LogoDark from '../../../../assets/img/logo-dark.png';
import templateConfig from '../../../../templateConfig';
import { height } from '@fortawesome/free-solid-svg-icons/faSort';

class SidebarHeader extends Component<any> {
  handleClick = e => {
    this.props.toggleSidebarMenu('close');
  };

  render() {
    return (
      <FoldedContentConsumer>
        {(context: any) => (
          <div className="sidebar-header">
            <div className="logo clearfix">
              <NavLink to="/" className="logo-text float-left">
                <div className="logo-img">
                  {templateConfig.sidebar.backgroundColor === 'white' ? (
                    this.props.sidebarBgColor === '' || this.props.sidebarBgColor === 'white' ? (
                      <img src={Logoi} style={{ height: 40 }} alt="logo" />
                    ) : (
                      <img src={Logoi} style={{ height: 40 }} alt="logo" />
                    )
                  ) : this.props.sidebarBgColor === 'white' ? (
                    <img src={Logoi} style={{ height: 40 }} alt="logo" />
                  ) : (
                    <img src={Logoi} style={{ height: 40 }} alt="logo" />
                  )}
                </div>
                <span className="text align-middle">IBAM</span>
              </NavLink>

              <span className="nav-toggle d-none d-sm-none d-md-none d-lg-block">
                {context.foldedContent ? (
                  <ToggleLeft onClick={context.makeNormalContent} className="toggle-icon" size={16} />
                ) : (
                  <ToggleRight onClick={context.makeFullContent} className="toggle-icon" size={16} />
                )}
              </span>
              <span className="nav-close d-block d-md-block d-lg-none d-xl-none" id="sidebarClose">
                <X onClick={this.handleClick} size={20} />
              </span>
            </div>
          </div>
        )}
      </FoldedContentConsumer>
    );
  }
}

export default SidebarHeader;
