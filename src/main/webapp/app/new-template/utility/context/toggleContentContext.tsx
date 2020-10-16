import React, { Component, createContext } from 'react';

import templateConfig from '../../templateConfig';
import { connect } from 'react-redux';
import { IRootState } from 'app/shared/reducers';

const FoldedContentContext = createContext({});

class FoldedContentProvider extends Component<any, any> {
  state = {
    foldedContent: this.props.user.sidebarCollapsed === null ? templateConfig.sidebar.collapse : this.props.user.sidebarCollapsed,
    makeFullContent: () => {
      this.setState(prevState => ({
        foldedContent: true
      }));
    },
    makeNormalContent: () => {
      this.setState(prevState => ({
        foldedContent: false
      }));
    }
  };

  render() {
    return <FoldedContentContext.Provider value={{ ...this.state }}>{this.props.children}</FoldedContentContext.Provider>;
  }
}
const FoldedContentConsumer = FoldedContentContext.Consumer;

const mapStateToProps = ({ authentication, applicationProfile, locale, notification }: IRootState) => ({
  user: authentication.account
});

const FoldedContentProvidero = connect(mapStateToProps, {})(FoldedContentProvider);

export { FoldedContentProvidero as FoldedContentProvider, FoldedContentConsumer };
