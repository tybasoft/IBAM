// import external modules
import React, { PureComponent } from 'react';
import classnames from 'classnames';

// import internal(own) modules
import { FoldedContentConsumer, FoldedContentProvider } from '../utility/context/toggleContentContext';
import Sidebar from './components/sidebar/sidebar';
import Navbar from './components/navbar/navbar';
import Footer from './components/footer/footer';
import templateConfig from '../templateConfig';
import { IRootState } from 'app/shared/reducers';
import { connect } from 'react-redux';

class MainLayout extends PureComponent<any, any> {
  state = {
    width: window.innerWidth,
    sidebarState: 'close',
    sidebarSize: '',
    layout: '',
    user: {}
  };

  updateWidth = () => {
    this.setState(prevState => ({
      width: window.innerWidth
    }));
  };

  handleSidebarSize = sidebarSize => {
    this.setState({ sidebarSize });
  };

  handleLayout = layout => {
    this.setState({ layout });
  };

  componentDidMount() {
    if (window !== undefined) {
      window.addEventListener('resize', this.updateWidth, false);
    }
  }

  componentWillUnmount() {
    if (window !== undefined) {
      window.removeEventListener('resize', this.updateWidth, false);
    }
  }

  toggleSidebarMenu(sidebarState) {
    this.setState({ sidebarState });
  }

  render() {
    return (
      <FoldedContentProvider>
        <FoldedContentConsumer>
          {(context: any) => (
            <div
              className={classnames('wrapper ', {
                'menu-collapsed': context.foldedContent || this.state.width < 991,
                'main-layout': !context.foldedContent,
                [`${templateConfig.sidebar.size}`]: this.state.sidebarSize === '',
                [`${this.state.sidebarSize}`]: this.state.sidebarSize !== '',
                //    "layout-dark": (this.state.layout === 'layout-dark'),
                //    " layout-dark": (this.state.layout === '' && templateConfig.layoutDark === true)
                [`${templateConfig.layoutColor}`]: this.state.layout === '',
                [`${this.state.layout}`]: this.state.layout !== ''
              })}
            >
              <Sidebar
                toggleSidebarMenu={this.toggleSidebarMenu.bind(this)}
                sidebarState={this.state.sidebarState}
                handleSidebarSize={this.handleSidebarSize.bind(this)}
                handleLayout={this.handleLayout.bind(this)}
              />
              <Navbar user={this.props.user} toggleSidebarMenu={this.toggleSidebarMenu.bind(this)} sidebarState={this.state.sidebarState} />
              <main>{this.props.children}</main>
              <Footer />
            </div>
          )}
        </FoldedContentConsumer>
      </FoldedContentProvider>
    );
  }
}

const mapStateToProps = ({ authentication, applicationProfile, locale, notification }: IRootState) => ({
  user: authentication.account
});

export default connect(mapStateToProps, {})(MainLayout);
