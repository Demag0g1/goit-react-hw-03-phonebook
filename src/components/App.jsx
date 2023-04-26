import { Component } from 'react';
import {nanoid} from 'nanoid';
import { ContactForm } from './contactForm/ContactForm';
import { ContactList } from './contactList/ContactList';
import { Filter } from './filter/Filter';
import css from './App.module.css';

export class App extends Component {
  state = {
    contacts: [
      {
        id: nanoid(),
        name: 'Rosie Simpson',
        number: '459-12-56',
      },
      {
        id: nanoid(),
        name: 'Hermione Kline',
        number: '443-89-12',
      },
      {
        id: nanoid(),
        name: 'Eden Clements',
        number: '645-17-79',
      },
      {
        id: nanoid(),
        name: 'Annie Copeland',
        number: '227-91-26',
      },
    ],
    filter: '',
    name: '',
    number: '',
  };

  onChangeInput = event => {
    const { name, value } =
      event.currentTarget;
    this.setState({ [name]: value });
  };

  addContact = ({ name, number }) => {
    if (
      this.state.contacts.some(
        value =>
          value.name.toLocaleLowerCase() ===
          name.toLocaleLowerCase()
      )
    ) {
      alert(
        `${name} is already in contacts`
      );
    } else {
      this.setState(prevState => {
        const list = [
          ...prevState.contacts,
        ];
        list.push({
          id: nanoid(),
          name: name,
          number: number,
        });
        return { contacts: list };
      });
    }
  };

  filter = () => {
    const { contacts, filter } =
      this.state;
    const filteredContacts =
      contacts.filter(contact =>
        contact.name
          .toLowerCase()
          .includes(
            filter.toLowerCase()
          )
      );
    return filteredContacts;
  };

  delContact = id => {
    const { contacts } = this.state;
    const filtered = contacts.filter(
      item => item.id !== id
    );
    this.setState({
      contacts: filtered,
    });
  };

  render() {
    return (
      <div className={css.conteiner}>
        <h1>Phonebook</h1>
        <ContactForm
          addContact={this.addContact}
        />
        <h2>Contacts</h2>
        <Filter
          filter={this.state.filter}
          onChangeInput={
            this.onChangeInput
          }
        />
        <ContactList
          delContact={this.delContact}
          contacts={this.filter()}
        />
      </div>
    );
  }
}
