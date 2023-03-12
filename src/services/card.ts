import { ICard } from "src/models/cards"
import { cards } from "./data"

export const useCardApis = () => {
  const saveCardToLocalStorage = (cards: ICard[]) => {
    localStorage.setItem('my-cards', JSON.stringify(cards))
  }

  const getCardList = () => {
    return new Promise<ICard[]>((resolve, _) => {
      const localStoredCards = localStorage.getItem('my-cards')
      let myCards: ICard[] = []
      if (localStoredCards) {
        myCards = JSON.parse(localStoredCards) as ICard[]
      } else {
        myCards = cards
        saveCardToLocalStorage(cards)
      }
      myCards = myCards.filter((card) => card.status !== 'canceled')
      resolve(myCards)
    })
  }

  const addNewCard = async (data: Required<ICard>) => {
    const cards = [...(await getCardList())]
    const isExisted = cards.find((card) => card.cardnumber === data.cardnumber)
    if (!isExisted) {
      cards.unshift(data)
      saveCardToLocalStorage(cards)
    } else {
      return 'This card has already been added'
    }
    return cards
  }

  const updateCard = async (id: string, data: Partial<ICard>) => {
    const cards = [...(await getCardList())]
    const cardToUpdateIdx = cards.findIndex((card) => card.id === id)
    if (cardToUpdateIdx > -1) {
      cards[cardToUpdateIdx] = {
        ...cards[cardToUpdateIdx],
        ...data,
      }
      saveCardToLocalStorage(cards)
    } else {
      return 'This card is not available now. Please try again later.'
    }
  }

  return { getCardList, addNewCard, updateCard }
}
