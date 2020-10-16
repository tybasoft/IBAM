import { connect } from 'react-redux';
import emailList from '../../components/email/emailList';
import { VisibilityFilters, openEmail, setSelectedEmail, starEmail, importantEmail } from '../../redux/actions/email/emailActions';

import React, { useState } from 'react';
// import PropTypes from 'prop-types'
import ProjetItem from './projetListItem';
import PerfectScrollbar from 'react-perfect-scrollbar';
import PropTypes from 'prop-types';
import { getEntity } from 'app/entities/projet/projet.reducer';
import { IRootState } from 'app/shared/reducers';

const ProjetList = ({ selected, getEntity, onStar, onImportant, setSelectedEmail, list }) => {
  const [selectedProjet, setSelectedProjet] = useState(undefined);

  const openProjet = projet => {
    getEntity(projet.id);
    setSelectedProjet(projet);
    console.log(projet, selectedProjet);
  };
  return (
    <PerfectScrollbar>
      <div className="email-app-list">
        <div id="users-list">
          <ul className="list-group">
            {list.map(projet => (
              <ProjetItem
                key={projet.id}
                active={selectedProjet ? selectedProjet.id : undefined}
                {...projet}
                onClick={() => openProjet(projet)}
                // onStar={() => onStar(email.id)}
                // onImportant={() => onImportant(email.id)}
                // onChange={e => {
                //   if (e.target.checked === true) setSelectedEmail(email.id, 'checked');
                //   else setSelectedEmail(email.id, 'unchecked');
                // }}
              />
            ))}
            {/* {emails.map(email => (
            <ProjetItem
              key={email.id}
              active={active}
              {...email}
              onClick={() => openEmail(email.id)}
              onStar={() => onStar(email.id)}
              onImportant={() => onImportant(email.id)}
              onChange={e => {
                if (e.target.checked === true) setSelectedEmail(email.id, 'checked');
                else setSelectedEmail(email.id, 'unchecked');
              }}
            />
          ))} */}
          </ul>
        </div>
      </div>
    </PerfectScrollbar>
  );
};

// ProjetList.propTypes = {
//   emails: PropTypes.array.isRequired,
//   openEmail: PropTypes.func.isRequired,
//   onStar: PropTypes.func.isRequired,
//   onImportant: PropTypes.func.isRequired,
//   setSelectedEmail: PropTypes.func.isRequired
// };
// export default EmailList;

const getVisibleEmails = (emails, filter, emailSearch) => {
  switch (filter) {
    case VisibilityFilters.SHOW_INBOX:
      return emails.filter(t => t.inbox && !t.trash && t.from.toLocaleLowerCase().includes(emailSearch.toLocaleLowerCase()));
    case VisibilityFilters.SHOW_SENT:
      return emails.filter(t => t.sent && !t.trash && t.from.toLocaleLowerCase().includes(emailSearch.toLocaleLowerCase()));
    case VisibilityFilters.SHOW_DRAFTS:
      return emails.filter(t => t.draft && !t.trash && t.from.toLocaleLowerCase().includes(emailSearch.toLocaleLowerCase()));
    case VisibilityFilters.SHOW_SPAM:
      return emails.filter(t => t.spam && !t.trash && t.from.toLocaleLowerCase().includes(emailSearch.toLocaleLowerCase()));
    case VisibilityFilters.SHOW_TRASH:
      return emails.filter(t => t.trash && t.from.toLocaleLowerCase().includes(emailSearch.toLocaleLowerCase()));
    case VisibilityFilters.SHOW_STARRED:
      return emails.filter(t => t.starred && !t.trash && t.from.toLocaleLowerCase().includes(emailSearch.toLocaleLowerCase()));
    case VisibilityFilters.SHOW_IMPORTANT:
      return emails.filter(t => t.important && !t.trash && t.from.toLocaleLowerCase().includes(emailSearch.toLocaleLowerCase()));
    case VisibilityFilters.SHOW_TECHNOLOGY:
      return emails.filter(
        t => t.label === 'Technology' && !t.trash && t.from.toLocaleLowerCase().includes(emailSearch.toLocaleLowerCase())
      );
    case VisibilityFilters.SHOW_FINANCE:
      return emails.filter(t => t.label === 'Finance' && !t.trash && t.from.toLocaleLowerCase().includes(emailSearch.toLocaleLowerCase()));
    case VisibilityFilters.SHOW_HEALTH:
      return emails.filter(t => t.label === 'Health' && !t.trash && t.from.toLocaleLowerCase().includes(emailSearch.toLocaleLowerCase()));
    default:
      throw new Error('Unknown filter: ' + filter);
  }
};

const mapStateToProps = ({ projet }: IRootState) => ({
  // emails: getVisibleEmails(state.emailApp.emails, state.emailApp.visibilityFilter, state.emailApp.emailSearch),
  selected: projet.entity
});

const mapDispatchToProps = {
  getEntity
  // onStar: id => dispatch(starEmail(id)),
  // onImportant: id => dispatch(importantEmail(id)),
  // setSelectedEmail: (id, checkStatus) => dispatch(setSelectedEmail(id, checkStatus))
  // getEntity:
};
// const mapDispatchToProps = dispatch => ({
//   openProjet: id => getEntity(id),
//   onStar: id => dispatch(starEmail(id)),
//   onImportant: id => dispatch(importantEmail(id)),
//   setSelectedEmail: (id, checkStatus) => dispatch(setSelectedEmail(id, checkStatus))
//   // getEntity:
// });

export default connect<any, any, any>(mapStateToProps, mapDispatchToProps)(ProjetList);
