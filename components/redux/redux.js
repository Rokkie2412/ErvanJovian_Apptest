export const ADD_CONTACT = 'ADD_CONTACT';
export const SHOW_CONTACT = 'SHOW_CONTACT';
export const EDITCONTACT = 'EDITCONTACT';
export const ADDARRAY = 'ADDARRAY';
export const DELETE_CONTACT = 'DELETE_CONTACT';

export const addContact = (firstName, lastName, age, image) => ({
  type: ADD_CONTACT,
  payloadFirstname: firstName,
  payloadLastName: lastName,
  payAge: age,
  payloadImage: image,
});

export const editContact = (itemId, firstName, lastName, age, image) => ({
  type: EDITCONTACT,
  payloadID: itemId,
  payloadFirstname: firstName,
  payloadLastName: lastName,
  payAge: age,
  payloadImage: image,
});

export const showContact = newItem => ({
  type: SHOW_CONTACT,
  payload: newItem,
});

export const deleteContact = itemID => ({
  type: DELETE_CONTACT,
  payload: itemID,
});

let initialState = {
  arr: [],
};

export const mainReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_CONTACT:
      const postContact = () => {
        fetch('https://contact.herokuapp.com/contact', {
          method: 'POST',
          body: JSON.stringify({
            firstName: action.payloadFirstname,
            lastName: action.payloadLastName,
            age: action.payAge,
            photo: action.payloadImage,
          }),
          headers: {
            'Content-Type': 'application/json',
          },
        })
          .then(Response => Response.json())
          .then(json => console.log(json));
      };
      return postContact();
    case EDITCONTACT:
      const editContacts = () => {
        const tempid = action.payloadID;

        fetch(`https://contact.herokuapp.com/contact/${tempid}`, {
          method: 'PUT',
          body: JSON.stringify({
            firstName: action.payloadFirstname,
            lastName: action.payloadLastName,
            age: action.payAge,
            photo: action.payloadImage,
          }),
          headers: {
            'Content-Type': 'application/json',
          },
        })
          .then(Response => Response.json())
          .then(json => console.log(json));
      };
      return editContacts();
    case SHOW_CONTACT:
      return {
        ...state,
        arr: action.payload,
      };
    case DELETE_CONTACT:
      const delete_contact = () => {
        fetch(`https://contact.herokuapp.com/contact/${action.payload}`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
        })
          .then(Response => Response.json())
          .then(json => console.log(json));
      };
      return delete_contact;
    default:
      return state;
  }
};
