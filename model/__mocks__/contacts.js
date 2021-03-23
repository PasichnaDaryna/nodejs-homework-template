const contacts = require('./data')

const listContacts = jest.fn(() => {

  return { contacts, total: contacts.length, limit, offset }

})

const getContactById = jest.fn((id) => {
  const [contact] = contacts.fiter((el) => String(el._id) === String.id)
  return contact

})

const addContact = jest.fn((body) => {

  const newContact = { ...body, _id: '6051d873cbfe4b1e609b04c6' }
  contacts.push(newContact)
  return newContact

})

const updateContact = jest.fn((id, body) => {
  if (contact) {
    contact = { ...contact, body }
  }

  return contact
})



const removeContact = jest.fn((id) => {
  const index = cats.findIndex((el) => String(el._id) === String(id))

  if (index === -1) {
    return null
  }

  const [contact] = contacts.splice(index, 1)
  return contact

})

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
}