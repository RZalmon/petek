import { ContactService } from "../services/ContactService";

// LIST
export function loadContacts(filterBy, user) {
  console.log("user?", user);
  return async (dispatch) => {
    try {
      const contacts = await ContactService.query(filterBy, user);
      dispatch({ type: "SET_CONTACTS", contacts });
    } catch (err) {
      console.log("ERROR", err);
    }
  };
}

// READ
export function loadContactById(id) {
  return async (dispatch) => {
    try {
      const contact = await ContactService.getContactById(id);
      dispatch({ type: "SET_CURR_CONTACT", contact });
    } catch (err) {
      console.log("ERROR", err);
    }
  };
}

//RESET
export function resetCurrContact() {
  return async (dispatch) => {
    try {
      const contact = null;
      dispatch({ type: "SET_CURR_CONTACT", contact });
    } catch (err) {
      console.log("ERROR:", err);
    }
  };
}

// UPDATE + CREATE
export function saveContact(contact) {
  return async (dispatch) => {
    const isEdit = !!contact._id;
    contact = await ContactService.saveContact(contact);
    if (isEdit) dispatch({ type: "UPDATE_CONTACT", contact });
    else dispatch({ type: "ADD_CONTACT", contact });
    return contact;
  };
}

// REMOVE

export function deleteContact(id) {
  return async (dispatch) => {
    await ContactService.deleteContact(id);
    dispatch({ type: "DELETE_CONTACT", id });
  };
}

export function setFilterBy(filterBy) {
  return async (dispatch) => {
    dispatch({ type: "SET_CONTACT_FILTER_BY", filterBy });
  };
}

//RESET FILTER BY
export function resetFilterBy() {
  return async (dispatch) => {
    dispatch({ type: "RESET_CONTACT_FILTER_BY" });
  };
}
