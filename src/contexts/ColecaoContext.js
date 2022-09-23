import firebaseApp from "firebase/app"
import firebase from '../config/firebase'

import { createContext, useState } from 'react'

export const ColecaoContext = createContext()

const ColecaoContextProvider = (props) => {
  const [colecoes, setColecoes] = useState([])

  const monitorarColecoes = (uid) => {
    // Reference the Firestore database
    const firestore = firebase.firestore()

    // Create a query snapshot to listen to multiple docs in a collection
    const unsub = firestore
      .collection('collections')
      .where('userId', '==', uid)
      .onSnapshot(querySnapshot => {
        const collections = []
        querySnapshot.forEach(doc => {
          // doc.data() returns an Object containing all fields in the document
          const docData = doc.data()
          const collection = {
            id: doc.id,
            ...docData
          }
          collections.push(collection)
        })
        setColecoes(collections)
      })

    return unsub
  }

  const editarColecaoMetadata = (collectionId, newMetadata) => {
    const _collections = [...colecoes]

    const indexOfCollection = colecoes.findIndex(collection => collection.id === collectionId)

    _collections[indexOfCollection].title = newMetadata.title
    _collections[indexOfCollection].desc = newMetadata.desc
    _collections[indexOfCollection].thumbnailLocalUri = newMetadata.thumbnailLocalUri

    setColecoes(_collections)
  }

  const criarColecao = (uid, collection, file) => {
    // Reference the Firestore database and Storage
    const firestore = firebase.firestore()
    const storage = firebase.storage()

    const imageRef = `${new Date().getTime()}_${file.name}`

    // Make async call to Firebase Storage
    // storage.ref(`images/${filename}`).putString(uri, 'data_url', { contentType: 'image/png' })
    storage.ref(`images/${imageRef}`).put(file)
      .then(snapshot => {
        console.log(snapshot)
        // Make async call to Firebase Firestore
        firestore.collection('collections').add({
          ...collection,
          userId: uid,
          thumbnail: imageRef,
          cardsList: [],
        })
          .then(() => {
            console.log('Criou nova colecao com sucesso!')

            // setColecoes((currentCollections) => {
            //   return [newCollection, ...currentCollections]
            // })
          })
          .catch(error => {
            console.log('Nao foi possivel criar uma nova colecao: ', error)
          })
      })
      .catch(error => {
        console.log('Erro ao enviar imagem da colecao ao Firebase: ', error)
      })
  }

  const deletarColecao = (collectionId) => {
    // Reference Firestore database
    const firestore = firebase.firestore()
    // Reference document
    const collectionRef = firestore.collection('collections')
    // Delete document
    collectionRef.doc(collectionId).delete()
      .then(() => {
        console.log('Colecao removida com sucesso')
      })
      .catch((error) => {
        console.log('Ocorreu um erro ao tentar remover a colecao: ', error)
      })
  }

  const criarCartao = (collectionId, card) => {
    const firestore = firebase.firestore()

    // Reference the doc in Firestore
    const docRef = firestore.collection('collections').doc(collectionId)

    // Make async call to Firebase Firestore
    docRef.update({
      cardsList: firebaseApp.firestore.FieldValue.arrayUnion(card)
    })
      .then(() => {
        console.log('Novo cartao adicionado!')
      })
      .catch(error => {
        console.error('Erro ao criar o cartao: ', error)
      })
  }

  const editCard = (collectionKey, cardKey, newCard) => {
    const _collections = [...colecoes]

    const indexOfCollection = colecoes.findIndex(collection => collection.id === collectionKey)
    const indexOfCard = colecoes[indexOfCollection].cardsList.findIndex(card => card.id === cardKey)

    _collections[indexOfCollection].cardsList[indexOfCard] = newCard

    setColecoes(_collections)
  }

  const deletarCartao = (collectionId, cardId) => {
    // Create a copy of cardsList
    const _colecoes = [...colecoes]

    const indexOfCollection = _colecoes.findIndex(collection => collection.id === collectionId)

    const newCardsList = _colecoes[indexOfCollection].cardsList.filter(card => card.id !== cardId)

    const docRef = firebase.firestore().collection('collections').doc(collectionId)

    docRef.update({
      cardsList: newCardsList
    })
      .then(() => {
        console.log('Cartao deletaco com sucesso!')
      })
      .catch(error => {
        console.error('Falha ao deletar o cartao: ', error)
      })

    // const _collections = [...colecoes]

    // const indexOfCollection = colecoes.findIndex(collection => collection.id === collectionKey)
    // const indexOfCard = colecoes[indexOfCollection].cardsList.findIndex(card => card.id === cardKey)

    // _collections[indexOfCollection].cardsList.splice(indexOfCard, 1)

    // setColecoes(_collections)
  }

  return (
    <ColecaoContext.Provider value={{
      colecoes,
      monitorarColecoes,
      criarColecao,
      editarColecaoMetadata,
      deletarColecao,
      criarCartao,
      editCard,
      deletarCartao
    }}>
      {props.children}
    </ColecaoContext.Provider>
  )
}

export default ColecaoContextProvider
